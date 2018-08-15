import { ShapeRect } from './Rect';

export interface ShapeBasicInfo {
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

export const ShapeTypeList = [
  'rect',
  'circle',
];

export interface ShapeBasic {
  type: string;
}

export type Shape = ShapeRect;