const admin = require('firebase-admin');
const moment = require('moment-timezone');
const _ = require('lodash');
const RSS = require('rss');
const debug = require('debug')('bluesense:rss*');

module.exports = () => new Promise((resolve, reject) => {
  let feed = new RSS({
    title: 'BlueSense Hourly Data',
    description: 'Hourly summurized data of BlueSense',
    feed_url: 'https://bluesense.skyzh.xyz/feed',
    site_url: 'https://bluesense.skyzh.xyz',
  //image_url: 'http://example.com/icon.png',
  //docs: 'http://example.com/rss/docs.html',
    managingEditor: 'iskyzh@gmail.com (Sky Zhang)',
    webMaster: 'iskyzh@gmail.com (Sky Zhang)',
    copyright: '2017 Sky Zhang',
    language: 'en',
  //categories: [],
    pubDate: new Date(Date.now()),
    ttl: '60'
  });
  
  const feed_item = (key, data) => {
    feed.item({
      title:  `Reported on ${moment(data.time * 1000).tz('Asia/Shanghai').format('LLLL')}`,
      description: `
        <b>Temperature</b>: ${_.round(data.tc, 2)}°C, 
        <b>Humidity</b>: ${_.round(data.hum, 2)}%, 
        <b>Pressure</b>: ${_.round(data.pressure)} Pa, 
        <b>PM10</b>: ${_.round(data.pm10, 2)} µg/m3, 
        <b>PM2.5</b>: ${_.round(data.pm25, 2)} µg/m3
       `,
      url: `https://bluesense.skyzh.xyz/charts/hourly/?data=${key}`, // link to the item
      guid: `https://bluesense.skyzh.xyz/charts/hourly/?data=${key}`, // optional - defaults to url
  //  categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
      author: 'iskyzh@gmail.com (Sky Zhang)', // optional - defaults to feed author property
      date: moment(data.time * 1000).tz('Asia/Shanghai').format('LLLL'), // any format that js Date can parse.
    });
  };
  
  let feed_data = admin.database().ref('/stat/hourly').orderByKey().limitToLast(100);
  feed_data.once('value').then(snapshot => {
    let __data = [];
    snapshot.forEach(childSnapshot => { __data.push([childSnapshot.key, childSnapshot.val()]); });
    _.reverse(__data);
    _.forEach(__data, child => { feed_item(child[0], child[1]); });
    resolve(feed.xml());
  });
});
