const Lap = require('../models').Lap;

module.exports = {

 create(req, res) {
    return Lap
        .create ({
            DriverId: req.body.driver_id,
            RaceId: req.body.race_id,
            time: req.body.lap_time
        })
        .then(Lap => res.status(201).json(Lap))
        .catch(error => res.status(400).json(error))
 },

 list(_, res) {
     return Lap.findAll({})
        .then(Lap => res.status(200).json(Lap))
        .catch(error => res.status(400).json(error))
 },

 find (req, res) {
     return Lap.findAll({
         where: {
            driver_id: req.params.driverid,
         }
     })
     .then(Lap => res.status(200).json(Lap))
     .catch(error => res.status(400).json(error))
  }

};