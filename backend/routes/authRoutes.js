const express = require('express');
const { register, login,loginGoogle, addProfileImage,registerGoogle, logout} = require('../controllers/authController');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const validateUser = require('../middlewares/validateUser');
const protectRoute = require('../middlewares/protectRoute');
const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_images',
        allowed_formats: ['jpg', 'png', 'jpeg','webp','gif','jfif','avif'],
        public_id: (req, file) => {
            const date = new Date().getTime();
            const uniqueName = date + '-' + file.originalname.split('.')[0];
            return uniqueName; 
        },
    },
})

const upload = multer({storage: storage});

router.post('/register',validateUser,register);
router.post('/register/google',registerGoogle)
router.post('/login',login);
router.post('/login/google',loginGoogle)
router.post('/uploadProfileImage',protectRoute,upload.single('image'),addProfileImage)
router.post('/logout',logout)
module.exports = router;