
describe('angular app', function() {
  it('should have 2 way data bind', () => {
    browser.get('http://localhost:5000');

    element(by.model('stuff')).sendKeys('-test');
    element(by.binding('stuff')).getText().then(function(text) {
      expect(text).toEqual('Stuff Here!!-test');
    });

    element(by.model('more_stuff')).sendKeys('-test2');
    element(by.binding('more_stuff')).getText().then(function(text) {
      expect(text).toEqual('More Stuff Here!!-test2');
    });

    element(by.model('other_stuff')).sendKeys('-test3');
    element(by.binding('other_stuff')).getText().then(function(text) {
      expect(text).toEqual('Other Stuff Here!!-test3');
    });

    element(by.model('even_more_stuff')).sendKeys('-test4');
    element(by.binding('even_more_stuff')).getText().then(function(text) {
      expect(text).toEqual('Even More Here!!-test4');
    });
  });
});
