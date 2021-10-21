const Driver = require('../models').Driver;
const Participation = require('../models').Participation;
const Race = require('../models').Race;
const { sequelize } = require('../models');

module.exports = {

 create(req, res) {
    return Driver
        .create (req.body)
        .then(Driver => res.status(201).json(Driver))
        .catch(error => res.status(400).json(error))
 },

 list(_, res) {
    Driver.findAll({ include: { model: Participation, include: Race }})
        .then(Driver => res.status(200).json(Driver))
        .catch(error => res.status(400).json(error))
},

find (req, res) {
    //Participation.sum('points', { where: { DriverId: req.params.driverid } })
    Driver.findAll({
        where: {
            _id: req.params.driverid,
        },
        include: { 
            model: Participation, 
            attributes: ['position', 'points', 'best_lap', 'total_time'],
            include: {
                model: Race,
                attributes: ['name']
            }
        }
    })
    .then(Driver => res.status(200).json(Driver))
    .catch(error => res.status(400).json(error))
}

};