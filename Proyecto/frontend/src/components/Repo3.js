import React, {useState, useEffect} from 'react';
import './Repo3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

let guatemala = ['Santa Catarina Pinula', 'San Jose Pinula', 'Guatemala', 'San Jose del Golfo', 'Palencia', 'Chinautla', 'San Pedro Ayampuc', 'Mixco', 'San Pedro Sacatepequez', 'San Juan Sacatepequez', 'Chuarrancho', 'San Raymundo', 'Fraijanes', 'Amatitlan', 'Villa Nueva', 'Villa Canales', 'San Miguel Petapa'];
let altaverapaz = ['Coban', 'Santa Cruz Verapaz', 'San Cristobal Verapaz', 'Tactic', 'Tamahu', 'San Miguel Tucuru', 'Panzoz', 'Senahu', 'San Pedro Carcha', 'San Juan Chamelco', 'San Agustin Lanquin', 'Santa Maria Cahabon', 'Chisec', 'Chahal', 'Fray Bartolome de las casas', 'Santa Catalina La Tinta', 'Raxruha']
let bajaverapaz = ['Salama', 'San Miguel Chicaj', 'Rabinal', 'Cubulco', 'Granados', 'Santa Cruz el Chol', 'San Jeronimo', 'Purulha']
let chimaltenango = ['Chimaltenango', 'San Jose Poaquil', 'San Martin Jilotepeque', 'San Juan Comalapa', 'Santa Apolonia', 'Tecpan', 'Patzun', 'San Miguel Pochuta', 'Patzicia', 'Santa Cruz Balanya', 'Acatenango', 'San Pedro Yepocapa', 'San Andres Itzapa', 'Parramos', 'Zaragoza', 'El Tejar']
let chiquimula = ['Chiquimula', 'Jocotan', 'Esquipulas', 'Comatan', 'Quezaltepeque', 'Olopa', 'Ipala', 'San Juan Ermita', 'Concepcion Las Minas', 'San Jacinto', 'San Jose la Arada']
let peten = ['Flores', 'San Jose', 'San Benito', 'San Andres', 'La Libertad', 'San Francisco', 'Santa Ana', 'Dolores', 'San Luis', 'Sayaxche', 'Melchor de Mencos', 'Poptun']
let elprogreso = ['El Jicaro', 'Morazan', 'San Agustin Acasaguastlan', 'San Antonio La Paz', 'San Cristobal Acasaguastlan', 'Sanarate', 'Guastatoya', 'Sansare']
let quiche = ['Santa Cruz del Quiche', 'Chiche', 'Chinique', 'Zacualpa', 'Chajul', 'Santo Tomas Chichicastenango', 'Patzite', 'San Antonio Ilotenango', 'San Pedro Jocopilas', 'Cunen', 'San Juan Cotzal', 'Santa Maria Joyabaj', 'Santa Maria Nebaj', 'San Andres Sajcabaja', 'Uspantan', 'Sacapulas', 'San Bartolome Jocotenango', 'Canilla', 'Chicaman', 'Ixcan', 'Pachalum']
let escuintla = ['Escuintla', 'Santa Lucia Cotzumalguapa', 'La Democracia', 'Siquinala', 'Masagua', 'Tiquisate', 'La Gomera', 'Guaganazapa', 'San Jose', 'Iztapa', 'Palin', 'San Vicente Pacaya', 'Nueva Concepcion']
let huehuetenango = ['Huehuetenango', 'Chiantla', 'Malacatancito', 'Cuilco', 'Nenton', 'San Pedro Necta', 'Jacaltenango', 'Soloma', 'Ixtahuacan', 'Santa Barbara', 'La Libertad', 'La Democracia', 'San Miguel Acatan', 'San Rafael La Independencia', 'Todos Santos Cuchumatan', 'San Juan Atitlan', 'Santa Eulalia', 'San Mateo Ixtatan', 'Colotenango', 'San Sebastian Huehuetenango', 'Tectitan', 'Concepcion Huista', 'Santa Cruz Barillas', 'San Sebastian Coatan', 'Aguacatan', 'San Rafael Petzal', 'San Gaspar Ixchil', 'Santiago Chimaltenango', 'Santa Ana Huista']
let izabal = ['Morales', 'Los Amates', 'Livingston', 'El Estor', 'Puerto Barrios']
let jalapa = ['Jalapa', 'San Pedro Pinula', 'San Luis Jilotepeque', 'San Manuel Chaparron', 'San Carlos Alzatate', 'Monjas', 'Mataquescuintla']
let jutiapa = ['Jutiapa', 'El Progreso', 'Santa Catarina Mita', 'Agua Blanca', 'Asuncion Mita', 'Yupiltepeque', 'Atescatempa', 'Jerez', 'El Adelanto', 'Zapotitlan', 'Comapa', 'Jalpatagua', 'Conguaco', 'Moyuta', 'Pasaco', 'Quesada']
let quetzaltenango = ['Quetzaltenango', 'Salcaja', 'San Juan Olintepeque', 'San Carlos Sija', 'Sibilla', 'Cabrican', 'Cajola', 'San Miguel Siguila', 'San Juan Ostuncalco', 'San Mateo', 'Concepcion Chiquirichapa', 'San Martin Sacatepequez', 'Almolonga', 'Cantel', 'Huitan', 'Zunil', 'Colomba Costa Cuca', 'San Francisco La Union', 'El Palmar', 'Coatepeque', 'Genova', 'Flores Costa Cuca', 'La Esperanza', 'Palestina de los Altos']
let retalhuleu = ['Retalhuleu', 'San Sebastian', 'Santa Cruz Mulua', 'San Martin Zapotitlan', 'San Felipe', 'San Andres Villa Seca', 'Champerico', 'Nuevo San Carlos', 'El Asintal']
let sacatepequez = ['Antigua Guatemala', 'Jocotenango', 'Pastores', 'Sumpango', 'Santo Domingo Xenacoj', 'Santiago Sacatepequez', 'San Bartolome Milpas Altas', 'San Lucas Sacatepequez', 'Santa Lucia Milpas Altas', 'Magdalena Milpas Altas', 'Santa Maria de Jesus', 'Ciudad Vieja', 'San Miguel Dueñas', 'San Juan Alotenango', 'San Antonio Aguas Calientes', 'Santa Catarina Barahona']
let sanmarcos = ['San Marcos', 'Ayutlan', 'Catarina', 'Comitancillo', 'Concepcion Tutuapa', 'El Quetzal', 'El Rodeo', 'El Tumblador', 'Ixchiguan', 'La Reforma', 'Malacatan', 'Nuevo Progreso', 'Ocos', 'Pajapita', 'Esquipulas Palo Gordo', 'San Antonio Sacatepequez', 'San Cristobal Cucho', 'San Jose Ojetenam', 'San Lorenzo', 'San Miguel Ixahuacan', 'San Pablo', 'San Pedro Sacatepequez', 'San Rafael Pie de la Cuesta', 'Sibinal', 'Sipacapa', 'Tacana', 'Tajumulco', 'Tejutla', 'Rio Blanco', 'La Blanca']
let santarosa = ['Cuilapa', 'Casillas Santa Rosa', 'Chiquimulilla', 'Guazacapan', 'Nueva Santa Rosa', 'Oratorio', 'Pueblo Nuevo Viñas', 'San Juan Tecuaco', 'San Rafael Las Flores', 'Santa Cruz Naranjo', 'Santa Maria Ixhuatan', 'Santa Rosa de Lima', 'Taxisco', 'Barberena']
let solola = ['Solola', 'Concepcion', 'Nahuala', 'Panajachel', 'San Andres Semetabaj', 'San Antonio Palopo', 'San Jose Chacaya', 'San Juan La Laguna', 'San Lucas Toliman', 'San Marcos La Laguna', 'San Pablo La Laguna', 'San Pedro La Laguna', 'Santa Catarina Ixtahuacan', 'Santa Catarina Palopo', 'Santa Clara La Laguna', 'Santa Cruz La Laguna', 'Santa Lucia Utatlan', 'Santa Maria Visitacion', 'Santiago Atitlan']
let suchitepequez = ['Mazatenango', 'Cuyotenango', 'San Francisco Zapotitlan', 'San Bernardino', 'San Jose El Idolo', 'Santo Domingo Suchitepequez', 'San Lorenzo', 'Samayac', 'San Pablo Jocopilas', 'San Antonio Suchitepequez', 'San Miguel Panan', 'San Gabriel', 'Chicacao', 'Patulul', 'Santa Barbara', 'San Juan Bautista', 'Santo Tomas La Union', 'Zunilito', 'Pueblo Nuevo', 'Rio Bravo']
let totonicapan = ['Totonicapan', 'San Cristobal Totonicapan', 'San Francisco El Alto', 'San Andres Xecul', 'Momostenango', 'Santa Maria Chiquimula', 'Santa Lucia La Reforma', 'San Bartolo']
let zacapa = ['Cabañas', 'Estanzuela', 'Gualan', 'Huite', 'La Union', 'Rio Hondo', 'San Jorge', 'San Diego', 'Tecultan', 'Usumatlan', 'Zacapa']

const API = "http://34.30.222.45:5001/boletas";

let datosboletas;

let votosUne = 0; 
let votosVamos = 0; 
let votosFcn = 0; 
let votosUnionista = 0; 
let votosValor = 0; 

let votosMuniUne = 0; 
let votosMuniVamos = 0; 
let votosMuniFcn = 0; 
let votosMuniUnionista = 0; 
let votosMuniValor = 0; 

let tamtemp = 0;
let newdepartamento = "Guatemala";
let newmuni = "Santa Catarina Pinula";

function Repo3() {

  const [dropdown, setDropdown]=useState(false);
  const [valor, setValor]=useState('Guatemala');

  const [dropdown2, setDropdown2]=useState(false);
  const [municipios, setMunicipios]=useState(['Santa Catarina Pinula', 'San Jose Pinula', 'Guatemala', 'San Jose del Golfo', 'Palencia', 'Chinautla', 'San Pedro Ayampuc', 'Mixco', 'San Pedro Sacatepequez', 'San Juan Sacatepequez', 'Chuarrancho', 'San Raymundo', 'Fraijanes', 'Amatitlan', 'Villa Nueva', 'Villa Canales', 'San Miguel Petapa']);
  const [tempMuni, setTempMuni]=useState(municipios[0])

  const [une, setUne] = useState(0);
  const [vamos, setVamos] = useState(0);
  const [fcn, setFcn] = useState(0);
  const [unionista, setUnionista] = useState(0);
  const [pvalor, setPvalor] = useState(0);

  const [muniUne, setMuniUne] = useState(0);
  const [muniVamos, setMuniVamos] = useState(0);
  const [muniFcn, setMuniFcn] = useState(0);
  const [muniUnionista, setMuniUnionista] = useState(0);
  const [muniPvalor, setMuniPvalor] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const response = await fetch(`${API}/`);
        const data = await response.json();
        datosboletas = data
        if(tamtemp !== datosboletas.length){
          for(let i = tamtemp; i < datosboletas.length; i++){
            if(newdepartamento === datosboletas[i].departamento){
              if(datosboletas[i].partido === "UNE"){
                votosUne = votosUne + 1
                setUne(votosUne)
              }else if(datosboletas[i].partido === "VAMOS"){
                votosVamos = votosVamos + 1
                setVamos(votosVamos)
              }else if(datosboletas[i].partido === "FCN"){
                votosFcn = votosFcn + 1
                setFcn(votosFcn)
              }else if(datosboletas[i].partido === "UNIONISTA"){
                votosUnionista = votosUnionista + 1
                setUnionista(votosUnionista)
              }else if(datosboletas[i].partido === "VALOR"){
                votosValor = votosValor + 1
                setPvalor(votosValor)
              }
            }
          }
          for(let j = tamtemp; j < datosboletas.length; j++){
            if(newmuni === datosboletas[j].municipio){
              if(datosboletas[j].partido === "UNE"){
                votosMuniUne = votosMuniUne + 1
                setMuniUne(votosMuniUne)
              }else if(datosboletas[j].partido === "VAMOS"){
                votosMuniVamos = votosMuniVamos + 1
                setMuniVamos(votosMuniVamos)
              }else if(datosboletas[j].partido === "FCN"){
                votosMuniFcn = votosMuniFcn + 1
                setMuniFcn(votosMuniFcn)
              }else if(datosboletas[j].partido === "UNIONISTA"){
                votosMuniUnionista = votosMuniUnionista + 1
                setMuniUnionista(votosMuniUnionista)
              }else if(datosboletas[j].partido === "VALOR"){
                votosMuniValor = votosMuniValor + 1
                setMuniPvalor(votosMuniValor)
              }
            }
          }
        }
        tamtemp = datosboletas.length
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  const abrirCerrarDropdown=()=>{
    setDropdown(!dropdown);
  }

  const abrirCerrarDropdown2=()=>{
    setDropdown2(!dropdown2);
  }

  const accionPrueba=(valor)=>{
    votosUne = 0
    votosVamos = 0
    votosFcn = 0
    votosUnionista = 0
    votosValor = 0

    let muniinicial = ""

    setValor(valor)
    newdepartamento = valor
    if(valor === 'Guatemala'){
      setMunicipios(guatemala)
      setTempMuni(guatemala[0])
      newmuni = guatemala[0]
      muniinicial = guatemala[0]
    }else if(valor === 'Alta Verapaz'){
      setMunicipios(altaverapaz)
      setTempMuni(altaverapaz[0])
      newmuni = altaverapaz[0]
      muniinicial = altaverapaz[0]
    }else if(valor === 'Baja Verapaz'){
      setMunicipios(bajaverapaz)
      setTempMuni(bajaverapaz[0])
      newmuni = bajaverapaz[0]
      muniinicial = bajaverapaz[0]
    }else if(valor === 'Chimaltenango'){
      setMunicipios(chimaltenango)
      setTempMuni(chimaltenango[0])
      newmuni = chimaltenango[0]
      muniinicial = chimaltenango[0]
    }else if(valor === 'Chiquimula'){
      setMunicipios(chiquimula)
      setTempMuni(chiquimula[0])
      newmuni = chiquimula[0]
      muniinicial = chiquimula[0]
    }else if(valor === 'El Progreso'){
      setMunicipios(elprogreso)
      setTempMuni(elprogreso[0])
      newmuni = elprogreso[0]
      muniinicial = elprogreso[0]
    }else if(valor === 'Escuintla'){
      setMunicipios(escuintla)
      setTempMuni(escuintla[0])
      newmuni = escuintla[0]
      muniinicial = escuintla[0]
    }else if(valor === 'Huehuetenango'){
      setMunicipios(huehuetenango)
      setTempMuni(huehuetenango[0])
      newmuni = huehuetenango[0]
      muniinicial = huehuetenango[0]
    }else if(valor === 'Izabal'){
      setMunicipios(izabal)
      setTempMuni(izabal[0])
      newmuni = izabal[0]
      muniinicial = izabal[0]
    }else if(valor === 'Jalapa'){
      setMunicipios(jalapa)
      setTempMuni(jalapa[0])
      newmuni = jalapa[0]
      muniinicial = jalapa[0]
    }else if(valor === 'Jutiapa'){
      setMunicipios(jutiapa)
      setTempMuni(jutiapa[0])
      newmuni = jutiapa[0]
      muniinicial = jutiapa[0]
    }else if(valor === 'Peten'){
      setMunicipios(peten)
      setTempMuni(peten[0])
      newmuni = peten[0]
      muniinicial = peten[0]
    }else if(valor === 'Quetzaltenango'){
      setMunicipios(quetzaltenango)
      setTempMuni(quetzaltenango[0])
      newmuni = quetzaltenango[0]
      muniinicial = quetzaltenango[0]
    }else if(valor === 'Quiche'){
      setMunicipios(quiche)
      setTempMuni(quiche[0])
      newmuni = quiche[0]
      muniinicial = quiche[0]
    }else if(valor === 'Retalhuleu'){
      setMunicipios(retalhuleu)
      setTempMuni(retalhuleu[0])
      newmuni = retalhuleu[0]
      muniinicial = retalhuleu[0]
    }else if(valor === 'Sacatepequez'){
      setMunicipios(sacatepequez)
      setTempMuni(sacatepequez[0])
      newmuni = sacatepequez[0]
      muniinicial = sacatepequez[0]
    }else if(valor === 'San Marcos'){
      setMunicipios(sanmarcos)
      setTempMuni(sanmarcos[0])
      muniinicial = sanmarcos[0]
    }else if(valor === 'Santa Rosa'){
      setMunicipios(santarosa)
      setTempMuni(santarosa[0])
      newmuni = santarosa[0]
      muniinicial = santarosa[0]
    }else if(valor === 'Solola'){
      setMunicipios(solola)
      setTempMuni(solola[0])
      newmuni = solola[0]
      muniinicial = solola[0]
    }else if(valor === 'Suchitepequez'){
      setMunicipios(suchitepequez)
      setTempMuni(suchitepequez[0])
      newmuni = suchitepequez[0]
      muniinicial = suchitepequez[0]
    }else if(valor === 'Totonicapan'){
      setMunicipios(totonicapan)
      setTempMuni(totonicapan[0])
      newmuni = totonicapan[0]
      muniinicial = totonicapan[0]
    }else if(valor === 'Zacapa'){
      setMunicipios(zacapa)
      setTempMuni(zacapa[0])
      newmuni = zacapa[0]
      muniinicial = zacapa[0]
    }

    for(let i = 0; i < datosboletas.length; i++){
      if(valor === datosboletas[i].departamento){
        if(datosboletas[i].partido === "UNE"){
          votosUne = votosUne + 1
        }else if(datosboletas[i].partido === "VAMOS"){
          votosVamos = votosVamos + 1
        }else if(datosboletas[i].partido === "FCN"){
          votosFcn = votosFcn + 1
        }else if(datosboletas[i].partido === "UNIONISTA"){
          votosUnionista = votosUnionista + 1
        }else if(datosboletas[i].partido === "VALOR"){
          votosValor = votosValor + 1
        }
      }
    }

    setUne(votosUne)
    setVamos(votosVamos)
    setFcn(votosFcn)
    setUnionista(votosUnionista)
    setPvalor(votosValor)

    votosMuniUne = 0
    votosMuniVamos = 0
    votosMuniFcn = 0
    votosMuniUnionista = 0
    votosMuniValor = 0

    for(let i = 0; i < datosboletas.length; i++){
      if(muniinicial === datosboletas[i].municipio){
        if(datosboletas[i].partido === "UNE"){
          votosMuniUne = votosMuniUne + 1
        }else if(datosboletas[i].partido === "VAMOS"){
          votosMuniVamos = votosMuniVamos + 1
        }else if(datosboletas[i].partido === "FCN"){
          votosMuniFcn = votosMuniFcn + 1
        }else if(datosboletas[i].partido === "UNIONISTA"){
          votosMuniUnionista = votosMuniUnionista + 1
        }else if(datosboletas[i].partido === "VALOR"){
          votosMuniValor = votosMuniValor + 1
        }
      }
    }

    setMuniUne(votosMuniUne)
    setMuniVamos(votosMuniVamos)
    setMuniFcn(votosMuniFcn)
    setMuniUnionista(votosMuniUnionista)
    setMuniPvalor(votosMuniValor)
  }

  const accionMunicipio=(valor)=>{
    votosMuniUne = 0
    votosMuniVamos = 0
    votosMuniFcn = 0
    votosMuniUnionista = 0
    votosMuniValor = 0

    setTempMuni(valor)
    newmuni = valor

    for(let i = 0; i < datosboletas.length; i++){
      if(valor === datosboletas[i].municipio){
        if(datosboletas[i].partido === "UNE"){
          votosMuniUne = votosMuniUne + 1
        }else if(datosboletas[i].partido === "VAMOS"){
          votosMuniVamos = votosMuniVamos + 1
        }else if(datosboletas[i].partido === "FCN"){
          votosMuniFcn = votosMuniFcn + 1
        }else if(datosboletas[i].partido === "UNIONISTA"){
          votosMuniUnionista = votosMuniUnionista + 1
        }else if(datosboletas[i].partido === "VALOR"){
          votosMuniValor = votosMuniValor + 1
        }
      }
    }

    setMuniUne(votosMuniUne)
    setMuniVamos(votosMuniVamos)
    setMuniFcn(votosMuniFcn)
    setMuniUnionista(votosMuniUnionista)
    setMuniPvalor(votosMuniValor)
  }

  const data={
    labels: ['UNE', 'VAMOS', 'FCN', 'UNIONISTA', 'VALOR'],
    datasets: [{
      label: "Cantidad de votos",
      fill: true,
      data: [une, vamos, fcn, unionista, pvalor],
      backgroundColor: ['rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(255, 128, 0, 0.3)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 128, 0, 1)'
      ],
      borderWidth: 1,
    }]
  };
  
  const opciones={
    responsive: true
  }

  const datamuni={
    labels: ['UNE', 'VAMOS', 'FCN', 'UNIONISTA', 'VALOR'],
    datasets: [{
      label: "Cantidad de votos",
      fill: true,
      data: [muniUne, muniVamos, muniFcn, muniUnionista, muniPvalor],
      backgroundColor: ['rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(255, 128, 0, 0.3)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 128, 0, 1)'
      ],
      borderWidth: 1,
    }]
  };
  
  const opcionesmuni={
    responsive: true
  }

  return (
    <div className="Repo3">
      <div className='drop1'>
        <h4>Departamento</h4>
        <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} className='botondd'>
          <DropdownToggle caret className='botondropdown'>
            {valor}
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu'>
            <DropdownItem onClick={()=>accionPrueba('Alta Verapaz')}>Alta Verapaz</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Baja Verapaz')}>Baja Verapaz</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Chimaltenango')}>Chimaltenango</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Chiquimula')}>Chiquimula</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Guatemala')}>Guatemala</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('El Progreso')}>El Progreso</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Escuintla')}>Escuintla</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Huehuetenango')}>Huehuetenango</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Izabal')}>Izabal</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Jalapa')}>Jalapa</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Jutiapa')}>Jutiapa</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Peten')}>Peten</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Quetzaltenango')}>Quetzaltenango</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Quiche')}>Quiche</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Retalhuleu')}>Retalhuleu</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Sacatepequez')}>Sacatepequez</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('San Marcos')}>San Marcos</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Santa Rosa')}>Santa Rosa</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Solola')}>Solola</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Suchitepequez')}>Suchitepequez</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Totonicapan')}>Totonicapan</DropdownItem>
            <DropdownItem onClick={()=>accionPrueba('Zacapa')}>Zacapa</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className='contenedorpie'>
            <Pie className="Graficapie" data={data} options={opciones} />
        </div>
      </div>
      <div className='drop2'>
        <h4>Municipio</h4>
        <Dropdown isOpen={dropdown2} toggle={abrirCerrarDropdown2}>
          <DropdownToggle caret className='botondropdown'>
            {tempMuni}
          </DropdownToggle>
          <DropdownMenu className='dropdown-menu'>
            {municipios.map((municipio) => (
              <DropdownItem onClick={()=>accionMunicipio(municipio)}>{municipio}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className='contenedorpie2'>
            <Pie className="Graficapie" data={datamuni} options={opcionesmuni} />
        </div>
      </div>
    </div>
  );
}

export default Repo3;