
describe('hero app', function() {
  it('should have 2 way data bind', () => {
    browser.get('http://localhost:5000');
    element(by.model('heroctrl.newHero.name')).sendKeys('test');
    element(by.buttonText('Make Hero!')).click();
    element.all(by.css('li.hero')).last().getText().then(function(text) {
      expect(text).toContain('test');
    });
  });
});
