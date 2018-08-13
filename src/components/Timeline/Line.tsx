import React from 'react';
import Frame from './Frame';

const styles = require('./Line.less');

export interface LineProps {
  totalFrame: number;
}

class Line extends React.Component<LineProps, any> {
  state = {
    selected: -1,
  };

  onFrameSelect = ({ props: { index } }: Frame) => {
    this.setState({ selected: index });
  };

  render() {
    const { selected } = this.state;
    const { totalFrame } = this.props;

    const minCount = Math.min(100, totalFrame);
    const frameList: Array<any> = new Array(minCount).fill(null);

    return (
      <div className={styles.line}>
        {frameList.map((_, index) => (
          <Frame
            key={index}
            index={index}
            onSelect={this.onFrameSelect}
            selected={selected === index}
          />
        ))}
      </div>
    );
  }
}

export default Line;