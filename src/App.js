import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import About from './components/About'
import TextForm from './components/TextForm'
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setalert] = useState(null)
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setalert(null)
    }, 1500)
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showalert("Dark mode enabled", "success")
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showalert("light mode enabled", "success")
    }
  }
  return (
    <>
    <Router>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils" /> */}
      {/* <Navbar/> */}


      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert}></Alert> 

      <div className="container my-3">
      </div> 
      
        <Routes>
          <Route path="/about" element={<About/>}> </Route>
          <Route path="/" element={ <TextForm showalert={showalert} heading="Enter the text to analyze below" mode={mode} />}></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;