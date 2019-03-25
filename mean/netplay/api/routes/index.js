// get express
var express = require('express');
// instatiate router
var router = express.Router();

var controllerGames = require('../controllers/games.js');

// create route for json


router
	.route('/games/:id')
	.get( controllerGames.getGamesByCategory);

router
	.route('/games')
	.get( controllerGames.getGamesByCategory);

router
	.route('/game/:name')
	.get( controllerGames.getGameByName);

// export instantiated router and in app.js you need to require routes folder and to use them.
module.exports = router;
