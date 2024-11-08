const router = require('express').Router();
const { registerUser, login } = require('../controllers/authController');


router.post('/new', registerUser);
router.post('/login', login);

module.exports = router;