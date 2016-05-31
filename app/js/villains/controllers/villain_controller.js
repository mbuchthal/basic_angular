
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainController',
  ['Resource', 'store', function(Resource, store) {
    this.villains = [];
    this.errors = [];
    this.master = {};
    this.counter = store;
    this.getCount = store.getCount.bind(store);
    this.addCount = store.addCount.bind(store);

    var vilErrMessages = {
      getAll: 'could not GET villains',
      create: 'could not POST villains',
      update: 'could not UPDATE villains',
      remove: 'could not DELETE villains'
    };

    this.remote = new Resource(this.villains, this.errors,
      baseUrl + '/api/villains', { errorMsg: vilErrMessages });

    this.getVillains = function() {
      this.remote.getAll()
        .then(() => {
          this.counter.count = this.counter.count + this.villains.length;
        });
      }.bind(this);

    this.makeVillain = function() {
      this.addCount();
        this.remote.create(this.newVillain)
          .then(() => {
            this.newVillain = null;
          });
    }.bind(this);

    this.deleteVillain = function(villain) {
      this.remote.remove(villain)
        .then(() => {
          this.counter.count--
        });
    }.bind(this);

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
