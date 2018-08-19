


alert(screen.availHeight);
var y = window.scrollY;
function checkScroll(){
	
	setTimeout(function(){
		if (window.scrollY > y){
		window.scrollTo(0, window.scrollY + screen.availHeight *1.4);
		y = window.scrollY;
	}
	else if(window.scrollY < y){
		window.scrollTo(0, window.scrollY - screen.availHeight * 1.4);
		y = window.scrollY;
	}
	}, 400);
	
	
	
}