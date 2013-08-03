var levelco = require('..');
var memdown = function (l) { return new (require('memdown'))(l) };
var co = require('co');

co(function *() {
  var db = yield levelco('db', { db: memdown });

  yield db.put('foo', 'bar');
  yield db.put('bar', 'baz');

  var res = yield db.get('foo');
  console.log('foo -> %s', res);

  var res = yield db.get('bar');
  console.log('bar -> %s', res);
});
