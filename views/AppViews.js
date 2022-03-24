import React from 'react';

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <h1>Nft-Auctioning</h1>
      </div>
    );
  }
}

export default exports;