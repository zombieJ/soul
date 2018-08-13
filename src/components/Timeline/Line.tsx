import React from 'react';
import classNames from 'classnames';
import Frame from './Frame';

const styles = require('./Line.less');

export interface LineProps {
  totalFrame: number;
  timeline: number;
  selected: boolean;
  selectedFrame: number;

  selectFrame: (timeline: number, frame: number) => void;
}

class Line extends React.Component<LineProps, any> {
  onFrameSelect = ({ props: { index } }: Frame) => {
    const { timeline, selectFrame } = this.props;
    if (selectFrame) {
      selectFrame(timeline, index);
    }
  };

  render() {
    const { totalFrame, selectedFrame, selected } = this.props;

    const minCount = Math.min(100, totalFrame);
    const frameList: Array<any> = new Array(minCount).fill(null);

    return (
      <div
        className={classNames(
          styles.line,
          selected && styles.active,
        )}
      >
        {frameList.map((_, index) => (
          <Frame
            key={index}
            index={index}
            onSelect={this.onFrameSelect}
            selected={selected && selectedFrame === index}
          />
        ))}
      </div>
    );
  }
}

export default Line;