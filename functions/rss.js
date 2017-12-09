const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const RSS = require('rss');
const debug = require('debug')('bluesense:rss*');

let feed = new RSS({
  title: 'BlueSense Hourly Data',
  description: 'Hourly summurized data for BlueSense',
  feed_url: 'https://us-central1-bluesense-9e31b.cloudfunctions.net/feed',
  site_url: 'https://bluesense.skyzh.xyz',
//image_url: 'http://example.com/icon.png',
//docs: 'http://example.com/rss/docs.html',
  managingEditor: 'Sky Zhang',
  webMaster: 'Sky Zhang',
  copyright: '2017 Sky Zhang',
  language: 'en',
//categories: [],
  pubDate: new Date(Date.now()),
  ttl: '60'
});

const feed_item = (key, data) => {
  feed.item({
    title:  `Reported at ${moment(data.time * 1000).format('LLLL')}`,
    description: `Reported at ${moment(data.time * 1000).format('LLLL')} | 
    Temperature: ${_.round(data.tc, 2)}°C, 
    Humidity: ${_.round(data.hum, 2)}%, 
    Pressure: ${_.round(data.pressure)} Pa, 
    PM10: ${_.round(data.pm10, 2)} µg/m, 
    PM2.5: ${_.round(data.pm25, 2)} µg/m,    
    `,
    url: 'https://bluesense.skyzh.xyz', // link to the item
    guid: key, // optional - defaults to url
//  categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
    author: 'Sky Zhang', // optional - defaults to feed author property
    date: moment(data.time * 1000).format('LLLL'), // any format that js Date can parse.
  });
};

module.exports = () => new Promise((resolve, reject) => {
  let feed_data = admin.database().ref('/stat/hourly').orderByKey().limitToLast(100);
  feed_data.once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => feed_item(childSnapshot.key, childSnapshot.val()));
    resolve(feed.xml());
  });
});
