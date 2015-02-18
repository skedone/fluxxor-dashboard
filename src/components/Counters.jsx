var React = require('react');
var Reflux = require('reflux');
var $ = require('../utils/jquery.min.js');

var UserStore = require('../stores/UserStore');
var UserActions    = require('../actions/UserActions');

var Counters = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState: function(){
		return(UserStore.getDefaultData());
	},
	componentWillMount: function() {
		this.listenTo(UserStore, this.onPropertyChange);
	},
	onPropertyChange: function(property, value) {
		var properties = {};
		properties[property] = value;
        this.setState(properties);
    },
	render: function(){
		var props = JSON.stringify(this.props);
		var state = JSON.stringify(this.state);
		return(
			<div>
				<p>This is Counters component:</p>
				<ul>
					<li><strong>this.props</strong> {props}</li>
					<li><strong>this.state</strong> {state}</li>
				</ul>
			</div>
		)
	}
});

module.exports = Counters;