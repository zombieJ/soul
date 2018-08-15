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
  displayFrameCount: number;
  startFrame: number;

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
      totalFrame, selectedFrame, selected,
      displayFrameCount, frameWidth, startFrame,
      timeline, titleWidth, index: timelineIndex,
    } = this.props;

    const { frameList, shape } = timeline;

    const placeholderFrameList: Array<any> = new Array(displayFrameCount).fill(null);

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
            const frameIndex = startFrame + index;
            const frameInfo: FrameInfo = frameList.find(frame => frame.index === frameIndex);

            if (frameIndex >= totalFrame) {
              return null;
            }

            return (
              <Frame
                key={frameIndex}
                index={frameIndex}
                frame={frameInfo}
                width={frameWidth}
                onSelect={this.onFrameSelect}
                selected={selected && selectedFrame === frameIndex}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Line;