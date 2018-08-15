import React from 'react';
import classNames from 'classnames';

import { Shape } from '../../components/Shape';
import Rect from '../../components/Shape/Rect';
import { Timeline, FrameInfo } from '../../models/movie';

import styles from './index.less';

export interface ScreenProps {
  className?: string;
  timelineList: Array<Timeline>;
  frame: number;
};

class Screen extends React.Component<ScreenProps, any> {
  getShape = (timeline: Timeline, frameIndex: number, key: number): React.ReactNode => {
    const { frameList } = timeline;
    let prevFrame: FrameInfo;
    let curFrame: FrameInfo;

    const len = frameList.length;
    for (let i = 0; i < len; i += 1) {
      const tmp = frameList[i];

      prevFrame = curFrame;
      curFrame = tmp;

      if (tmp.index >= frameIndex) break;
    }

    return this.getFrameShape(prevFrame, curFrame, timeline.shape, frameIndex, key);
  };

  getFrameShape = (prevFrame: FrameInfo, curFrame: FrameInfo, shape: Shape, frameIndex: number, key: number): React.ReactNode => {
    if (!prevFrame && !curFrame) return null;
    if (!prevFrame && curFrame.index > frameIndex) return null;

    const shapeProps = {
      key,
      shape,
      prevFrame,
      curFrame,
      frame: frameIndex,
    };

    if (curFrame.index < frameIndex) {
      shapeProps.prevFrame = curFrame;
    } else if (curFrame.index === frameIndex) {
      shapeProps.prevFrame = curFrame;
    } else if (!curFrame) {
      shapeProps.curFrame = prevFrame;
    }

    return (
      <Rect {...shapeProps} />
    );
  }

  render() {
    const { className, timelineList, frame } = this.props;

    return (
      <div className={classNames(className, styles.screen)}>
        {timelineList.map((timeline, index) => (
          this.getShape(timeline, frame, index)
        ))}
      </div>
    );
  }
}

export default Screen;