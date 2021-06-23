
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlFooterPage = require('./pages/vl-footer.page');

describe('vl-footer', async () => {
  let vlFooterPage;

  beforeEach(() => {
    vlFooterPage = new VlFooterPage(getDriver());
    return vlFooterPage.load();
  });
});
