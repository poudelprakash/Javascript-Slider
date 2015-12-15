function Slider(){
	slider=document.getElementsByClassName("slider")[0];
	var listSlider = slider.getElementsByTagName("ul")[0];
	var autoInterval;
	var animation = new Animator();

	this.init=function (){
		putButtons();
		startAutoAnimation();
	}

	var moveLeft = function (){
		resetAutoAnimation()
		animation.stop();
		animation.animate(listSlider,{marginLeft:960},2000,function(){console.log('done');});		
	}

	var moveRight=function (){
		resetAutoAnimation();
		animation.stop();
		animation.animate(listSlider,{marginLeft:-960},2000,function(){console.log('done');});
	}

	//clears auto interval and sets it again
	var resetAutoAnimation = function(){
		clearInterval(autoInterval);
		startAutoAnimation(); 
	}

	/**
	* starts auto animation of slider
	*/
	var startAutoAnimation = function (){
		autoInterval = setInterval(moveRight, 4000);
	}
	/**
	* puts left and right navigation button on slider
	*/
	var putButtons = function(){
		initLeftButton();
		initRightButton();
	}

	/**
	* puts left navigation button on slider and init click event
	*/
	var initLeftButton = function(){
		var leftArrow = document.createElement("img");
		leftArrow.src = "images/left.png";
		leftArrow.id = "left-arrow";
		leftArrow.onclick = moveLeft;
		slider.appendChild(leftArrow);
	}
	/**
	* puts right navigation button on slider and init click event
	*/
	var initRightButton = function(){
		var rightArrow=document.createElement("img");
		rightArrow.src="images/right.png";
		rightArrow.id="right-arrow";
		rightArrow.onclick=moveRight;
		slider.appendChild(rightArrow);
	}
}
