const express       = require('express');
const logger        = require('morgan');
const db 		= require('./models/');
// Set up the express app
const app = express();
var http = require('http').createServer(app);
// Check db connection
db.sequelize.authenticate()
  .then(function () {
    console.log('DB Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests limit extended to load big JSON on import/export functions
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
// Setup a routing system
require('./config/routes')(app);
app.get('*', (req, res) => res.status(200).send({
     message: 'This address does not exist',
}));
app.set('port', process.env.PORT || 8000);
http.listen(app.get('port'), function () { 
   console.log("Server running on port", app.get('port'));
});

module.exports = app;