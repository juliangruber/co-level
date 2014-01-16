
/**
 * Module dependencies.
 */

var thunk = require('thunkify');

/**
 * Methods to wrap.
 */

var wrap = [
  'open',
  'close',
  'put',
  'get',
  'del',
];

/**
 * Methods to copy.
 */

var copy = [
  'readStream',
  'createReadStream',
  'writeStream',
  'createWriteStream',
  'keyStream',
  'createKeyStream',
  'valueStream',
  'createValueStream'
];

/**
 * Create a wrapped `db`.
 *
 * @param {LevelUp} db
 * @return {Object}
 * @api public
 */

module.exports = function(db){
  var ret = {};
  
  var arrayBatch = thunk(db.batch.bind(db));
  
  ret.batch = function(ops) {
    if (ops) return arrayBatch(ops);

    var batch = db.batch();
    batch.write = thunk(batch.write);
    return batch;
  };
  
  copy.forEach(function(method){
    if (!db[method]) return;
    ret[method] = db[method].bind(db);
  });
  
  wrap.forEach(function(method){
    if (!db[method]) return;
    ret[method] = thunk(db[method].bind(db));
  });
  
  return ret;
};
