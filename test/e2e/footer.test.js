
const { assert, driver } = require('vl-ui-core').Test;
const VlFooterPage = require('./pages/vl-footer.page');

describe('vl-footer', async () => {
    const vlFooterPage = new VlFooterPage(driver);

    before(() => {
        return vlFooterPage.load();
    });

    it('als gebruiker zie ik de globale footer van Vlaanderen', async () => {
        const footer = await vlFooterPage.getFooter();
        await assert.eventually.isTrue(footer.isDisplayed());
    });
});
