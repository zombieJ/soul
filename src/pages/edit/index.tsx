import * as React from 'react';
import { connect } from 'dva';
import Timeline from '../../components/Timeline';

import { Models } from '../../models/$types';
import { MovieState } from '../../models/movie';

export interface EditProps {
  movie: MovieState,
  dispatch: (action: any) => void;
}

class Edit extends React.Component<EditProps, any> {
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
      <div>
        <Timeline
          timelineList={timelineList}
          selectedTimeline={selectedTimeline}
          selectedFrame={selectedFrame}

          newTimeline={this.newTimeline}
          selectFrame={this.selectFrame}
        />
      </div>
    );
  }
}

const mapState = ({ movie }: Models) => ({
  movie,
});

export default connect(mapState)(Edit);
