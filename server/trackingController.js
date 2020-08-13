const axios = require('axios');
const jwt = require('jsonwebtoken');
// const Cookies = require('cookies')

const { API_KEY, SECRET_KEY } = require('./secret.js');
const { request } = require('express');

const trackingController = {};

trackingController.packageStatus = (req, res, next) => {
  let { trackingNumber, carrier } = req.query;
  
  if (!trackingNumber) {
    let trackingNumbers = jwt.verify(req.cookies.sid, SECRET_KEY, (err, decoded) => {
      if (err) {
  
      }
      let sid = decoded || {};
      delete sid[trackingNumber];
      return sid;
    })
    res.locals.trackingNumbers = trackingNumbers;
    next();
  }
  else {
    axios.get(`https://api.shipengine.com/v1/tracking?carrier_code=${carrier}&tracking_number=${trackingNumber}`, {
      headers: { 'api-key': API_KEY }
    })
    .then(data => {
      console.log(data.data);
      res.locals.status = data.data;
      next();
    })
    .catch(err => {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) { // request made, but no response received
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    });
  }
}

trackingController.addTracking = async (req, res, next) => {
  let { trackingNumber, label, carrier } = req.query;
  let sid = {};

  if (req.cookies.sid) {
    await jwt.verify(req.cookies.sid, SECRET_KEY, (err, decoded) => {
      if (err) {
        // TODO
      }
      sid = decoded ? {...decoded.data} : {};
      sid[trackingNumber] = { label, carrier };
    })
  } else {
    sid[trackingNumber] = { label, carrier };
    console.log('addTracking verify', sid);
  }

  await jwt.sign({data: sid}, SECRET_KEY, { expiresIn: '182d'}, (err, token) => {
    if (err) {
      // TODO
      console.log(err);
    }
    console.log('req.cookies.sid', req.cookies.sid);
    try {
      res.cookie('sid', token);
    } catch (err) {
      console.log(err);
    }
    console.log('sid: ', sid);
    res.locals.trackingNumbers = sid;
    next();
  });

}

trackingController.removeTracking = async (req, res, next) => {
  let { trackingNumber } = req.query;
  let sid = {};
  jwt.verify(req.cookies.sid, SECRET_KEY, (err, decoded) => {
    if (err) {
      // TODO
    }
    console.log('decoded:', decoded);
    sid = decoded ? {...decoded.data} : {};
    delete sid[trackingNumber];

    jwt.sign({data: sid}, SECRET_KEY, { expiresIn: '182d'}, (err, token) => {
      if (err) {
        // TODO
      }
      res.cookie('sid', token);
      res.locals.trackingNumbers = sid;
      next();
    });
  })
}

module.exports = trackingController;