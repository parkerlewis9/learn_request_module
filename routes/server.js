var express = require("express"),
	router = express.Router(),
	request = require("request"),
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
		// request.get(requestUrl + apiKey + "&abv=-10", function(err, response, body){
		// 	parsedBody = JSON.parse(body);
		// 	console.log(parsedBody)
		// 	beerNames = parsedBody.data.map(function(val){
		// 		return val.name;
		// 	});
		// 	res.render("index", {beerNames: beerNames});
		// });
			res.render("index", {beerNames: ["Parker's Beer"], favorites: [{name: "Parker", count: 2}]});
	});
router.route("/beers/beer")
	.post(function(req, res){
		// request.get(requestUrl + apiKey + '&name=' + encodeURIComponent(req.body.beerSearch), function(err, response, body){
		// 	parsedBody = JSON.parse(body)
		// 	// console.log(req.body)
		// 	// console.log(response)
		// 	// console.log(parsedBody.data)
		// 	res.render("show", {info: parsedBody.data[0]})
			
		// })
		res.render("show", {info: {}})
	})
router.route("/beers/favorites")
	.post(function(req, res){
		
	})

module.exports = router;







