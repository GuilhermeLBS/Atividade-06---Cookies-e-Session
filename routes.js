const express = require('express');
const isAuthenticated = require('./authMiddleware');
const router = express.Router();
const path = require('path');

const users = { user: 'password123' };

// Rota de login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.authenticated = true;
    req.session.user = username;
    res.cookie('user', username);
    res.redirect('/protected');
  } else {
    res.send('Login failed');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user');
  res.send('You have been logged out.');
});

// Página protegida (usando o middleware de autenticação)
router.get('/protected', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'protected.html'));
});

module.exports = router;
