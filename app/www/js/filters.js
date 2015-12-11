angular.module('starter.filters', [])

.filter('mask_ac_number',function(){
	return function(input){
		op = '';
		in_len = input.length;
		for (var i=0;i<in_len;i++){
			if (input[i]=='-' || i>in_len - 4-1){
				op +=input[i];
			}
			else{
				op+='X';
			}
		}
		return op;
	}
})

.filter('currency',function(){
	return function(input){
		return '$'+input;
	}
})

.filter('format_date',function(){
	return function(input){
		return input;
	}
})
;