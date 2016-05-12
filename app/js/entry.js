
const angular = require('angular');

const heroApp = angular.module('heroApp', []);

const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

heroApp.controller('HeroController', ['$http', function($http) {
  this.heroes = [];
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
        hero.editing = false;
      }, handleError.bind(this));
  };
}]);

heroApp.controller('VillainController', ['$http', function($http) {
  this.villains = [];
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
}]);
