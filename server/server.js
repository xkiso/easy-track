const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const trackingController = require('./trackingController');
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.use(express.json());
app.use(cookieParser());

app.get('/tracking', trackingController.packageStatus, (req, res) => {
  res.status(200).json({result: (res.locals.trackingNumbers || res.locals.status)})
});

app.put('/tracking', trackingController.addTracking, (req, res) => {
  res.status(200).json({result: res.locals.trackingNumbers})
});

app.delete('/tracking', trackingController.removeTracking, (req, res) => {
  res.status(200).json({result: res.locals.trackingNumbers})
});

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});

// DEV: frontEnd: 8080, backend: 3000
// PROD: front+backend: 3000