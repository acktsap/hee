import * as React from 'react';

import { Header, Description, Button } from '../components';
import styles from './styles.module.scss';

type MainProps = {
  message: string;
  isDetected: boolean;
  onExtract: () => void;
};

function Main({ message, isDetected, onExtract } : MainProps) {
  return (
    <div className={styles.main}>
      <Header name="Hee" />
      <Description message={message} isDisabled={!isDetected} />
      <Button name="Extract" onClick={onExtract} isDisabled={!isDetected} />
    </div>
  );
}

Main.defaultProps = {
  isDetected: false
};

export default Main;
