import React, { useState, useEffect } from "react";

const API = 'http://localhost:5000';

const Logs = () => {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const getMetodo = async () => {
          const res = await fetch(`${API}/Logs`);
          const access = await res.json();
          console.log(access);
          setLogs(access['resultado']);
        };
        getMetodo();
    }, []);

  return (
    <div style={{width: 1100, paddingTop: 100, paddingLeft: 300}}>
        <h2>Logs </h2>
        <table style={{textAlign:"center"}} className="table table-hover">
            <thead>
                <tr className="table-dark">
                    <td>Numero 1</td>
                    <td>Numero 2</td>
                    <td>Operacion</td>
                    <td>Resultado</td>
                    <td>Error</td>
                    <td>Fecha</td>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                    <tr>
                    <td>{log.num1}</td>
                    <td>{log.num2}</td>
                    <td>{log.signo}</td>
                    <td>{log.res}</td>
                    <td>{log.incorrecto}</td>
                    <td>{log.fecha}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Logs;