const router = require('express').Router();
const registerUser = require('../controllers/authController');

router.post('/new',registerUser);

module.exports = router;