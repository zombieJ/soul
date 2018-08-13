import * as React from 'react';
import Link from 'umi/link';

class Editor extends React.Component {
  render() {
    return (
      <div>
        <Link to="/edit">Editor</Link>
      </div>
    );
  }
}

export default Editor;