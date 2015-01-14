var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var API = 'http://api.dev.dwillo.com';
var $ = require('./utils/jquery.min.js');

// --#- Change the Dwillo global namespace
var Dwillo = window.Dwillo || {};
$.each($(".dw-component"), function(){
	var data = $(this).data();
	Dwillo[data.dwillo] = {};
	$.map(data, function(value, key){
		if(key !== 'dwillo') {
			Dwillo[data.dwillo][key] = value;
		}
	});
});
console.log(Dwillo);

// --#- Flux paradigm.
var constants = {
  AUTH_EXPIRED: "AUTH_EXPIRED"
};


var AuthStore = Fluxxor.createStore({
  initialize: function(args) {
    this.props = args || {};
    this.bindActions(
      constants.AUTH_EXPIRED, this.onAuthExpiring
    );
  },

  onAuthExpiring: function(payload) {
  	this.props = {};
  	this.props.name = 'John Doe';
  	this.props.id = '4013';
    this.emit("change");
  },

  getState: function() {
    return this.props;
  }
});

var actions = {
  expireAuth: function() {
    this.dispatch(constants.AUTH_EXPIRED, {});
  }
};

var stores = {
  AuthStore: new AuthStore(window.Dwillo.User.props)
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatched]", type, payload);
  }
});


// --#- React paradigm

var App = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin("AuthStore")],
	getInitialState: function() {
		return({});
	  },
	getStateFromFlux: function() {
	    var flux = this.getFlux();
		return flux.store("AuthStore").getState();
	},
	render: function(){
		console.log(this.state);
		if(this.state.name != 'Edoardo Biraghi') {
			alert("Username changed to " + this.state.name);
			var Change = '';
		} else {
			var Change = <p><a href="#" onClick={this.changeUsername}>Change username</a></p>;
		}
		return(
			<div>
			<p>Welcome {this.state.name} #{this.state.id}</p>
			{Change}
			</div>
		)
	},
	changeUsername: function(ev){
		this.getFlux().actions.expireAuth();
		ev.preventDefault();
	}
});

// --#- Routing paradigm with react-router
var routes = (
  <Route name="overview" path="/" handler={App}>
  </Route>
);

Router.run(routes, function (Handler, state) {
	React.render(<Handler flux={flux}/>, document.getElementById('dashboard'));
});