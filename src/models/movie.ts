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

export interface State {
  sceneList: Array<Scene>;
}

export type MovieModel = {
  state: State;
  [propName: string]: any;
};

const model: MovieModel = {
  namespace: 'movie',
  state: {
    sceneList: [{
      timelineList: [{
        frameList: [],
      }],
    }],
  },

  effects: {},
  reducers: {},
};

export default model;