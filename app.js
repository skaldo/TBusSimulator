/**
 * Created by skaldo on 10/21/14.
 */

var debug = require('debug');

var TBus = require("./TBus.js");
var Devices = require("./TBusDevices.js").devices;
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

/**
 * This function gets called when the data are received.
 * Data are being parsed and dispatched to the virtual devices handlers.
 * The responses are being simulated.
 * @param d data from the serialport
 */
function onData(d){
    var frame,
        generatedData,
        response;

    frame = TBus.parse(d);

    if(!frame.valid){
        console.log("Invalid frame received.");
        return;
    }

    if(!Devices[frame.receiver[0]]){
        console.log("Device is not supported.");
    }

    generatedData = Devices[frame.receiver[0]].randomData();
    response = TBus.prepareCommand(frame.sender, frame.receiver, generatedData);

    setTimeout(function(){
        /*
        var one,
            two;

        one = new Buffer(response.slice(0,5));
        two = new Buffer(response.slice(5,response.length));
        serialPort.write(one);
        setTimeout(function(){
            serialPort.write(two);
        },110);
        */
        serialPort.write(response);
    },0);
}


var serialPort = new SerialPort("/dev/ttys006", {
    baudrate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.raw
});

serialPort.on("open", function () {
    debug("serialport open");
    serialPort.on('data', function(data) {
        onData(data);
    });
});