
module.exports = function(app) {
  app.directive('villainForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/villains/directives/villain_form.html',
      scope: {
        villain: '=',
        buttonText: '@',
        saveMethod: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.editVillain,
          create: controller.makeVillain
        };
        scope.save = actions[scope.saveMethod];
      }
    };
  });
};
