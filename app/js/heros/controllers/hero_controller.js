
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroController',
  ['$scope', 'Resource', function($scope, Resource) {
    this.heroes = [];
    this.errors = [];
    $scope.master = {};

    var heroErrMessages = {
      getAll: 'could not GET heroes',
      create: 'could not POST heroes',
      update: 'could not UPDATE heroes',
      remove: 'could not DELETE heroes'
    };

    var remote = new Resource(this.heroes, this.errors,
      baseUrl + '/api/heroes', { errorMsg: heroErrMessages });

    this.getHeroes = remote.getAll.bind(remote);

    this.makeHero = function() {
      remote.create(this.newHero)
        .then(() => {
          this.newHero = null;
        });
    }.bind(this);

    this.deleteHero = remote.remove.bind(remote);

    this.editHero = function(hero) {
      remote.update(hero)
        .then(() => {
          hero.editing = false;
          $scope.master = angular.copy(hero);
        });
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
