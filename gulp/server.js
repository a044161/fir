"use strict";

const path = require("./config").path;

const browserSync = require("browser-sync").create();

const serverOpt = {
	server: {
		baseDir: path.dist
	},
	open: false
};

module.exports = {
	dev: function() {
		browserSync.init(serverOpt);
	},
	reload: browserSync.reload,
	stream: browserSync.stream
};
