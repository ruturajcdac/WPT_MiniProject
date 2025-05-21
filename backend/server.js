// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const app = express();
const secretKey = '36fdf1d61e6e0c2e41b9c927c732cee6ba82a2bf5c1f1104c6b3939641a84f47'; // Replace with a strong, secret key (environment variable in production)
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your MySQL host
  user: 'root',      // Your MySQL username
  password: 'cdac', // Your MySQL root password
  database: 'projPractice', // The database name you created
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL connected successfully');
  connection.release();
});

// --- API ENDPOINTS WILL GO HERE ---

// POST /api/register - Register a new user
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  pool.execute(
    'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, password],
    (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    }
  );
});

// You'll add more API endpoints here for Login, fetching Users, etc.

// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
  pool.execute('SELECT id, firstName, lastName, email, createdAt, updatedAt FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.status(200).json(results);
  });
});


// DELETE /api/users/:id - Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  pool.execute('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});


app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  pool.execute('SELECT id, firstName, lastName, email FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user for edit:', err);
      return res.status(500).json({ message: 'Error fetching user for edit' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]); // Send back the first (and only) user object
  });
});

// PUT /api/users/:id - Update a user by ID
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body; // Only allowing these to be updated for simplicity

  pool.execute(
    'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
    [firstName, lastName, email, userId],
    (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Error updating user' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    }
  );
});


// POST /api/login - Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  pool.execute('SELECT id, firstName, lastName, email, password FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokenPayload = { id: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

    const userInfo = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    };

    res.status(200).json({ message: 'Login successful', user: userInfo });
  });
});


// POST /api/calculate-ride - Calculate the ride amount
app.post('/api/calculate-ride', async (req, res) => {
  const { fromCity, toCity } = req.body;
  let perKmRate = 0;
  let distance = 0; // You'll need a way to determine the distance

  // Simple logic for perKmRate and distance based on cities
  if (fromCity === 'Delhi' && toCity === 'Mumbai') {
    perKmRate = 2.5;
    distance = 1400; // Example distance
  } else if (fromCity === 'Mumbai' && toCity === 'Delhi') {
    perKmRate = 2.5;
    distance = 1400; // Example distance
  } else if (fromCity === 'Bangalore' && toCity === 'Chennai') {
    perKmRate = 2.0;
    distance = 350; // Example distance
  } else if (fromCity === 'Chennai' && toCity === 'Bangalore') {
    perKmRate = 2.0;
    distance = 350; // Example distance
  } else {
    return res.status(400).json({ message: 'Ride not available for selected cities.' });
  }

  const totalAmount = distance * perKmRate;
  res.json({ totalAmount });
});

// POST /api/book-ride - Book a ride and store in the database
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
  if (err) {
    console.log('Token verification error:', err.message);
    return res.status(403).json({ message: err.message === 'jwt expired' ? 'Session expired. Please log in again.' : 'Invalid token' });
  }
  req.loggedInUser = user;
  next();
});
};

// Apply the authentication middleware to the /api/book-ride route
app.post('/api/book-ride', authenticateToken, async (req, res) => {
  const { fromCity, toCity, amount } = req.body;
  const userId = req.loggedInUser?.id; // User ID is now available from the JWT

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated.' }); // Fallback check
  }

  pool.execute(
    'INSERT INTO rides (userId, fromCity, toCity, date, time, amount) VALUES (?, ?, ?, CURDATE(), CURTIME(), ?)',
    [userId, fromCity, toCity, amount],
    (err, results) => {
      if (err) {
        console.error('Error booking ride:', err);
        return res.status(500).json({ message: 'Error booking ride.' });
      }
      res.json({ message: 'Ride booked successfully!' });
    }
  );
});


// GET /api/my-rides/:userId - Get the previous rides for a specific user
app.get('/api/my-rides/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;

  pool.execute(
    'SELECT id, fromCity, toCity, date, time, amount, createdAt FROM rides WHERE userId = ? ORDER BY createdAt DESC',
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching user rides:', err);
        return res.status(500).json({ message: 'Error fetching your rides.' });
      }
      res.json(results);
    }
  );
});


// ... (server listening code) ...


















app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});