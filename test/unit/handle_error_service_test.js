
const angular = require('angular');

describe('handle error service', function() {

  beforeEach(angular.mock.module('heroApp'));

  it('should return a function', angular.mock.inject(function(handleError) {
    expect(typeof handleError).toBe('function');
  }));

  it('should add an error to the error array', angular.mock.inject(function(handleError) {

    var testArr = [];
    handleError(testArr, 'test message')();

    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
