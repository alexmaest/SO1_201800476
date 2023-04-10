import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Logs from "./components/Logs";
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
    <NavBar></NavBar>
      <div>
        <Routes>
          <Route exact path="/" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
