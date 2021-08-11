import { html } from 'lit-html';
import '../vl-footer';
import '../style.css';

export default {
  title: 'Components/vl-ui-footer',
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
    development: true,
  },
  argTypes: {},
};

export const Default = () =>
  html` <vl-footer data-vl-identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" data-vl-development></vl-footer> `;
