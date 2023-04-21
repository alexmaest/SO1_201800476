var PROTO_PATH = './proto/info.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var info_proto = grpc.loadPackageDefinition(packageDefinition).info;

/* Conexion a la base de datos */
const mysqlConnection = require('./database');

function AddVotos(call, callback) {
  const query = "insert into boletas(sede, municipio, departamento, papeleta, partido) values (" + call.request.sede + ",'" + call.request.municipio + "','" + call.request.departamento + "','" + call.request.papeleta + "','" + call.request.partido + "');"
  
  mysqlConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    callback(null, {message: 'Voto insertado en la base de datos'});
  });
}

function main() {
  var server = new grpc.Server();
  server.addService(info_proto.InfoVotos.service, { AddVotos: AddVotos });
  server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('grcp server on port 50051')
  });
}

main();