import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Logs from "./components/Logs";
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
    <NavBar></NavBar>
      <div>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Logs" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
