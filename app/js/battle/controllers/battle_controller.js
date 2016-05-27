
var baseUrl = require('../../config').baseUrl;
var handleError = require('../../lib').handleError;

module.exports = function(app) {
  app.controller('BattleController', ['$http', function($http) {
    this.battles = ['test'];

    this.battle = function() {
      $http.get(baseUrl + '/api/battle')
        .then((res) => {
          this.battles.push(res.data);
        }, handleError.bind(this));
    };

    this.removeBattle = (battle) => {
      this.battles.splice(this.battles.indexOf(battle), 1);
    };
  }]);
};
