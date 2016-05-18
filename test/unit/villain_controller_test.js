var angular = require('angular');
require('angular-mocks');

describe('villain controller', function() {
  var $controller;

  beforeEach(angular.mock.module('heroApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var vilctrl = $controller('VillainController');
    expect(typeof vilctrl).toBe('object');
    expect(typeof vilctrl.getVillains).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var vilctrl;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      vilctrl = $controller('VillainController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send GET request for villains', function() {
      $httpBackend.expectGET('http://localhost:3000/api/villains').respond(200, [{ name: 'test villain' }]);
      vilctrl.getVillains();
      $httpBackend.flush();
      expect(vilctrl.villains.length).toBe(1);
      expect(vilctrl.villains[0].name).toBe('test villain');
    });

    it('should send POST request for villains', function() {
      $httpBackend.expectPOST('http://localhost:3000/api/villains', { name: 'test villain' }).respond(200, { name: 'other villain' });
      expect(vilctrl.villains.length).toBe(0);
      vilctrl.newVillain = { name: 'test villain' };
      vilctrl.makeVillain();
      $httpBackend.flush();
      expect(vilctrl.villains[0].name).toBe('other villain');
      expect(vilctrl.newVillain).toBe(null);
    });

    it('should update villains on PUT', function() {
      $httpBackend.expectPUT('http://localhost:3000/api/villains/1', { name: 'update villain', editing: true, _id: 1 }).respond(200);
      vilctrl.villains = [{ name: 'test villain', editing: true, _id: 1 }];
      vilctrl.villains[0].name = 'update villain';
      vilctrl.editVillain(vilctrl.villains[0]);
      $httpBackend.flush();
      expect(vilctrl.villains[0].editing).toBe(false);
    });

    it('should DELETE villains', function() {
      $httpBackend.expectDELETE('http://localhost:3000/api/villains/1').respond(200);
      vilctrl.villains = [{ name: 'test villain', _id: 1 }];
      vilctrl.deleteVillain(vilctrl.villains[0]);
      $httpBackend.flush();
      expect(vilctrl.villains.length).toBe(0);
    });
  });
});
