var test = require('gap');
var wrap = require('./');
var MemDB = require('memdb');
var Stream = require('stream');

test('co-level', function*(t) {
  var db = wrap(MemDB());
  var res;

  yield db.put('foo', 'bar');
  yield db.put('bar', 'baz');

  res = yield db.get('foo');
  t.equal(res, 'bar');

  res = yield db.get('bar');
  t.equal(res, 'baz');
  
  yield db.batch([
    { type: 'put', key: 'yolo', value: 'swag' }
  ]);
  
  res = yield db.get('yolo');
  t.equal(res, 'swag');
  
  yield db.del('yolo');
  try {
    yield db.get('yolo');
    throw new Error('did not throw');
  } catch (e) {}
  
  t.ok(db.createReadStream() instanceof Stream);
});
