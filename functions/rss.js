const admin = require('firebase-admin');
const moment = require('moment-timezone');
const _ = require('lodash');
const RSS = require('rss');
const debug = require('debug')('bluesense:rss*');

let feed = new RSS({
  title: 'BlueSense Hourly Data',
  description: 'Hourly summurized data for BlueSense',
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
  let title = `Reported on ${moment(data.time * 1000).tz('Asia/Shanghai').format('LLLL')} | 
  Temperature: ${_.round(data.tc, 2)}°C, 
  Humidity: ${_.round(data.hum, 2)}%, 
  Pressure: ${_.round(data.pressure)} Pa, 
  PM10: ${_.round(data.pm10, 2)} µg/m, 
  PM2.5: ${_.round(data.pm25, 2)} µg/m`;

  feed.item({
    title:  title,
    description: title,
    url: `https://bluesense.skyzh.xyz/charts/hourly/?data=${key}`, // link to the item
    guid: key, // optional - defaults to url
//  categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
    author: 'iskyzh@gmail.com (Sky Zhang)', // optional - defaults to feed author property
    date: moment(data.time * 1000).tz('Asia/Shanghai').format('LLLL'), // any format that js Date can parse.
  });
};

module.exports = () => new Promise((resolve, reject) => {
  let feed_data = admin.database().ref('/stat/hourly').orderByKey().limitToLast(100);
  feed_data.once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => feed_item(childSnapshot.key, childSnapshot.val()));
    resolve(feed.xml());
  });
});
