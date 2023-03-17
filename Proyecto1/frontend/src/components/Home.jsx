import React, { useState, useEffect } from "react";

const API = 'http://localhost:5000';

const Home = () => {
  const [procesos, setProcesos] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API}/process`);
        const data = await response.json();
        setProcesos(data.Procesos);
        setEstados(data.Estados);
        console.log(data.Procesos);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [subprocesos, setSubprocesos] = useState({});

  const handleSubprocesos = (pid) => {
    const proceso = procesos.find((p) => p.Pid === pid);
    if (proceso) {
      if (subprocesos[pid]) {
        // Si ya se está mostrando la tabla de subprocesos, la ocultamos
        setSubprocesos({
          ...subprocesos,
          [pid]: null,
        });
      } else {
        // Si no se está mostrando la tabla de subprocesos, la mostramos
        setSubprocesos({
          ...subprocesos,
          [pid]: proceso.Subprocesos,
        });
      }
    }
  };

  return (
    <div style={{ width: 1100, paddingTop: 100, paddingLeft: 300 }}>
      <div style={{textAlign:"center"}} className="number-container">
        <div className="number" style={{textAlign:"center", fontSize: 50, color: "#8aff95"}}>
          <p className="lead">EJECUTANDOSE</p>
          <p>{estados.Ejecucion}</p>
        </div>
        <div className="number" style={{textAlign:"center", fontSize: 50, paddingLeft: 20, color: "#fff78a"}}>
          <p className="lead">SUSPENDIDOS</p>
          <p>{estados.Suspendido}</p>
        </div>
        <div className="number" style={{textAlign:"center", fontSize: 50, paddingLeft: 20, color: "#ff8a8a"}}>
          <p className="lead">DETENIDOS</p>
          <p>{estados.Detenido}</p>
        </div>
        <div className="number" style={{textAlign:"center", fontSize: 50, paddingLeft: 20, color: "#c069ff"}}>
          <p className="lead">ZOMBIE</p>
          <p>{estados.Zombie}</p>
        </div>
        <div className="number" style={{textAlign:"center", fontSize: 50, paddingLeft: 20}}>
          <p className="lead">TOTAL</p>
          <p>{estados.Total}</p>
        </div>
      </div>

      <table style={{ textAlign: "center" }} className="table table-hover">
        <thead>
          <tr className="table-primary">
            <td>PID</td>
            <td>Nombre</td>
            <td>Usuario</td>
            <td>Estado</td>
            <td>RAM(%)</td>
            <td>Subprocesos</td>
          </tr>
        </thead>
        <tbody>
          {procesos.length > 0 &&
            procesos.map((proceso) => (
              <React.Fragment key={proceso.Pid}>
                <tr>
                  <td>{proceso.Pid}</td>
                  <td>{proceso.Nombre}</td>
                  <td>{proceso.User}</td>
                  <td>{proceso.Estado}</td>
                  <td>{proceso.Mem}</td>
                  <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleSubprocesos(proceso.Pid)}
                    disabled={!proceso.Subprocesos || proceso.Subprocesos.length === 0}
                  >
                    Ver
                  </button>
                  </td>
                </tr>
                {subprocesos[proceso.Pid] && (
                  <tr className="shown">
                    <td colSpan="6">
                      <table className="table table-hover">
                        <thead>
                          <tr className="table-secondary">
                            <td>PID</td>
                            <td>PPID</td>
                            <td>Nombre</td>
                          </tr>
                        </thead>
                        <tbody>
                          {proceso.Subprocesos.map((subproceso) => (
                            <tr key={subproceso.Pid}>
                              <td>{subproceso.Pid}</td>
                              <td>{subproceso.Ppid}</td>
                              <td>{subproceso.Nombre}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                {!subprocesos[proceso.Pid] && (
                  <tr className="hidden">
                    <td colSpan="6"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;