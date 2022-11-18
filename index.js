/*** Virtual Switch Z-Way HA module *******************************************
Version: 1.0.0
-----------------------------------------------------------------------------
Author: Jorge Rivera (c) Nov 2022
Homepage: https://github.com/latchdevel/VirtualSwitch
Description:
    Converts two toggle button devices into one virtual switch device.
******************************************************************************/
// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function VirtualSwitch (id, controller) {
    // Call superconstructor first (AutomationModule)
    VirtualSwitch.super_.call(this, id, controller);
}

inherits(VirtualSwitch, AutomationModule);

_module = VirtualSwitch;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

VirtualSwitch.prototype.init = function (config) {
    VirtualSwitch.super_.prototype.init.call(this, config);

    var self = this,
        deviceType,
        probeType,
        icon,
        level,
        configType = this.config.deviceType
    ;

    if (configType === "Door Lock" ){
        deviceType = "doorlock";
        probeType = "";
        icon = "door";
        //level = "close";
    }else{
        deviceType = "switchBinary";
        probeType = "switch";
        icon = "switch";
        //level =  "off";
    }

	var defaults = {
		metrics: {
			title: self.getInstanceTitle(),
			icon: icon,
            level: level
		}
	};
 
	var overlay = {
			deviceType: deviceType,
			probeType: probeType
	};
    
	this.vDev = this.controller.devices.create({
		deviceId: this.getName() + "_" + this.id,
		defaults: defaults,
		overlay: overlay,
		handler: function(command, args) {

            // Get device type to support on/open and off/close
            var vDevType = deviceType;

            // Get device name for detailed error notification
            var deviceName = this.get("metrics:title") == "" ? "Unknow device" : this.get("metrics:title");

            if (command === 'update') {
                // Do nothing
			}
            else if ((command === "on") || (command === "open")) {
                console.log("Virtual Switch: '" + deviceName + "' command: 'on/open' ");
                self.controller.devices.get(self.config.toggleDeviceOn).performCommand("on");
                if (vDevType === "doorlock"){
                    this.set("metrics:level", "open" );
                }else{
                    this.set("metrics:level", "on" );
                }
            }
            else if ((command === "off") || (command === "close"))  {
                console.log("Virtual Switch: '" + deviceName + "' command: 'off/close' ");
                self.controller.devices.get(self.config.toggleDeviceOff).performCommand("on");
                if (vDevType === "doorlock"){
                    this.set("metrics:level", "close" );
                }else{
                    this.set("metrics:level", "off" );
                }
            }
            else {
                //console.log("Virtual Switch: '" + deviceName + "' command unknow: '" + command + "'" );
                self.addNotification("error", "Virtual Switch: '" + deviceName + "' command unknow: '" + command + "'", "module");
            }
        },

		moduleId: this.id
	});
};

VirtualSwitch.prototype.stop = function () {
	if (this.vDev) {
		this.controller.devices.remove(this.vDev.id);
		this.vDev = null;
	}

    VirtualSwitch.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------
