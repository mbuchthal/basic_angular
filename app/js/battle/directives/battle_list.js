
module.exports = function(app) {
  app.directive('battleList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/battles/directives/battle_list.html',
      scope: {
        battle: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeBattle;
        scope.battle = controller.battle;
      }
    };
  });
};
