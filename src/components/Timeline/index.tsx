import React from 'react';
import classNames from 'classnames';
import { InputNumber, Button, Icon } from 'antd';

import WinEvent from '../../components/WinEvent';
import Line from './Line';

import { Timeline as TL, FrameType } from '../../models/movie';

import styles from './index.less';

const FRAME_WIDTH = 12;

export interface TimelineProps {
  timelineList: Array<TL>;
  selectedTimeline: number;
  selectedFrame: number;
  timelineTitleWidth?: number;
  className?: string;
  totalFrame: number;

  newTimeline: () => void;
  selectFrame: (timeline: number, frame: number) => void;
  changeTotalFrame: (totalFrame: number) => void;
  markFrame: (frameType: FrameType, selectedTimeline: number, selectedFrame: number) => void;
}

export interface TimelineState {
  frameListWidth: number,
  play: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  static defaultProps: Partial<TimelineProps> = {
    timelineTitleWidth: 200,
  };

  timer?: NodeJS.Timer = null;
  divRef = React.createRef();

  state = {
    frameListWidth: 0,
    play: false,
  };

  componentDidMount() {
    this.onResize();
  }

  componentWillUnmount() {
    this.removeTimer();
  }

  onKeyDown = ({ which }: KeyboardEvent) => {
    const { markFrame, selectedTimeline, selectedFrame } = this.props;
    if (which === 192 && markFrame) { // key: `
      markFrame(FrameType.key, selectedTimeline, selectedFrame);
    }
  };

  onResize = () => {
    const { timelineTitleWidth } = this.props;
    const { clientWidth } = this.divRef.current as HTMLElement;
    const frameListWidth = clientWidth - timelineTitleWidth;
    
    this.setState({ frameListWidth });
  };

  onTriggerAnimation = () => {
    const { play } = this.state;
    if (!play) {
      this.startTimer();
    } else {
      this.removeTimer(true);
    }
  };

  onTotalFrameChange = (totalFrame: number) => {
    const { changeTotalFrame } = this.props;
    if (changeTotalFrame) {
      changeTotalFrame(totalFrame);
    }
  };

  selectFrame = (timeline: number, frame: number) => {
    const { selectFrame } = this.props;
    if (selectFrame) {
      selectFrame(timeline, frame);
    }
  };

  // Timer
  startTimer = () => {
    this.setState({
      play: true,
    });

    this.removeTimer();
    this.timer = setInterval(() => {
      const { selectedTimeline, selectedFrame, selectFrame, totalFrame } = this.props;

      if (selectFrame) {
        selectFrame(selectedTimeline, (selectedFrame + 1) % totalFrame);
      }
    }, 1000 / 30); // 30 frames per second
  };

  removeTimer = (changeState?: boolean) => {
    if (changeState) {
      this.setState({
        play: false,
      });
    }

    clearInterval(this.timer);
    this.timer = null;
  };

  render() {
    const { play, frameListWidth } = this.state;
    const {
      className, totalFrame,
      timelineTitleWidth, timelineList,
      selectedTimeline, selectedFrame,
      newTimeline,
    } = this.props;

    return (
      <div className={classNames(styles.timeline, className)}>
        <WinEvent onKeyDown={this.onKeyDown} onResize={this.onResize} />

        <div>
          <label>
            Total Frame:
            <InputNumber value={totalFrame} onChange={this.onTotalFrameChange} />
          </label>
        </div>

        <div ref={this.divRef as any}>
          {timelineList.map((timeline, index) => (
            <Line
              key={index}
              timeline={timeline}
              index={index}
              totalFrame={totalFrame}
              selected={selectedTimeline === index}
              selectedFrame={selectedFrame}

              titleWidth={timelineTitleWidth}
              frameWidth={FRAME_WIDTH}
              frameListWidth={frameListWidth}

              selectFrame={this.selectFrame}
            />
          ))}
        </div>

        <div>
          <div className={styles.controller}>
            <Button onClick={this.onTriggerAnimation}>
              <Icon type={play ? 'pause' : 'caret-right'} />
            </Button>
          </div>

          <Button onClick={newTimeline}>
            + new line
          </Button>
        </div>
      </div>
    );
  }
}

export default Timeline;