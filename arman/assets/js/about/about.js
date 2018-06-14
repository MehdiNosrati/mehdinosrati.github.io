$("#minim").click(function () {
	var t = $("#minim").html();

	if (t === 'remove') {
		$("#lf-rt").css("height", "65px");
		$("#minim").html("web_asset");
	} else {
		$("#lf-rt").css("height", "500px");
		$("#minim").html("remove");
		setTimeout(function () {
			window.scrollTo(0, 300);
		}, 200);

	}
});
$("#minim-info").click(function () {
	var t = $("#minim-info").html();

	if (t === 'remove') {
		$("#info").css("height", "65px");
		$("#tastes").css("top", "132px");
		$("#minim-info").html("web_asset");
	} else {
		$("#info").css("height", "500px");
		$("#tastes").css("top", "565px");
		$("#minim-info").html("remove");
		setTimeout(function () {
			window.scrollTo(0, 300);
		}, 200);

	}
});
$("#minim-tastes").click(function () {
	var t = $("#minim-tastes").html();

	if (t === 'remove') {
		$("#tastes").css("height", "65px");

		$("#minim-tastes").html("web_asset");

	} else {
		$("#tastes").css("height", "500px");
		$("#minim-tastes").html("remove");

	}
});


var s = $("#cntr").children().length;

$("#skl").css("height", (s * 90).toString());
$("#minim-skill").click(function () {
	var t = $("#minim-skill").html();
	$("#skl").css("transition", "all .4s");

	if (t === 'remove') {
		$("#skl").css("height", "65px");
		$("#minim-skill").html("web_asset");
	} else {
		$("#skl").css("height", (s * 90).toString());
		$("#minim-skill").html("remove");


	}
});

$(".add-event-btn").click(function () {
	var event = prompt("توضیحات رویداد:");
	var size = 14;
	var points = $(".point");
	var i = 0;
	while (points[i].childNodes[0].innerHTML !== "") {
		i++;
	}

	points[i].childNodes[0].innerHTML = event;
	fixEmpty();




});
$(".add-goal-btn").click(function () {
	var goal = prompt("توضیحات هدف:");
	if (goal == null){
		goal = "";
	}
	$(".point")[14].innerHTML = "<p class='event-text'>" + goal + "</p>";
	fixEmpty();
});
$(".remove-goal-btn").click(function () {

	$(".point")[14].innerHTML = "";
	alert("هدف حذف شد.");

fixEmpty();
});

$(".remove-event-btn").click(function () {
	var which = prompt("شماره رویدادی که میخواهید حذف کنید وارد کنید:");
	if (isNaN(which)) {
		alert("وروردی اشتباه است");
	}
	
	var i, j;
	var x;
	for (i = which, j = ++which; i < 13; i++, j++) {
		x = $(".point")[j].childNodes[0].innerHTML;
		$(".point")[j].childNodes[0].innerHTML = "";
		$(".point")[i].childNodes[0].innerHTML = x;

	}
	fixEmpty();

});
function fixEmpty(){
	var i;
	for (i = 0 ; i< 14 ; i++){
		if ( $(".point")[i].childNodes[0].innerHTML === ""){
			$(".point")[i].childNodes[0].style.display = 'none';
			$(".point")[i].style.border = 'none';
		}
		else{
			$(".point")[i].childNodes[0].style.display = 'block';
			$(".point")[i].style.border = '2px dotted snow';
			
		}
	}
	if($(".point14")[0].childNodes[0].innerHTML === ""){
		$(".point14")[0].style.border = 'none';
		$(".point14")[0].childNodes[0].style.display = 'none';
	}
	else{
		$(".point14")[0].style.border = '2px dotted snow';
		$(".point14")[0].childNodes[0].style.display = 'block';
	}
}
window.onload = fixEmpty;
