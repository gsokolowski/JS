angular
    .module('meanhotel')
    .controller('GamesController', GamesController);

function GamesController($http) {
    var vm = this;
    vm.title = "Netplay";
    $http.get('/api/games').then(function(response) {
        console.log(response);
        vm.games = response.data;
    });
}