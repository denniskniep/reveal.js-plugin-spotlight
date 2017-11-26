var RevealSpotlight = window.RevealSpotlight || (function(){

	var config = Reveal.getConfig().spotlight || {};
	var spotlightSize = config.size || 40; 

	var container;

	function onRevealJsReady(event){
		var result = setupCanvas();
		container = result.container;
		var canvas = result.canvas;
		var context = result.context;

		canvas.addEventListener('mousemove', function(evt) {
		  spotlight(canvas, context, getMousePos(canvas, evt));
		}, false);

		toggleSpotlight();
	}

	function toggleSpotlight(){
		if(!container) return;

		if(container.style.display === "none"){
			container.style.display = "block"; 
		}
		else{
			container.style.display = "none"; 
		}
	}

	function setupCanvas() {
		var container = document.createElement('div');
		container.id = "spotlight";
		container.style ="position:absolute;top:0px;left:0px;z-index:99;";		

		var canvas = document.createElement('canvas');
		var context = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		container.appendChild(canvas);			
		document.body.appendChild(container);
		return {
			container,
			canvas,
			context
		}	
	}

	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x:  evt.clientX - rect.left,
          y:  evt.clientY - rect.top
        };
      }

	function spotlight(canvas, context, mousePos) {
        context.clearRect(0,0,canvas.width, canvas.height);
        
        // Create a canvas mask 
        var maskCanvas = document.createElement('canvas');    
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        
        var maskCtx = maskCanvas.getContext('2d');
        maskCtx.fillStyle = "#000000A8";
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        maskCtx.globalCompositeOperation = 'xor';
               
        maskCtx.fillStyle = "#FFFFFFFF";
        maskCtx.arc(mousePos.x, mousePos.y, spotlightSize, 0, 2 * Math.PI);
        maskCtx.fill();

        // Draw mask on the image, and done !
        context.drawImage(maskCanvas, 0, 0);
      }

	Reveal.addEventListener('ready',onRevealJsReady);

	this.toggleSpotlight = toggleSpotlight;
	return this;
})();
