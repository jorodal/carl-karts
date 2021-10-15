const { Router, request } = require('express');
const router = Router();
const moment = require('moment');

// Data source
const data = require('../data/drivers_karts_Back.json');

POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]

function getTotalTimeByRace(laps) {
    return laps.reduce((acc, time) => acc.add(moment.duration(time.time)), moment.duration());
}

function getFastestLap(laps) {
    return laps.sort((a, b) => (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0))[0].time;
}

function getTimesMatrix(data) {
    // Without indexing the race name(possible problem: wrong indexation if they are not ordered)
    //return data.map(pilots => pilots.races.map(race =>getTotalTimeByRace(race.laps)));
    
    // We use the race name to avoid problem with the order indexation
    return data.map(pilots => pilots.races.map(function(race) { 
        let aux = {};
        //aux.race = race.name
        aux.pilot_id = pilots._id;
        aux.pilot = pilots.name;
        aux.team = pilots.team;
        aux.fastest_lap = getFastestLap(race.laps);
        aux.time = getTotalTimeByRace(race.laps);
        
        return aux; 
    }));
}

function getClassificationByRace(matrix, raceNumber) {
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
};

// Get general race classification of all races
router.get('/races', (req, res) => {

    let timesMatrix = getTimesMatrix(data); 
    let result = {} 
    for(var i = 0; i < 10; i++){
        result = { ...result, ["Race "+i]: getClassificationByRace(timesMatrix, i) };
    }
   
    res.json(result);
});

// Get race classification of one race
router.get('/race/:id', (req, res) => {
    const { id } = req.params;
    //const { title, director, year, rating } = req.body;
    if (id) {
        let timesMatrix = getTimesMatrix(data); 
        res.json({ race:"Race "+id, result: getClassificationByRace(timesMatrix, id)});
    }
    else {
        res.status(500).json({ "error": "Invalid id" });
    }
});

// Get drivers info
router.get('/drivers', (req, res) => {
    
    res.json(getTimesMatrix(data));
 
});


module.exports = router;