const {VlElement} = require('vl-ui-core').Test;
const {By, until} = require('selenium-webdriver');

class VlFooter extends VlElement {
  constructor(driver) {
    const identifier = '#footer';
    return (async () => {
      await driver.wait(until.elementLocated(By.css(identifier)));
      const footer = driver.findElement(By.css(identifier));
      await driver.wait(until.elementIsVisible(footer));
      return super(driver, identifier);
    })();
  }

  async remove() {
    return this.driver.executeScript('return arguments[0].remove()', this);
  }
}

module.exports = VlFooter;
