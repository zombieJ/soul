import { ShapeRect, ShapeRectProps } from './Rect';

export interface ShapeBasicInfo {
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

export const ShapeBasicProps = {
  x: 'number',
  y: 'number',
  rotate: 'number',
  scaleX: 'number',
  scaleY: 'number',
  opacity: 'number',
}

export const Shapes = {
  rect: ShapeRectProps,
};

export interface ShapeBasic {
  type: string;
}

export type Shape = ShapeRect;