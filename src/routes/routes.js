const { Router, request } = require('express');
const router = Router();
var helper = require('./helper');
// Data source
const data = require('../data/drivers_karts_Back.json');

// Get general race classification of all races
router.get('/races', (req, res) => {
    let timesMatrix = helper.getTimesMatrix(data); 
    let result = {} 
    for(var i = 0; i < 10; i++){
        result = { ...result, ["Race "+i]: helper.getClassificationByRace(timesMatrix, i) };
    }
    res.json(result);
});

// Get race classification of one race
router.get('/race/:id', (req, res) => {
    const { id } = req.params;
    //const { title, director, year, rating } = req.body;
    if (id) {
        let timesMatrix = helper.getTimesMatrix(data); 
        res.json({ race:"Race "+id, result: helper.getClassificationByRace(timesMatrix, id)});
    }
    else {
        res.status(500).json({ "error": "Invalid id" });
    }
});

// Get drivers info
router.get('/drivers', (req, res) => {
    
    res.json(data);
 
});

// Get drivers data by pilot id
router.get('/driver/:pilotid', (req, res) => {
    const { pilotid } = req.params;
    if (pilotid) {
        let pilot = data.filter(pilot => pilot._id === pilotid);
        if (pilot)
            res.status(200).json(pilot);
        else
        res.status(401).json({ "error": "Invalid pilot id" }); 
    }
    else {
        res.status(402).json({ "error": "Please insert a pilot id" });
    }
});


module.exports = router;