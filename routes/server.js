var express = require("express"),
	router = express.Router(),
	request = require("request"),
	knex = require("../db/knex"),
	parsedBody,
	beerNames,
	requestUrl = "http://api.brewerydb.com/v2/beers?key=";
	// need to put api key in a .env file
if(process.env.NODE_ENV !== "production"){
	require('dotenv').config();
}
var apiKey = process.env.API_KEY;


function makeRequest(url,apiKey,params){
	return new Promise(function(resolve,reject){
		request.get(`${url}${apiKey}${params}`, function(err, response, body){
			if(err || response.statusCode >= 400){
				reject(err,response.statusCode);
			}
			else {
				resolve(JSON.parse(body));
			}
		});
	});
}

router.route("/")
	.get(function(req, res){
		res.render("home");
	});

router.route("/beers")
	.get(function(req, res){

		makeRequest(requestUrl, apiKey, "&abv=-10")
		.then(function(body){
			beerNames = body.data.map(function(val){
				return val.name;
			});
			knex("beers")
				.then(function(beers){
					res.render("index", {beerNames: beerNames, favorites: beers});
					
				})
				.catch(function(err){
					console.log(err);
				});
		}).catch(function(err, code){
			res.send("Status Code: " + code + ": " + err)
		});

		// request.get(requestUrl + apiKey + "&abv=-10", function(err, response, body){
		// 	parsedBody = JSON.parse(body);
		// 	beerNames = parsedBody.data.map(function(val){
		// 		return val.name;
		// 	});
		// 	knex("beers")
		// 		.then(function(beers){
		// 			res.render("index", {beerNames: beerNames, favorites: beers});
					
		// 		})
		// 		.catch(function(err){
		// 			console.log(err);
		// 		});
		// });
	})
	// TODO - refactor when I add the fav count feature
	.post(function(req, res){
		var beer = {name: req.query.beerName};
		knex.insert(beer).into("beers")
			.then(function(){
				res.redirect("/beers");
			})
			.catch(function(err){
				console.log(err);
			});
	})
	.delete(function(req, res){
		knex("beers").del()
			.then(function(beers){
				res.format({
					html: function(){
						res.redirect("/beers");
					},

					json: function(){
						res.send({ message: "Yay" });
					}
				});
			})
			.catch(function(err){
				console.log(err);
			});
	});

router.route("/beers/beer")
// POSSIBLE TODO -  Refactor with GET and req.params
	.post(function(req, res){
		request.get(requestUrl + apiKey + '&name=' + encodeURIComponent(req.body.beerSearch), function(err, response, body){
			parsedBody = JSON.parse(body);
			res.render("show", {info: parsedBody.data[0]});
			
		});
	});
	

router.route("/beers/:id")
	.delete(function(req, res){
		knex("beers").where("id", parseInt(req.params.id)).del()
			.returning("id")
			.then(function(id){
				res.format({
					html: function(){
						res.redirect("/beers");
					},

					json: function(){
						res.send({ id: id });
					}
				});
			})
			.catch(function(err){
				console.log(err);
			});
	});

	

module.exports = router;







