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
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
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
  totalFrame: number;
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
      totalFrame: 25,
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

    markFrame: (oriState: MovieState, { frameType, selectedTimeline, selectedFrame }: { frameType: FrameType, selectedTimeline: number, selectedFrame: number }) => (
      produce(oriState, (draftState: MovieState) => {
        const { selectedScene } = draftState;
        const scene = draftState.sceneList[selectedScene];
        const timeline = scene.timelineList[selectedTimeline];
        const frameInfo: FrameInfo = {
          index: selectedFrame,
          type: frameType,
          shapeInfo: {
            x: 0,
            y: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          },
        };

        const matchFrame: FrameInfo = timeline.frameList.find(frame => frame.index === frameInfo.index);
        timeline.frameList = timeline.frameList.filter(frame => frame.index !== frameInfo.index);
        if (frameType === FrameType.key && (!matchFrame || matchFrame.type !== frameInfo.type)) {
          timeline.frameList.push(frameInfo);
          timeline.frameList.sort((a, b) => a.index - b.index);

          const currentIndex = timeline.frameList.findIndex(frame => frame === frameInfo);
          const prevFrame = timeline.frameList[currentIndex - 1];
          if (prevFrame) {
            frameInfo.shapeInfo = {
              ...prevFrame.shapeInfo,
            };
          }
        }
      })
    ),

    changeTotalFrame: (oriState: MovieState, { totalFrame, selectedScene }: { totalFrame: number, selectedScene: number }) => (
      produce(oriState, (draftState: MovieState) => {
        draftState.sceneList[selectedScene].totalFrame = totalFrame;
      })
    ),

    changeShapeValue: <K extends keyof ShapeBasicInfo>(oriState: MovieState, { name, value }: { name: K, value: ShapeBasicInfo[K] }) => (
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