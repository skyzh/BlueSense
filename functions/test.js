const admin = require('firebase-admin');

var config = {
  credential: admin.credential.cert(require('../config/admin.json')),
  databaseURL: "https://bluesense-9e31b.firebaseio.com"
};

admin.initializeApp(config);

require('./stat')().then(() => console.log('terminated'));