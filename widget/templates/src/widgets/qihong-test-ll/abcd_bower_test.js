define(function(require, exports, module) {
    function Widget2() {
	        if (!(this instanceof Widget2)) {
			            return new Widget2();
						        }
								        this.name = "Widget2";
										    }
											    Widget2.prototype = {
												        init: function() {
														            console.log(this.name);
																	        }
																			    };
																				    module.exports = Widget2;
																					});
