var levelup = require('levelup');

function wrap (fn, ctx) {
  return function () {
    var args = [].slice.call(arguments);
    return function (done) {
      args.push(done);
      fn.apply(ctx, args);
    };
  };
}

var methods = [
  'open',
  'close',
  'put',
  'get',
  'del',
  'batch'
];

module.exports = function () {
  var args = [].slice.call(arguments);

  return function (done) {
    args.push(function (err, db) {
      if (err) return done(err);

      methods.forEach(function (name) {
        db[name] = wrap(db[name], db);
      });

      done(null, db);
    });

    levelup.apply(this, args);
  };
};

module.exports.deferred = function () {
  var db = levelup.apply(null, arguments);
  methods.forEach(function (name) {
    db[name] = wrap(db[name], db);
  });
  return db;
}

