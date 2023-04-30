import React, {useState, useEffect} from "react";
const Time = "http://localhost:5001/tiempo";

function Tiempo() {
    const [tiempo, setTiempo] = useState("")

    useEffect(() => {
        const intervalo = setInterval(async () => {
          try {
            const response = await fetch(`${Time}/`);
            const fecha = await response.json();
            setTiempo(fecha.Fecha)
          } catch (error) {
            console.error("Error al obtener los datos: ", error);
          }
        }, 1000);
        return () => clearInterval(intervalo);
    }, []);

    return(
        <div style={{ textAlign: "center", width: 1100, paddingTop: 10, paddingLeft: '14%'}}>
          <h2>{tiempo}</h2>
        </div>
    );
}

export default Tiempo;