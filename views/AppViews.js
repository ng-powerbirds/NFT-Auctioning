import React from 'react';
import '../index.css';
import Navbar from './components/Navbar'
import Container from './components/Container'
import Header from './components/Header'

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <Navbar/>
        <Header/>
        <Container/>
      </div>
    );
  }
}

export default exports;