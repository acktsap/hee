import * as React from 'react';

import { Main, Download } from '../parts';
import styles from './styles.module.scss';

interface PopupProps {}

interface PopupState {
  extracted: boolean;
}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);

    this.state = {
      extracted: false
    };
  }

  render() {
    const { extracted } = this.state;

    let popup;
    if (!extracted) {
        popup = <Main
          message="Vibe playlist is detected!"
          isDetected
          onExtract={() => this.onExtractClicked()}
        />;
    } else {
        popup = <Download
          message={"Successfully extracted!\nClick button to download."}
          onBackClick={() => this.onBackClicked()}
          onDownloadClick={() => this.onDownloadClicked()}
        />;
    }
    return (
      <div className={styles.popup}>
        {popup}
      </div>
    );
  }

  onExtractClicked() {
    this.setState({
      extracted: true
    });
    // TODO
  }

  onBackClicked() {
    this.setState({
      extracted: false
    });
    // TODO
  }

  onDownloadClicked() {
    console.log("download json");
    // TODO
  }
}

export default Popup;