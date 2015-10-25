'use strict';

const mkey   = Symbol('map');
const wmkey  = Symbol('weakmap');
const vkey   = Symbol('value');
const reduce = Array.prototype.reduce;

class Cache {

  constructor() {
    this[ mkey ]  = new Map();
    this[ wmkey ] = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on a set of arguments
  get( keys ) {
    return reduce.call( keys, Cache.reducer, this );
  }

  // can the given value be saved in a WeakMap, or do we
  // have to use a Map?
  static isObject( arg ) {
    const t = typeof arg;
    return ( t === 'object' || t === 'function' ) ? arg !== null : false;
  }

  // reducer function for #get()
  static reducer( item, value ) {
    const map = item[ Cache.isObject( value ) ? wmkey : mkey ];
    const cache = map.get( value );
    return cache || map.set( value, new Cache() ).get( value );
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
