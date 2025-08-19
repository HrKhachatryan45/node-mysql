const db = require('../db/db.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary');
const { OAuth2Client } = require("google-auth-library");
const express = require('express');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const register = async (req, res) => {
    const {username,email,password} = req.body;
    try{
        const query = `CREATE TABLE  IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            profile_image VARCHAR(255) DEFAULT ''
        )`
      await db.query(query);

        const hashedPassword = await bcrypt.hash(password, 10);

        
        // const insertQuery = `INSERT INTO users(username, email, password) VALUES('${username}', '${email}', '${hashedPassword}')`;

        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

       await db.query(insertQuery,[username,email,hashedPassword])

       const [result] =  await db.query(`SELECT id FROM users WHERE email ='${email}'`)

      const userID = result[0]?.id

    if (userID) {
        const token = jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"3d"})
        // res.cookie('jwt',token,{
        //         maxAge: 3 * 24 * 60 * 60 * 1000,
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === 'development',
        //         sameSite:'strict'
        //     })
        
                return res.status(200).json({
                user:{
                    id:userID,
                    username,
                    email,
                    profile_image:''
                },
                workouts:[],
                token
                });

    }

       
    }catch(err){
        console.log(err);
    }
}
const registerGoogle = async (req, res) => {
    const {token} = req.body;
    try{
        const query = `CREATE TABLE  IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            profile_image VARCHAR(255) DEFAULT ''
        )`

         await db.query(query);


        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture, sub } = ticket.getPayload();



       let [user] =  await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        if (user.length > 0) {
          return  res.status(400).json({error:'User with this Google Account exists'});
        }

        await db.query(`INSERT INTO users (username,email,password,profile_image) VALUES(?,?,?,?)`,[name,email,sub,picture]);

        const [result] = await db.query(`SELECT id FROM users WHERE email ='${email}'`)
        const userID = result[0]?.id

        if (userID) {
            const token = jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"3d"})
            // res.cookie('jwt',token,{
            //         maxAge: 3 * 24 * 60 * 60 * 1000,
            //         httpOnly: true,
            //         secure: process.env.NODE_ENV === 'development',
            //         sameSite:'strict'
            //     })
            
                    return res.status(200).json({
                    user:{
                        id:userID,
                        username:name,
                        email,
                        profile_image:picture
                    },
                    workouts:[],
                    token
                    });
        }


    }catch(err){
        console.log(err);
    }
}

const loginGoogle = async (req, res) => {
    const {token} = req.body;
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture, sub } = ticket.getPayload();

        let [userRows] = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

        let user = userRows[0];

        if (!user) {
            return res.status(400).json({ error: "Please register with Google first." });
        }

         if (user.password !== 'GOOGLE_USER' && user.password !== sub) {
             return res.status(403).json({ error: "This email is registered with a password. Use normal login." });
         }

         const tokenJWT = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: "3d" });


           let rows;
         const [workoutRows] = await db.query(
               `SELECT COUNT(*) as count
               FROM information_schema.tables 
               WHERE table_schema = ? AND table_name = ?`,
               ['exampledb', 'workouts'] 
             );

                  if (workoutRows[0].count > 0) {
                  [rows] = await db.query(`
                    SELECT * FROM workouts
                    WHERE workouts.user_id = ${user.id}`
                    );
             }else{
                rows = []
             }

             return res.status(200).json({
                user:{
                    id:user.id,
                    username:user.username,
                    email:user.email,
                    profile_image:user.profile_image
                },
                workouts:rows,
                token:tokenJWT
             })


        
    }catch(err){
        console.log(err);
    }
}


const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        const [user] = await db.query(query);

        if (!email || !password) {
            return res.status(400).json({error:'All fields are required'})
            
        }

        if(!user[0]){
            return res.status(400).json({error:'User not found'})
        }
        const isMatch = await bcrypt.compare(password,user[0].password)
        if(!isMatch){
            return res.status(400).json({error:'Incorrect password'})
        }
        const token = jwt.sign({userID:user[0].id},process.env.JWT_SECRET,{expiresIn:"3d"})
        // res.cookie('jwt',token,{
        //     maxAge: 3 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'development',
        //     sameSite:'strict'
        // })
        let rows;
         const [workoutRows] = await db.query(
               `SELECT COUNT(*) as count
               FROM information_schema.tables 
               WHERE table_schema = ? AND table_name = ?`,
               ['exampledb', 'workouts'] 
             );

                  if (workoutRows[0].count > 0) {
                  [rows] = await db.query(`
                    SELECT * FROM workouts
                    WHERE workouts.user_id = ${user[0].id}`
                    );
             }else{
                rows = []
             }


                return res.status(200).json({
                    user:{
                        id:user[0].id,
                        username:user[0].username,
                        email:user[0].email,
                        profile_image:user[0].profile_image
                    },
                    workouts:rows,
                    token
                });



    }catch(err){
        console.log(err);
    }
}

const logout = async (req, res) => {
    try{
        req.user = null;

        res.status(200).json({msg:"logged out successfully"})

    }catch(err){
        console.log(err);
    }
}

const addProfileImage = async (req, res) => {
    try {
        const user = req.user;
        let image;

        if (req.file.path) {
             image = req.file.path;
        }
        
        const uploadUrl =  await  cloudinary.uploader.upload(image)

        const imageUrl = uploadUrl.secure_url;


        await db.query(`UPDATE users SET profile_image = ?  WHERE id = ?`,[imageUrl,user.id]);


           const [workoutRows] = await db.query(
               `SELECT COUNT(*) as count
               FROM information_schema.tables 
               WHERE table_schema = ? AND table_name = ?`,
               ['exampledb', 'workouts'] 
             );

             if (workoutRows[0].count > 0) {
                 const [rows] = await db.query(`
                    SELECT * FROM workouts
                    WHERE workouts.user_id = ${user.id}`
                    );
             }else{
                rows = []
             }

            

        res.status(200).json({
            user:{
                id:user.id,
                username:user.username,
                email:user.email,
                profile_image:imageUrl
            },
            workouts:rows
        })

        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    registerGoogle,
    login,
    logout,
    addProfileImage,
    loginGoogle
}