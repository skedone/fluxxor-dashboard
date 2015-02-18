var Reflux = require('reflux');

var actions = Reflux.createActions([
	'userChangeProperty',
	'userIncrementCounter'
]);

module.exports = actions;