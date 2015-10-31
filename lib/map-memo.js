'use strict';

class Cache {

  constructor() {
    this.map     = new Map();
    this.weakmap = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on an arguments object
  get( args ) {
    return Array.prototype.reduce.call( args, Cache.reducer, this );
  }

  // can the given value be saved in a WeakMap, or do we
  // have to use a Map?
  static isObject( arg ) {
    const t = typeof arg;
    return ( t === 'object' || t === 'function' ) && arg !== null;
  }

  // reducer function for #get()
  static reducer( item, value ) {
    const map = item[ Cache.isObject( value ) ? 'weakmap' : 'map' ];
    return map.get( value ) || map.set( value, new Cache() ).get( value );
  }

}

module.exports = function memoize( fn ) {
  const cache = new Cache();

  return function() {
    // get (or create) a cache item
    const item = cache.get( arguments );

    if ( item.hasOwnProperty('value') ) {
      return item.value;
    }

    return item.value = fn.apply( this, arguments );
  };
};
