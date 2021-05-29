import * as React from 'react';

import { Main, Download } from '../parts';
import { Song, ProviderType } from '../extractors';
import styles from './styles.module.scss';

interface PopupProps {}

interface PopupState {
  providerType: ProviderType;
  songs: Song[];
  extracted: boolean;
}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);

    this.state = {
      providerType: ProviderType.INVALID,
      songs: [],
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

  async detectProvider() {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});

    const tab = tabs[0];
    if (tab.id != undefined && tab.url != undefined) {
      const request = {
        command: "detect",
        url: tab.url,
      };
      const providerType = await browser.tabs.sendMessage<any, ProviderType>(tab.id, request);

      if (providerType !== undefined) {
        this.setState({
          providerType: providerType,
        });
      }
    }
  }

  async onExtractClicked() {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});

    const tab = tabs[0];
    if (tab.id != undefined && tab.url != undefined) {
      const request = {
        command: "extract",
        type: this.state.providerType,
        url: tab.url,
      };
      const songs = await browser.tabs.sendMessage<any, Song[]>(tab.id, request);

      if (songs !== undefined) {
        this.setState({
          extracted: true,
          songs: songs,
        });
      }
    }
  }

  onBackClicked() {
    this.setState({
      extracted: false,
      songs: [],
    });
  }

  onDownloadClicked() {
    // TODO
    console.log("download json");
  }
}

export default Popup;