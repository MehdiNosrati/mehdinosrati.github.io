function newPost() {
	var height = $("#new-post-compose").css("height");
	if (height == "0px") {
		$("#new-post-compose").css("height", "400px");
		$("#new-post-compose").css("outline", "6px solid #00b3b3");

	} else {
		$("#new-post-compose").css("height", "0px");
		$("#new-post-compose").css("outline", "0px solid #ebfafa");
		$("#choose-drop-down").css("height","0px");
		$("#choose-drop-down").css("padding","0px");
	}
	
}
function funcChoose() {
	 var h = $("#choose-drop-down").css("height");
	if (h == "0px"){
		$("#choose-drop-down").css("height","100px");
		$("#choose-drop-down").css("padding","10px");
	}
	else{
		$("#choose-drop-down").css("height","0px");
		$("#choose-drop-down").css("padding","0px");
	}
}
