const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//Initialization
let vehicles = [
    { vehicle_id: 132456, type: 'Scooter', lock_status: 'Lock', current_speed: 0, battery_level: 100, status: 'PARKING', location: '3.142,012', last_updated: '2019-07-02 9:00AM' },
    { vehicle_id: 987654, type: 'Scooter', lock_status: 'Unlock', current_speed: 5, battery_level: 75, status: 'MOVING', location: '2.125,114', last_updated: '2019-07-02 10:00AM' },
    { vehicle_id: 569825, type: 'Scooter', lock_status: 'Unlock', current_speed: 0, battery_level: 50, status: 'IDLING', location: '4.125,114', last_updated: '2019-07-02 10:00AM' },
    { vehicle_id: 125864, type: 'Scooter', lock_status: 'Lock', current_speed: 0, battery_level: 15, status: 'TOWING', location: '5.125,114', last_updated: '2019-07-02 10:00AM' }
];

// GET all vehicles
app.get('/api/vehicles', (req, res) => {
    res.json(vehicles);
});

// GET a vehicle by ID
app.get('/api/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.vehicle_id === parseInt(req.params.id));
    if (vehicle) {
        res.json(vehicle);
    } else {
        res.status(404).send('Vehicle not found');
    }
});

// POST a new vehicle
app.post('/api/vehicles', (req, res) => {
    const newVehicle = req.body;
    vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
});

// PUT update a vehicle by ID
app.put('/api/vehicles/:id', (req, res) => {
    const vehicleIndex = vehicles.findIndex(v => v.vehicle_id === parseInt(req.params.id));
    if (vehicleIndex !== -1) {
        vehicles[vehicleIndex] = { ...vehicles[vehicleIndex], ...req.body };
        res.json(vehicles[vehicleIndex]);
    } else {
        res.status(404).send('Vehicle not found');
    }
});

// DELETE a vehicle by ID
app.delete('/api/vehicles/:id', (req, res) => {
    const vehicleIndex = vehicles.findIndex(v => v.vehicle_id === parseInt(req.params.id));
    if (vehicleIndex !== -1) {
        vehicles.splice(vehicleIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Vehicle not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
