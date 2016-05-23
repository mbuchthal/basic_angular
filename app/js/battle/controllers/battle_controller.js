
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BattleController', ['$http', function($http) {
    this.battles = [];

    this.battle = function() {
      $http.get(baseUrl + '/api/battle')
        .then((res) => {
          this.battles.push(res.data);
        });
    };
  }]);
};
