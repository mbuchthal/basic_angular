
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainController',
  ['Resource', function(Resource) {
    this.villains = [];
    this.errors = [];
    this.master = {};

    var vilErrMessages = {
      getAll: 'could not GET villains',
      create: 'could not POST villains',
      update: 'could not UPDATE villains',
      remove: 'could not DELETE villains'
    };

    this.remote = new Resource(this.villains, this.errors,
      baseUrl + '/api/villains', { errorMsg: vilErrMessages });

    this.getVillains = this.remote.getAll.bind(this.remote);

    this.makeVillain = function() {
      this.remote.create(this.newVillain)
        .then(() => {
          this.newVillain = null;
        });
    }.bind(this);

    this.deleteVillain = this.remote.remove.bind(this.remote);

    this.editVillain = function(villain) {
      this.remote.update(villain)
        .then(() => {
          villain.editing = false;
          this.master = angular.copy(villain);
        });
    }.bind(this);

    this.vilStore = function(villain) {
      this.master = angular.copy(villain);
    }.bind(this);

    this.vilReset = function(villain) {
      var oldVillain = this.villains[this.villains.indexOf(villain)];
      angular.copy(this.master, oldVillain);
    }.bind(this);
  }]);
};
