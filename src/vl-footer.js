import {vlElement, define, awaitScript} from '/node_modules/vl-ui-core/dist/vl-core.js';

awaitScript('vl-footer', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js').then(() => {
  define('vl-footer', VlFooter);
}).catch(() => {
  define('vl-footer', VlFooter);
});

/**
 * VlFooter
 * @class
 * @classdesc De Vlaanderen footer.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-identifier - De header identifier die gebruikt wordt om bij AIV de footer op te halen.
 * @property {string} data-vl-development - Attribuut geeft aan dat de AIV ontwikkel servers gebruikt moeten worden.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-footer/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-footer/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-footer.html|Demo}
 *
 */
export class VlFooter extends vlElement(HTMLElement) {
  static get EVENTS() {
    return {
      ready: 'ready',
    };
  }

  constructor() {
    super();
    this.__addFooterElement();
  }

  static get id() {
    return 'footer';
  }

  static get footer() {
    return document.getElementById(VlFooter.id);
  }

  get _widgetURL() {
    const prefix = this._isDevelopment ? 'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget' : 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget';
    return `${prefix}/${this._widgetUUID}/embed`;
  }

  get _widgetUUID() {
    return this.dataset.vlIdentifier;
  }

  get _isDevelopment() {
    return this.hasAttribute('data-vl-development');
  }

  getFooterTemplate() {
    return this._template(`
      <div id="${VlFooter.id}"></div>
    `);
  }

  __addFooterElement() {
    fetch(this._widgetURL)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw Error(`Response geeft aan dat er een fout is: ${response.statusText}`);
          }
        }).then((code) => this.__executeCode(code)).catch((error) => console.error(error));
  }

  __executeCode(code) {
    if (!VlFooter.footer) {
      document.body.appendChild(this.getFooterTemplate());
    }
    this.__observeFooterElementIsAdded();
    Function(code.replace(/document\.write\((.*?)\);/, 'document.getElementById("' + VlFooter.id + '").innerHTML = $1;'))();
  }

  __observeFooterElementIsAdded() {
    const target = document.querySelector('#' + VlFooter.id);
    const footerObserver = new MutationObserver((mutations, observer) => this.__footerObserverCallback(mutations, observer));
    footerObserver.observe(target, {childList: true});
  }

  __footerObserverCallback(mutations, observer) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if ( this.__footerElementIsToegevoegd(mutation.addedNodes)) {
          this.dispatchEvent(new CustomEvent(VlFooter.EVENTS.ready));
          observer.disconnect();
        }
      }
    });
  }

  __footerElementIsToegevoegd(toegevoegdeNodes) {
    return this.__eenVanDeNodesBevatElement(toegevoegdeNodes, 'FOOTER');
  }

  __eenVanDeNodesBevatElement(nodeList, element) {
    if (nodeList) {
      for (let i = 0; i< nodeList.length; i++) {
        if (this.__nodeIsElementOfHeeftElementAlsChild(nodeList.item(i), element)) {
          return true;
        }
      }
    }
    return false;
  }

  __nodeIsElementOfHeeftElementAlsChild(node, element) {
    return node.tagName === element || this.__eenVanDeNodesBevatElement(node.childNodes, element);
  }
}

define('vl-footer', VlFooter);
