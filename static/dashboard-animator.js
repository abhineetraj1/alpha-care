var a = document.getElementById('dv')
document.getElementsByClassName("tt")[0].style.animation="show 500ms";
for (var i = document.getElementsByClassName('kj').length - 1; i >= 0; i--) {
	document.getElementsByClassName('kj')[i].style.opacity="0%";
}
for (var i = document.getElementsByClassName("ot-g").length - 1; i >= 0; i--) {
	document.getElementsByClassName("ot-g")[i].style.opacity="0%";
}
a.style.animation="trn 400ms";
setTimeout(function(){
	setTimeout(function() {document.getElementsByClassName('kj')[0].style.opacity="100%";document.getElementsByClassName('kj')[0].style.animation="show 300ms";}, 0);
}, 400);
setTimeout(function(){
	setTimeout(function() {document.getElementsByClassName('kj')[1].style.opacity="100%";document.getElementsByClassName('kj')[1].style.animation="show 300ms";}, 0);
}, 800);
setTimeout(function(){
	setTimeout(function() {document.getElementsByClassName('kj')[2].style.opacity="100%";document.getElementsByClassName('kj')[2].style.animation="show 300ms";}, 0);
}, 1200);
setTimeout(function () {
	for (var i = document.getElementsByClassName("ot-g").length - 1; i >= 0; i--) {
		document.getElementsByClassName("ot-g")[0].style.opacity="100%";
		document.getElementsByClassName("ot-g")[0].style.animation="show 300ms";
		document.getElementsByClassName("ot-g")[1].style.opacity="100%";
		document.getElementsByClassName("ot-g")[1].style.animation="show 300ms";
	}
}, 1600);