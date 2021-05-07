import * as React from 'react';

import Header from './header';
import Detection from './detection';
import ExtractButton from './extract-button';
import styles from './styles.module.scss';

type MainProps = {
  message: string;
  isDetected: boolean;
  onExtract: () => void;
};

function Main({ message, isDetected, onExtract } : MainProps) {
  return (
    <div className={styles.main}>
      <Header name="Playlist extractor" />
      <Detection message={message} isDetected={isDetected} />
      <ExtractButton name="Extract" onClick={onExtract} isDisabled={!isDetected} />
    </div>
  );
}

Main.defaultProps = {
  isDetected: false
};

export default Main;
