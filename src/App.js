import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const [progress,setProgress]=useState(0)
  const pagesize=6;
  const apikey=process.env.REACT_APP_NEWS_API

    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pagesize} country='in' category='general' />}></Route>
            <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={pagesize} country='in' category='business' />}> </Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pagesize} country='in' category='entertainment' />}> </Route>
            <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={pagesize} country='in' category='sports' />}> </Route>
            <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={pagesize} country='in' category='science' />}> </Route>
            <Route path="/technology" key="technology" element={<News setProgress={setProgress} apikey={apikey} pageSize={pagesize} country='in' category='technology' />}> </Route>
            <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={pagesize} country='in' category='health' />}> </Route>
            <Route path="/general"  element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pagesize} country='in' category='general' />}> </Route>
          </Routes>
        </Router>

      </>
    )
  
}

export default App


