
var baseUrl = require('../../config').baseUrl;
var handleError = require('../../lib').handleError;

module.exports = function(app) {
  app.controller('BattleController', ['$http', function($http) {
    this.battles = [];

    this.getBattles = function() {
      this.battles = [];
    };

    this.battle = function() {
      $http.get(baseUrl + '/api/battle')
        .then((res) => {
          this.battles.push(res.data);
        }, handleError.bind(this));
    };

    this.removeBattle = function(battle) {
      this.battles.splice(this.battles.indexOf(battle), 1);
    }.bind(this);
  }]);
};
