
module.exports = function(app) {
  app.directive('villainListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/villains/directives/villain_list_item.html',
      scope: {
        villain: '='
      },
      link: function(scope, element, attr, controller) {
        scope.remove = controller.deleteVillain;
        scope.store = controller.vilStore;
        scope.reset = controller.vilReset;
      }
    };
  });
};

