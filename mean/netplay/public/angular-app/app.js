
// In angular everything belongs to module
angular.module('meanhotel', ['ngRoute']) // inject angular route library as dependency
    .config(config);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/game-list/games.html',
        controller: 'GamesController',
        controllerAs: 'vm'
    })
}


