var React = require('react');
var Reflux = require('reflux');
var $ = require('../utils/jquery.min.js');

var UserStore = require('../stores/UserStore');
var UserActions    = require('../actions/UserActions');

var UserMenu = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState: function(){
		return(UserStore.getDefaultData());
	},
	componentWillMount: function() {
		this.listenTo(UserStore, this.onPropertyChange);
		if(typeof this.props.extras != 'undefined') {
			$.extend(this.props, this.props.extras);
			delete this.props.extras;
		}
	},
	onPropertyChange: function(property, value) {
		var properties = {};
		properties[property] = value;
        this.setState(properties);
    },
    changeUsername: function(ev) {
    	UserActions.userChangeProperty('name', 'Edoardo Biraghi');
    },
	render: function(){
		var props = JSON.stringify(this.props);
		var state = JSON.stringify(this.state);
		return(
			<div>
				<p>This is UserMenu:</p>
				<ul>
					<li><strong>this.props</strong> {props}</li>
					<li><strong>this.state</strong> {state}</li>
				</ul>
				<button onClick={this.changeUsername}>Change username to Edoardo Biraghi</button>
			</div>
		)
	}
});

module.exports = UserMenu;