
const angular = require('angular');
const vilFormTemplate = require('../../app/templates/heros/directives/hero_form.html');

describe('villain form directive', function() {
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
    $httpBackend.expectGET('/templates/villains/directives/villain_form.html')
      .respond(200, vilFormTemplate);

    $scope.name = 'test name';
    var directive = $compile('<div data-ng-controller="VillainController as vilctrl"><villain-form data-villain="{}"></villain-form></div>')($scope); // eslint-disable-line
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.html()).toContain('save_btn');
  });

  it('should transclude from parent scope', function() {
    $httpBackend.expectGET('/templates/villains/directives/villain_form.html')
      .respond(200, vilFormTemplate);
    $scope.buttonText = 'test button text';

    var directive = $compile('<div data-ng-controller="VillainController as vilctrl"><villain-form data-button-text="test"></villain-form></div>')($scope); // eslint-disable-line
    $httpBackend.flush();
    // expect(directive.html().indexOf('test button text')).not.toBe(-1);
    // expect(directive.html().indexOf('test description')).not.toBe(-1);
  });
});
