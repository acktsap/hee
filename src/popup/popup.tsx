import * as React from 'react';

import { Main, Download } from '../parts';
import { ProviderType } from '../extractors';
import styles from './styles.module.scss';

interface PopupProps {}

interface PopupState {
  providerType: ProviderType;
  extracted: boolean;
}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);

    this.state = {
      providerType: ProviderType.VIBE,
      extracted: false,
    };
  }

  componentDidMount() {
    this.detectProvider();
  }

  render() {
    const { providerType, extracted } = this.state;

    let provider = "No provider";
    let detected = false;
    if (providerType != ProviderType.INVALID) {
      provider = providerType;
      detected = true;
    }

    let popup;
    if (!extracted) {
        popup = <Main
          message={`${provider} is detected!`}
          isDetected={detected}
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

  detectProvider() {
    // TODO
    this.setState({
      providerType: ProviderType.VIBE
    });
  }

  onExtractClicked() {
    // TODO
    this.setState({
      extracted: true
    });
  }

  onBackClicked() {
    // TODO
    this.setState({
      extracted: false
    });
  }

  onDownloadClicked() {
    // TODO
    console.log("download json");
  }
}

export default Popup;