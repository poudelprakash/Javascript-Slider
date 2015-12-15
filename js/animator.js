function Animator(){
	var frequency = 50;
	var counter = 0;
	var currentLeftMargin = 0;
	var element;
	var properties;
	var duration;
	var callback;
	var leftMargin;
	var sliderCount;
	var intervalId;

	this.animate = function(_element,_properties,_duration,_callback){
		element = _element;
		sliderCount = element.getElementsByTagName("li").length;
		properties = _properties;
		leftMargin = properties.marginLeft;
		duration = _duration;
		callback = _callback;
			if(currentLeftMargin == 0){//check for left limit
				if(leftMargin != 960){ 
					// if it isn't asked to move left from leftmost
					setMoveInterval()
				}	
			}else if(currentLeftMargin == (-960*(sliderCount-1))){//check for right limit
				if(leftMargin != -960){
					// if it isn't asked to move right from rightmost
					setMoveInterval()
				}
			}else{//animate for middle range values
				setMoveInterval();
			}
	}

	var setMoveInterval= function(){
		intervalId = setInterval(move, frequency);
	}

	var move=function (){
		counter++;
		var val = currentLeftMargin + (leftMargin/(duration/frequency)*counter);
		element.style.marginLeft = val+"px";
		if(counter >= duration / frequency){
			currentLeftMargin += leftMargin;
			clearInterval(intervalId);
			counter = 0;
		}

	}

	this.stop = function (){
		if(this.properties){
			//if double clicked in the middle,margin value is reset to currently sliding
			element.style.marginLeft = currentLeftMargin;
		}
		counter=0;
		clearInterval(intervalId);
	}
}