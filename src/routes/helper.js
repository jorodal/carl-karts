'use strict';
const moment = require('moment');

var POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

module.exports = {
    getTotalTimeByRace: function(laps) {
        return laps.reduce((acc, time) => acc.add(moment.duration(time.time)), moment.duration());
    },

    getFastestLap: function(laps) {
        return laps.sort((a, b) => (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0))[0].time;
    },

    getTimesMatrix: function(data) {
        // Without indexing the race name(possible problem: wrong indexation if they are not ordered)
        //return data.map(pilots => pilots.races.map(race =>getTotalTimeByRace(race.laps)));
        
        // We use the race name to avoid problem with the order indexation
        return data.map(pilots => pilots.races.map(function(race) { 
            let aux = {};
            //aux.race = race.name
            aux.pilot_id = pilots._id;
            aux.pilot = pilots.name;
            aux.team = pilots.team;
            aux.fastest_lap = module.exports.getFastestLap(race.laps);
            aux.time = module.exports.getTotalTimeByRace(race.laps);
            
            return aux; 
        }));
    },
    orderClassificationByRace: function(race) {
        // Extract fastest lap of the race
        let fastest_lap = JSON.parse(JSON.stringify(race)) // deep copy
            .sort((a, b) => (a.best_lap < b.best_lap) ? -1 : ((a.best_lap > b.best_lap) ? 1 : 0))[0];
        // Order drivers by total time
        race.sort((a, b) => (a.total_time < b.total_time) ? -1 : ((a.total_time > b.total_time) ? 1 : 0));
        // Add position and points fields
        race.map(function(race, index) 
            {   
                race.position = index + 1;
                race.points = (index < 10) ? POINTS_TABLE[index] : 0;
                if (race.DriverId == fastest_lap.DriverId){
                    race.points += 1;
                    race.has_fastest_lap = true;
                } else {
                    race.has_fastest_lap = false;
                }
            });

        return race;
    },
    getClassificationByRace: function(matrix, raceNumber) {
        // Extract all pilots times for race
        let race = matrix.map(function(row) {
            return row[raceNumber];
        });
        // Extract fastest lap of the race
        let fastest_lap = JSON.parse(JSON.stringify(race)) // deep copy
            .sort((a, b) => (a.fastest_lap < b.fastest_lap) ? -1 : ((a.fastest_lap > b.fastest_lap) ? 1 : 0))[0];
        // Order drivers by total time
        race.sort((a, b) => (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
        // Add position and points fields
        race.map(function(race, index) 
            {   
                race.position = index + 1;
                race.points = (index < 10) ? POINTS_TABLE[index] : 0;
                if (race.pilot_id == fastest_lap.pilot_id){
                    race.points += 1;
                    race.has_fastest_lap = true;
                } else {
                    race.has_fastest_lap = false;
                }
            });

        return race;
    }
};

