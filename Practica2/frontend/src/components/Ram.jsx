import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const API = "http://localhost:5000";

const Ram = () => {
  const [ejecutandose, setEjecutandose] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API}/ram`);
        const data = await response.json();
        console.log(data);
        setEjecutandose(data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    let chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Usado", "Libre"],
        datasets: [
          {
            label: "Uso de RAM (%)",
            data: [ejecutandose, 100 - ejecutandose],
            backgroundColor: ["#FF6384", "#36A2EB"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      let chart = Chart.getChart(chartRef.current);
      chart.data.datasets[0].data = [ejecutandose, 100 - ejecutandose];
      chart.update();
    }
  }, [ejecutandose]);

  return (
    <div style={{paddingLeft: 450}}>
      <div style={{textAlign: "center",height: 500, width: 500, paddingTop: 100}}>
        <div className="number" style={{textAlign:"center", fontSize: 50}}>
          <p className="lead">USO DE RAM {ejecutandose}%</p>
        </div>
        <canvas id="myChart" ref={chartRef} style={{ margin: "20px auto" }}></canvas>
      </div>
    </div>
  );
};

export default Ram;
