const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');

module.exports = () => new Promise((resolve, reject) => {
  let allData = admin.database().ref('/stat/hourly');
  allData.once('value').then(snapshot => {
    console.log(`fetching data...`);
    let __cnt = 0;
    snapshot.forEach(childSnapshot => {
      let _val = childSnapshot.val();
      if (_val.time >= 1505599200 && _val.time <= 1506074400) {
        delete _val.tc;
        delete _val.hum;
        delete _val.pressure;
        admin.database().ref(`/stat/hourly/${childSnapshot.key}`).set(_val).then(d => console.log(`${childSnapshot.key} updated`));
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
