const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/login', userController.login);
router.all('/validate', userController.verifyToken, (req, res) => {
  console.log('request',req)
  // If the middleware (verifyToken) successfully executes, it means the token is valid
  res.json({ message: 'Token is valid' });
});

module.exports = router;



