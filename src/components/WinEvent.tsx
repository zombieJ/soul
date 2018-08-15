import React from 'react';

export interface WinEventProps {
  onKeyDown?: (e:KeyboardEvent) => void;
  onResize?: (e: Event) => void;
};

class WinEvent extends React.Component<WinEventProps, any> {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('resize', this.onResize);
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  onResize = (event: Event) => {
    const { onResize } = this.props;
    if (onResize) {
      onResize(event);
    }
  };

  render(): React.ReactNode {
    return null;
  }
}

export default WinEvent;