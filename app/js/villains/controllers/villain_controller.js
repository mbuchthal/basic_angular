
var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainController', ['$http', '$scope', function($http, $scope) {
    this.villains = [];
    $scope.master = {};

    this.getVillains = function() {
      $http.get(baseUrl + '/api/villains')
        .then((res) => {
          this.villains = res.data;
        }, handleError.bind(this));
    };

    this.makeVillain = function() {
      $http.post(baseUrl + '/api/villains', this.newVillain)
        .then((res) => {
          this.villains.push(res.data);
          this.newVillain = null;
        }, handleError.bind(this));
    };

    this.deleteVillain = function(villain) {
      $http.delete(baseUrl + '/api/villains/' + villain._id)
        .then(() => {
          this.villains.splice(this.villains.indexOf(villain), 1);
        }, handleError.bind(this));
    };

    this.editVillain = function(villain) {
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
};
