define(function (require, exports, module) {

	function Page2(opt) {
        if (!(this instanceof Page2)) {
            return new Page1(opt);
        }
	}

	Page2.prototype = {
		init: function () {
			console.log('init page2');
		},
		rander: function () {
			console.log('rander page2');
		}
	};

	module.exports = Page2;
	
});