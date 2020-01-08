const VlFooter = require('../components/vl-footer');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlFooterPage extends Page {
    async _getFooter(selector) {
        return new VlFooter(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-footer.html');
    }
}

module.exports = VlFooterPage;
