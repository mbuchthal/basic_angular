
module.exports = function(app) {
  app.directive('battleList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/battles/directives/battle_list.html',
      scope:
      {
        battle: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.battle = controller.battle;
        scope.remove = controller.removeBattle;
      }
    };
  });
};
