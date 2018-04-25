function funcGrow() { //search box
	var width = $("#grow").css("width");
	var left = document.getElementById('grow').style.left;
	if (width == "5px"){
	document.getElementById('grow').style.width = "300px";
	document.getElementById('grow').style.left = "-250px";
	}else{
		document.getElementById('grow').style.width = "5px";
		document.getElementById('grow').style.left = "20px";
	}
}

function funcNotif() { //notificaitons
	var height = $("#notification").css("height");
	var display = $("#arrow").css("display");
	
	if (height == "0px"){
		$("#notification").css("height","500px");
		$("#arrow").css("display", "block");

	}
	else
	{
		$("#notification").css("height","0px");
		$("#arrow").css("display", "none");
	}
	
	
}
$(window).click(function(e) { //window event listener
    if (e.target.id == ""){
    	$("#notification").css("height","0px");
		$("#arrow").css("display", "none");
		//$("#accounts").css("height","0px");
		//$("#arrow-prof").css("display", "none");
    }
});

function funcProf(){
	var height = $("#accounts").css("height");
	var display = $("#arrow-prof").css("display");
	if (height == "0px"){
		$("#accounts").css("height","150px");
		$("#accounts").css("padding","10px");		
		
	}
	else
	{
		$("#accounts").css("height","0px");
		$("#accounts").css("padding","0px");
	}
}