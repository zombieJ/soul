import React from 'react';
import classNames from 'classnames';

import { FrameInfo } from '../../models/movie';

import styles from './Frame.less';

export interface FrameProps {
  onSelect: (frame: Frame) => void;
  selected: boolean;
  index: number;
  frame: FrameInfo;
  width: number;
}

class Frame extends React.Component<FrameProps, any> {
  onSelect = () => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(this);
    }
  };

  render() {
    const { selected, frame, width } = this.props;

    return (
      <span
        className={classNames(
          styles.frame,
          selected && styles.active,
          frame && styles[frame.type],
        )}
        style={{ width }}
        onMouseDown={this.onSelect}
      >
      </span>
    );
  }
}

export default Frame;