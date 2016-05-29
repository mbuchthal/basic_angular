const angular = require('angular');

describe('store service', function() {

  beforeEach(angular.mock.module('heroApp'));

  it('should return an object', angular.mock.inject(function(store) {
    expect(typeof store).toBe('object');
  }));

  it('should have an add functionality', angular.mock.inject(function(store) {
    expect(typeof store.addCount).toBe('function');
    expect(store.count).toBe(0);
    store.addCount();
    expect(store.count).toBe(1);
    expect(store.getCount()).toBe(1);
  }));
});
