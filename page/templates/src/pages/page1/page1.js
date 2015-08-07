define(function (require, exports, module) {

	function <%= name %>(opt) {
        if (!(this instanceof <%= name %>)) {
            return new <%= name %>(opt);
        }
	}

	<%= name %>.prototype = {
		init: function () {
			console.log('init <%= name %>');
		},
		rander: function () {
			console.log('rander <%= name %>');
		}
	};

	module.exports = <%= name %>;
	
});