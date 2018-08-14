import React from 'react';

export interface WinEventProps {
  onKeyDown?: (e:KeyboardEvent) => void;
};

class WinEvent extends React.Component<WinEventProps, any> {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render(): React.ReactNode {
    return null;
  }
}

export default WinEvent;