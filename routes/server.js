var express = require("express"),
	router = express.Router(),
	request = require("request"),
	knex = require("../db/knex"),
	parsedBody,
	beerNames,
	requestUrl = "http://api.brewerydb.com/v2/beers", 
	// need to put api key in a .env file
	apiKey = "?key=5c33009584a06b592c41670c7b7b9bec";

router.route("/")
	.get(function(req, res){
		res.render("home");
	});

router.route("/beers")
	.get(function(req, res){
		request.get(requestUrl + apiKey + "&abv=-10", function(err, response, body){
			parsedBody = JSON.parse(body);
			beerNames = parsedBody.data.map(function(val){
				return val.name;
			});
			knex.select("*").from("beers")
				.then(function(beers){
					res.render("index", {beerNames: beerNames, favorites: beers});
					
				})
				.catch(function(err){
					console.log(err);
				});
		});
			// res.render("index", {beerNames: ["Parker's Beer"], favorites: [{name: "Parker", count: 2}]});
	});
router.route("/beers/beer")
// POSSIBLE TODO -  Refactor with GET and req.params
	.post(function(req, res){
		request.get(requestUrl + apiKey + '&name=' + encodeURIComponent(req.body.beerSearch), function(err, response, body){
			parsedBody = JSON.parse(body)
			res.render("show", {info: parsedBody.data[0]})
			
		})
		// res.render("show", {info: {}});
	})
	

router.route("/beers/beer/:id")
	.delete(function(req, res){
		knex("beers").where("id", parseInt(req.params.id)).del()
			.then(function(){
				res.redirect("/beers")
			})
			.catch(function(err){
				console.log(err);
			});
	});

router.route("/beers/favorites")
	// TODO - refactor when I add the fav count feature
	.post(function(req, res){
		var beer = {name: req.query.beerName}
		knex.insert(beer).into("beers")
			.then(function(){
				res.redirect("/beers");
			})
			.catch(function(err){
				console.log(err);
			});;
	})

module.exports = router;







