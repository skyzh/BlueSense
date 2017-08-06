const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');

module.exports = () => new Promise((resolve, reject) => {
  admin.database().ref('/stat/lstClenup').once('value').then((lstObject) => {
    lstObject = lstObject.val() || null;
    let allData = lstObject
      ? admin.database().ref('/data').orderByKey().startAt(lstObject)
      : admin.database().ref('/data');
    console.log(`calculating from ${lstObject}`);
    allData.once('value').then(snapshot => {
      console.log(`fetching data...`);
      let __cnt = 0;
      snapshot.forEach(childSnapshot => {
        lstObject = childSnapshot.key;
        let _val = childSnapshot.val();
        if (_val['pressure'] <= 90000) {
          admin.database().ref(`/data/${childSnapshot.key}`).remove().then(d => console.log(`${childSnapshot.key} removed`));
        }
        ++__cnt;
        if (__cnt % 100 == 0) {
          console.log(`processing ${childSnapshot.key}, ${__cnt}`);
          admin.database().ref('/stat/lstClenup').set(childSnapshot.key).then(d => 0);
        }
      });
      admin.database().ref('/stat/lstClenup').set(lstObject).then(d => 0);
      console.log(`succeed`);
      resolve();
    });
  });
});
