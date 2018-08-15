import React from 'react';

import { FrameInfo } from '../../models/movie';
import { framePTG, transNumber } from '../../utils/transition';

import { ShapeBasicInfo, ShapeBasic } from './index';

export interface ShapeRect extends ShapeBasic {
  type: 'rect';
  width: number;
  height: number;
}

export interface RectProps {
  shape: ShapeRect;
  prevFrame: FrameInfo;
  curFrame: FrameInfo;
  frame: number;
}

const Rect = ({ prevFrame, curFrame, shape, frame }: RectProps) => {
  const psi: ShapeBasicInfo = prevFrame.shapeInfo;
  const csi: ShapeBasicInfo = curFrame.shapeInfo;
  const ptg: number = framePTG(prevFrame.index, curFrame.index, frame);

  const rotate: number = transNumber(psi.rotate, csi.rotate, ptg);
  const scaleX: number = transNumber(psi.scaleX, csi.scaleX, ptg);
  const scaleY: number = transNumber(psi.scaleY, csi.scaleY, ptg);
  const opacity: number = transNumber(psi.opacity, csi.opacity, ptg);

  return (
    <div
      style={{
        position: 'absolute',
        border: '1px solid red',
        left: transNumber(psi.x, csi.x, ptg),
        top: transNumber(psi.y, csi.y, ptg),
        transform: `rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`,
        opacity,
        height: shape.height,
        width: shape.width,
      }}
    />
  );
};

export default Rect;