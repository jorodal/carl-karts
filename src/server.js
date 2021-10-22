const express       = require('express'),
      logger        = require('morgan'),
      db 		= require('./models/'),
      app = express(),
      routesv2 = require('./config/routes'),
      swaggerUi = require('swagger-ui-express'),
      swaggerJsdoc = require('swagger-jsdoc');

// Set up server to server express application
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

//Setup swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carl Karts',
      version: '1.0.0',
      description: 'API calls for the Carl Karts exercise'
    }
  },
  apis: ['./src/config/routes.js'], // files containing annotations 
};
const openapiSpecification = swaggerJsdoc(options);

// Setup a routing system
routesv2.setup(app);
//app.use('/api/v1', require('./routes/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get('*', (_, res) => res.redirect('/api-docs'));

//Listen server
app.set('port', process.env.PORT || 8000);
http.listen(app.get('port'), function () { 
   console.log("Server running on port", app.get('port'));
});

module.exports = app;