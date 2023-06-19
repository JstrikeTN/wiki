const express = require('express');
const app = require('./swagger');
const usersRouter = require('./routes/usersRoutes');
const articlesRouter = require('./routes/articlesRoutes');

// Enable CORS middleware
app.use((req, res, next) => {
  // Set headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Pass control to the next middleware
  next();
});

app.use(express.json());
app.use('/api', usersRouter, articlesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});