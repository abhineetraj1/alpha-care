for (var i = document.getElementsByClassName("frml").length - 1; i >= 0; i--) {
	document.getElementsByClassName("frml")[i].style.opacity="0%";
}
var a = document.getElementsByClassName('load');
for (var i = a.length - 1; i >= 0; i--) {
	a[i].style.opacity="0%";
}
a[0].style.opacity="100%";
a[0].style.animation="img 1s";

setTimeout(function() {
	a[1].style.opacity="100%";
	a[1].style.animation="frm 1s";
}, 500);
setTimeout(function () {
	for (var i = document.getElementsByClassName("frml").length - 1; i >= 0; i--) {
		show_frm_content(i, i*100);
	}
},1500);

function show_frm_content(i, timer) {
	setTimeout(function() {
		document.getElementsByClassName("frml")[i].style.animation="ig 1s";
		document.getElementsByClassName("frml")[i].style.opacity="100%";
	},timer);
}
