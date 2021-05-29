import * as React from 'react';

import styles from './styles.module.scss';

type HeaderProps = {
  name: string;
};

function Header({ name } : HeaderProps) {
  return (
    <div className={styles.header}>
      {name}
    </div>
  );
}

export default Header;
