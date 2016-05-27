
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainController',
  ['$scope', 'Resource', function($scope, Resource) {
    this.villains = [];
    this.errors = [];
    $scope.master = {};

    var vilErrMessages = {
      getAll: 'could not GET villains',
      create: 'could not POST villains',
      update: 'could not UPDATE villains',
      remove: 'could not DELETE villains'
    };

    var remote = new Resource(this.villains, this.errors,
      baseUrl + '/api/villains', { errorMsg: vilErrMessages });

    this.getVillains = remote.getAll.bind(remote);

    this.makeVillain = function() {
      remote.create(this.newVillain)
        .then(() => {
          this.newVillain = null;
        });
    }.bind(this);

    this.deleteVillain = remote.remove.bind(remote);

    this.editVillain = function(villain) {
      remote.update(villain)
        .then(() => {
          villain.editing = false;
          $scope.master = angular.copy(villain);
        });
    };

    this.vilStore = (villain) => {
      $scope.master = angular.copy(villain);
    };

    this.vilReset = (villain) => {
      var oldVillain = this.villains[this.villains.indexOf(villain)];
      angular.copy($scope.master, oldVillain);
    };
  }]);
};
