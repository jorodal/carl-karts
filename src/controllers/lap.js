const Lap = require('../models').Lap;

module.exports = {

 create(req, res) {
    return Lap
        .create ({
            DriverId: req.body.DriverId,
            RaceId: req.body.RaceId,
            time: req.body.time
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
            DriverId: req.params.driverid,
         },
         attributes: ['time','RaceId']
     })
     .then(Lap => res.status(200).json(Lap))
     .catch(error => res.status(400).json(error))
  }

};