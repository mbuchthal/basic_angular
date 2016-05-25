
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainController',
  ['$http', '$scope', 'handleError',
  function($http, $scope, handleError) {
    this.villains = [];
    $scope.master = {};

    this.getVillains = function() {
      $http.get(baseUrl + '/api/villains')
        .then((res) => {
          this.villains = res.data;
        }, handleError(this.errors, 'could not GET villains'));
    }.bind(this);

    this.makeVillain = function() {
      $http.post(baseUrl + '/api/villains', this.newVillain)
        .then((res) => {
          this.villains.push(res.data);
          this.newVillain = null;
        }, handleError(this.errors, 'could not POST villains'));
    }.bind(this);

    this.deleteVillain = function(villain) {
      $http.delete(baseUrl + '/api/villains/' + villain._id)
        .then(() => {
          this.villains.splice(this.villains.indexOf(villain), 1);
        }, handleError(this.errors, 'could not DELETE villains'));
    }.bind(this);

    this.editVillain = function(villain) {
      $http.put(baseUrl + '/api/villains/' + villain._id, villain)
        .then(() => {
          villain.editing = false;
        }, handleError(this.errors, 'could not UPDATE villains'));
    }.bind(this);

    this.vilStore = (villain) => {
      $scope.master = angular.copy(villain);
    };

    this.vilReset = (villain) => {
      var oldVillain = this.villains[this.villains.indexOf(villain)];
      angular.copy($scope.master, oldVillain);
    };
  }]);
};
