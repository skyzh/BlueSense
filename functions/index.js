const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.updateStat = functions.https.onRequest((req, res) => {
  if (req.query.key == functions.config().bluesense.key) {
    require('./stat.js')()
      .then(() => require('./cleanup.js')())
      .then(() => {
        res.status(200).send('success');
      });
  } else {
    res.status(403).send('Invaild Key');
  }
});

exports.cleanUp = functions.https.onRequest((req, res) => {
  if (req.query.key == functions.config().bluesense.key) {
    require('./cleanup.js')().then(() => {
      res.status(200).send('success');
    });
  } else {
    res.status(403).send('Invaild Key');
  }
});
