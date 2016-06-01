
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroController',
  ['Resource', 'store', function(Resource, store) {
    this.heroes = [];
    this.errors = [];
    this.master = {};
    this.counter = store;
    this.getCount = store.getCount.bind(store);
    this.addCount = store.addCount.bind(store);

    var heroErrMessages = {
      getAll: 'could not GET heroes',
      create: 'could not POST heroes',
      update: 'could not UPDATE heroes',
      remove: 'could not DELETE heroes'
    };

    this.remote = new Resource(this.heroes, this.errors,
      baseUrl + '/api/heroes', { errorMsg: heroErrMessages });

    this.getHeroes = function() {
      this.remote.getAll()
        .then(() => {
          this.counter.count = this.counter.count + this.heroes.length;
        });
    }.bind(this);


    this.makeHero = function() {
      this.addCount();
      this.remote.create(this.newHero)
        .then(() => {
          this.newHero = null;
        });
    }.bind(this);

    this.deleteHero = function(hero) {
      this.remote.remove(hero)
        .then(() => {
          this.counter.count--;
        });
    }.bind(this);

    this.editHero = function(hero) {
      this.remote.update(hero)
        .then(() => {
          hero.editing = false;
          this.master = angular.copy(hero);
        });
    }.bind(this);

    this.heroStore = function(hero) {
      this.master = angular.copy(hero);
    }.bind(this);

    this.heroReset = function(hero) {
      var oldHero = this.heroes[this.heroes.indexOf(hero)];
      angular.copy(this.master, oldHero);
    }.bind(this);
  }]);
};
