
const angular = require('angular');
const heroFormTemplate = require('../../app/templates/heros/directives/hero_form.html');

describe('hero form directive', function() {
  beforeEach(angular.mock.module('heroApp'));
  var $httpBackend;
  var $compile;
  var $scope;
  var $rootScope;
  var $controller;

  beforeEach(angular.mock.inject(function(_$httpBackend_, _$compile_, _$rootScope_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

    it('should create a form directive with a controller binding', function() {

      $httpBackend.expectGET('/templates/heros/directives/hero_form.html')
        .respond(200, heroFormTemplate);

      $scope.name = 'test name';
      var directive = $compile('<div data-ng-controller="HeroController as heroctrl"> <hero-form data-hero="{}"></hero-form> </div>')($scope);
      $httpBackend.flush();
      $scope.$digest();
      // var el = directive.find('p');
      // expect(el.text()).toContain($scope.name);
      var input = directive.find('form input');
      console.log(input);
      input.val('new test name');
      input.triggerHandler('form');
      expect(directive.html()).toContain('new test name');

  });

  it('should transclude html', function() {
      $httpBackend.expectGET('/templates/heros/directives/hero_form.html')
      .respond(200, heroFormTemplate);

  });
});
