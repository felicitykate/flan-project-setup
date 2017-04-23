load('../../gl.js');

forAll(config.getDevices(), function(device) {
	test('Hidden popup on ' + device.deviceName, function() {
		gl.openPage(device, config.getProjectPage());

		gl.runSpecFile(device, './test/visual/test.spec');
	});

});
