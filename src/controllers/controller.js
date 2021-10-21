const Driver = require('../models').Driver;
const Race = require('../models').Race;
const Lap = require('../models').Lap;
const Participation = require('../models').Participation;
var helper = require('../routes/helper');
const { sequelize } = require("../models");

const default_data = require('../data/drivers_karts_Back.json');
var POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

module.exports = {
    async import(req, res) {
        //Checking data format is avoided for simplicity
        try {
            for (const driver of req.body) {
                const new_driver = await Driver.findOrCreate({
                    where: {
                        _id: driver._id,
                        name: driver.name, team: driver.team, age: driver.age, picture: driver.picture
                    }
                });
                for (const race of driver.races) {
                    const new_race = await Race.findOrCreate({ where: { name: race.name } });
                    for (const lap of race.laps) {
                        await Lap.create({
                            DriverId: new_driver[0].id,
                            RaceId: new_race[0].id,
                            time: lap.time
                        });
                    }
                    await Participation.findOrCreate({
                        where: {
                            DriverId: new_driver[0].id,
                            RaceId: new_race[0].id,
                            total_time: helper.getTotalTimeByRace(race.laps).toISOString(),
                            best_lap: helper.getFastestLap(race.laps)
                        }
                    })
                }
            }

            module.exports.updateClassification()
        }
        catch (error) {
            res.status(500).json("Error importing" + error);
        }

        res.status(200).json("Imported successfully");
    },
    async updateClassification() {
        // Update all the instances refreshing points and position by race
        try {
            const races = await Race.findAll({});
            for (const race of races) {
                const participations = await Participation.findAll({ where: { RaceId: race.id } });
                // Extract fastest lap of the race
                let fastest_lap = JSON.parse(JSON.stringify(participations)) // deep copy
                    .sort((a, b) => (a.best_lap < b.best_lap) ? -1 : ((a.best_lap > b.best_lap) ? 1 : 0))[0];
                // Order drivers by total time
                participations.sort((a, b) => (a.total_time < b.total_time) ? -1 : ((a.total_time > b.total_time) ? 1 : 0));
                // Add position and points fields
                participations.map(async function (part, index) {
                    //Points by position
                    part.position = index + 1
                    part.points = (index < 10) ? POINTS_TABLE[index] : 0;
                    part.points += (part.DriverId === fastest_lap.DriverId) ? 1 : 0;
                    //Update participations
                    await Participation.update({
                        points: part.points,
                        position: part.position
                    },
                        { where: { id: part.id } });
                });
            }
        } catch (error) {
            throw new Error('Could not update Classification')
        }
    },
    export(_, res) {
        return Driver.findAll({
            include: {
                model: Race,
                /*through: { attributes: [] }*/
                include: {
                    model: Lap,
                    /*through: { attributes: ['name'] }*/
                }
            }
        })
            .then(Driver => res.status(200).json(Driver))
            .catch(error => res.status(400).json(error))
    },

    async classif(req, res) {

        Participation.findAll({
            include: { Driver },
            attributes: {
                include: [
                    [sequelize.fn('SUM', sequelize.col('points')), 'total_points']
                ]
            },
            order: ['position']
        })
        .then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))
    }

};