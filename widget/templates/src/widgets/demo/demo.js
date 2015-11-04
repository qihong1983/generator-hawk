define(function(require, exports, module) {
	function <%= name %>(opt) {
		if (!(this instanceof <%= name %>)) {
			return new <%= name %>(opt);
		}
		this.name = "<%= name %>";
	}
	<%= name %>.prototype = {
		init: function() {
			console.log(this.name);
		}
	};
	module.exports = <%= name %>;
});
