# Carl-Karts
NodeJS API REST exercise

## Overview
Our client "Carl-Karts", is going to manage the World Kart Championship in his circuit, and they will need a system display to classify the pilots.
He has developed a web application where you can see the overall ranking of all the drivers who have participated in the 10 races that made up this championship. But they need a REST API to provide to the web all this information, and that's why they contacted us. 

The REST API must publish, at least, the following endpoints:

*   General classification (all races) (Driver - Total time - Points)
*   Individual race classification (Driver - Total time - Best lap - Points)
* Drivers details (Race - Total time - Best lap - Points)
* Import data from JSON (Pilots list with their data)
* Export data to JSON (Pilots list with their data)
* Add pilot (Pilot data)
* Add Race (Race data)
* Add Lap (Pilot - Time)


### Running the server
Dependencies:
* Must have NodeJs installed
* Must have PostgreSQL installed
* Installed node dependicies on package.json
* Install sequelize-cli

To create the database, run:

```
npm install -g sequelize-cli
npm run db:create
npm run db:migrate
```
To run the server, run:

```
npm start
```
To view the api documentation, open in your browser:

```
http://localhost:3000/api-docs
```

First step MUST be importing data, make a POST request to:
```
POST/ http://localhost:3000/api/import
BODY: 'data/drivers_karts_Back.json'
```
with the information contained in data/drivers_karts_Back.json