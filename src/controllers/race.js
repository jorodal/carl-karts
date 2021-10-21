const Race = require('../models').Race;

module.exports = {

 create(req, res) {
    return Race
        .create ({
            name: req.body.name,
        })
        .then(Race => res.status(200).json(Race))
        .catch(error => res.status(400).json(error))
 },

 list(_, res) {
     return Race.findAll({})
        .then(Race => res.status(200).json(Race))
        .catch(error => res.status(400).json(error))
 },

 find (req, res) {
     return Race.findAll({
         where: {
            id: req.params.raceid,
         }
     })
     .then(Race => res.status(200).json(Race))
     .catch(error => res.status(400).json(error))
  }

};