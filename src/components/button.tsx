import * as React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type ButtonProps = {
  name: string;
  onClick: () => void;
  isDisabled: boolean;
};

function Button({ name, onClick, isDisabled } : ButtonProps) {
  const disabled = isDisabled ? styles.disabled : "";

  return (
    <div className={cx(styles.button, disabled)} onClick={onClick}>
      {name}
    </div>
  );
}

Button.defaultProps = {
  isDisabled: false
};

export default Button;
