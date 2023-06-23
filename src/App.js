import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pagesize=6
  render() {
    return (
      <>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="general" pageSize={this.pagesize} country='in' category='general' />}></Route>
            <Route path="/business" element={<News key="business" pageSize={this.pagesize} country='in' category='business' />}> </Route>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pagesize} country='in' category='entertainment' />}> </Route>
            <Route path="/sports" element={<News key="sports" pageSize={this.pagesize} country='in' category='sports' />}> </Route>
            <Route path="/science" element={<News key="science" pageSize={this.pagesize} country='in' category='science' />}> </Route>
            <Route path="/technology" key="technology" element={<News pageSize={this.pagesize} country='in' category='technology' />}> </Route>
            <Route path="/health" element={<News key="health" pageSize={this.pagesize} country='in' category='health' />}> </Route>
            <Route path="/general"  element={<News key="general" pageSize={this.pagesize} country='in' category='general' />}> </Route>
          </Routes>
        </Router>

      </>
    )
  }
}



