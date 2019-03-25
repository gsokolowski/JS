NetPlay netpay
Project is done on nodejs + js as frontend

To run project you need to do
Step 1
    pull netpay project from this repository https://github.com/gsokolowski
Step 2
    cd netpay
    install node_modules
    npm install
Step 3
    start node server
    node app.js
    Magic happens on port 3001
Step 4
    Go to http://localhost:3001/ and you should be able to see working project

Backend API calls:

// return all games no matter what the category id is
// http://localhost:3001/api/games

// return games by category id (default is 79 all games)
// http://localhost:3001/api/games/3

// return game by provided name and can be used for also search
// http://localhost:3001/api/game/Frankie // get by name
// http://localhost:3001/api/game/Da // serach

Search
Start typing e.g Da (for Dart) or Fa for (Fantastic)
and you should see data coming in after second character is entered into text field

