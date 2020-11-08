// Top level file is just a mixin of submodules & constants
// 'use strict';
import { createRequire } from "https://deno.land/std@0.76.0/node/module.ts";
const require = createRequire(import.meta.url);

// var assign    = require('./lib/utils/common').assign;

// var deflate   = require('./lib/deflate');
// var inflate   = require('./lib/inflate');
// var constants = require('./lib/zlib/constants');

// var pako = {};

// assign(pako, deflate, inflate, constants);

// module.exports = pako;

const { deflate, Deflate }   = require('./lib/deflate');
const { inflate, Inflate }   = require('./lib/inflate');

export { deflate, Deflate, inflate, Inflate }; 
