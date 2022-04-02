import React from 'react';

const exports = {};

// Everyone views must be extended.
// It does not have its own Wrapper view.
//Everyone has to see the outcome when the time is up................................................................


exports.WaitingForResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome} = this.props;
    return (
      <div>
        Thank you for taking part in the bidding. The outcome of this game was:
        <br />{outcome || 'Unknown'}
      </div>
    );
  }
}

export default exports;