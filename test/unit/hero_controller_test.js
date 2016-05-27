var angular = require('angular');
require('angular-mocks');

describe('hero controller', function() {
  var $controller;
  var $scope;

  beforeEach(angular.mock.module('heroApp'));

  beforeEach(angular.mock.inject(function(_$controller_, $rootScope) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  it('should be a controller', function() {
    var heroctrl = $controller('HeroController', { $scope });
    expect(typeof heroctrl).toBe('object');
    expect(typeof heroctrl.getHeroes).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var heroctrl;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      heroctrl = $controller('HeroController', { $scope });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send GET request for heroes', function() {
      $httpBackend.expectGET('http://localhost:3000/api/heroes')
        .respond(200, [{ name: 'test hero' }]);
      heroctrl.getHeroes();
      $httpBackend.flush();
      expect(heroctrl.heroes.length).toBe(1);
      expect(heroctrl.heroes[0].name).toBe('test hero');
    });

    it('should send POST request for heroes', function() {
      $httpBackend.expectPOST('http://localhost:3000/api/heroes',
        { name: 'test hero' }).respond(200, { name: 'other hero' });
      expect(heroctrl.heroes.length).toBe(0);
      heroctrl.newHero = { name: 'test hero' };
      heroctrl.makeHero();
      $httpBackend.flush();
      expect(heroctrl.heroes[0].name).toBe('other hero');
      expect(heroctrl.newHero).toBe(null);
    });

    it('should update heroes on PUT', function() {
      $httpBackend.expectPUT('http://localhost:3000/api/heroes/1',
        { name: 'update hero', editing: true, _id: 1 }).respond(200);
      heroctrl.heroes = [{ name: 'test hero', editing: true, _id: 1 }];
      heroctrl.heroes[0].name = 'update hero';
      heroctrl.editHero(heroctrl.heroes[0]);
      $httpBackend.flush();
      expect(heroctrl.heroes[0].editing).toBe(false);
    });

    it('should DELETE heroes', function() {
      $httpBackend.expectDELETE('http://localhost:3000/api/heroes/1')
        .respond(200);
      var testHero = { name: 'test hero', _id: 1 };
      heroctrl.heroes = [testHero];
      heroctrl.deleteHero(testHero);
      $httpBackend.flush();
      // expect(heroctrl.heroes.length).toBe(0);
    });
  });
});
