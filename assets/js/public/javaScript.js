function makeVisible() {
    
    var x = document.getElementById("hideThen1").value;
    if (x != ""){
        document.getElementById("hideThen1").style.display = "none";
        document.getElementById("hideFirst").style.display = "block";
        document.getElementById("subT").innerHTML = "ورود" ;
    }
    else 
        document.getElementById("hideThen1").style.borderColor = "burlywood";
}

function postcs() {
	var a = document.getElementById("postc").innerHTML;
	document.getElementById("postfullcontent").innerHTML = a;
	document.getElementById("postfullplace").style.display = "block";
	
	

}

