const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('bluesense:cleanup*');

module.exports = () => new Promise((resolve, reject) => {
  let allData = admin.database().ref('/data');
  debug(`fetching data...`);
  allData.once('value').then(snapshot => {
    debug(`processing data...`);
    let __cnt = 0;
    snapshot.forEach(childSnapshot => {
      let _val = childSnapshot.val();
      if (_val.time <= (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000) {
        admin.database().ref(`/data/${childSnapshot.key}`).remove().then(d => console.log(`${childSnapshot.key} removed`));
      }
      ++__cnt;
      if (__cnt % 100 == 0) {
        debug(`processing ${childSnapshot.key}, ${__cnt}`);
      }
    });
    debug(`succeed`);
    resolve();
  });
});
