import * as React from 'react';
import { connect } from 'dva';
import Timeline from '../../components/Timeline';
import Screen from '../../components/Screen';
import WinEvent from '../../components/WinEvent';

import { Models } from '../../models/$types';
import { MovieState, FrameType } from '../../models/movie';

import styles from './index.less';

export interface EditProps {
  movie: MovieState,
  dispatch: (action: any) => void;
}

class Edit extends React.Component<EditProps, any> {
  onKeyDown = ({ which }: KeyboardEvent) => {
    if (which === 192) { // key: `
      this.props.dispatch({
        type: 'movie/markFrame',
        frameType: FrameType.key,
      });
    } else if (which === 8) { // key: delete
    this.props.dispatch({
      type: 'movie/markFrame',
      frameType: FrameType.delete,
    });
  }
    console.log('>>>', which);
  };

  newTimeline = () => {
    this.props.dispatch({
      type: 'movie/newTimeline',
    });
  };

  selectFrame = (timeline: number, frame: number) => {
    this.props.dispatch({
      type: 'movie/selectFrame',
      timeline,
      frame,
    });
  };

  render() {
    const { movie } = this.props;
    const { selectedTimeline, selectedFrame, selectedScene, sceneList } = movie;
    const { timelineList } = sceneList[selectedScene];

    return (
      <div className={styles.view}>
        <WinEvent onKeyDown={this.onKeyDown} />
        <Timeline
          className={styles.timeline}
          timelineList={timelineList}
          selectedTimeline={selectedTimeline}
          selectedFrame={selectedFrame}

          newTimeline={this.newTimeline}
          selectFrame={this.selectFrame}
        />
        <Screen
          className={styles.screen}
        />
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
