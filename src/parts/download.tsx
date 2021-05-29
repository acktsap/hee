import * as React from 'react';

import { Back, Description, Button } from '../components';
import styles from './styles.module.scss';

type DownloadProps = {
  message: string;
  onBackClick: () => void;
  onDownloadClick: () => void;
};

function Download({ message, onBackClick, onDownloadClick } : DownloadProps) {
  return (
    <div className={styles.main}>
      <Back descrption="Back" onClick={onBackClick} />
      <Description message={message} />
      <Button name="Download" onClick={onDownloadClick} />
    </div>
  );
}

Download.defaultProps = {
  isDetected: false
};

export default Download;
