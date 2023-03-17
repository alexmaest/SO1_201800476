![Kernel Image](https://asset-a.grid.id/crop/0x0:0x0/x/photo/2020/06/24/427898048.png "Banner | GCP Image")

## Manual técnico | Práctica 2 <img src="https://media.tenor.com/dHk-LfzHrtwAAAAi/linux-computer.gif" alt="drawing" width="30"/>

### _Maquinas Virtuales_

Se determinó para el funcionamiento de este proyecto, la utilización de dos máquinas virtuales con el servicio de `Google Cloud Platform` donde se utiliza en una de ellas la carga de modulos de kernel como también el contenedor del `backend` el cual como se menciona con anterioridad, se conecta a la base de datos proporcionando la información de procesos como rendimiento del sistema cada segundo.

Por otro lado se tiene la segunda maquina virtual sobre la cual se posicionaron dos contenedores de docker, teniendo la `api` y el `frontend` con react mutuamente conectados para la recepción de datos y mostrar de forma visual e interactiva los datos en tiempo real al usuario respectivamente. Para iniciar el funcionamiento se tienen los siguientes pasos: 

- `VM Backend` Es primordial tener este repositorio clonado dentro de la VM para posteriormente cargar los modulos de kernel al sistema, para esto moverse al directorio `/data/SO1_201800476/Proyecto1/modules` para luego ejecutar los comandos `make all` para posteriormente `sudo insmod cpu_201800476` y `sudo insmod ram_201800476`, para luego moverse al directorio `/data/SO1_201800476/Proyecto1/backend` y levantar el contenedor con el archivo dockerfile. 

- `VM API-Frontend` Es primordial tener este repositorio clonado dentro de la VM para posteriormente iniciar moviendose a la carpeta `/data/SO1_201800476/Proyecto1` para poder realizar el comando sudo docker-compose up el cual levanta ambos contenedores y ya es accesible al usuario mediante la ip de la VM en el puerto especifico de react :5000

### _Docker_

Se utilizó como base la utilización de `docker-compose` en el desarrollo, esto dando el uso de imagenes de las tecnologías solicitadas las cuales se muestran más adelante. En la utilización de compose se despliegan 3 áreas como lo son: Frontend, Backend y una API de recepción y envío de datos como se muestra en la siguiente tabla:

| Componentes | Detalles  | Imagen  |
| ----- | -----  | ----- |
| _Frontend_ | Se utiliza para la interacción del usuario con la aplicación. | `node:19-alpine con React` | 
| _API_ | Recibe la información almacenada de la base de datos en Cloud SQL. | `node:19-alpine`| 
| _Backend_ | Tiene el funcionamiento de hacer la lectura de los módulos cargados en kernel para su debido procesado y sus posteriores consultas hacia la base de datos anteriormente mencionada. | `golang:alpine` | 


### _Frontend_
Se realizó mediante el framework React donde se utilizó la imagen de `node:19-alpine` para hacer un desarrollo óptimo dentro de la herramienta docker, sobre el cual posee 3 vistas finales solicitadas:

- `Home` Es responsable de mostrarle al usuario los procesos que su sistema está corriendo en tiempo real, este con todas sus caracteristicas que lo componen en una tabla debidamente categorizada la cual tambíen muestra si el proceso tiene hijos, los cuales se muestran en una subtabla al presionar el botón Ver.

- `Cpu` Muestra de forma gráfica como el sistema está utilizando el cpu sobre un porcentaje expresado en forma de gráfica de pie, sobre el cual se muestra el cpu utilizado y el cpu disponible en ese momento.

- `Ram` Muestra de forma gráfica como el sistema está utilizando la ram sobre un porcentaje expresado en forma de gráfica de pie, sobre el cual se muestra la ram utilizada y ram la disponible en ese momento.

### _Backend_
Para este apartado se utilizó la imagen `golang:alpine` donde a través de la libreria `github.com/go-sql-driver/mysql` la cual hace las peticiones de las consultas hacia Cloud SQL, como también es el encargado de la lectura de los archivos encontrados y cargados en la carpeta `/proc` del sistema operativo donde se tienen 2 modulos cpu_201800476 y ram_201800476, el cual posee structs para poder leer el formato JSON que tiene cada modulo y almacenar y categorizarlo con sus atributos en estos structs para poder enviarlo a la base de datos.

### _Cloud SQL_
Se utilizó una base de datos alojada en este servicio con `mysql`, la cual funje como lugar donde se almacenan todos los datos recolectados por los modulos de kernel cargados en el sistema de una de las maquinas virtuales, como también tiene la función de enviar los datos a la API en nodejs establecida en un contenedor. Para el almacenamiento de datos se tienen las siguientes tablas:

![Image](/singleObject.png "Modelo")

Se realizó un modelo sencillo para el almacenaje de texto o JSON donde se realiza una rapida inserción de datos como una rapida consulta de estos, JSON sobre los cuales se procesa en la API para su correcto envío de datos hacia el frontend de react. 

###### _2023 - Laboratorio de Sistemas Operativos 1_
---
