import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const API = "http://localhost:5001";

const Logs = () => {
  const canvasRef = useRef(null);
  const [report5Data, setReport5] = useState([]);
  const [report6Data, setReport6] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API}/`);
        const data = await response.json();
        setReport5(data["reporte5"]);
        setReport6(data["reporte6"]);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: report5Data.map((log) => log.sede),
        datasets: [
          {
            label: "Cantidad de votos",
            data: report5Data.map((log) => log.cantidad),
            backgroundColor: "rgba(226, 7, 250, 0.2)", // color de fondo de las barras
            borderColor: "rgba(226, 7, 250, 1)", // color del borde de las barras
            borderWidth: 1, // ancho del borde de las barras
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
    return () => {
        chart.destroy();
    };
  }, [report5Data]);

  return (
    <div
      style={{
        textAlign: "center",
        width: 1100,
        paddingTop: 100,
        paddingLeft: 300,
      }}
    >
      <h2>Top 5 sedes con más votos</h2>
      <div style={{ paddingBottom: 50 }}>
        <canvas
          id="myChart"
          ref={canvasRef}
          style={{ margin: "20px auto" }}
        ></canvas>
      </div>
      
      <h2>Últimos 5 votos</h2>
      <div style={{ paddingBottom: 50 }}>
      <table style={{ textAlign: "center" }} className="table table-hover">
        <thead>
          <tr className="table-dark">
            <td>Sede</td>
            <td>Municipio</td>
            <td>Departamento</td>
            <td>Papeleta</td>
            <td>Partido</td>
          </tr>
        </thead>
        <tbody>
          {report6Data.map((log) => (
            <tr>
              <td>{log[0]}</td>
              <td>{log[1]}</td>
              <td>{log[2]}</td>
              <td>{log[3]}</td>
              <td>{log[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Logs;
