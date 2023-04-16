/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
//eslint-disable-next-line no-redeclare
/*global Promise: true */
'use strict';
module.exports = (function setup() {
  function isModuleLoadError(err) {
    return (err.code === 'MODULE_NOT_FOUND');
  }
  function tryLoad(load, vari, specs) {
    if (!specs) { return false; }
    var nx = (vari || specs)[0];
    if (!vari) {
      if (!specs.length) { return false; }
      return tryLoad(load, [
        nx,
        nx + '.mjs',
      ], specs.slice(1));
    }
    return Promise.resolve(nx).then(load).then(null, function chkErr(err) {
      if (!isModuleLoadError(err)) { throw err; }
      if (vari.length < 2) { return tryLoad(load, 0, specs.slice(1)); }
      return tryLoad(load, vari.slice(1), specs);
    });
  }
  function makeLoader(load) {
    if (typeof load === 'function') { return tryLoad.bind(null, load, 0); }
    throw new TypeError('Expected original loader to be a function');
  }
  return makeLoader;
}());
