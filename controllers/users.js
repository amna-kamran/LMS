
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');



module.exports.login = async (req, res) => {
    // Sample array of user objects
const users = [
    { userType: 'Student', username: 'qasim', password: '$2b$10$examplehashedpassword' }, // Replace examplehashedpassword with an actual hashed password
    { userType: 'Teacher', username: 'usman', password: '$2b$10$examplehashedpassword' } // Replace examplehashedpassword with an actual hashed password
    // Add other user objects as needed
  ];
  const { userType, username, password } = req.body;

  try {
    const user = users.find(user => user.username === username && user.userType === userType);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password using bcrypt
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = () => {
      if (password === user.password)      
        return true
      return false
    };

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password matches - generate JWT token
    const token = jwt.sign({ userId: user._id, userType }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token',token)
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    else{
        jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid token' });
            }
            req.decoded = decoded;
            next();
          });        
    }
  }