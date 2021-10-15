const { Router, request } = require('express');
const router = Router();
const moment = require('moment');

// Data source
const data = require('../data/drivers_karts_Back.json');

// Get general classification of all races
router.get('/', (req, res) => {
   
    res.json(result);
});

// Get classification of one race
router.get('/:id', (req, res) => {
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


module.exports = router;