import React from 'react';

import OtherPage from './OtherPage.js';

import styles from './Index.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('\n(react) INDEX.JS\n', ['a', 'b', 'c', {arbitraryProperty: {innerArbitraryProperty: 'here\'s a string'}}])
    return (
      <div className={`main ${styles['main-view']}`}>
        <div className={`h1-container ${styles['h1-container']}`}>
          <h1 id="main-header">Nav to chrome://inspect</h1>
        </div>
        <OtherPage />
      </div>
    );
  }
}

export default Index
