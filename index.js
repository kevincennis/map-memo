'use strict';

const mkey = Symbol('map');
const wmkey = Symbol('weakmap');
const vkey = Symbol('value');

class Cache {

  constructor() {
    this[ mkey ] = new Map();
    this[ wmkey ] = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on a set of arguments
  get( keys ) {
    let item = this;

    for ( let i = 0; i < keys.length; ++i ) {
      const value = keys[ i ];
      const isObject = Cache.isObject( value );

      let cache = item[ isObject ? wmkey : mkey ].get( value );

      if ( cache ) {
        item = cache;
        continue;
      }

      cache = new Cache();

      item[ isObject ? wmkey : mkey ].set( value, cache );
      item = cache;
    }

    return item;
  }

  // can the given value be saved in a WeakMap, or do we
  // have to use a Map?
  static isObject( arg ) {
    const t = typeof arg;

    switch ( t ) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'symbol':
      case 'undefined':
        return false;
    }

    return arg !== null;
  }

}

module.exports = function memoize( fn ) {
  const cache = new Cache();

  return function() {
    const saved = cache.get( arguments );

    if ( saved.hasOwnProperty( vkey ) ) {
      return saved[ vkey ];
    }

    return saved[ vkey ] = fn.apply( this, arguments );
  }
};
