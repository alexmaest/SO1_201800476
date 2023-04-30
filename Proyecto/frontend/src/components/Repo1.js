import React, {useState, useEffect} from "react";
//import moment from "moment-timezone";

const API = "http://34.30.222.45:5001/boletas";

let datosboletas;

function Repo1() {

    const [registros, setRegistros]=useState([])

    useEffect(() => {
        const intervalo = setInterval(async () => {
          try {
            const response = await fetch(`${API}/`);
            const data = await response.json();
            datosboletas = data
            setRegistros(datosboletas)
          } catch (error) {
            console.error("Error al obtener los datos: ", error);
          }
        }, 2000);
        return () => clearInterval(intervalo);
    }, []);

    //const fechaHoraActual = moment().tz("America/Guatemala").format("DD/MM/YY - HH:mm");

    return(
        <div style={{ textAlign: "center", width: 1100, paddingTop: 10, paddingLeft: '20%'}}>
            <div style={{ paddingBottom: 50, height: "400px", overflowY: "scroll", marginBottom: 30 }}>
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
                    {registros.map((item) => (
                    <tr>
                        <td>{item.sede}</td>
                        <td>{item.municipio}</td>
                        <td>{item.departamento}</td>
                        <td>{item.papeleta}</td>
                        <td>{item.partido}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default Repo1;