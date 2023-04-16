// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import makeFirstAvailModLoader from '../ld.js';

const importFirstAvailable = makeFirstAvailModLoader(id => import(id));

test('basics', async (t) => {
  t.plan(4);

  const someZip = await importFirstAvailable([
    './7zip',
    './zip',
    './gzip',
  ]);
  t.equal(someZip, false);

  const manif = await importFirstAvailable([
    '../package.override.json',
    '../package.local.json',
    '../package.json',
    '../ld.js',
  ]);
  t.equal(typeof manif, 'object');
  t.equal(typeof manif.name, 'string');
  t.equal(typeof manif.version, 'string');

  t.end();
});
