function onLoad() {
	var canvas = document.getElementById("canvas");
	var gl = null;

	function onWindowResize() {
		canvas.style.width = window.innerWidth;
		canvas.style.height = window.innerHeight;
	}

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
	
	try {
		gl = canvas.getContext("experimental-webgl");
	} catch (e) {
		alert("Please enable WebGL in your browser!");
	}

	if (gl) {
		// Init GL parameters
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.clearDepth(1.0)
		gl.enable(gl.DEPTH_TEST)
		gl.depthFunc(gl.LEQUAL)
	
		// Init shaders
		function getShader(gl, id) {
			var shaderScript = document.getElementById(id);
			
			if (shaderScript) {
				var source = "";
				var currentChild = shaderScript.firstChild;
				
				while (currentChild) {
					if (currentChild.nodeType == 3) {
						source += currentChild.textContent;
					}
					
					currentChild = currentChild.nextSibling;
				}
				
				var shader;
				
				if (shaderScript.type == "x-shader/x-fragment") {
					shader = gl.createShader(gl.FRAGMENT_SHADER);
				} else if (shaderScript.type == "x-shader/x-vertex") {
					shader = gl.createShader(gl.VERTEX_SHADER);
				} else {
					return null;
				}
				
				gl.shaderSource(shader, source);
				
				gl.compileShader(shader);
				
				if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
					return shader;
				} else {
					alert("Unable to compile the shader: " + gl.getShaderInfoLog(shader));
					return null;
				}	
			} else {
				return null;
			}
		}
		
		var fragmentShader = getShader(gl, "shader-fs");
		var vertexShader = getShader(gl, "shader-vs");
		
		shaderProgram = gl.createProgram();
		
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		
		if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			gl.useProgram(shaderProgram);
			
			vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
			gl.enableVertexAttribArray(vertexPositionAttribute);
			
			vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
			gl.enableVertexAttribArray(vertexColorAttribute);
			
		} else {
			alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
		}
		
		

		// Init buffers
		initBuffers();

		function loop() {
			requestAnimationFrame(loop);
		}

		loop();
	}
}
