import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import React,{useState} from 'react';
import TextForm from './components/TextForm';

function App() {

  const [mode,setmode]=useState('dark')
  const [alert,setalert]=useState(null)

  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
  }
  return (
    <>
  <Navbar mode={mode} title="Nishar" abouttext="about us"></Navbar>

  <Alert alert={alert}></Alert> 

  <div className='container my-3'>
  <TextForm heading="Enter the text to analyze"></TextForm>
  <About></About>
  </div>
 
  {/* default props */}
  {/* <Navbar ></Navbar> */}
  </>
  );
}

export default App;
