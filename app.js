var express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	server = require("./routes/server");
	// dotenv = require('dotenv');
// dotenv.config();

require("locus");
// eval(locus)
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes

app.use("/", server);

// app.get("*", function(req,res){
//   res.render("404");
// });

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
