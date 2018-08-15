import React from 'react';
import classNames from 'classnames';
import { InputNumber, Form, Button, Icon } from 'antd';
import Line from './Line';

import { Timeline as TL } from '../../models/movie';

import styles from './index.less';

const FormItem = Form.Item;

const FRAME_WIDTH = 12;

export interface TimelineProps {
  form: any;
  timelineList: Array<TL>;
  selectedTimeline: number;
  selectedFrame: number;
  timelineTitleWidth?: number;
  className?: string;

  newTimeline: () => void;
  selectFrame: (timeline: number, frame: number) => void;
}

class Timeline extends React.Component<TimelineProps, any> {
  static defaultProps: Partial<TimelineProps> = {
    timelineTitleWidth: 200,
  };

  componentDidMount() {
    const { form: { setFieldsValue } } = this.props;

    setFieldsValue({
      totalFrame: 25,
    });
  }

  selectFrame = (timeline: number, frame: number) => {
    const { selectFrame } = this.props;
    if (selectFrame) {
      selectFrame(timeline, frame);
    }
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue },
      className,
      timelineTitleWidth, timelineList,
      selectedTimeline, selectedFrame,
      newTimeline,
    } = this.props;

    const values = getFieldsValue();

    return (
      <div className={classNames(styles.timeline, className)}>
        <Form layout="inline">
          <FormItem
            label="Total Frame"
          >
            {getFieldDecorator('totalFrame')(
              <InputNumber />
            )}
          </FormItem>
        </Form>

        <div>
          {timelineList.map((timeline, index) => (
            <Line
              key={index}
              timeline={timeline}
              index={index}
              totalFrame={values.totalFrame || 0}
              selected={selectedTimeline === index}
              selectedFrame={selectedFrame}

              titleWidth={timelineTitleWidth}
              frameWidth={FRAME_WIDTH}

              selectFrame={this.selectFrame}
            />
          ))}
        </div>

        <div>
          <div className={styles.controller}>
            <Button>
              <Icon type="caret-right" />
            </Button>
          </div>

          <Button onClick={newTimeline}>
            + new line
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(Timeline);