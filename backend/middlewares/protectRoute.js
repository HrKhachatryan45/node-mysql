const jwt = require('jsonwebtoken');
const db = require('../db/db.config');
module.exports =async (req, res, next) => {
    try{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const query = `SELECT * FROM users WHERE id = '${decoded.userID}'`

    const [user] = await db.query(query);

    if (!user[0]) {
        return res.status(401).json({ message: 'User not found' });
    }
    req.user = user[0];

    
    next();
    }catch(err){
       if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'expired' }); // logout in frontend
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

}