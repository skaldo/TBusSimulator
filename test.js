/**
 * Created by skaldo on 10/21/14.
 */

// This script proves the functionality

var TBus = require("./TBus.js");

var cmd = TBus.prepareCommand([0x07, 0x00, 0x00, 0x01], [0x00, 0x00, 0x00, 0x00], [0xdd, 0xff]);

var frame = TBus.parse(cmd);

console.log(frame);