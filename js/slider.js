function Animator(){
	var frequency=50;
	var counter=0;
	var currentLeftMargin=0;
	this.element;
	this.properties;
	this.duration;
	this.callback;
	this.leftMargin;
	this.sliderCount;
	that=this;
	this.animate=function (el,properties,duration,callback){
		that.element=el;
		that.sliderCount=that.element.getElementsByTagName("li").length;
		that.properties=properties;
		// that.leftMargin = that.properties.marginLeft.split("px")[0];
		that.leftMargin = that.properties.marginLeft;
		that.duration=duration;
		that.callback=callback;
			if(currentLeftMargin==0){//check for left limit
				if(that.leftMargin!=960){ 
					// if it isn't asked to move left from leftmost
					that.intervalId=setInterval(that.move, frequency);
				}	
			}else if(currentLeftMargin==(-960*(that.sliderCount-1))){//check for right limit
				if(that.leftMargin!=-960){
					// if it isn't asked to move right from rightmost
					that.intervalId=setInterval(that.move, frequency);
				}
			}else{//animate for middle range values
				that.intervalId=setInterval(that.move, frequency);
			}
	}
	this.move=function (){
		counter++;
		var val=currentLeftMargin+(that.leftMargin/(that.duration/frequency)*counter);
		that.element.style.marginLeft=val+"px";
		if(counter>=that.duration/frequency){
			currentLeftMargin+=that.leftMargin;
			clearInterval(that.intervalId);
			counter=0;
		}

	}
	this.stop=function (){
		if(this.properties){
			//if double clicked in the middle,margin value is reset to currently sliding
			that.element.style.marginLeft=that.leftMargin;
		}
		counter=0;
		clearInterval(that.intervalId);
	}
}
function Slider(){
	this.slider=document.getElementsByClassName("slider");
	this.listSlider=this.slider[0].getElementsByTagName("ul")[0];
	this.marginCount=0;
	thats=this;
	this.init=function (){
		a=new Animator();
		thats.putButtons();
		thats.autoAnimation();
	}
	this.putButtons=function(){
		// puts left and right buttons in sliders and call onclick actions
		this.left=document.createElement("img");
		this.left.src="images/left.png";
		this.left.id="left";
		this.left.onclick=thats.moveLeft;
		thats.slider[0].appendChild(this.left);
		this.right=document.createElement("img");
		this.right.src="images/right.png";
		this.right.id="right";
		this.right.onclick=thats.moveRight;
		thats.slider[0].appendChild(this.right);
		
	}
	this.moveLeft=function (){
			clearInterval(autoInterval);
			autoInterval=setInterval(thats.moveRight, 4000);//clears auto interval and sets it again
			a.stop();
			thats.marginCount+=960;
			a.animate(thats.listSlider,{marginLeft:960},2000,function(){console.log('done');});		
			}
	this.moveRight=function (){
			clearInterval(autoInterval);
			autoInterval=setInterval(thats.moveRight, 4000);//clears auto interval and sets it again
			a.stop();
			thats.marginCount-=960;
			a.animate(thats.listSlider,{marginLeft:-960},2000,function(){console.log('done');});
	}
	this.autoAnimation=function (){
		autoInterval=setInterval(thats.moveRight, 4000);
	}
}
var s= new Slider();
s.init();