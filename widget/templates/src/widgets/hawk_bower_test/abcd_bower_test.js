define(function(require, exports, module) {
    function Widget1() {
	        if (!(this instanceof Widget1)) {
			            return new Widget1();
						        }
								        this.name = "Widget1";
										    }
											    Widget1.prototype = {
												        init: function() {
														            console.log(this.name);
																	        }
																			    };
																				    module.exports = Widget1;
																					});
