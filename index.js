/**
 * Module Dependencies
 */

var yieldly = require('yieldly');

/**
 * Export `level`
 */

module.exports = level;

/**
 * Methods to wrap
 */

var wrap = [
  'approximateSize',
  'open',
  'close',
  'put',
  'get',
  'del'
];

/**
 * Initialize `level`
 */

function level(db) {
  var batch = db.batch;

  // wrap batch differently
  db.batch = function(ops) {
    if (ops) return yieldly(batch).call(db, ops);
    var b = batch.call(db);
    b.write = yieldly(b.write);
    return b;
  }

  // wrap functions
  wrap.forEach(function(method) {
    if (!db[method]) return;
    db[method] = yieldly(db[method]);
  });

  return db;
}
