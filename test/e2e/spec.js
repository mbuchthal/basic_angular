
describe('hero app', function() {
  it('should create hero data', () => {
    browser.get('http://localhost:5000');
    element(by.model('heroctrl.newHero.name')).sendKeys('test');
    element(by.buttonText('Make Hero!')).click();
    element(by.css('li.hero')).getText().then(function(text) {
      expect(text).toContain('test');
    });
  });

  it('should update hero data', () => {
    browser.get('http://localhost:5000');
    var liItem = element(by.repeater("hero in heroctrl.heroes").row(0));

    liItem.element(by.buttonText('Edit Hero')).click();
    liItem.element(by.model('hero.name')).clear().sendKeys('test 2');
    liItem.element(by.buttonText('Update')).click();
    element(by.css('li.hero span:first-child')).getText().then(function(val) {
      expect(val).toEqual('test 2');
    });
  });

  it('should cancel on hero edit form', () => {
    browser.get('http://localhost:5000');
    var liItem = element(by.repeater("hero in heroctrl.heroes").row(0));
    liItem.element(by.buttonText('Edit Hero')).click();
    liItem.element(by.buttonText('Cancel')).click();
    element(by.css('li.hero')).getText().then(function(text) {
      expect(text).toContain('test 2');
    });
  });

  it('should delete hero data', () => {
    browser.get('http://localhost:5000');
    element(by.buttonText('Delete')).click();
    var myElement = element(by.css('.hero'));
    expect(myElement.isPresent()).toBeFalsy();
  });

    it('should create villain data', () => {
    browser.get('http://localhost:5000');
    element(by.model('vilctrl.newVillain.name')).sendKeys('test');
    element(by.buttonText('Make Villain!')).click();
    element(by.css('li.villain')).getText().then(function(text) {
      expect(text).toContain('test');
    });
  });

  it('should update villain data', () => {
    browser.get('http://localhost:5000');
    var liItem = element(by.repeater("villain in vilctrl.villains").row(0));

    liItem.element(by.buttonText('Edit Villain')).click();
    liItem.element(by.model('villain.name')).clear().sendKeys('test 2');
    liItem.element(by.buttonText('Update')).click();
    element(by.css('li.villain span:first-child')).getText().then(function(val) {
      expect(val).toEqual('test 2');
    });
  });

  it('should cancel on edit villain form', () => {
    browser.get('http://localhost:5000');
    var liItem = element(by.repeater("villain in vilctrl.villains").row(0));
    liItem.element(by.buttonText('Edit Villain')).click();
    liItem.element(by.buttonText('Cancel')).click();
    element(by.css('li.villain')).getText().then(function(text) {
      expect(text).toContain('test 2');
    });
  });

  it('should delete villain data', () => {
    browser.get('http://localhost:5000');
    element(by.buttonText('Delete')).click();
    var myElement = element(by.css('.villain'));
    expect(myElement.isPresent()).toBeFalsy();
  });
});

