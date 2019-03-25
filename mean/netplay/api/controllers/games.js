
// csv converted to json
var gameData = require('../data/game-data.json');


// return all games no matter what the category id
// http://localhost:3001/api/games
module.exports.gamesGetAll = function(req, res) {

    console.log("GET the games");
    res
        .status(200)
        .json(  gameData  );
};

// return games by category id (default is 79 all games)
// http://localhost:3001/api/games/3
module.exports.getGamesByCategory = function(req, res) {

    // get parameter
    var categoryId = 79;

    if(req.params.id) {
        categoryId = req.params.id;
    }

    var data = [];

    for( var i = 0; i < gameData.length; i++ )
    {
        var categories = gameData[i]['FIELD3'] . split(",");

        for(var cat in categories) {

            if(categories[cat] == categoryId) {
                data.push( gameData[i] );
            }
        }
    }
    //console.log(slotsData);
    if(data.length>0) {
        res
            .status(200)
            .json( data );
    } else {
        res
            .status(200)
            .json({
                "message" : "no data for this category id"
            });
    }
};


// return game by provided name and can be used for also search
// http://localhost:3001/api/game/Frankie // get by name
// http://localhost:3001/api/game/Da // serach
module.exports.getGameByName = function(req, res) {

    // get parameters
    var name = req.params.name;

    var data = [];

    for( var i = 0; i < gameData.length; i++ )
    {
        if( gameData[i]['FIELD1'].includes(name) ) {
            console.log( gameData[i]['FIELD1'] );
            data.push( gameData[i] );
        }
    }

    console.log(data);
    if(data.length>0) {
        res
            .status(200)
            .json( data );
    } else {
        res
            .status(200)
            .json({
                "message" : "no data"
            });
    }
};

