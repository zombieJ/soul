import React from 'react';
import { Form, InputNumber } from 'antd';
import classNames from 'classnames';

import { FrameInfo } from '../../models/movie';

import styles from './index.less';

const FormItem = Form.Item;

export interface PropsProps {
  className?: string;
  frameInfo: FrameInfo;
  onValueChange: (name: string, value: any) => void;
}

class Props extends React.Component<PropsProps, any> {
  onValueChange = (name: string, value: any) => {
    this.props.onValueChange(name, value);
  };

  render() {
    const { className, frameInfo } = this.props;

    let $content;

    if (frameInfo) {
      $content = (
        <div>
          <label>
            x:
            <InputNumber value={frameInfo.shapeInfo.x} onChange={(val) => { this.onValueChange('x', val); }} />
          </label>

          <label>
            y:
            <InputNumber value={frameInfo.shapeInfo.y} onChange={(val) => { this.onValueChange('y', val); }} />
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
        {$content}
      </div>
    );
  }
}

export default Props;

// const WrappedProps = Form.create()(Props as any);

// export default WrappedProps as any;