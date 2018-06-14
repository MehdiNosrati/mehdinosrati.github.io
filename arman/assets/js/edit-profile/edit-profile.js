$("#op1").click(function () {
	$("#op1").css("border-left", "2px solid #800000");
	$("#op2").css("border-left", "2px solid #e6f9ff");
	$("#op3").css("border-left", "2px solid #e6f9ff");
	$(".main-panel").css("background-color", "#800000");

	$("#pInfoEdit").css("display", "block");
	$("#skillEdit").css("display", "none");
	$("#tastesEdit").css("display", "none");


});
$("#op2").click(function () {
	$("#op2").css("border-left", "2px solid #806000");
	$("#op1").css("border-left", "2px solid #e6f9ff");
	$("#op3").css("border-left", "2px solid #e6f9ff");
	$(".main-panel").css("background-color", "#806000");

	$("#pInfoEdit").css("display", "none");
	$("#skillEdit").css("display", "block");
	$("#tastesEdit").css("display", "none");


});
$("#op3").click(function () {
	$("#op3").css("border-left", "2px solid #004d00");
	$("#op2").css("border-left", "2px solid #e6f9ff");
	$("#op1").css("border-left", "2px solid #e6f9ff");
	$(".main-panel").css("background-color", "#004d00");

	$("#pInfoEdit").css("display", "none");
	$("#skillEdit").css("display", "none");
	$("#tastesEdit").css("display", "block");


});

function load_js() {
	//location.reload();
}




$("#add-education").click(function () {
		var inp = document.getElementById("add-edu").value;
	if (inp !== '') {
		var l = document.createElement("LI");
		l.innerHTML = inp ;
		l.classList.add("edu-item");
		var r = document.createElement("B");
		r.classList.add("rmv");
		r.innerHTML = 'remove';
		r.setAttribute("onclick", "rmEdu(this)");
		l.appendChild(r);
		document.getElementById("el").appendChild(l);
		$("#add-edu").val('');
		
	}
});
function rmEdu(a){
	var an = confirm("این داده را حذف میکنید؟");
	if(an){
		a.parentElement.style.display = 'none';
	}
}

$(".rmv , #rmm").click(function () {
	var answer = confirm("این داده را حذف میکنید؟")
	if (answer) {

		this.parentElement.style.display = "none";
	} else {
		//some code
	}
});

$(".del").click(function () {
	var answer = confirm("این داده را حذف میکنید؟")
	if (answer) {

		this.parentElement.style.display = "none";
	} else {
		//some code
	}

});

function addsk() {
	var skl = $("#range").val();
	var sklName = $("#sklName").val();
	if (sklName !== "") {

		var c1 = document.createElement("DIV");
		c1.classList.add("skill-instance");
		var c2 = document.createElement("H3");
		c2.classList.add("skill-type");
		c2.innerHTML = sklName;
		c2.style.margin = '10px';
		c1.appendChild(c2);
		var c3 = document.createElement("DIV");
		c3.classList.add("skill-container");
		c3.style.width = '63%';
		c3.style.left = '18px';
		c1.style.position = 'relative';
		c1.style.top = '-10px';
		c1.appendChild(c3);
		var c4 = document.createElement("DIV");
		c4.classList.add("skilled");
		c4.style.width = skl + "%";
		c4.style.animation = 'grow';
		c4.style.animationDuration = '1s';
		c3.appendChild(c4);
		var c5 = document.createElement("B");
		c5.classList.add("del");
		c5.innerHTML = "backspace";
		c5.style.left = '70px';
		c1.appendChild(c5);
		c5.setAttribute("onclick", "deletee(this)");

		document.getElementById("cntr").appendChild(c1);

		document.getElementById("more-content").style.display = 'none';
		$("#sklName").val("");
		load_js();
	}
}

function deletee(a) {
	var an = confirm("این داده را حذف می کنید؟");
	if (an) {
		a.parentElement.style.display = 'none';
	}
}

$(".taste").click(function () {
	var answer = confirm("این داده را حذف میکنید؟");
	if (answer) {
		this.style.display = "none";
	}

});

$('#taste-input').bind("enterKey", function (e) {
	//do stuff here
	var t = $("#taste-input").val();
	if (t !== '') {
		var el = document.createElement("DIV");
		el.classList.add("w3-tag");
		el.classList.add("w3-blue-gray");
		el.classList.add("w3-round");
		el.classList.add("taste");
		el.innerHTML = t;
		el.setAttribute("onclick", "delet(this)");
		document.getElementById("tc").appendChild(el);
		$("#taste-input").val('');
		load_js();
	}

});

function delet(a) {
	var an = confirm("این داده را حذف می کنید؟");
	if (an) {
		a.style.display = 'none';
	}
}
$('#taste-input').keyup(function (e) {
	if (e.keyCode == 13) {
		$(this).trigger("enterKey");
	}
});
