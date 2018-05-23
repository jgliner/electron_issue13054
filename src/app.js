import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Index from './components/Index.js';

const render = () => {
  console.log('\n(react --entry--) APP.JS\n', ['a', 'b', 'c', {arbitraryProperty: {innerArbitraryProperty: 'here\'s a string'}}])
  ReactDOM.render((<Index />),
  document.getElementById('root'));
};

render();
