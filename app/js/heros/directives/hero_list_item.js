
module.exports = function(app) {
  app.directive('heroListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/heros/directives/hero_list_item.html',
      scope: {
        hero: '='
      },
      link: function(scope, element, attr, controller) {
        scope.remove = controller.deleteHero;
        scope.store = controller.heroStore;
      }
    };
  });
};
