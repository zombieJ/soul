import produce from 'immer';

export interface FrameInfo {
  start: number,
  end: number,
}

export interface Timeline {
  frameList: Array<FrameInfo>,
}

export interface Scene {
  timelineList: Array<Timeline>;
}

export interface MovieState {
  sceneList: Array<Scene>;
  selectedTimeline: number;
  selectedFrame: number;
  selectedScene: number;
}

export type MovieModel = {
  state: MovieState;
  [propName: string]: any;
};

const model: MovieModel = {
  state: {
    sceneList: [{
      timelineList: [{
        frameList: [],
      }],
    }],

    selectedTimeline: 0,
    selectedFrame: 0,
    selectedScene: 0,
  },

  effects: {},
  reducers: {
    selectFrame: (state: MovieState, { timeline, frame }: { timeline: number, frame: number }) => ({
      ...state,
      selectedTimeline: timeline,
      selectedFrame: frame,
    }),

    newTimeline: (oriState: MovieState) => (
      produce(oriState, (draftState: MovieState) => {
        draftState.sceneList[draftState.selectedScene].timelineList.push({
          frameList: [],
        });
      })
    ),
  },
};

export default model;