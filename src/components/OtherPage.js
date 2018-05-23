import React from 'react';

import styles from './OtherPage.css'

class OtherPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('\n(react) OTHERPAGE.JS\n', ['a', 'b', 'c', {arbitraryProperty: {innerArbitraryProperty: 'here\'s a string'}}])
    return (
      <div className={`main ${styles['main-view']}`}>
        <div>
          <h2 id="sub-header">Thanks in advance!</h2>
        </div>
      </div>
    )
  }
}

export default OtherPage;
