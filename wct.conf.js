var path = require('path');

var ret = {
	'suites': ['test'],
	'webserver': {
		'pathMappings': []
	},
	plugins: {
		local: {
			browsers: [
				//'chrome',  // chrome hanging on fonts.googleapis.com
				'firefox'
			]
		}
	}
};

module.exports = ret;
