import * as React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type ExtractButtonProps = {
  name: string;
  onClick: () => void;
  isDisabled: boolean;
};

function ExtractButton({ name, onClick, isDisabled } : ExtractButtonProps) {
  const disabled = isDisabled ? styles.disabled : "";

  return (
    <div className={cx(styles.extractButton, disabled)} onClick={onClick}>
      {name}
    </div>
  );
}

ExtractButton.defaultProps = {
  isDisabled: false
};

export default ExtractButton;
