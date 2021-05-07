import * as React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type DetectionProps = {
  message: string;
  isDetected: boolean;
};

function Detection({ message, isDetected } : DetectionProps) {
  const messageClassName = isDetected ? styles.detected : styles.undetected;

  return (
    <div className={cx(styles.detection, messageClassName)}>
      {message}
    </div>
  );
}

export default Detection;
