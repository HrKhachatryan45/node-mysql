const db = require('../db/db.config');

const createWorkout = async (req, res) => {
    const {title,duration,callories} = req.body;
    const user = req.user;
    try {
        if (!title || !duration || !callories) {
            return res.status(400).json({error: 'All fields are required'});
        }
        const query = `CREATE TABLE IF NOT EXISTS workouts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            duration INT NOT NULL,
            callories INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        
        await db.query(query);

        const insertQuery = `INSERT INTO workouts (title, duration, callories, user_id) VALUES (?, ?, ?, ?)`;
        await db.query(insertQuery, [title, Number(duration), Number(callories), user.id]);

            const [rows] = await db.query(`
                SELECT * FROM workouts
                  WHERE workouts.user_id = ${user.id}`
                );



        return res.status(200).json({
            user,
            workouts:rows
        });


        
    } catch (error) {
        console.log(error);
    }
}

const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    const user = req.user;
    try {
        const query = `DELETE FROM workouts WHERE id = ? AND user_id = ?`;
        await db.query(query, [id, user.id]);

        const [workouts] = await db.query(`SELECT * FROM workouts WHERE user_id = ?`,[user.id]);
        console.log(workouts,'eu')
        return res.status(200).json(workouts);
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createWorkout,
    deleteWorkout
}
