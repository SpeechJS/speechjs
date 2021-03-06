/* jshint worker: true */
'use strict';

importScripts('../dist/pouchdb-nightly.js');

function bigTest(name) {
  new PouchDB(name, function (err, db) {
    if (err) {
      throw err;
    }
    db.post({
      _id: 'blablah',
      key: 'lala'
    }, function (err) {
      if (err) {
        throw err;
      }
      db.get('blablah', function (err, doc) {
        if (err) {
          throw err;
        }
        self.postMessage(doc.key);
        PouchDB.destroy(name);
      });
    });
  });
}

self.addEventListener('message', function (e) {
  if (e.data === 'ping') {
    self.postMessage('pong');
  }
  if (e.data === 'version') {
    self.postMessage(PouchDB.version);
  }
  if (Array.isArray(e.data) && e.data[0] === 'create') {
    bigTest(e.data[1]);
  }
});
