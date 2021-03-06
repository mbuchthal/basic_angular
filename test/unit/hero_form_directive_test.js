
const angular = require('angular');
const heroFormTemplate = require('../../app/templates/heros/directives/hero_form.html');

describe('hero form directive', function() {
  var $httpBackend;
  var $compile;
  var $rootScope;
  var $scope;

  beforeEach(angular.mock.module('heroApp'));

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
    var directive = $compile('<div data-ng-controller="HeroController as heroctrl"><hero-form data-hero="{}"></hero-form></div>')($scope); // eslint-disable-line
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.html()).toContain('save_btn');
  });

  it('should transclude from parent scope', function() {
    $httpBackend.expectGET('/templates/heros/directives/hero_form.html')
      .respond(200, heroFormTemplate);
    $scope.buttonText = 'test button';
    var directive = $compile('<div data-ng-controller="HeroController as heroctrl"><hero-form data-text="text">{{description}}</hero-form></div>')($scope); // eslint-disable-line
    $httpBackend.flush();
    // expect(directive.html().indexOf('test button')).not.toBe(-1);

  });
});
