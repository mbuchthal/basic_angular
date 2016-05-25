
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroController',
  ['$http', '$scope', 'handleError',
  function($http, $scope, handleError) {
    this.heroes = [];
    this.errors = [];
    $scope.master = {};

    this.getHeroes = function() {
      $http.get(baseUrl + '/api/heroes')
        .then((res) => {
          this.heroes = res.data;
        }, handleError(this.errors, 'could not GET heroes'));
    };

    this.makeHero = function() {
      $http.post(baseUrl + '/api/heroes', this.newHero)
        .then((res) => {
          this.heroes.push(res.data);
          this.newHero = null;
        }, handleError(this.errors, 'could not POST heroes'));
    }.bind(this);

    this.deleteHero = function(hero) {
      $http.delete(baseUrl + '/api/heroes/' + hero._id)
        .then(() => {
          this.heroes.splice(this.heroes.indexOf(hero), 1);
        }, handleError(this.errors, 'could not DELETE heroes'));
    }.bind(this);

    this.editHero = function(hero) {
      $http.put(baseUrl + '/api/heroes/' + hero._id, hero)
        .then(() => {
          $scope.master = angular.copy(hero);
          hero.editing = false;
        }, handleError(this.errors, 'could not UPDATE heroes'));
    };

    this.heroStore = (hero) => {
      $scope.master = angular.copy(hero);
    };

    this.heroReset = (hero) => {
      var oldHero = this.heroes[this.heroes.indexOf(hero)];
      angular.copy($scope.master, oldHero);
    };
  }]);
};
