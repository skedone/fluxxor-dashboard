var React = require('react');
var $ = require('../utils/jquery.min.js');

var UserMenu = React.createClass({
	componentWillMount: function() {
		if(typeof this.props.extras != 'undefined') {
			$.extend(this.props, this.props.extras);
			delete this.props.extras;
		}
	},
	render: function(){
		var props = JSON.stringify(this.props);
		return(
			<div>
				<p>This is UserMenu:</p>
				<ul>
					<li><strong>this.props</strong> {props}</li>
				</ul>
			</div>
		)
	}
});

module.exports = UserMenu;