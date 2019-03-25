// open connection to mongo database
require('./api/data/dbconnection.js').open();
// get express
var express = require('express'); // mnpm install express --save
var app = express();						
var path = require('path');					
var bodyParser = require('body-parser'); 	// npm install --save body-parser for receving POST data

var routes = require('./api/routes/index.js');

app.set('port', 3000);
// app.get('port'); 


// middleware to log all requests
app.use('/', function(req, res, next) {
	console.log(req.method, req.url);
	next();
})


//http://localhost:3000/index.html
// middlewere to load all static elements from public folder
app.use('/', express.static( path.join( __dirname, 'public' )));

// for dealing with form POSTED 
app.use( bodyParser.urlencoded( {extended : false }) );

// middlewere to load routes - http://localhost:3000/api/json
app.use('/api', routes);



//http://localhost:3000/public/index.html
//app.use('/public', express.static( path.join( __dirname, 'public' )));

// routes deinition
// app.get('/', function(req, res) {
// 	console.log("GET the hompage");
// 	res
// 		.status(404)
// 		.sendFile( path.join( __dirname, 'public', 'index.html' ));
// });

// app.get('/json', function(req, res) {
// 	console.log("GET the json");
// 	res
// 		.status(200)
// 		.json( {"jsonData" : true} );
// });

// app.get('/file', function(req, res) {
// 	console.log("GET the file");
// 	res
// 		.status(200)
// 		.sendFile( path.join( __dirname, 'app.js' ));
// });


// set listen server on port defined at the top
var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);	
});
