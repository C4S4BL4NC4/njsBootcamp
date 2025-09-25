const express = require('express');
const app = express(); // Add bunch of methods to app variable.

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Renold',
    age: 2,
    breed: 'German Shepherd',
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
