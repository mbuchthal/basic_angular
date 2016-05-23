
const angular = require('angular');
const heroFormTemplate = require('../../app/templates/directives/hero_form.html');

describe('hero form directive', function() {
  beforeEach(angular.mock.module('heroApp'));
    var $httpBackend;
    var $compile;
    var $scope;
    var $rootScope;

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  it('should create a form directive with a controller binding', function() {
    $httpBackend.expectGET('templates/hero_form.html').respond(200, heroFormTemplate);

    $scope.name = 'test name';
    var link = $compile('')
    var directive = link($scope);
    $httpBackend.flush();
    $scope.$digest();
    var el = directive.find('')
    expect(el.text()).toEqual($scope.name);
    var input = directive.find('input');
    input.val('new test name');
    input.triggerHandler('input');
    expect($scope.name).toEqual('some test name');
  });
});
