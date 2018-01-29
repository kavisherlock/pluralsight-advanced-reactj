import React from 'react';
import storeProvider from './storeProvider';

class Timestamp extends React.Component {
  timeDisplay = (timestamp) =>
    timestamp.toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit'
      },
    );

  shouldComponentUpdate(nextProps) {
    const currentDisplay = this.timeDisplay(this.props.timestamp);
    const nextDisplay = this.timeDisplay(nextProps.timestamp);

    return nextDisplay !== currentDisplay;
  }

  render() {
    return (
      <div>
        {this.timeDisplay(this.props.timestamp)}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp,
  };
}

export default storeProvider(extraProps)(Timestamp);
