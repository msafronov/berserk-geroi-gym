import { render } from 'preact';
import { App } from './App';

import './ui/styles.css';

const container = document.querySelector('body');

if (container) {
  render(
    <App />,
    container,
  );
}
