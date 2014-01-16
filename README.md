
# co-level

[LevelUP](https://github.com/rvagg/node-levelup) wrappers for
[co](https://github.com/visionmedia/co).

Currently you have to pass the flag `--harmony` to node and need at
least version `0.11.0`.

[![build status](https://secure.travis-ci.org/juliangruber/co-level.png)](http://travis-ci.org/juliangruber/co-level)

## Usage

```js
var level = require('level');
var wrap = require('co-level');
var co = require('co');

var db = wrap(level('db'));

co(function *() {
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

### wrap(db)

Return a wrapped leveldb.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install co-level
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
