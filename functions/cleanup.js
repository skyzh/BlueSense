const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');

module.exports = () => new Promise((resolve, reject) => {
  let allData = admin.database().ref('/data');
  allData.once('value').then(snapshot => {
    console.log(`fetching data...`);
    let __cnt = 0;
    snapshot.forEach(childSnapshot => {
      let _val = childSnapshot.val();
      if (_val.time <= (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000) {
        admin.database().ref(`/data/${childSnapshot.key}`).remove().then(d => console.log(`${childSnapshot.key} removed`));
      }
      ++__cnt;
      if (__cnt % 100 == 0) {
        console.log(`processing ${childSnapshot.key}, ${__cnt}`);
      }
    });
    console.log(`succeed`);
    resolve();
  });
});
