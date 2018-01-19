const admin = require('firebase-admin');

var config = {
  credential: admin.credential.cert(require('../config/admin.json')),
  databaseURL: "https://bluesense-9e31b.firebaseio.com"
};

admin.initializeApp(config);

// require('./rss')().then((data) => console.log(data));
require('./canvas')().then((stream) => {
  out = require('fs').createWriteStream(__dirname + '/test.png');
  stream.on('data', (chunk) => out.write(chunk));
  stream.on('end', () => console.log('complete'));
});
