function createElem(btn){
		var btnId = btn.id;
		var modal = document.getElementById(btnId+"-modal");
		modal.classList.remove("hidden");
		
		var lightBox = document.createElement("div");
			lightBox.className = "lightBox";
		modal.insertBefore(lightBox, modal.firstChild);
		var modalChildren = modal.childNodes;
			
			for (var x = 0; x<modalChildren.length; x++){
				if (!(modalChildren[x].className === "lightBox") && (modalChildren[x].style)){
					var childWidth = modalChildren[x].offsetWidth;
					var windowWidth = document.body.offsetWidth;
					var halfWidth = ((windowWidth - childWidth) /2)/windowWidth * 100;
					modalChildren[x].style.left = halfWidth + "%";
					console.log(childWidth + " " + windowWidth+ " " + halfWidth);
				}
			}
		
		lightBox.onclick = function(){
			modal.removeChild(lightBox);
			modal.className = "hidden modal";
		}
	}
	var button = document.getElementsByClassName("btn");
	for (var i = 0; i<button.length; i++){
		button[i].onclick = function(){
			createElem(this);
		}
	}
