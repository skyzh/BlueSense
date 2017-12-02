const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('bluesense:stat*');

module.exports = () => new Promise((resolve, reject) => {
  admin.database().ref('/stat/lstObject').once('value').then((lstObject) => {
    lstObject = lstObject.val() || null;
    let allData = lstObject
      ? admin.database().ref('/data').orderByKey().startAt(lstObject)
      : admin.database().ref('/data');
    console.info(`calculating from ${lstObject}`);
    allData.once('value').then(snapshot => {
      console.info(`fetching data...`);
      let data = [];
      snapshot.forEach(childSnapshot => { data.push([childSnapshot.key, childSnapshot.val()]); });
      if (lstObject) data.shift();
      console.info(`filtering data...`);
      _.chain(data).chunk(60).filter(d => d.length == 60).value().forEach(v => {
        let _p = { };
        _.forEach(['hum', 'pm01', 'pm10', 'pm25', 'tc', 'pressure'], k => {
          let __tmp = _.chain(v).map(d => d[1]).map(k).mean().value();
          if (__tmp) _p[k] = __tmp;
        })
        _p.time = _.last(v)[1].time;
        lstObject = _.last(v)[0];
        admin.database().ref('/stat/hourly').push(_p).then(d => 0);
        console.info(`pushing ${moment(_p.time * 1000).format('LLLL')}`)
      });
      admin.database().ref('/stat/lstObject').set(lstObject).then(d => 0);
      console.info(`succeed`);
      resolve();
    });
  });
});
