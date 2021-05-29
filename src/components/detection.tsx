import * as React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type DescrptionProps = {
  message: string;
  isDisabled: boolean;
};

function Description({ message, isDisabled } : DescrptionProps) {
  const messageClassName = isDisabled ? styles.disabled : "";

  return (
    <div className={cx(styles.descrption, messageClassName)}>
      {message}
    </div>
  );
}

export default Description;
