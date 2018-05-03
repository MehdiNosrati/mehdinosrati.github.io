function funcTask() {
	var a = $("#taskbar").css("width");
	if (a == "300px"){
		$("#taskbar").css("width", "0px");
		$("#taskbar-btn").html("menu");
	}
	else{
		$("#taskbar").css("width","300px");
		$("#taskbar-btn").html("arrow_back");
	}
}

$(window).click(function(e) {
    if (e.target.id == ""){
    	$("#taskbar").css("width","0px");
		$("#taskbar-btn").html("menu");
    }
});