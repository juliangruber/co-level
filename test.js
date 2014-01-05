var test = require('tape');
var levelco = require('./');
var memdown = function (l) { return new (require('memdown'))(l) };
var co = require('co');

test('co', function (t) {
  t.plan(2);

  co(function *() {
    var db = yield levelco('db', { db: memdown });

    yield db.put('foo', 'bar');
    yield db.put('bar', 'baz');

    var res = yield db.get('foo');
    t.equal(res, 'bar');

    var res = yield db.get('bar');
    t.equal(res, 'baz');
  })();
});

test('deferred constructor', function (t) {
  t.plan(2);

  var db = levelco.deferred('db', { db: memdown });

  co(function *() {
    yield db.put('foo', 'bar');
    yield db.put('bar', 'baz');

    var res = yield db.get('foo');
    t.equal(res, 'bar');

    var res = yield db.get('bar');
    t.equal(res, 'baz');
  })();
});

