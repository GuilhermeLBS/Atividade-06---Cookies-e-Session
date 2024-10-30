// app.js

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);

// Rota para página "Não Encontrada"
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
