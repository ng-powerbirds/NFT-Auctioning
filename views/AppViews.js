import React from 'react';
import '../index.css';
import Navbar from './components/Navbar'

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <Navbar/>
        <h1>Nft-Auctioning</h1>
      </div>
    );
  }
}

export default exports;