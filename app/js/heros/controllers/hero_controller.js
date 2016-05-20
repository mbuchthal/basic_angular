
var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroController', ['$http', '$scope', function($http, $scope) {
    this.heroes = [];
    $scope.master = {};

    this.getHeroes = function() {
      $http.get(baseUrl + '/api/heroes')
        .then((res) => {
          this.heroes = res.data;
        }, handleError.bind(this));
    };

    this.makeHero = function() {
      $http.post(baseUrl + '/api/heroes', this.newHero)
        .then((res) => {
          this.heroes.push(res.data);
          this.newHero = null;
        }, handleError.bind(this));
    };

    this.deleteHero = function(hero) {
      $http.delete(baseUrl + '/api/heroes/' + hero._id)
        .then(() => {
          this.heroes.splice(this.heroes.indexOf(hero), 1);
        }, handleError.bind(this));
    };

    this.editHero = function(hero) {
      $http.put(baseUrl + '/api/heroes/' + hero._id, hero)
        .then(() => {
          $scope.master = angular.copy(hero);
          hero.editing = false;
        }, handleError.bind(this));
    };

    this.heroStore = function(hero) {
      $scope.master = angular.copy(hero);
    };

    this.heroReset = function(hero) {
      var oldHero = this.heroes[this.heroes.indexOf(hero)];
      angular.copy($scope.master, oldHero);
    };
  }]);
}
