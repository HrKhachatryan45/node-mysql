const validator = require('validator');
const db = require('../db/db.config');
module.exports =async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long' });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ error: 'Email is not valid' });
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ error: 'Password is not strong' });
        }


             const [rows] = await db.query(
               `SELECT COUNT(*) as count
               FROM information_schema.tables 
               WHERE table_schema = ? AND table_name = ?`,
               ['exampledb', 'users'] 
             );

             if (rows[0].count > 0) {
             console.log('✅ Table exists');
             
                    const [user] =await db.query(`SELECT * FROM users  WHERE email = '${email}'`);
                    
                    if (user.length > 0 && user != []) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }

             } else {
             console.log('❌ Table does not exist');
             }



        next();
        
    } catch (error) {
        console.log(error);
        
    }
};