import React from 'react';
import classNames from 'classnames';
import Frame from './Frame';

import { Timeline, FrameInfo } from '../../models/movie';

const styles = require('./Line.less');

export interface LineProps {
  totalFrame: number;
  timeline: Timeline;
  index: number;
  selected: boolean;
  selectedFrame: number;
  titleWidth: number;
  frameWidth: number;

  selectFrame: (timeline: number, frame: number) => void;
}

class Line extends React.Component<LineProps, any> {
  onFrameSelect = ({ props: { index } }: Frame) => {
    const { index: timelineIndex, selectFrame } = this.props;
    if (selectFrame) {
      selectFrame(timelineIndex, index);
    }
  };

  render() {
    const {
      totalFrame, selectedFrame, selected, frameWidth,
      timeline, titleWidth, index: timelineIndex,
    } = this.props;

    const { frameList, shape } = timeline;

    const minCount = Math.min(100, totalFrame) || 0;
    const placeholderFrameList: Array<any> = new Array(minCount).fill(null);

    return (
      <div
        className={classNames(
          styles.line,
          selected && styles.active,
        )}
      >
        <h5 style={{ width: titleWidth }}>
          {/* {timelineIndex} */}
          {shape.type}
        </h5>
        <div className={styles.frames}>
          {placeholderFrameList.map((_, index) => {
            const frameInfo: FrameInfo = frameList.find(frame => frame.index === index);

            return (
              <Frame
                key={index}
                index={index}
                frame={frameInfo}
                width={frameWidth}
                onSelect={this.onFrameSelect}
                selected={selected && selectedFrame === index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Line;