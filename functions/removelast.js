const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');

module.exports = () => new Promise((resolve, reject) => {
  
  admin.database().ref('/data').orderByKey().limitToLast(1).once('value').then((snapshot) => {
    snapshot.forEach(childSnapshot => {
      admin.database().ref(`/data/${childSnapshot.key}`).remove().then(d => {
        console.log(`${childSnapshot.key} removed`);
        console.log(`succeed`);
        resolve();
      });
    });
  });
});
