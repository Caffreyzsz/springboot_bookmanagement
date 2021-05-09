/**
 * Created by Administrator on 2017/5/6 0006.
 */
// 当前时间实现代码
/*
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
*/
var oClock = document.querySelector("#clock");
var oDate = document.querySelector("#oDate");
var tStyle = true;

var w_array = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
var we_array = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var m_array = new Array("正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月");
var me_array = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

//var WT;
var vv = 0;
var timeTag = 1;
var color2;



var  cityname = "未获取";
var  feels = "未获取";
var  weatherdata = "未获取";
var  high = "未获取";
var  low = "未获取";
var  weathernow = "未获取";
var  wind = "未获取";
var  windLv = "未获取";


//以后添加
function setTimeColor(){

		if(vv>255){timeTag*=-1;vv=255;}
		if(vv<0){timeTag*=-1;vv=0;}
		color2 = 'hsl('+vv+',90%,50%)';
		vv += timeTag/1;
		
		
		oClock.style.color = color2;
		oDate.style.color = color2;
		oClock.style.textShadow = '0 0 20px ' + color2;
		oDate.style.textShadow = '0 0 20px' + color2;
		//oClock.style.textShadow = '0 0 20px rgb('+c+')';
		//oDate.style.textShadow = '0 0 20px rgb('+c+')';
		//oClock.style.color = 'rgb('+c+')';
		//oDate.style.color = 'rgb('+c+')';
}


function oClockInit(){
	var w = window.innerWidth;
    var h = window.innerHeight;
	oClock.style.width = w+'px';
	oClock.style.lineHeight = h+'px';
	oClock.style.height =  h+'px';
	oClock.style.fontSize = Math.floor(h/300*20) + 20 + 'px';
	oDate.style.width = w+'px';
	oDate.style.lineHeight = h+100+'px';
	oDate.style.height =  h+'px';
	oDate.style.fontSize = Math.floor(h/300*20) + 20 + 'px';
	
	//weather.font-size = '0.5em';
}

oClockInit();
//window.onresize = oClockInit;

/*
var show = document.querySelector("#show");
function showi(str){
    show.innerHTML = str;
}
*/


/* 时间 */
function getTime(){
    var t = new Date();
	
    if(tStyle){
		if(tShowSencends){
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds()) + "</span>";
		}else{
			oClock.innerHTML = add0(t.getHours())+" : "+add0(t.getMinutes());
		}
		//oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+t.getMonth() + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
    }else{
        var h = t.getHours();
        var str = h<12 ? "AM" : "PM";
        //var str = h<12 ? "上午" : "下午";
        h = h<=12 ? h : h-12;
		if(tShowSencends){
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+" <span class='sec'>"+add0(t.getSeconds())+"</span><span class='st'>"+str+"</span></span>";
		}else{
			oClock.innerHTML = "<span id='time'>"+add0(h)+" : "+add0(t.getMinutes())+ "</span>" +" <span class='sec'>"+ str + "</span>"
		}
    }
	//日期获取
		switch (DateFormatTest) {
            case 1://"YYYY年MM月DD日 星期x"
				oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
				break;
            case 2://"YYYY年MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"年"+(t.getMonth()+1) + "月" + t.getDate() + "日 "+ "</span>";
                break;
            case 3://"MM月DD日 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日 "+ w_array[t.getDay()] + "</span>";
                break;
			case 4://"MM月DD日"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日"+ "</span>";
                break;
            case 5://"星期x"
                oDate.innerHTML = "<span class='sec'>" + w_array[t.getDay()] + "</span>";
                break;
            case 6://"月份 星期x"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 7://"月份"
                oDate.innerHTML = "<span class='sec'>" + m_array[t.getMonth()] + "</span>";
                break;
            case 8://"YYYY-MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
			case 9://"YYYY-MM-DD 星期X"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ w_array[t.getDay()] + "</span>";
                break;
            case 10://"YYYY-MM-DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"-"+(t.getMonth()+1) + "-" + t.getDate() + "</span>";
                break;
			case 11://"MM-DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 12://"Month week"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 13://"week"
                oDate.innerHTML = "<span class='sec'>" + we_array[t.getDay()] + "</span>";
                break;
			case 14://"Month"
                oDate.innerHTML = "<span class='sec'>" + me_array[t.getMonth()] + "</span>";
                break;
            case 15://"YYYY/MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 16://"YYYY/MM/DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 17://"YYYY/MM/DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() +"/"+(t.getMonth()+1) + "/" + t.getDate()  + "</span>";
                break;
            case 18://"MM/DD week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "&nbsp"+ we_array[t.getDay()] + "</span>";
                break;
            case 19://"MM/DD"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "</span>";
                break;
			case 20://"Month"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "</span>";
                break;
			case 21://"MM/DD/YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 22://"MM/DD/YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 23://"MM/DD/YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "/" + t.getDate() + "/" + t.getFullYear() + "</span>";
                break;
			case 24://"MM-DD-YYYY"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "</span>";
                break;
            case 25://"MM-DD-YYYY week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 26://"MM-DD-YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "-" + t.getDate() + "-" + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 27://MM.DD.YYYY
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear()  + "</span>";
                break;
            case 28://"YYYY.MM.DD"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "</span>";
                break;
            case 29://"YYYY.MM.DD Week"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
			case 30://"YYYY.MM.DD 星期x"
                oDate.innerHTML = "<span class='sec'>" + t.getFullYear() + "." + t.getDate() + "." + (t.getMonth()+1) + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
            case 31://"MM.DD.YYYY Week"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + we_array[t.getDay()] + "</span>";
                break;
            case 32://"MM.DD.YYYY 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "." + t.getDate() + "." + t.getFullYear() + "&nbsp" + w_array[t.getDay()] + "</span>";
                break;
			case 33://"MM月DD日YYYY年 星期x"
                oDate.innerHTML = "<span class='sec'>" + (t.getMonth()+1) + "月" + t.getDate() + "日" + t.getFullYear() + "年" + "&nbsp" + w_array[t.getDay()]  + "</span>";
                break;
        }
}
function autoTime(){
    getTime();
    setTimeout(autoTime, 1000);
}
function add0(n){
    return n<10 ? '0'+n : ''+n;
}

autoTime();


