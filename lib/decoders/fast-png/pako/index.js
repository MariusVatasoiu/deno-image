// Top level file is just a mixin of submodules & constants
import { deflate, Deflate } from "./lib/deflate.js";
import { inflate, Inflate } from "./lib/inflate.js";
import constants from "./lib/zlib/constants.js"; 

export {
  deflate, 
  Deflate, 
  inflate, 
  Inflate,
  constants 
};
