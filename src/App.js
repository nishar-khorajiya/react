import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
// import TextForm from './components/TextForm';

function App() {
  return (
    <>
  <Navbar title="Nishar" abouttext="about us"></Navbar> 
  <div className='container my-3'>
  {/* <TextForm heading="Enter the text to analyze"></TextForm> */}
  <About></About>
  </div>
 
  {/* default props */}
  {/* <Navbar ></Navbar> */}
  </>
  );
}

export default App;
