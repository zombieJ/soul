import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.less';

class Main extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
        {children}
      </div>
    );
  }
}

export default Main;