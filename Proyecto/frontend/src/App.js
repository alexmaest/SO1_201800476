import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Logs from "./components/Logs";
import NavBar from './components/NavBar';
import Repo3 from "./components/Repo3";
import Repo1 from "./components/Repo1";
import Repo2 from "./components/Repo2";
import Tiempo from "./components/Tiempo";
import './App.css';

function App() {
  return (
    <Router>
    <NavBar></NavBar>
    <div className="titulo">
      <h2>Datos almacenados</h2>
    </div>
    <Tiempo />
    <Repo1></Repo1>
    <div className="titulo">
      <h2>Top 3 de departamentos con mayores votos para presidente</h2>
    </div>
    <Repo2></Repo2>
    <div className="titulo">
      <h2>Porcentaje de votos por partido</h2>
    </div>
    <Repo3></Repo3>
      <div>
        <Routes>
          <Route exact path="/" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
