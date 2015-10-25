memoize
===

[![Built Status](https://codeship.com/projects/45348fb0-5c91-0133-11c0-5e493a25d753/status?branch=master)](https://codeship.com/projects/110961/)

Generic memoization using `Map` and `WeakMap`.

```js
'use strict';

const memoize = require('map-memo');

function loop( fn, n ) {
  let v;

  for ( let i = 0; i < n; ++i ) {
    v = fn( i );
  }

  return v;
}

let mem = memoize( loop );

console.log( mem( Math.sqrt, 1e9 ) ); // slow
console.log( mem( Math.sqrt, 1e9 ) ); // fast!
```
