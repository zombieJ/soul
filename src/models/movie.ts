import produce from 'immer';
import Frame from '../components/Timeline/Frame';

export enum FrameType {
  key = 'key',
  delete = 'delete',
}

export interface ShapeBasic {
  type: string;
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
}

export interface ShapeRect extends ShapeBasic {
  type: 'rect';
  width: number;
  height: number;
}

export type Shape = ShapeRect;

export interface FrameInfo {
  index: number;
  type: FrameType;
  shape: Shape;
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

    markFrame: (oriState: MovieState, { frameType: type }: { frameType: FrameType }) => (
      produce(oriState, (draftState: MovieState) => {
        const { selectedScene, selectedTimeline, selectedFrame } = draftState;
        const scene = draftState.sceneList[selectedScene];
        const timeline = scene.timelineList[selectedTimeline];
        const frameInfo: FrameInfo = {
          index: selectedFrame,
          type,
        };

        const index = timeline.frameList.findIndex((frame) => frame.index >= frameInfo.index);
        const targetFrame = timeline.frameList[index];

        if (type === FrameType.key) {
          // key type
          if (!targetFrame) {
            timeline.frameList.push(frameInfo);
          } else if (targetFrame.index === frameInfo.index) {
            timeline.frameList[index] = frameInfo;
          } else if (targetFrame) {
            timeline.frameList.splice(index - 1, 0, frameInfo);
          }
        } else if (type === FrameType.delete) {
          if (targetFrame) {
            timeline.frameList.splice(index, 1);
          }
        }
      })
    ),
  },
};

export default model;