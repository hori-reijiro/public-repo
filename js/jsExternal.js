(function($){	//jQuery can use $mark


$('div#IdJQuery').text('using jQuery-' + $.fn.jquery + ' :MIT License');

function current(){
	ajaxX(null, null);
};

function loop(){
	current();
	setTimeout(loop, 5000);
}
loop();

$('input#submitPush').click(function(){
	$('#sound-M001').get(0).play();
	json2 = {sampleVal1 : 1};
	$('div#IdRTTime').text("Round-trip time : 計測中");
	return ajaxX(json2, new Date());
});

$('input#submitCurrent').click(function(){
	json3 = {sampleVal2 : 0};
	$('div#IdRTTime').text("Round-trip time : 計測中");
	return ajaxX(json3, new Date());
});

$('input#submitReset').click(function(){
	var strx = $('input#pw').val();
	if(strx != "reset"){
		$('#sound-Mei').get(0).play();
	}else{
		$('input#pw').val("");
		json4 = {sampleVal3 : strx};
		return ajaxX(json4, null);
	}
});


function ajaxX(jsonX, timex){
	var dfd = $.Deferred();
	$.ajax({
		type: "POST",
		url: "work.php",
		dataType: "json",
		data: jsonX
	}).done(function(result){
		setTimeout(function(){			
			$('div#IdMySQL').text(result[0]);
			$('div#IdCount').text(result[1]);
			$('div#IdPHP').text(result[2]);
			if(timex != null){
				var endTime = new Date();
				var delaytime = (endTime - timex).toLocaleString();
				$('div#IdRTTime').text("Round-trip time : " + delaytime + " ms");
			}	
			dfd.resolve();
		}, 500);
	}).fail(function(xhr, status, error){
		$('div#IdMySQL').text("disconnect mysql");
		$('div#IdCount').text("status code : " + xhr.status + " " + xhr.statusText);
		$('div#IdPHP').text("PHP version ?");	
	}).always(function(){

	});

	return dfd.promise();
}

})(jQuery);