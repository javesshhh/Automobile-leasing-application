const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// Get all cars - accessible to all authenticated users
router.get("/getallcars", authMiddleware, async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Add a new car - admin only
router.post("/addcar", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.send('CAR added successfully');
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Edit a car - admin only
router.post("/editcar", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.body._id });
        car.name = req.body.name;
        car.image = req.body.image;
        car.fuelType = req.body.fuelType;
        car.rentPerHour = req.body.rentPerHour;
        car.capacity = req.body.capacity;

        await car.save();
        res.send('CAR updated successfully');
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Delete a car - admin only
router.post("/deletecar", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await Car.findOneAndDelete({ _id: req.body.carid });
        res.send('CAR deleted successfully');
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;