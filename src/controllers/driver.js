const Driver = require('../models').Driver;
const Participation = require('../models').Participation;
const Race = require('../models').Race;

module.exports = {

 create(req, res) {
    return Driver
        .create (req.body)
        .then(Driver => res.status(200).json(Driver))
        .catch(error => res.status(400).json(error))
 },

 list(_, res) {
    return Driver.findAll({ include: { model: Participation, include: Race }})
        .then(Driver => res.status(200).json(Driver))
        .catch(error => res.status(400).json(error))
},

find (req, res) {
    return Driver.findAll({
        where: {
            id: req.params.driverid,
        }
    })
    .then(Driver => res.status(200).json(Driver))
    .catch(error => res.status(400).json(error))
}

};