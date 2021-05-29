import * as React from 'react';

import styles from './styles.module.scss';

type BackProps = {
  descrption: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

function Back({ descrption, onClick } : BackProps) {
  return (
    <div className={styles.back} onClick={onClick}>
      {descrption}
    </div>
  );
}

Back.defaultProps = {
  onClick: () => void(0),
};

export default Back;
