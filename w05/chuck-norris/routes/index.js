var express = require('express');
var router = express.Router();
const request = require("request");
const URL = "https://api.chucknorris.io/jokes/random";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Chuck Norris Jokes', joke: null});
});

router.get("/jokes", function(req, res){
  request(URL, function(error, response, body){
    console.log(body);
    res.render("index", {
      title: "Chuck Norris Joke",
      joke: JSON.parse(body)
      // whenever you're dealing with JSON data, you can't access properties via
      // dot notation; you need to PARSE the data first
    });
  });
});

module.exports = router;
