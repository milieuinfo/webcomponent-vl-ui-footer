import {vlElement, define, awaitScript} from 'vl-ui-core';

awaitScript('vl-footer-client', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js').then(() => {
  awaitScript('vl-footer-polyfill', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js').finally(() => {
    define('vl-footer', VlFooter);
  });
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

  static get _observedAttributes() {
    return ['identifier'];
  }

  static get id() {
    return 'footer';
  }

  static get footer() {
    return document.getElementById(VlFooter.id);
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  get _widgetURL() {
    const prefix = this._isDevelopment ? 'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget' : 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget';
    return `${prefix}/${this._widgetUUID}`;
  }

  get _widgetUUID() {
    return this.dataset.vlIdentifier;
  }

  get _isDevelopment() {
    return this.hasAttribute('data-vl-development');
  }

  getFooterTemplate() {
    return `<div id="${VlFooter.id}"></div>`;
  }

  _identifierChangedCallback(oldValue, newValue) {
    this.__addFooterElement();
  }

  __addFooterElement() {
    if (!VlFooter.footer) {
      document.body.insertAdjacentHTML('beforeend', this.getFooterTemplate());
    }

    this._observer = this.__observeFooterElementIsAdded();
    vl.widget.client.bootstrap(this._widgetURL).then((widget) => {
      widget.setMountElement(VlFooter.footer);
      widget.mount().catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  __observeFooterElementIsAdded() {
    const isFooter = (node) => node.tagName === 'FOOTER' || (node.childNodes && [...node.childNodes].some(isFooter));
    const observer = new MutationObserver((mutations, observer) => {
      const nodes = mutations.flatMap((mutation) => [...mutation.addedNodes]);
      if (nodes.some(isFooter)) {
        this.dispatchEvent(new CustomEvent(VlFooter.EVENTS.ready));
        observer.disconnect();
      }
    });
    observer.observe(VlFooter.footer, {childList: true});
    return observer;
  }
}

