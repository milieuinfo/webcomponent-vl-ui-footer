
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlFooterPage = require('./pages/vl-footer.page');

describe('vl-footer', async () => {
  let vlFooterPage;

  beforeEach(() => {
    vlFooterPage = new VlFooterPage(getDriver());
    return vlFooterPage.load();
  });

  const isDuringWorkingDays = () => {
    const today = new Date();
    const day = today.getDay();
    return day < 6;
  };

  const isDuringWorkingHours = () => {
    const today = new Date();
    const hours = today.getHours();
    return hours >= 8 && hours <= 18;
  };

  it('als gebruiker zie ik de globale footer van Vlaanderen', async () => {
    if (isDuringWorkingDays() && isDuringWorkingHours()) { // DEV servers of AIV uptime check
      const footer = await vlFooterPage.getFooter();
      await assert.eventually.isTrue(footer.isDisplayed());
    }
  });

  it('als gebruiker zie ik de globale footer van Vlaanderen tot dat deze verwijderd wordt', async () => {
    if (isDuringWorkingDays() && isDuringWorkingHours()) { // DEV servers of AIV uptime check
      const footer = await vlFooterPage.getFooter();
      await assert.eventually.isTrue(footer.isDisplayed());
      await footer.remove();
      let error = false;
      try {
        await assert.eventually.isFalse(footer.isDisplayed());
      } catch (e) {
        error = true;
      }
      assert.isTrue(error);
    }
  });
});
