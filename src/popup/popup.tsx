import * as React from 'react';

import { Main } from './main';
import styles from './styles.module.scss';

class Popup extends React.Component {
  render() {
    return (
      <div className={styles.popup}>
        <Main
          message="Vibe playlist is detected!"
          isDetected
          onExtract={() => console.log("extract")}
        />
      </div>
    );
  }
}

export default Popup;