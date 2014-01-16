var MemDB = require('memdb');
var wrap = require('./');
var co = require('co');

var db = wrap(MemDB());

co(function *() {
  yield db.put('foo', 'bar');
  yield db.put('bar', 'baz');

  var res = yield db.get('foo');
  console.log('foo -> %s', res);

  var res = yield db.get('bar');
  console.log('bar -> %s', res);
})();
