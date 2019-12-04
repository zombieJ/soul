import React from 'react';
import { Form, InputNumber, Input, Select } from 'antd';
import classNames from 'classnames';

import { Shape, Shapes, ShapeBasicProps } from '../../components/Shape';
import { FrameInfo, Timeline } from '../../models/movie';

import Field from './Field';

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

    // ======================= Shape =======================
    const shapeProps = Shapes[shape.type];
    const keyList: Array<string> = Object.keys(shapeProps);

    const $shape = (
      <div className={styles.region}>
        <h2>Shape</h2>

        <Field
          name="type"
          type="string"
          value={shape.type}
          list={Object.keys(Shapes)}
          onChange={this.onShapeChange}
        />

        {keyList.map((key) => {
          const type: any = (shapeProps as any)[key];
          const value: any = (shape as any)[key];

          return (
            <Field
              key={key}
              name={key}
              type={type}
              value={value}
              onChange={this.onShapeChange}
            />
          );
        })}
      </div>
    );

    // ====================== Content ======================
    let $content;
    if (frameInfo) {
      $content = (
        <div className={styles.region}>
          <h2>Basic</h2>

          {Object.keys(ShapeBasicProps).map(key => (
            <Field
              key={key}
              name={key}
              type={(ShapeBasicProps as any)[key]}
              value={(frameInfo.shapeInfo as any)[key]}
              onChange={this.onValueChange}
            />
          ))}
        </div>
      );
    } else {
      $content = (
        <h1>Not Key Frame</h1>
      );
    }

    return (
      <div className={classNames(className, styles.props)}>
        {$shape}
        {$content}
      </div>
    );
  }
}

export default Props;