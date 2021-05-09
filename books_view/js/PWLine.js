// 这是音效圈的实现代码

//set window.requestAnimationFrame
/*
(function (w, r) {
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(window, 'equestAnimationFrame');
*/

var w, h, minW;
var CanLine = document.querySelector("#CanLine");
var CTXLine = CanLine.getContext("2d");
var color;
var originX, originY; 
var lineR = 0;
//var can = document.querySelector("#can");
//var ctx = CanLine.getContext("2d");
var sw;
var hue1=0,hue2=25,hue3=50,hue4=75,hue5=100,hue6=125,hue7=150,hue8=175,hue9=200,hue10=225;
var hue = 0;
function PWLineInit(){
    CanLine.width = w = window.innerWidth;
    CanLine.height = h = window.innerHeight;
    minW = Math.min(w, h);
	maxW = Math.max(w, h);
	CTXLine.lineWidth = PWLineParam.lineWidth;
	CTXLine.shadowBlur = PWLineParam.shadowBlur;
	//setCTXLine();
}

function setCTXLine(){
	switch (PWLineParam.ColorMode){
		case 1:
			CTXLine.strokeStyle = PWLineParam.color;
			CTXLine.shadowColor = PWLineParam.blurColor;
			break;
		case 2:
			if(hue>255){PWLineParam.TagNow*=-1;hue=255;}
			if(hue<0){PWLineParam.TagNow*=-1;hue=0;}
			color = 'hsl('+hue+',90%,50%)';
			hue += PWLineParam.TagNow/PWLineParam.GradientRate;
			
			if(PWLineParam.SolidColorGradient){
				CTXLine.strokeStyle = color;
			}else{
				CTXLine.strokeStyle = PWLineParam.Color;
			}
			if(PWLineParam.BlurColorGradient){
				CTXLine.shadowColor = color;
			}else{
				CTXLine.shadowColor = PWLineParam.blurColor;
			}
			break;
		case 3:
			originX = maxW*PWLineParam.LineX;
			originY = minW*PWLineParam.LineY;
			rainbow = CTXLine.createRadialGradient(originX, originY, 0, originX, originY, lineR);

			if(PWLineParam.ColorRhythm){
				rainbow.addColorStop(".1", getColor(10));
				rainbow.addColorStop(".2", getColor(9));
				rainbow.addColorStop(".3", getColor(8));
				rainbow.addColorStop(".4", getColor(7));
				rainbow.addColorStop(".5", getColor(6));
				rainbow.addColorStop(".6", getColor(5));
				rainbow.addColorStop(".7", getColor(4));
				rainbow.addColorStop(".8", getColor(3));
				rainbow.addColorStop(".9", getColor(2));
				rainbow.addColorStop("1.0", getColor(1));
			}else{
				rainbow.addColorStop("0", "magenta");
				rainbow.addColorStop(".25", "blue");
				rainbow.addColorStop(".50", "green");
				rainbow.addColorStop(".75", "yellow");
				rainbow.addColorStop("1.0", "red");
			}
			color = rainbow;
				//CTXLine.strokeStyle = PWLineParam.color;
			CTXLine.fillStyle = color;
			CTXLine.strokeStyle = color;
			CTXLine.shadowColor = PWLineParam.blurColor;
			break;
	}
}

function getColor(casev){
	var  colornow = 0;
	switch(casev){
		case 1:
			colornow = 'hsl('+hue1+',90%,50%)';
			hue1 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue1  = hue1 %255;
			break;
		case 2:
			colornow = 'hsl('+hue2+',90%,50%)';
			hue2 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue2  = hue2 %255;
			break;
		case 3:
			colornow = 'hsl('+hue3+',90%,50%)';
			hue3 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue3  = hue3 %255;
			break;
		case 4:
			colornow = 'hsl('+hue4+',90%,50%)';
			hue4 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue4  = hue4 %255;
			break;
		case 5:
			colornow = 'hsl('+hue5+',90%,50%)';
			hue5 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue5  = hue5 %255;
			break;
		case 6:
			colornow = 'hsl('+hue6+',90%,50%)';
			hue6 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue6  = hue6 %255;
			break;
		case 7:
			colornow = 'hsl('+hue7+',90%,50%)';
			hue7 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue7  = hue7 %255;
			break;
		case 8:
			colornow = 'hsl('+hue8+',90%,50%)';
			hue8 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue8  = hue8 %255;
			break;
		case 9:
			colornow = 'hsl('+hue9+',90%,50%)';
			hue9 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue9  = hue9 %255;
			break;
		case 10:
			colornow = 'hsl('+hue10+',90%,50%)';
			hue10 += PWLineParam.TagNow/PWLineParam.GradientRate;
			hue10  = hue10 %255;
			break;
	}
	return colornow
}

/* 生成点 */
function PWLineCreatePoint(arr){
    PWLineParam.arr1 = [];
    PWLineParam.arr2 = [];
	var iv = (120 - PWLineParam.LineDensity)/2;
	if(PWLineParam.LinePosition == 1){
		sw = (maxW-PWLineParam.LineDensity*CTXLine.lineWidth)/(PWLineParam.LineDensity-1)*PWLineParam.sw;
	}else{
		sw = (minW-PWLineParam.LineDensity*CTXLine.lineWidth)/(PWLineParam.LineDensity-1)*PWLineParam.sw;
	};
    for(var i = iv,j = 0; i<(PWLineParam.LineDensity+iv); i++,j++){
        var w1 = arr[i] ? arr[i] : 0;
        var w2;
        if(PWLineParam.waveArr[i]){
            w2 = PWLineParam.waveArr[i] - 0.1;
        }else{
            w2 = 0;
        }
        w1 = Math.max(w1, w2);
        PWLineParam.waveArr[i] = w1 = Math.min(w1, 1.2);
        var w = w1*PWLineParam.range*100;
		
        var Deviation1;
        var Deviation2;
		switch (PWLineParam.Direction){
			case 1:
				Deviation1 = -w-1;
				Deviation2 = 1;
				break;
			case 2:
				Deviation1 = -1;
				Deviation2 = w+1;
				break;
			case 3:
				Deviation1 = -w-1;
				Deviation2 = w+1;
				break;
		}
		
        var p1 = getLineXY(Deviation1, j);
        var p2 = getLineXY(Deviation2, j);
		
        PWLineParam.arr1.push({'x':p1.x, 'y':p1.y});
        PWLineParam.arr2.push({'x':p2.x, 'y':p2.y});
    };
	if(PWLineParam.LinePosition == 1){
		lineR = PWLineParam.arr1[(PWLineParam.LineDensity)/2-1].x - PWLineParam.arr1[0].x;
	}else{
		lineR = PWLineParam.arr1[(PWLineParam.LineDensity)/2-1].y - PWLineParam.arr1[0].y;
	};
}

function getLineXY(Deviation,i){
	var x,y;
	
	if(PWLineParam.LinePosition == 1){
		x = maxW*PWLineParam.LineX+(i+0.5-PWLineParam.LineDensity/2)*sw+(i+0.5-PWLineParam.LineDensity/2)*CTXLine.lineWidth;
		/*
		if(i <= (PWLineParam.LineDensity/2-1)){
			x = maxW*PWLineParam.LineX-(i+0.5)*sw-(i+0.5)*CTXLine.lineWidth;
		}else{
			x = maxW*PWLineParam.LineX+(i+0.5-PWLineParam.LineDensity/2)*sw+(i+0.5-PWLineParam.LineDensity/2)*CTXLine.lineWidth;
		}*/
		y = minW*PWLineParam.LineY;
		return {'x':x,'y':y+Deviation};
	}
	else{
		x = minW*PWLineParam.LineY+(i+0.5-PWLineParam.LineDensity/2)*sw+(i+0.5-PWLineParam.LineDensity/2)*CTXLine.lineWidth;
		/*
		if(i <= (PWLineParam.LineDensity/2-1)){
			x = minW*PWLineParam.LineY-(i+0.5)*sw-(i+0.5)*CTXLine.lineWidth;
		}else{
			x = minW*PWLineParam.LineY+(i+0.5-PWLineParam.LineDensity/2)*sw+(i+0.5-PWLineParam.LineDensity/2)*CTXLine.lineWidth;
		}
		*/
		y = maxW*PWLineParam.LineX;
		return {'x':y+Deviation,'y':x};
	}	
}

/* 连线 */
function PWLineStyle1(){
	// 长条
		CTXLine.beginPath();
		for(var i = 0; i<PWLineParam.LineDensity; i++){
			CTXLine.moveTo(PWLineParam.arr1[i].x, PWLineParam.arr1[i].y);
			CTXLine.lineTo(PWLineParam.arr2[i].x, PWLineParam.arr2[i].y);
		}
		//CTXLine.closePath();
		CTXLine.stroke();
	// 上方中线
	if(PWLineParam.Direction == 1 && PWLineParam.MiddleLine == true)
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr2[0].x, PWLineParam.arr2[0].y);
		CTXLine.lineTo(PWLineParam.arr2[PWLineParam.LineDensity-1].x, PWLineParam.arr2[PWLineParam.LineDensity-1].y);
		CTXLine.stroke();
	}
    // 下方
	if(PWLineParam.Direction == 2 && PWLineParam.MiddleLine == true)
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr1[0].x, PWLineParam.arr1[0].y);
		CTXLine.lineTo(PWLineParam.arr1[PWLineParam.LineDensity-1].x, PWLineParam.arr1[PWLineParam.LineDensity-1].y);
		CTXLine.stroke();
	}
	// 双向中线
	if(PWLineParam.Direction == 3 && PWLineParam.MiddleLine == true)
	{
		CTXLine.beginPath();
		CTXLine.moveTo((PWLineParam.arr2[0].x+PWLineParam.arr1[0].x)/2, (PWLineParam.arr2[0].y+PWLineParam.arr1[0].y)/2);
		CTXLine.lineTo((PWLineParam.arr2[PWLineParam.LineDensity-1].x+PWLineParam.arr1[PWLineParam.LineDensity-1].x)/2, (PWLineParam.arr2[PWLineParam.LineDensity-1].y+PWLineParam.arr1[PWLineParam.LineDensity-1].y)/2);
		CTXLine.stroke();
	}
}

function PWLineStyle2(){
    // 上方
	if(PWLineParam.Direction != 2 || (PWLineParam.Direction==2 && PWLineParam.MiddleLine == true))
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr1[0].x, PWLineParam.arr1[0].y);
		for(var i=0; i<PWLineParam.LineDensity; i++){
			CTXLine.lineTo(PWLineParam.arr1[i].x, PWLineParam.arr1[i].y);
		}
		CTXLine.stroke();
	};
    // 下方
	if(PWLineParam.Direction != 1 || (PWLineParam.Direction==1 && PWLineParam.MiddleLine == true))
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr2[0].x, PWLineParam.arr2[0].y);
		for(var i=0; i<PWLineParam.LineDensity; i++){
			CTXLine.lineTo(PWLineParam.arr2[i].x, PWLineParam.arr2[i].y);
		}
		CTXLine.stroke();
	}
	// 双向中线
	if(PWLineParam.Direction == 3 && PWLineParam.MiddleLine == true)
	{
		CTXLine.beginPath();
		CTXLine.moveTo((PWLineParam.arr2[0].x+PWLineParam.arr1[0].x)/2, (PWLineParam.arr2[0].y+PWLineParam.arr1[0].y)/2);
		CTXLine.lineTo((PWLineParam.arr2[PWLineParam.LineDensity-1].x+PWLineParam.arr1[PWLineParam.LineDensity-1].x)/2, (PWLineParam.arr2[PWLineParam.LineDensity-1].y+PWLineParam.arr1[PWLineParam.LineDensity-1].y)/2);
		CTXLine.stroke();
	}
    // 上下连线
    CTXLine.beginPath();
    for(var i=0; i<PWLineParam.LineDensity; i++){
        CTXLine.moveTo(PWLineParam.arr1[i].x, PWLineParam.arr1[i].y);
        CTXLine.lineTo(PWLineParam.arr2[i].x, PWLineParam.arr2[i].y);
    }
    //CTXLine.closePath();
    CTXLine.stroke();

}

function PWLineStyle3(){
    // 上方
	if(PWLineParam.Direction != 2 || (PWLineParam.Direction==2 && PWLineParam.MiddleLine == true))
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr1[0].x, PWLineParam.arr1[0].y);
		for(var i=0; i<PWLineParam.LineDensity; i++){
			CTXLine.lineTo(PWLineParam.arr1[i].x, PWLineParam.arr1[i].y);
		}
		CTXLine.stroke();
	};
    // 下方
	if(PWLineParam.Direction != 1 || (PWLineParam.Direction==1 && PWLineParam.MiddleLine == true))
	{
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr2[0].x, PWLineParam.arr2[0].y);
		for(var i=0; i<PWLineParam.LineDensity; i++){
			CTXLine.lineTo(PWLineParam.arr2[i].x, PWLineParam.arr2[i].y);
		}
		CTXLine.stroke();
	}
	// 双向中线
	if(PWLineParam.Direction == 3 && PWLineParam.MiddleLine == true)
	{
		CTXLine.beginPath();
		CTXLine.moveTo((PWLineParam.arr2[0].x+PWLineParam.arr1[0].x)/2, (PWLineParam.arr2[0].y+PWLineParam.arr1[0].y)/2);
		CTXLine.lineTo((PWLineParam.arr2[PWLineParam.LineDensity-1].x+PWLineParam.arr1[PWLineParam.LineDensity-1].x)/2, (PWLineParam.arr2[PWLineParam.LineDensity-1].y+PWLineParam.arr1[PWLineParam.LineDensity-1].y)/2);
		CTXLine.stroke();
	}
	/*
	if(PWLineParam.MiddleLine == true){
		CTXLine.beginPath();
		CTXLine.moveTo(PWLineParam.arr1[0].x, PWLineParam.arr1[0].y);
		CTXLine.lineTo(PWLineParam.arr2[0].x, PWLineParam.arr2[0].y);
		CTXLine.moveTo(PWLineParam.arr1[PWLineParam.LineDensity-1].x, PWLineParam.arr1[PWLineParam.LineDensity-1].y);
		CTXLine.lineTo(PWLineParam.arr2[PWLineParam.LineDensity-1].x, PWLineParam.arr2[PWLineParam.LineDensity-1].y);
		CTXLine.stroke();	
	}
	*/
}

//function PWLInit(){
	//PWLineInit();
	//window.onresize = PWLineInit;
	//PWLineCreatePoint([]);
	//style1();	
//}

//PWLInit();

PWLineInit();

/*
window.wallpaperRegisterAudioListener && window.wallpaperRegisterAudioListener(wallpaperAudioListener);
	

function wallpaperAudioListener(arr){
    CTXLine.clearRect(0,0,w,h);
    PWLineCreatePoint(arr);
    if( PWLineParam.showLine ){
        switch (PWLineParam.style) {
            case 1:
                PWLineStyle1();
                break;
            case 2:
				//LineStyle2();
                //style2();
                break;
            case 3:
				//LineStyle3();
                //style3();
                break;
        }
    }
}

*/

/*function auto(){
 ctx.clearRect(0,0,w,h);
 PWLineCreatePoint(param.arr);
 style1();
 requestAnimFrame(auto);
 }
 auto();*/