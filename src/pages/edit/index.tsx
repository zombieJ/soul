import * as React from 'react';
import { connect } from 'dva';
import Timeline from '../../components/Timeline';

export interface EditProps {

}

class Edit extends React.Component<EditProps, any> {
  render() {
    return (
      <div>
        <Timeline />
      </div>
    );
  }
}

export default connect()(Edit);
