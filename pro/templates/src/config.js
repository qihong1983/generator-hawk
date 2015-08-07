var myDate = new Date();
var timestamp = myDate.getFullYear() +'' + myDate.getMonth()+1 + '' + myDate.getDate() + '' + myDate.getHours() + '' + myDate.getMinutes();

seajs.config({

    alias: {

	},
	// 映射
	'map': [
	    [ /^(.*\.(?:css|js))(.*)$/i, '$1?version=' + timestamp ]
	  ]
});