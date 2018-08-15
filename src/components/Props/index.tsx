import React from 'react';
import { Form, InputNumber, Input } from 'antd';
import classNames from 'classnames';

import { Shape } from '../../components/Shape';
import { FrameInfo, Timeline } from '../../models/movie';

import styles from './index.less';

const FormItem = Form.Item;

export interface PropsProps {
  className?: string;
  timeline: Timeline;
  frameInfo: FrameInfo;
  onValueChange: (name: string, value: any) => void;
  onShapeChange: (name: string, value: any) => void;
}

class Props extends React.Component<PropsProps, any> {
  onValueChange = (name: string, value: any) => {
    this.props.onValueChange(name, value);
  };

  onShapeChange = (name: string, value: any) => {
    this.props.onShapeChange(name, value);
  };

  render() {
    const { className, frameInfo, timeline } = this.props;

    const shape: Shape = timeline.shape;

    let $content;
    if (frameInfo) {
      $content = (
        <div className={styles.region}>
          <h2>Basic</h2>
          <label>
            x:
            <InputNumber value={frameInfo.shapeInfo.x} onChange={(val) => { this.onValueChange('x', val); }} />
          </label>

          <label>
            y:
            <InputNumber value={frameInfo.shapeInfo.y} onChange={(val) => { this.onValueChange('y', val); }} />
          </label>

          <label>
            rotate:
            <InputNumber value={frameInfo.shapeInfo.rotate} onChange={(val) => { this.onValueChange('rotate', val); }} />
          </label>

           <label>
            scaleX:
            <InputNumber value={frameInfo.shapeInfo.scaleX} onChange={(val) => { this.onValueChange('scaleX', val); }} />
          </label>

           <label>
            scaleY:
            <InputNumber value={frameInfo.shapeInfo.scaleY} onChange={(val) => { this.onValueChange('scaleY', val); }} />
          </label>

           <label>
            opacity:
            <InputNumber value={frameInfo.shapeInfo.opacity} onChange={(val) => { this.onValueChange('opacity', val); }} />
          </label>
        </div>
      );
    } else {
      $content = (
        <h1>Not Key Frame</h1>
      );
    }

    return (
      <div className={classNames(className, styles.props)}>
        <div className={styles.region}>
            <h2>Shape</h2>

            {Object.keys(shape).map((key) => {
              const value: string = (shape as any)[key];
              return (
                <label key={key}>
                  {key}:
                  <Input value={value} onChange={({ target: { value } }) => { this.onShapeChange(key, value); }} />
                </label>
              );
            })}
          </div>

        {$content}
      </div>
    );
  }
}

export default Props;

// const WrappedProps = Form.create()(Props as any);

// export default WrappedProps as any;