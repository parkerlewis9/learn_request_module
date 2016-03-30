var express = require("express"),
	router = express.Router();

router.route("/")
	.get(function(req, res){
		res.render("home");
	})

module.exports = router;