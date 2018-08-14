import produce from 'immer';
import Frame from '../components/Timeline/Frame';

export enum FrameType {
  key = 'key',
  delete = 'delete',
}

export interface ShapeBasic {
  type: string;
}

export interface ShapeBasicInfo {
  x?: number;
  y?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
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
  shapeInfo: ShapeBasicInfo;
}

export interface Timeline {
  frameList: Array<FrameInfo>,
  shape: Shape;
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
        shape: {
          type: 'rect',
          width: 100,
          height: 100,
        },
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
          shape: {
            type: 'rect',
            width: 100,
            height: 100,
          },
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
          shapeInfo: {
            x: 0,
            y: 0,
          },
        };

        timeline.frameList = timeline.frameList.filter(frame => frame.index !== frameInfo.index);
        if (type === FrameType.key) {
          timeline.frameList.push(frameInfo);
          timeline.frameList.sort((a, b) => a.index - b.index);
        }
      })
    ),

    changeShapeValue: (oriState: MovieState, { name, value }: { name: string, value: any }) => (
      produce(oriState, (draftState: MovieState) => {
        const { selectedScene, selectedTimeline, selectedFrame } = draftState;
        const frameInfo: FrameInfo = draftState
          .sceneList[selectedScene]
          .timelineList[selectedTimeline]
          .frameList.find(frame => frame.index === selectedFrame);
        
          frameInfo.shapeInfo[name] = value;
      })
    ),
  },
};

export default model;