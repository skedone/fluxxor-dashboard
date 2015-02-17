var React = require('react');

var DwilloComponents = require('./components.jsx');
var API = 'http://api.dev.dwillo.com';
var $ = require('./utils/jquery.min.js');

// --#- Change the Dwillo global namespace
window.Dwillo.Components = {};
$.each($(".dw-component"), function(){
	var data = $(this).data();
	var id = $(this).attr('id');
	Dwillo.Components[data.component] = {};
	Dwillo.Components[data.component].container = id;
	$.map(data, function(value, key){
		if(key !== 'dwillo') {
			Dwillo.Components[data.component][key] = value;
		}
	});
});

// --#- If you want to autoload components based on HTML, comment out the next loop
$.each(Dwillo.Components, function(value, key){
	if(typeof Dwillo.Components[value]['container'] != 'undefined' && typeof DwilloComponents[value] != 'undefined') {
		var Component = DwilloComponents[value];
		var Stores = Dwillo.Components[value]['stores'] || [];
		var props = Dwillo.Components[value]['props'] || [];
		React.render(<Component stores={Stores} extras={props} />, document.getElementById(Dwillo.Components[value]['container']));
	}
});