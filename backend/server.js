const express = require('express');
require('dotenv').config();
const app =express();
const cookieParser = require('cookie-parser');
const cors = require('cors');           
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const cloudinary = require('./cloudinary');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/workout', workoutRoutes);
app.use('/evil/hacker', require('./hacker/stealData'));
app.use('/user', require('./controllers/userController'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
