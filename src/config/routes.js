/* Controllers */
const GeneralCtrller = require('../controllers/controller');
const DriverCtrller = require('../controllers/driver');
const RaceCtrller = require('../controllers/race');
const LapCtrller = require('../controllers/lap');

module.exports = (app) => {
   
    app.get('/api/v2/', (req, res) => res.status(200).json({
        message: 'This endpoint does not exists',
   }));
   app.post('/api/v2/data/import', GeneralCtrller.import);
   app.get('/api/v2/data/export', GeneralCtrller.export);
   app.get('/api/v2/classification', GeneralCtrller.classif);

   app.post('/api/v2/driver/create', DriverCtrller.create);
   app.get('/api/v2/driver/list', DriverCtrller.list);
   app.get('/api/v2/driver/:driverid', DriverCtrller.find);

   app.post('/api/v2/race/create', RaceCtrller.create);
   app.get('/api/v2/race/list', RaceCtrller.list);
   app.get('/api/v2/race/:raceid', RaceCtrller.find);

   app.post('/api/v2/lap/create', LapCtrller.create);
   app.get('/api/v2/lap/list', LapCtrller.list);
   app.get('/api/v2/lap/:driverid', LapCtrller.find);
};