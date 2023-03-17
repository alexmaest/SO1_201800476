import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Ram from "./components/Ram";
import Cpu from "./components/Cpu";
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
    <NavBar></NavBar>
      <div>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Ram" element={<Ram />} />
          <Route exact path="/Cpu" element={<Cpu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
