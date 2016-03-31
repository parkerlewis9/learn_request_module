var express = require("express"),
	router = express.Router(),
	request = require("request"),
	// need to put api key in a .env file
	requestUrl = "http://api.brewerydb.com/v2" 
	apiKey = "?key=5c33009584a06b592c41670c7b7b9bec";

router.route("/")
	.get(function(req, res){
		res.render("home");
	});

router.route("/beers")
	.get(function(req, res){
		request.get(requestUrl+ "/beers" + apiKey + "&abv=-10", function(err, response, body){
			var parsedBody = JSON.parse(body);
			var beerNames = parsedBody.data.map(function(val){
				return val.name;
			});
			res.render("index", {beerNames: beerNames});
		});
			// res.render("index", {beerNames: []});
	});
router.route("/beers/beer")
	.get(function(req, res){
		res.render("show")
	})

module.exports = router;