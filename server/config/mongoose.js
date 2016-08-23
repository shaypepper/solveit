var mongoose    = require('mongoose'); // require mongoose
var fs          = require('fs'); // require the fs module for loading model files
var path        = require('path'); // require path for getting the models path
var root        = __dirname;
var models_path = path.join(root, './../models'); // create a variable that points to the path where all of the models live
var dbURI       = 'mongodb://localhost/solveit';
var reg         = new RegExp( ".js$", "i" );
 
mongoose.connect(dbURI);
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync( models_path ).forEach( function( file ) {
  if( reg.test( file ) ) {
    require( path.join( models_path, file ) );
  }
});