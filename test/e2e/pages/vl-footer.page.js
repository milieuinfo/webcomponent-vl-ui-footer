const VlFooter = require('../components/vl-footer');
const {Page, Config} = require('vl-ui-core').Test;

class VlFooterPage extends Page {
  async getFooter() {
    return new VlFooter(this.driver);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-footer.html');
  }
}

module.exports = VlFooterPage;
