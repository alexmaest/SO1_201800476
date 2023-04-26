import React, {useState, useEffect} from "react";
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import './Repo2.css';

const API = "http://34.30.222.45:5001/boletas";
let datosboletas;
let tamtemp = 0;

let votosGuatemala = 0;
let votosAltaverapaz = 0;
let votosBajaverapaz = 0;
let votosChimaltenango = 0;
let votosChiquimula = 0;
let votosPeten = 0;
let votosElprogreso = 0;
let votosQuiche = 0;
let votosEscuintla = 0;
let votosHuehuetenango = 0;
let votosIzabal = 0;
let votosJalapa = 0;
let votosJutiapa = 0;
let votosQuetzaltenango = 0;
let votosRetalhuleu = 0;
let votosSacatepequez = 0;
let votosSanmarcos = 0;
let votosSantarosa = 0;
let votosSolola = 0;
let votosSuchitepequez = 0;
let votosTotonicapan = 0;
let votosZacapa = 0;

let listatop = [];

function Repo2() {

    const [primero, setPrimero]=useState(0);
    const [segundo, setSegundo]=useState(0);
    const [tercero, setTercero]=useState(0);

    const [dep1, setDep1]=useState("");
    const [dep2, setDep2]=useState("");
    const [dep3, setDep3]=useState("");

    useEffect(() => {
        const intervalo = setInterval(async () => {
          try {
            const response = await fetch(`${API}/`);
            const data = await response.json();
            datosboletas = data
            if(tamtemp !== datosboletas.length){
                listatop = []
                for(let i = tamtemp; i < datosboletas.length; i++){
                    if(datosboletas[i].departamento === 'Guatemala'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosGuatemala = votosGuatemala + 1
                        }
                    }else if(datosboletas[i].departamento === 'Alta Verapaz'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosAltaverapaz = votosAltaverapaz + 1
                        }
                    }else if(datosboletas[i].departamento === 'Baja Verapaz'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosBajaverapaz = votosBajaverapaz + 1
                        }
                    }else if(datosboletas[i].departamento === 'Chimaltenango'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosChimaltenango = votosChimaltenango + 1
                        }
                    }else if(datosboletas[i].departamento === 'Chiquimula'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosChiquimula = votosChiquimula + 1
                        }
                    }else if(datosboletas[i].departamento === 'El Progreso'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosElprogreso = votosElprogreso + 1
                        }
                    }else if(datosboletas[i].departamento === 'Escuintla'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosEscuintla = votosEscuintla + 1
                        }
                    }else if(datosboletas[i].departamento === 'Huehuetenango'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosHuehuetenango = votosHuehuetenango + 1
                        }
                    }else if(datosboletas[i].departamento === 'Izabal'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosIzabal = votosIzabal + 1
                        }
                    }else if(datosboletas[i].departamento === 'Jalapa'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosJalapa = votosJalapa + 1
                        }
                    }else if(datosboletas[i].departamento === 'Jutiapa'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosJutiapa = votosJutiapa + 1
                        }
                    }else if(datosboletas[i].departamento === 'Peten'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosPeten = votosPeten + 1
                        }
                    }else if(datosboletas[i].departamento === 'Quetzaltenango'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosQuetzaltenango = votosQuetzaltenango + 1
                        }
                    }else if(datosboletas[i].departamento === 'Quiche'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosQuiche = votosQuiche + 1
                        }
                    }else if(datosboletas[i].departamento === 'Retalhuleu'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosRetalhuleu = votosRetalhuleu + 1
                        }
                    }else if(datosboletas[i].departamento === 'Sacatepequez'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosSacatepequez = votosSacatepequez + 1
                        }
                    }else if(datosboletas[i].departamento === 'San Marcos'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosSanmarcos = votosSanmarcos + 1
                        }
                    }else if(datosboletas[i].departamento === 'Santa Rosa'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosSantarosa = votosSantarosa + 1
                        }
                    }else if(datosboletas[i].departamento === 'Solola'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosSolola = votosSolola + 1
                        }
                    }else if(datosboletas[i].departamento === 'Suchitepequez'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosSuchitepequez = votosSuchitepequez + 1
                        }
                    }else if(datosboletas[i].departamento === 'Totonicapan'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosTotonicapan = votosTotonicapan + 1
                        }
                    }else if(datosboletas[i].departamento === 'Zacapa'){
                        if(datosboletas[i].papeleta === 'Blanca'){
                            votosZacapa = votosZacapa + 1
                        }
                    }
                }
                listatop.push({'votos': votosGuatemala, 'departamento': 'Guatemala'});
                listatop.push({'votos': votosAltaverapaz, 'departamento': 'Alta Verapaz'});
                listatop.push({'votos': votosBajaverapaz, 'departamento': 'Baja Verapaz'});
                listatop.push({'votos': votosChimaltenango, 'departamento': 'Chimaltenango'});
                listatop.push({'votos': votosChiquimula, 'departamento': 'Chiquimula'});
                listatop.push({'votos': votosPeten, 'departamento': 'Peten'});
                listatop.push({'votos': votosElprogreso, 'departamento': 'El Progreso'});
                listatop.push({'votos': votosQuiche, 'departamento': 'Quiche'});
                listatop.push({'votos': votosEscuintla, 'departamento': 'Escuintla'});
                listatop.push({'votos': votosHuehuetenango, 'departamento': 'Huehuetenango'});
                listatop.push({'votos': votosIzabal, 'departamento': 'Izabal'});
                listatop.push({'votos': votosJalapa, 'departamento': 'Jalapa'});
                listatop.push({'votos': votosJutiapa, 'departamento': 'Jutiapa'});
                listatop.push({'votos': votosQuetzaltenango, 'departamento': 'Quetzaltenango'});
                listatop.push({'votos': votosRetalhuleu, 'departamento': 'Retalhuleu'});
                listatop.push({'votos': votosSacatepequez, 'departamento': 'Sacatepequez'});
                listatop.push({'votos': votosSanmarcos, 'departamento': 'San Marcos'});
                listatop.push({'votos': votosSantarosa, 'departamento': 'Santa Rosa'});
                listatop.push({'votos': votosSolola, 'departamento': 'Solola'});
                listatop.push({'votos': votosSuchitepequez, 'departamento': 'Suchitepequez'});
                listatop.push({'votos': votosTotonicapan, 'departamento': 'Totonicapan'});
                listatop.push({'votos': votosZacapa, 'departamento': 'Zacapa'});
            }
            tamtemp = datosboletas.length
            listatop.sort((x, y) => x.votos - y.votos);
            setPrimero(listatop[21].votos)
            setSegundo(listatop[20].votos)
            setTercero(listatop[19].votos)
            setDep1(listatop[21].departamento)
            setDep2(listatop[20].departamento)
            setDep3(listatop[19].departamento)

        } catch (error) {
            console.error("Error al obtener los datos: ", error);
          }
        }, 2000);
        return () => clearInterval(intervalo);
    }, []);

    const data={
        labels: [dep1, dep2, dep3],
        datasets: [{
            label: 'Votos',
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
            data: [primero, segundo, tercero]
        }]
    }

    const opciones={
        maintainAspectRatio: false,
        responsive: true
    }

    return(
        <div className="barras">
            <h2>Votos para presidente por departamento</h2>
            <Bar data={data} options={opciones} />
        </div>
    );
}

export default Repo2;