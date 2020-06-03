const {VlElement} = require('vl-ui-core').Test;
const {By, until} = require('selenium-webdriver');

class VlFooter extends VlElement {
  constructor(driver) {
    const identifier = 'footer';
    return (async () => {
      await driver.wait(until.elementLocated(By.css(identifier)));
      return super(driver, identifier);
    })();
  }
}

module.exports = VlFooter;
