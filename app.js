/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
var bodyParser = require('body-parser');

//types of parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userList = {};

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
//var userList = {users: {name:'matt', email:'matt@matt.com'}};

app.get('/about', function(req,res){
  res.send('about');
  console.log(appEnv);
})

app.post('/', function(req,res){
  console.log(req.body);
})

app.post('/newuser', function(req,res){
  userList[req.body.email]={name:req.body.name};
  console.log(userList) ;
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
