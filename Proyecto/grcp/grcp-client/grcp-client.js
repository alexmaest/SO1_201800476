var PROTO_PATH = './proto/info.proto';

var parseArgs = require('minimist');
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

var argv = parseArgs(process.argv.slice(2), {
  string: 'target'
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  target = 'localhost:50052';
}
var client = new info_proto.InfoVotos(target,grpc.credentials.createInsecure());

module.exports = client;