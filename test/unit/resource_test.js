
const angular = require('angular');

describe('resource service', function() {
  var $httpBackend;
  var Resource;
  var baseUrl = 'http://localhost:3000/api/heroes';

  beforeEach(angular.mock.module('heroApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  it('should return a function', angular.mock.inject(function(Resource) {
    expect(typeof Resource).toBe('function');
    var testResource = new Resource;
    expect(typeof testResource.getAll).toBe('function');
    expect(typeof testResource.create).toBe('function');
    expect(typeof testResource.update).toBe('function');
    expect(typeof testResource.remove).toBe('function');
  }))

  it('should have post functionality', angular.mock.inject(function(Resource, $httpBackend) {
    $httpBackend.expectPOST('localhost:3000/api/heroes', { name: 'test hero' }).respond(200, { name: 'another test' });
    var testArr = [];
    var errorsArr =[];
    var testResource = new Resource(testArr, errorsArr, 'localhost:3000/api/heroes')
    testResource.create({ name: 'test hero' });
    $httpBackend.flush();

    expect(testArr.length).toBe(1);
    expect(errorsArr.length).toBe(0);
    expect(testArr[0].name).toBe('another test');
  }));

  it('should have update functionality', angular.mock.inject(function(Resource, $q) {
    $httpBackend.expectPUT('http://localhost:3000/api/heroes/1', testHero).respond(200);
    var testHero = { name: 'not test', _id: 1 };
    var testArr = [testHero];
    var errorsArr = [];
    var testResource = new Resource(testArr, errorsArr, 'http://localhost:3000/api/heroes');
    var result = testResource.update(testHero);
    $httpBackend.flush();

    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should have get functionality', angular.mock.inject( function(Resource) {
    $httpBackend.expectGET('http://localhost:3000/api/heroes').respond(200);

  }));
});
