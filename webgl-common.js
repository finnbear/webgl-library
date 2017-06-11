function onWindowResize() {
	var canvas = document.getElementById("canvas")
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
