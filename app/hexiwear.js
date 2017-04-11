"use strict";

var Hexiwear = function () {

    /* Defining UUIDs for services and characteristics */
    const DEVICE_INFORMATION_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb";
    const MANUFACTURER_NAME = "00002a29-0000-1000-8000-00805f9b34fb";

    const MOTION_SERVICE = "00002000-0000-1000-8000-00805f9b34fb";
    const ACCELEROMETER = "00002001-0000-1000-8000-00805f9b34fb";
    
    const DEVICE_NAME = 'HEXIWEAR';

    var self;

    function Hexiwear(bluetooth) {
        self = this;
        self.bluetooth = bluetooth;
        self.initialize();
    }

    /* Initializing properties for Hexiwear class */
    Hexiwear.prototype.initialize = function () {
        var self = this;
        self.bluetoothDevice = undefined;
        self.connected=false;
        self.motionService = undefined;
        self.motionData = {};
        self.manufacturerName = undefined;
        self.currentMode = undefined;
        self.paired = false;
    };

    /* Defining function for connecting to the device */
    Hexiwear.prototype.connect = function () {
        let options = {
        	filters: [{name: DEVICE_NAME}],
        	optionalServices: [
        		MOTION_SERVICE,
        		DEVICE_INFORMATION_SERVICE
        	]
        };
        
        
        return navigator.bluetooth.requestDevice(options)
        /* Connecting to the device */
            .then(function (device) {
                self.bluetoothDevice = device;
                return device.gatt.connect();
            })
            .then(function (server) {
                console.log("Discovering services");
                self.connected = true;
                
                /* Getting primary services */
                return Promise.all([
                    /* Getting device information data service */
//                     server.getPrimaryService(DEVICE_INFORMATION_SERVICE)
//                         .then(function (service) {
//                             return service.getCharacteristic(MANUFACTURER_NAME);
//                          }) 
//             			.then(characteristic => {
//                 			// Got characteristic.
//                 			// Read the value we want.
//                 			return characteristic.readValue();
//             			})
//             			.then(data => {
//                   			/* Parsing characteristic readout */
//                     		self.manufacturerName = dataToString(data);
//                     		console.log("Got data: " + self.manufacturerName);
// //                        		self.updateUI();
//             			})
//             			.catch(error => {
//                 			console.log('Reading device info data failed. Error: ' + JSON.stringify(error));
//             			}),
                    /* Getting motion data service */
                    server.getPrimaryService(MOTION_SERVICE)
                        .then(function (service) {
							return service.getCharacteristic(MOTION_SERVICE);
                        })
                        .then(characteristic => {
                			// Got characteristic.
                			// Read the value we want.
                			return characteristic.readValue();
            			})
            			.then(data => {
                  			self.motionData.x = value.getInt16(0, true) / 100;
                     		self.motionData.y = value.getInt16(2, true) / 100;
                     		self.motionData.z = value.getInt16(4, true) / 100;
//                      		self.updateUI();
            			})
            			.catch(error => {
                			console.log('Reading motion data failed. Error: ' + JSON.stringify(error));
            			})
                ]);
                /* Error handling function */
            }, function (error) {
                console.warn('Service not found'+error);
                Promise.resolve(true);
            })
    };

	/* ------- Hexiwear Handling Functions ------- */

    /* Refresh function for updating data */
    Hexiwear.prototype.refreshValues = function() {
        if (self.motionService){
            self.readMotion(self.motionService);
        }

    };
    
	function dataToString(data) {
        var value = '';

        for (var i = 0; i < data.byteLength; i++) {
            value = value + String.fromCharCode(data.getUint8(i));
        }

        value = value.replace(/\0/g, '');
        return value.trim();
    }

    window.hexiwear = new Hexiwear();
}();
