'use strict';

const mkey  = Symbol('map');
const wmkey = Symbol('weakmap');
const vkey  = Symbol('value');

class Cache {

  constructor() {
    this[ mkey ]  = new Map();
    this[ wmkey ] = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on a set of arguments
  get( keys ) {
    let item = this;

    for ( let value of keys ) {
      const map = item[ Cache.isObject( value ) ? wmkey : mkey ];
      const cache = map.get( value );

      if ( cache ) {
        item = cache;
        continue;
      }

      map.set( value, item = new Cache() );
    }

    return item;
  }

  // can the given value be saved in a WeakMap, or do we
  // have to use a Map?
  static isObject( arg ) {
    const t = typeof arg;
    return ( t === 'object' || t === 'function' ) ? arg !== null : false;
  }

}

module.exports = function memoize( fn ) {
  const cache = new Cache();

  return function() {
    // get (or create) a cache item
    const item = cache.get( arguments );

    if ( item.hasOwnProperty( vkey ) ) {
      return item[ vkey ];
    }

    return item[ vkey ] = fn.apply( this, arguments );
  };
};
