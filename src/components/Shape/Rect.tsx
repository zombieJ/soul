import React from 'react';

import { ShapeRect, ShapeBasicInfo, FrameInfo } from '../../models/movie';
import { framePTG, transNumber } from '../../utils/transition';

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

  return (
    <div
      style={{
        position: 'absolute',
        border: '1px solid red',
        left: transNumber(psi.x, csi.x, ptg),
        top: transNumber(psi.y, csi.y, ptg),
        height: shape.height,
        width: shape.width,
      }}
    />
  );
};

export default Rect;