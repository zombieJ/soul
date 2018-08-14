import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

export interface ScreenProps {
  className?: string;
};

class Screen extends React.Component<ScreenProps, any> {
  render() {
    const { className } = this.props;

    return (
      <div className={classNames(className, styles.screen)}>
        test
      </div>
    );
  }
}

export default Screen;