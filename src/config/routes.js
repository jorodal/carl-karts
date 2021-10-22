/* Controllers */
const GeneralCtrller = require('../controllers/general');
const DriverCtrller = require('../controllers/driver');
const RaceCtrller = require('../controllers/race');
const LapCtrller = require('../controllers/lap');

module.exports.setup = (app) => {
  
    app.get('/api/', (req, res) => res.status(200).json({
        message: 'This endpoint does not exists',
   }));
  
   /**
     * @openapi
     * /api/data/import:
     *   post:
     *     description: Adds the data in JSON format to the DB
     *     tags: [ General ]   
     *     responses:
     *       200:
     *         description: Everything worked correctly.
     *       500:
     *         description: Something wrong happened
     */
   app.post('/api/data/import', GeneralCtrller.import);
    /**
     * @openapi
     * /api/data/export:
     *   get:
     *     description: Exports the data stored in DB
     *     tags: [ General ] 
     *     responses:
     *       200:
     *         description: Everything worked as expected
     *       500:
     *          description: Something wrong happened
     */
   app.get('/api/data/export', GeneralCtrller.export);
    /**
     * @openapi
     * /api/classification:
     *   get:
     *     description: Gives general classification
     *     tags: [ General ] 
     *     responses:
     *        200:
     *         description: List of current classification ordered by max points first
     *        500:
     *         description: Something wrong happened
     */
   app.get('/api/classification', GeneralCtrller.general_classification);
    /**
     * @openapi
     * /api/classification/race/{raceid}:
     *   get:
     *     description: Gives individual clasification
     *     tags: [ General ]
     *     parameters:
     *          - in: path
     *            name: raceid
     *            type: integer
     *            required: true 
     *     responses:
     *       200:
     *         description: Race classification ordered by max points first
     *       400:
     *          description: Bad request, check the race id
     */
   app.get('/api/classification/race/:raceid', GeneralCtrller.individual_classification);
    
   
   
   /**
     * @openapi
     * /api/driver/create:
     *   post:
     *     description: Create a new driver
     *     tags: [ Driver ]
     *     requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *                type: object
     *                properties:
     *                  _id:
     *                    type: string      
     *                    required: true
     *                  name: 
     *                    type: string
     *                    required: true
     *                  team:
     *                    type: string
     *                    required: true
     *                  age:
     *                    type: integer
     *                    required: true  
     *                  picture:
     *                    type: string
     *                    required: true   
     *     responses:
     *       201:
     *         description: Created correctly.
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.post('/api/driver/create', DriverCtrller.create);
   /**
     * @openapi
     * /api/driver/list:
     *   get:
     *     description: Get all drivers
     *     tags: [ Driver ] 
     *     responses:
     *       200:
     *         description: List of drivers.
     *       400:
     *         description: Bad request
     */
   app.get('/api/driver/list', DriverCtrller.list);
   /**
     * @openapi
     * /api/driver/{_id}:
     *   get:
     *     description: Get one driver by _id
     *     tags: [ Driver ] 
     *     parameters:
     *          - in: path
     *            name: _id
     *            type: string
     *            required: true 
     *     responses:
     *       200:
     *         description: One instance of drivers.
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.get('/api/driver/:driverid', DriverCtrller.find);
   
   
   
   /**
     * @openapi
     * /api/race/create:
     *   post:
     *     description: Create a new race
     *     tags: [ Race ]
     *     requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *                type: object
     *                properties:
     *                  name: 
     *                    type: string
     *                    required: true
     *     responses:
     *       201:
     *         description: Created correctly.
     *       400:
     *         description: Bad request, check the parameters again
     */  
   app.post('/api/race/create', RaceCtrller.create);
    /**
     * @openapi
     * /api/race/list:
     *   get:
     *     description: Get all races
     *     tags: [ Race ] 
     *     responses:
     *       200:
     *         description: List of races.
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.get('/api/race/list', RaceCtrller.list);
   /**
     * @openapi
     * /api/race/{raceid}:
     *   get:
     *     description: Get one race by id
     *     tags: [ Race ] 
     *     parameters:
     *          - in: path
     *            name: raceid
     *            type: integer
     *            required: true 
     *     responses:
     *       200:
     *         description: One instance of races.
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.get('/api/race/:raceid', RaceCtrller.find);
   
   
   
   /**
     * @openapi
     * /api/lap/create:
     *   post:
     *     description: Create a new driver
     *     tags: [ Lap ]
     *     requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *                type: object
     *                properties:
     *                  DriverId:
     *                    type: integer      
     *                    required: true
     *                  RaceId: 
     *                    type: integer
     *                    required: true
     *                  time:
     *                    type: string
     *                    required: true
     *     responses:
     *       201:
     *         description: Created correctly.
     *       400:
     *         description: Bad request, check the parameters again
     */  
   app.post('/api/lap/create', LapCtrller.create);
    /**
     * @openapi
     * /api/lap/list:
     *   get:
     *     description: Get all laps
     *     tags: [ Lap ] 
     *     responses:
     *       200:
     *         description: List of laps.
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.get('/api/lap/list', LapCtrller.list);
   /**
     * @openapi
     * /api/lap/{driverid}:
     *   get:
     *     description: Get one lap by id
     *     tags: [ Lap ] 
     *     parameters:
     *          - in: path
     *            name: driverid
     *            type: integer
     *            required: true 
     *     responses:
     *       200:
     *         description: Get all laps of one driver
     *       400:
     *         description: Bad request, check the parameters again
     */
   app.get('/api/lap/:driverid', LapCtrller.find);
};