import * as React from 'react';
import { connect } from 'dva';
import Timeline from '../../components/Timeline';
import Screen from '../../components/Screen';
import Props from '../../components/Props';

import { Models } from '../../models/$types';
import { MovieState, FrameType } from '../../models/movie';

import styles from './index.less';

export interface EditProps {
  movie: MovieState,
  dispatch: (action: any) => void;
}

class Edit extends React.Component<EditProps, any> {
  onValueChange = (name: string, value: any) => {
    this.props.dispatch({
      type: 'movie/changeShapeValue',
      name,
      value,
    });
  };

  newTimeline = () => {
    this.props.dispatch({
      type: 'movie/newTimeline',
    });
  };

  markFrame = (frameType: FrameType, selectedTimeline: number, selectedFrame: number) => {
    this.props.dispatch({
      type: 'movie/markFrame',
      frameType,
      selectedTimeline,
      selectedFrame,
    });
  };

  selectFrame = (timeline: number, frame: number) => {
    this.props.dispatch({
      type: 'movie/selectFrame',
      timeline,
      frame,
    });
  };

  changeTotalFrame = (totalFrame: number) => {
    const { dispatch, movie: { selectedScene } } = this.props;
    this.props.dispatch({
      type: 'movie/changeTotalFrame',
      selectedScene,
      totalFrame,
    });
  }

  render() {
    const { movie } = this.props;
    const { selectedTimeline, selectedFrame, selectedScene, sceneList } = movie;
    const { timelineList, totalFrame } = sceneList[selectedScene];

    const timeline = timelineList[selectedTimeline];
    const frameInfo = timeline.frameList.find(frame => frame.index === selectedFrame);

    return (
      <div className={styles.view}>
        <Timeline
          className={styles.timeline}
          timelineList={timelineList}
          selectedTimeline={selectedTimeline}
          selectedFrame={selectedFrame}
          totalFrame={totalFrame}

          newTimeline={this.newTimeline}
          selectFrame={this.selectFrame}
          changeTotalFrame={this.changeTotalFrame}
          markFrame={this.markFrame}
        />
        <div className={styles.row}>
          <Screen
            className={styles.screen}
            timelineList={timelineList}
            frame={selectedFrame}
          />

          <Props
            className={styles.props}
            frameInfo={frameInfo}
            onValueChange={this.onValueChange}
          />
        </div>
      </div>
    );
  }
}

const mapState = (store: Models) => {
  (window as any).store = store;
  return {
    movie: store.movie,
  };
};

export default connect(mapState)(Edit);
