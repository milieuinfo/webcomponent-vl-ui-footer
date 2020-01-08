
const { assert, driver } = require('vl-ui-core').Test;
const VlFooterPage = require('./pages/vl-footer.page');

describe('vl-footer', async () => {
    const vlFooterPage = new VlFooterPage(driver);

    before(() => {
        return vlFooterPage.load();
    });
});
