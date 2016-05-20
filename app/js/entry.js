
const angular = require('angular');
const heroApp = angular.module('heroApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

heroApp.controller('HeroController', ['$http', '$scope', function($http, $scope) {
  this.heroes = [];
  $scope.master = {};

  this.getHeroes = () => {
    $http.get(baseUrl + '/api/heroes')
      .then((res) => {
        this.heroes = res.data;
      }, handleError.bind(this));
  };

  this.makeHero = () => {
    $http.post(baseUrl + '/api/heroes', this.newHero)
      .then((res) => {
        this.heroes.push(res.data);
        this.newHero = null;
      }, handleError.bind(this));
  };

  this.deleteHero = (hero) => {
    $http.delete(baseUrl + '/api/heroes/' + hero._id)
      .then(() => {
        this.heroes.splice(this.heroes.indexOf(hero), 1);
      }, handleError.bind(this));
  };

  this.editHero = (hero) => {
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

heroApp.controller('VillainController', ['$http', '$scope', function($http, $scope) {
  this.villains = [];
  $scope.master = {};

  this.getVillains = () => {
    $http.get(baseUrl + '/api/villains')
      .then((res) => {
        this.villains = res.data;
      }, handleError.bind(this));
  };

  this.makeVillain = () => {
    $http.post(baseUrl + '/api/villains', this.newVillain)
      .then((res) => {
        this.villains.push(res.data);
        this.newVillain = null;
      }, handleError.bind(this));
  };

  this.deleteVillain = (villain) => {
    $http.delete(baseUrl + '/api/villains/' + villain._id)
      .then(() => {
        this.villains.splice(this.villains.indexOf(villain), 1);
      }, handleError.bind(this));
  };

  this.editVillain = (villain) => {
    $http.put(baseUrl + '/api/villains/' + villain._id, villain)
      .then(() => {
        villain.editing = false;
      }, handleError.bind(this));
  };

  this.vilStore = function(villain) {
    $scope.master = angular.copy(villain);
  };

  this.vilReset = function(villain) {
    var oldVillain = this.villains[this.villains.indexOf(villain)];
    angular.copy($scope.master, oldVillain);
  };
}]);

heroApp.controller('BattleController', ['$http', function($http) {
  this.battles = [];

  this.battle = () => {
    $http.get(baseUrl + '/api/battle')
      .then((res) => {
        this.battles.push(res.data);
      });
  };
}]);
