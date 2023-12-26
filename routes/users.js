// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const Student = require('../models/student');
// const Teacher = require('../models/teacher');
// // const Admin = require('./models/Admin');
// // const Head = require('./models/Head');

// const router = express.Router();

// router.post('/login', async (req, res) => {
//     const users = ["qasim", "usman"]
//   const { userType, username, password } = req.body;

//   try {
//     let user = null;

//     switch (userType) {
//       case 'Student':
//         // user = await Student.findOne({ username });
//         user = users.find(username);
//         break;
//       case 'Teacher':
//         // user = await Teacher.findOne({ username });
//         user = users.findOne({ username });
//         break;
//     //   case 'Admin':
//     //     user = await Admin.findOne({ username });
//     //     break;
//     //   case 'Head':
//     //     user = await Head.findOne({ username });
//     //     break;
//       default:
//         return res.status(400).json({ message: 'Invalid user type' });
//     }

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate password using bcrypt
//     const passwordMatch = await bcrypt.compare(password, "hello");
//     // const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Password matches - generate JWT token
//     const token = jwt.sign({ userId: user._id, userType }, 'your_secret_key', { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;

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



