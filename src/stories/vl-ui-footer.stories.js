import { html } from 'lit-html';
import '../vl-footer';
import '../style.css';

export default {
  title: 'Components/vl-ui-footer',
  args: {
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
  },
  argTypes: {},
};

export const Default = ({ identifier }) =>
  html`
    <span>De footer wordt onderaan de demo pagina getoond.</span>
    <vl-footer data-vl-identifier=${identifier} data-vl-development></vl-footer>
  `;
