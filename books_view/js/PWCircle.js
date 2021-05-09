// 这是音效圈的实现代码

//set window.requestAnimationFrame
/*
(function (w, r) {
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(window, 'equestAnimationFrame');
*/

var w, h, minW;
var can = document.querySelector("#can");
var ctx = can.getContext("2d");
var	circleX;
var	circleY;
var roh = 0;
var rainRad;
//var CanPar = document.getElementById("#CanPar");
//var CXTPar = CanPar.getContext("2d");
//var hue = 0;

function resize(){
    can.width = w = window.innerWidth;
    can.height = h = window.innerHeight;
    minW = Math.min(w, h);
	ctx.lineWidth = param.lineWidth;
	ctx.shadowBlur = param.shadowBlur;
	rainRad = Math.sqrt((Math.pow((h), 2) + Math.pow((w), 2)));
    //setCan();
}


function setCan(){
	switch (param.ColorMode){
		case 1:
			ctx.strokeStyle = param.color;;
			ctx.shadowColor = param.blurColor;
			break;
		case 2:
			if(hue>255){param.TagNow*=-1;hue=255;}
			if(hue<0){param.TagNow*=-1;hue=0;}
			color = 'hsl('+hue+',90%,50%)';
			hue += param.TagNow/param.GradientRate;
			
			if(param.SolidColorGradient){
				ctx.strokeStyle = color;
			}else{
				ctx.strokeStyle = param.Color;
			}
			if(param.BlurColorGradient){
				ctx.shadowColor = color;
			}else{
				ctx.shadowColor = param.blurColor;
			}
			break;
		case 3:
			var ranX =  rainRad/3 * Math.cos(roh) + w;
			var ranY = rainRad/3 * Math.sin(roh) + h;
			roh = (roh+(Math.PI/ 300)) % (2 * Math.PI);
			circleX = w*param.cX;
			circleY = h*param.cY;
			rainbow = ctx.createRadialGradient(circleX, circleY, 0, ranX/2, ranY/2, w/3);

			
			if(param.ColorRhythm){
				//rainbow.addColorStop("0", getColor(10));
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
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.shadowColor = param.blurColor;
			break;
	}
}


/* 生成点 */
function createPoint(arr){
    param.arr1 = [];
    param.arr2 = [];
    for(var i=0; i<120; i++){
        var deg
        if(param.showSemiCircle){
            switch (param.SemiCircledirection) {
                case 1://上
                    deg = Math.PI/120*(i+param.offsetAngle+0.5)*-1; //半圆角度
                    break;
                case 2://下
                    deg = Math.PI/120*(i+param.offsetAngle+0.5); //半圆角度
                    break;
                case 3://左
                    deg = Math.PI/120*(i+param.offsetAngle-179.5);//半圆角度
                    break;
                case 4://右
                    deg = Math.PI/120*(i+param.offsetAngle+180.5); //半圆角度
                    break;
            }
        }else{
            deg = Math.PI/param.PolygonAngle*(i+param.offsetAngle)*3; //全圆角度
        }
        var w1 = arr[i] ? arr[i] : 0;
        var w2;
        if(param.waveArr[i]){
            w2 = param.waveArr[i] - 0.1;
        }else{
            w2 = 0;
        }
        w1 = Math.max(w1, w2);
        param.waveArr[i] = w1 = Math.min(w1, 1.2);
        var w = w1*param.range*100;
        var offset1;
        var offset2;
        switch (param.direction) {
            case 1:
                offset1 = param.r*minW/2+w+1;
                offset2 = param.r*minW/2;
                break;
            case 2:
                offset1 = param.r*minW/2; // 外圆偏移
                offset2 = param.r*minW/2-w-1; // 内圆偏移
                break;
            case 3:
                offset1 = param.r*minW/2+w+1; // 外圆偏移
                offset2 = param.r*minW/2-w-1; // 内圆偏移
                break;
        }
        var p1 = getXY(offset1, deg);
        var p2 = getXY(offset2, deg);
        param.arr1.push({'x':p1.x, 'y':p1.y});
        param.arr2.push({'x':p2.x, 'y':p2.y});
    }
    if(param.rotation){
        param.offsetAngle += param.rotation/Polygon;
        if(param.offsetAngle>=360){
            param.offsetAngle = 0;
        }else if(param.offsetAngle<=0){
            param.offsetAngle = 360;
        }
    }
}
function getXY(offset, deg){
    return {'x':Math.cos(deg)*offset+param.cX*w, 'y':Math.sin(deg)*offset+param.cY*h};
}

/* 连线 */
function style1(){
    // 内外圆连线
    ctx.beginPath();
    for(var i=0; i<120; i++){
        ctx.moveTo(param.arr1[i].x, param.arr1[i].y);
        ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}
function style2(){
    // 外圆
    ctx.beginPath();
    ctx.moveTo(param.arr1[0].x, param.arr1[0].y);
    for(var i=0; i<120; i++){
        ctx.lineTo(param.arr1[i].x, param.arr1[i].y);
    }
    if(!param.showSemiCircle){
        ctx.closePath();
    }
    ctx.stroke();
    // 内圆
    ctx.beginPath();
    if(param.showSemiCircle){
        ctx.moveTo(param.arr2[0].x, param.arr2[0].y);
        for(var i=0; i<120; i++){
            ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
        }
    }else{
        ctx.moveTo(param.arr2[0].x, param.arr2[0].y);
        for(var i=0; i<120; i++){
            ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
        }
    }
    if(!param.showSemiCircle){
        ctx.closePath();
    }
    ctx.stroke();
    // 内外圆连线
    ctx.beginPath();
    for(var i=0; i<120; i++){
        ctx.moveTo(param.arr1[i].x, param.arr1[i].y);
        ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();

}
function style3(){
    // 外圆
    ctx.beginPath();
    ctx.moveTo(param.arr1[0].x, param.arr1[0].y);
    for(var i=0; i<120; i++){
        ctx.lineTo(param.arr1[i].x, param.arr1[i].y);
    }
    if(!param.showSemiCircle){
        ctx.closePath();
    }
    ctx.stroke();
    // 内圆
    ctx.beginPath();
    if(param.showSemiCircle){
        ctx.moveTo(param.arr2[0].x, param.arr2[0].y);
        for(var i=0; i<120; i++){
            ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
        }
    }else{
        ctx.moveTo(param.arr2[0].x, param.arr2[0].y);
        for(var i=0; i<120; i++){
            ctx.lineTo(param.arr2[i].x, param.arr2[i].y);
        }
    }
    if(!param.showSemiCircle){
        ctx.closePath();
    }
    ctx.stroke();
}

resize();
//function PWCInit(){
	//resize();
	//window.onresize = resize;
	//createPoint([]);
	//style1();	
//}
//PWCInit();

window.wallpaperRegisterAudioListener && window.wallpaperRegisterAudioListener(wallpaperAudioListener);


function wallpaperAudioListener(arr){
	wallpaper.audiovisualizer('clearCanvas');
	CTXLine.clearRect(0,0,w,h);
	ctx.clearRect(0,0,w,h);
	if(TimeColorRhythm) setTimeColor();
	switch (visual_audio_model) {
    case 1:    
		setCan();
		createPoint(arr);
		if( param.showCircle ){
			switch (param.style) {
			case 1:
				style1();
				break;
			case 2:
				style2();
				break;
			case 3:
				style3();
				break;
			}
		}
        break;
    case 2:
		setCTXLine();
		PWLineCreatePoint(arr);
		if( PWLineParam.showLine ){
			switch (PWLineParam.style) {
			case 1:
				PWLineStyle1();
				break;
			case 2:
				PWLineStyle2();
				break;
			case 3:
				PWLineStyle3();
				break;
			}
		}
        break;
	case 3:
		wallpaper.audiovisualizer('drawCanvas', arr);
		break;
    }
	if(true)
	{
		for(var i=0; i<32; i++)
		{
			audioArrayPar[i] = Math.floor(arr[i*4]*100);
		}
	}
}
/*
function auto(){
 ctx.clearRect(0,0,w,h);
 createPoint(param.arr);
 style1();
 requestAnimFrame(auto);
 }
 auto();*/