import * as React from 'react';

import Header from './header';
import styles from './styles.module.scss';

class Popup extends React.Component {
  render() {
    return (
      <div className={styles.popup}>
        <Header name="Playlist extractor"/>
        popup
      </div>
    );
  }
}

export default Popup;