import React from 'react';
import { InputNumber, Form, Button } from 'antd';
import Line from './Line';

import styles from './index.less';

const FormItem = Form.Item;

export interface TimelineProps {
  form: any;
}

class Timeline extends React.Component<TimelineProps, any> {
  componentDidMount() {
    const { form: { setFieldsValue } } = this.props;

    setFieldsValue({
      totalFrame: 25,
    });
  }

  render() {
    const { form: { getFieldDecorator, getFieldsValue } } = this.props;

    const values = getFieldsValue();

    return (
      <div className={styles.timeline}>
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
          <Line totalFrame={values.totalFrame || 0} />
        </div>

        <Button>
          + new line
        </Button>
      </div>
    );
  }
}

export default Form.create()(Timeline);