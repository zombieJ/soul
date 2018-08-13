import React from 'react';
import classNames from 'classnames';
const styles = require('./Frame.less');

export interface FrameProps {
  onSelect: (frame: Frame) => void;
  selected: boolean;
  index: number;
}

class Frame extends React.Component<FrameProps, any> {
  onSelect = () => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(this);
    }
  };

  render() {
    const { selected } = this.props;

    return (
      <span
        className={classNames(
          styles.frame,
          selected && styles.active,
        )}
        onMouseDown={this.onSelect}
      >
      </span>
    );
  }
}

export default Frame;