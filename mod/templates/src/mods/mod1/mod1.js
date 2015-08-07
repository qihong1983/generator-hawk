define(function (require, exports, module) {

	var Widget1 = require('widgets/qihong-test-ll/abcd_bower_test');

	function <%= name %>(opt) {
        if (!(this instanceof <%= name %>)) {
            return new <%= name %>(opt);
        }
	}

	<%= name %>.prototype = {
		init: function () {
			console.log('模块1');
			//console.log(ll.init());

			var ll = new Widget1();
			ll.init(); 
		}
	};


	module.exports = <%= name %>;
});