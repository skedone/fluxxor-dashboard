var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({

	init: function() {
		this.listenToMany(UserActions);
		this.user = {
			name: 'John Doe'
		};
	},
    getDefaultData: function() {
        return this.user;
    },
    onUserChangeProperty: function(property, value) {
    	this.user[property] = value;
    	this.trigger(this.user);
    }
});

module.exports = UserStore;