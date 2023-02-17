![Kernel Image](https://tattoocoder.com/content/images/2017/03/docker-cloud-1.png "Banner | Linux Image")

## Manual técnico | Práctica 1 <img src="https://media.tenor.com/dHk-LfzHrtwAAAAi/linux-computer.gif" alt="drawing" width="30"/>

### _Docker_

Se utilizó como base la utilización de `docker-compose` en el desarrollo, esto dando el uso de imagenes de las tecnologías solicitadas las cuales se muestran más adelante. En la utilización de compose se despliegan 4 áreas como lo son: Frontend, Backend, Base de datos y un Script como se muestra en la siguiente tabla:

| Componentes | Detalles  | Imagen  |
| ----- | -----  | ----- |
| _Frontend_ | Se utiliza para la interacción del usuario con la aplicación. | `node:19-alpine` | 
| _Backend_ | Tiene el funcionamiento de hacer la lógica de la calculadora. | `golang:alpine` | 
| _Base de datos_ | Almacena a través de volumenes la persistencia de datos. | `mysql` | 
| _Script_ | Ejecuta reportes sobre registros almacenados. | `Ubuntu:bionic` | 

### _Frontend_
Se realizó mediante el framework React donde se utilizó la imagen de `node:19-alpine` para hacer un desarrollo óptimo dentro de la herramienta docker, sobre el cual posee 2 vistas finales solicitadas:

- `Home` Es responsable de mostrarle al usuario la calculadora para que este pueda interaccionar con ella y realizar operaciones, esta al presionar el botón "=" hace una petición POST donde envia los datos de la operación al Backend para que pueda operarlos y posteriormente realiza una petición GET, donde se hace un return con el resultado de la operación aritmética.

- `Logs` Muestra todos los registros sobre operaciones realizadas a lo largo del funcionamiento de la aplicación, estos ordenados en una tabla proporcionando los datos de los números operados, como también su resultado, tipo de operación y fecha en la que se realizó.

### _Backend_
Para este apartado se utilizó la imagen `golang:alpine` donde a través de la libreria `gin` se realizó una API para poder realizar la conexión al frontend, donde se tienen 2 endpoints

- `/Home` Este proporciona en la petición GET el resultado de la operación solicitada desde el frontend. Con la petición POST se comprueba si no hay ningún error semántico en la operación como la división entre cero para posteriormente realizar la operación y almacenar toda esta información en la base de datos.

- `/Logs` Solo tiene un tipo de petición GET, donde realiza una consulta a través de la base de datos con SELECT * FROM calcdb, calcdb siendo la tabla con los registros almacenados, para posteriormente adjuntarlos todos en un json y ser enviados al frontend para mostrarlos.

Este como se dió indicios anteriormente, también es el que gestiona las consultas para ser enviadas a la base de datos en mysql y también genera un archivo con los logs almadenados hasta ese instante en el tiempo para que un script en bash lo lea desde otro contenedor como se proporcionará información más adelante.

### _Base de datos_

Se utilizó la imagen de `mysql` para proporcionar un servicio de almacenamiento de datos para la aplicación, como bien se conoce en docker se utilizan los volúmenes para la persistencia de datos, por lo cual se utilizó la carpeta `storage` para tener un lugar fisico de almacenamiento y así cada vez que se utilicen los comando `docker-compose up` y `docker-compose down` estos registros sigan percistiendo en el tiempo. Al realizar la aplicación se utilizó una unica entidad como se muestra a continuación:

![Image](/singleObject.png "Registo")


### _Script_

Se determinó que para un desarrollo sencillo se utilizara la imagen `Ubuntu:bionic` para poder realizar la ejecución de un script donde pueda leer el archivo.log generado por el Backend mediante un volúmen compartido entre ambos contenedores, este ejecutandose de manera automática a la espera de la creación de este documento si aún no ha sido creado, y cuando se crea se ejecute de forma infinita si y solo si se detectan cambios en el documento de registros.

###### _2023 - Laboratorio de Sistemas Operativos 1_
---
