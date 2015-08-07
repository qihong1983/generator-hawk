define(function (require, exports, module) {

	function Page1(opt) {
        if (!(this instanceof Page1)) {
            return new Page1(opt);
        }
	}

	Page1.prototype = {
		init: function () {
			console.log('init page1');
		},
		rander: function () {
			console.log('rander page1');
		}
	};

	module.exports = Page1;
	
});