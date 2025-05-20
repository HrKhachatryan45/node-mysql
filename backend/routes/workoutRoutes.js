const express = require('express');
const protectRoute = require('../middlewares/protectRoute');
const { createWorkout,deleteWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.post('/create',protectRoute,createWorkout)
router.delete('/delete/:id',protectRoute,deleteWorkout)

module.exports = router;