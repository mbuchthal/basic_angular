
module.exports = function(app) {
  app.directive('heroForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/heros/directives/hero_form.html',
      scope: {
        hero: '=',
        buttonText: '@',
        saveMethod: '@',
        counter: '='
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.editHero,
          create: controller.makeHero,
          addCount: controller.addCount
        };
        scope.save = actions[scope.saveMethod];
      }
    };
  });
};
