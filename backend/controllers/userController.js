const express = require('express');
const router = express.Router();
const db = require('../db/db.config');

router.get('/getUsers',async (req, res) => {
    try {
        const [users] = await db.query('SELECT username,email FROM users');

        console.log(users);
        
        
        res.status(200).json(users);

        
    } catch (error) {
        
    }
});

module.exports = router;