
# level-co

[LevelUP](https://github.com/rvagg/node-levelup) wrappers for
[co](https://github.com/visionmedia/co).

Currently you have to pass the flag `--harmony-generators` to node and need at
least version `0.11.0`.

[![build status](https://secure.travis-ci.org/juliangruber/level-co.png)](http://travis-ci.org/juliangruber/level-co)

## Usage

```js
var levelco = require('level-co');
var leveldown = function (l) { return new (require('leveldown'))(l) };
var co = require('co');

co(function *() {
  var db = yield levelco('db', { db: leveldown });

  yield db.put('foo', 'bar');
  yield db.put('bar', 'baz');

  var res = yield db.get('foo');
  console.log('foo -> %s', res);

  var res = yield db.get('bar');
  console.log('bar -> %s', res);

  // whoop whoop
})();
```

## API

### levelco(path, opts)

Yields a leveldb.

### levelco.deferred(path, opts)

Returns a leveldb.

This is useful when you want to create a `level-co` instance outside a
generator function.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install level-co
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
