import React from 'react';
import '../index.css';
import {BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './Home';
import Header from './components/Header'
import Container from './components/Container'


const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    return (
      <>
        <Navbar/>
        { /**<HashRouter>
          <Routes>
            <Route exact path="/Home" component={Home}/>
          </Routes>
      </HashRouter> */}
      <Header/>
      <Container/> 
      </>
    );
  }
}

export default exports;