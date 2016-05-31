var angular = require('angular');
require('angular-mocks');

describe('battle controller', function() {
  var $controller;

  beforeEach(angular.mock.module('heroApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var battlectrl = $controller('BattleController');
    expect(typeof battlectrl).toBe('object');
    expect(typeof battlectrl.battle).toBe('function');
  });

  describe('battle function', function() {
    var $httpBackend;
    var battlectrl;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      battlectrl = $controller('BattleController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a battle', function() {
      $httpBackend.expectGET('http://localhost:3000/api/battle').respond(200, 'test string');
      battlectrl.battle();
      $httpBackend.flush();
      expect(battlectrl.battles.length).not.toBe(0);
    });
  });
});
