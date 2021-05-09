/**
 * Created by xtong on 2017/5/6.
 */

// 主程序代码，监听事件

/** 全局定义 begin ------------------------------------ */

var strCity = "";
var backgroundRoute = "url('img/1.jpg')";
var videoRoute = "video/1-test.webm";
//var cusvideoRoute = "video.webm";
var cusvideoRoute = "";
var cusaudioRoute = "";
var audioRoute = "audio/1-Audio.ogg";
var mapRoute = "map/1.png";//粒子贴图路径
var cusmapRoute = {}; //自定义贴图路径

var FristLoad = true;

// 樱花对象
var sakura = document.getElementById("sakura");

// 视频相关
var myvideo = document.getElementById("myvideo");
var selectvideo = {};
var videorange = document.getElementById("myvideorange");
var videomodel = 1;
var VideoVolume = 0.5;
var VideoModelNow = 1;

// 音频相关
var myAudio = document.getElementById("myAudio");
var MuiscModel = 0;
var MuiscVolume = 0.5;
var selectmusic = {};

//可视化音频模板
var visual_audio_model = 1;
var PWCircle_show_bool = true;
var PWLine_show_bool = true;

// 开启幻灯
var SlideNow = false;
var wallpapermode = 1;
//幻灯片特效
var TransitionMode = 1;
var TransitionRandom = false;
// 开启随机播放
var random = false;
// 当前壁纸
var currentImg = "";
// 播放列表
var myList = [];
// 目录储存
var files = {};
// 自定义壁纸
var custom = {};
// 壁纸切换速度
var speed = 1;
// 背景样式
var bgStyle = 1;

//樱花
var showSakura = true;
var sakuratransparency = 0.15;


//时间相关
var timetransparency = 0.8;
var TimeX = 50;// 时间在x轴上的位置
var TimeY = 50;
var DateX = 50;
var DateY = 45;
var tShowSencends = true;//显示秒
var DateFormatTest = 1;
var TimeColorRhythm = false;
var TimeColor;
var TimeBlurColor;

//天气
var WeatherFormatTest =1;

//音频圈
var wallpaper = $('body').particles({}).audiovisualizer({});
var isGlobalSettings = false;

//完美粒子
var PWParticleShow = false;

/** 全局定义 end -------------------------------------- */

var audio = {
    // 全局参数
    opacity: 0.90,               // 不透明度
    color: '255,255,255',        // 颜色
    shadowColor: '255,255,255',  // 阴影颜色
    shadowBlur: 15,              // 模糊大小
    // 坐标参数
    offsetX: 0.5,                // X坐标偏移
    offsetY: 0.5,                // Y坐标偏移
    isClickOffset: false         // 鼠标坐标偏移
};

// 设定参数
var param = {
    style : 1, // 样式
    r : 0.45, // 圆的半径
    color : "rgba(255,255,255,0.8)", // 颜色
    blurColor : "#ffcccc", // 模糊颜色
    arr1 : [], // 外圆点集合
    arr2 : [], // 内圆点集合
    rotation : 0, // 是否旋转
	rotationcopy : 0,//备份
    offsetAngle : 0, //旋转角度
    waveArr : new Array(120),
    cX : 0.5, // 圆中心点在x轴位置
    cY : 0.5,
    range : 9, // 振幅
    shadowBlur: 15,
    lineWidth : 9,
    showCircle : true,
    wavetransparency : 0.8,
    showSemiCircle : false,
    SemiCircledirection : 1,
	Polygon : 12, //2-180多边形变换
	SolidColorGradient : true,
	BlurColorGradient : true,
	ColorRhythm : true,
	ColorMode : 1 ,//色彩模式
	TagNow : 1,
	GradientRate : 0.5
};

var PWLineParam = {
    style : 1, // 样式
    sw : 0.8, // 间距
	lineWidth : 9,
	waveArr : new Array(120),
	range : 5, // 振幅
    color : "rgba(255,255,255,0.8)", // 颜色
    blurColor : "#ffcccc", // 模糊颜色
	shadowBlur: 100,
    arr1 : [], // 外圆点集合
    arr2 : [], // 内圆点集合
	arr3 : [], // 上下中点
    LineX : 0.5, // 圆中心点在x轴位置
    LineY : 0.5,
    showLine : true,
	LinePosition : 1,
	Direction : 1,
	LineDensity : 120,
	LineTransparency : 0.8,
	MiddleLine	: false, //中线
	TagNow : 1,
	SolidColorGradient : true, //纯色渐变
	BlurColorGradient : true,//模糊色渐变
	ColorRhythm : true,//彩虹律动
	ColorMode : 1,//色彩模式
	GradientRate : 0.5
    //wavetransparency : 0.8,
    //showSemiCircle : false,
    //SemiCircledirection : 1,
	//Polygon : 12 //2-180多边形变换
};

var clearT = function(){
    // 清除定时器：t
    try{
        clearTimeout(t);
    } catch (e){
        console.log(e);

    }
};

var clearWT = function(){
    // 清除定时器：wt
    try{
        clearTimeout(wt);
    } catch (e){
        console.log(e);

    }
};

/* 监听配置 */
window.wallpaperPropertyListener={
    applyUserProperties: function(properties){

        // 自定义壁纸
        if(properties.image){
            // 获取自定义壁纸
			clearT();
            custom = properties.image.value;
			shouldShow();
        }
		//
		if(properties.customdirectory){
            // 获取自定义壁纸
			clearT();
			if(properties.customdirectory)
			{
				changeBackground();
			}else{
				shouldShow();
			}
        }
        // 监听幻灯开关变化
        if (properties.wallpapermode) {
			clearT();
            wallpapermode = properties.wallpapermode.value;
			changeBackground();
        }
		//幻灯片特效
		if (properties.TransitionMode) {
			TransitionMode = properties.TransitionMode.value;
        }
		//默认壁纸
		if (properties.DefaultWallpaper) {
			backgroundRoute = "url('imgs/"+ properties.DefaultWallpaper.value +".jpg')"
			shouldShow();
        }
		//自定义视频
		if(properties.selectvideo){

			if(wallpapermode == 3)
			{
				// 获取自定义视频地址
				selectvideo = properties.selectvideo.value;
				if(selectvideo)
				{
					//myvideo.src = "url('"+'file:///' + selectvideo + "')";
					cusvideoRoute = 'file:///' + selectvideo;
					//myvideo.src = 'file:///' + selectvideo;
					//myvideo.type = "video/webm";
					//myvideo.play();
					//SetCustomVideo();
				}
				else
				{
					cusvideoRoute = "";
				}
				ChangeVideoModel();
			}
        }
		//视频模板
		if (properties.videomodel) {
            videomodel = properties.videomodel.value;
			
			if(wallpapermode == 3)
			{
				videoRoute = 'video/' + videomodel + '-test.webm'
				if(cusvideoRoute == "")
				{
					ChangeVideoModel();
				}
			}
        }
		//自定义音乐
		if(properties.selectmusic)
		{
			selectmusic = properties.selectmusic.value;
			
			if(selectmusic)
			{	
				cusaudioRoute = 'file:///' + selectmusic;
			}
			else
			{
				cusaudioRoute = "";
			}
			ChangeAudioModel();
		}
		//音量
		if (properties.VideoVolume) 
		{
			myvideo.volume = properties.VideoVolume.value/100
        }
		//音频模板
		if (properties.MuiscModel) 
		{
            MuiscModel = properties.MuiscModel.value;
			audioRoute = "audio/" + MuiscModel +"-Audio.ogg"
			if(cusaudioRoute == "")
			{
				ChangeAudioModel();
			}
        }
		//音量
		if (properties.MuiscVolume) {
			myAudio.volume = properties.MuiscVolume.value/100
        }
        // 监听随机模式开关变化
        if (properties.random) {
            random = properties.random.value;
        }
        // 更改幻灯切换时间
        if(properties.imageswitchtimes){
            speed = properties.imageswitchtimes.value;
        }
        // 更改背景展示样式
        if(properties.imagedisplaystlye){
            bgStyle = properties.imagedisplaystlye.value;
            shouldShow();
        }
		//多边形变换
		if(properties.PolygonAngle){
             SetPolygonAngle(properties.PolygonAngle.value);
        }
        // 样式
        if(properties.style){
            param.style = properties.style.value;
        }
        // 半径
        if(properties.radius){
            param.r = properties.radius.value/100;
        }
        // 幅度
        if(properties.range){
            param.range = properties.range.value/5;
        }
        // 颜色
        if(properties.color){
            var c = properties.color.value.split(' ').map(function(c){return Math.ceil(c*255)});
            ctx.strokeStyle = param.color = 'rgba('+ c +',0.8)';
            //oClock.style.color = 'rgb('+c+')';
        }
        // 模糊颜色
        if(properties.blurColor){
            var c = properties.blurColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            ctx.shadowColor = param.blurColor = 'rgb('+ c +')';
            //oClock.style.textShadow = '0 0 20px rgb('+c+')';
        }
        // 是否显示时间
        if(properties.showTime){
            oClock.style.display = properties.showTime.value ? 'block' : 'none';
        }
		// 是否显示日期
        if(properties.showDate){
            oDate.style.display = properties.showDate.value ? 'block' : 'none';
        }
		// 是否显示秒
        if(properties.tShowSencends){
            tShowSencends = properties.tShowSencends.value;
        }
        // 圆的位置
        if(properties.cX){
            param.cX = properties.cX.value*0.01;
        }
        if(properties.cY){
            param.cY = properties.cY.value*0.01;
        }
		//色彩模式
		if(properties.ColorMode){
            param.ColorMode = properties.ColorMode.value;
        }
		//纯色渐变
		if(properties.SolidColorGradient){
            param.SolidColorGradient = properties.SolidColorGradient.value;
			
			if(!param.SolidColorGradient) ctx.strokeStyle = param.color;
        }
		//模糊色渐变
		if(properties.BlurColorGradient){
            param.BlurColorGradient = properties.BlurColorGradient.value;
        }
		//彩虹律动
		if(properties.ColorRhythm){
            param.ColorRhythm = properties.ColorRhythm.value;
        }
		//渐变速率
		if(properties.GradientRate){
            param.GradientRate = properties.GradientRate.value/10;
        }
		// 时间大小
        if(properties.tSize){
            var s = properties.tSize.value;
            oClock.style.fontSize = Math.floor(h/300*s) + 'px';
        }
		// 日期大小
        if(properties.DateSize){
            var s = properties.DateSize.value;
			oDate.style.fontSize = Math.floor(h/300*s) + 'px';
        } 
		// 日期格式
		if(properties.DateFormat){
            DateFormatTest = properties.DateFormat.value;
        }
        // 时间的位置
        if(properties.tX){
            TimeX = properties.tX.value;
            oClock.style.left = TimeX-50+'%';
			//oDate.style.left = TimeX-50+'%';
        }
        if(properties.tY){
            TimeY = properties.tY.value;
            oClock.style.top = TimeY-50+'%';
			//oDate.style.top = TimeY-45+'%';
        }
		// 日期的位置
        if(properties.DateX){
            DateX = properties.DateX.value;
			oDate.style.left = DateX-50+'%';
        }
        if(properties.DateY){
            DateY = properties.DateY.value;
			oDate.style.top = DateY-50+'%';
        }
		// 颜色律动
        if(properties.TimeColorRhythm){
            TimeColorRhythm = properties.TimeColorRhythm.value;
			if(!TimeColorRhythm){
				oClock.style.color = TimeColor;
				oDate.style.color = TimeColor;
				oClock.style.textShadow = TimeBlurColor;
				oDate.style.textShadow = TimeBlurColor;
			}
        }
		// 时间颜色
        if(properties.TimeColor){
            var c = properties.TimeColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            oClock.style.color = TimeColor = 'rgb('+c+')';
			oDate.style.color = TimeColor = 'rgb('+c+')';
        }
        // 时间模糊颜色
        if(properties.TimeBlurColor){
            var c = properties.TimeBlurColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            oClock.style.textShadow = TimeBlurColor = '0 0 20px rgb('+c+')';
			oDate.style.textShadow = TimeBlurColor = '0 0 20px rgb('+c+')';
        }
        // 时间制式
        if(properties.tStyle){
            tStyle = properties.tStyle.value;
            getTime();
        }
		//时间透明度
        if(properties.timetransparency){
            timetransparency = properties.timetransparency.value/100;
            oClock.style.opacity = timetransparency;
			oDate.style.opacity = timetransparency;
        }
		//天气
		//获取天气城市优先获取
		if(properties.weather_CityText){
			strCity = properties.weather_CityText.value;
			if(!FristLoad)//首次不调用天气，由总开关调用
			{
				//alert("调用:城市");	
				getWeather();
			}
        }
		// 是否天气
        if(properties.weather_show){
			clearWT();
			if(properties.weather_show.value)
			{
				weather.style.display = 'block';
				autoWeather();
			}else{
				weather.style.display = 'none';
			}
        }
		// 天气颜色
        if(properties.weather_Color){
            var c = properties.weather_Color.value.split(' ').map(function(c){return Math.ceil(c*255)});
            weather.style.color = 'rgb('+c+')';
        }
        // 天气颜色
        if(properties.weather_BlurColor){
            var c = properties.weather_BlurColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            weather.style.textShadow = '0 0 20px rgb('+c+')';
        }
		// 天气格式
		if(properties.weather_Format){
            WeatherFormatTest = properties.weather_Format.value;
			//if(!FristLoad)//首次不调用天气
			//{
				//alert("调用:天气格式");
				getWeather();
			//}
        }

		//天气透明度
        if(properties.weather_timetransparency){
            var t = properties.weather_timetransparency.value/100;
            weather.style.opacity = t;
        }
		// 天气大小
        if(properties.weather_size){
            var s = properties.weather_size.value;
			weather.style.fontSize = Math.floor(h/300*s) + 'px';
        } 
		// 天气位置
        if(properties.weatherX){
            var weatherX = properties.weatherX.value;
			weather.style.left = weatherX-50+'%';
        }
        if(properties.weatherY){
            var weatherY = properties.weatherY.value;
			weather.style.top = weatherY-50+'%';
        }
        // 是否旋转
        if(properties.rotation){
            param.rotation = properties.rotation.value;
			rotationcopy = param.rotation;
        }
        // 线宽
        if(properties.lineWidth){
            ctx.lineWidth = param.lineWidth = properties.lineWidth.value;
        }
        // 是否显示圆
        if(properties.showCircle){
            param.showCircle = properties.showCircle.value;
			PWCircle_show_bool = param.showCircle;
        }
        // 方向
        if(properties.direction){
            param.direction = properties.direction.value;
        }
        //樱花透明度
        if(properties.sakuratransparency){
            sakuratransparency = properties.sakuratransparency.value/100;
            sakura.getContext('experimental-webgl').canvas.style.opacity = sakuratransparency
        }
        //可视化音频透明度
        if(properties.wavetransparency){
            param.wavetransparency = properties.wavetransparency.value/100;
            ctx.globalAlpha = param.wavetransparency;
        }
        //显示为半圆
        if(properties.showSemiCircle){
            param.showSemiCircle = properties.showSemiCircle.value;
			if(param.showSemiCircle)
			{	
				rotationcopy = param.rotation;
				param.rotation = 0;
				param.offsetAngle = 0;
			}else{
				param.rotation =rotationcopy;
			}
		}
        //显示为半圆
        if(properties.SemiCircledirection){
            param.SemiCircledirection = properties.SemiCircledirection.value;
        }
        //樱花特效
        if(properties.showSakura){
            showSakura = properties.showSakura.value;
            if(showSakura){
                // 开启樱花，全屏樱花
                makeCanvasFullScreen(sakura);
            }else{
                // 关闭樱花，隐藏樱花
                makeCanvasHide(sakura);
            }
        }
		//显示直线
		if(properties.PWLineShow){
            PWLineParam.showLine = properties.PWLineShow.value;
			PWLine_show_bool = PWLineParam.showLine;
        }//直线位置
		if(properties.PWLinePosition){
            PWLineParam.LinePosition = properties.PWLinePosition.value;
        }
		//样式
		if(properties.PWLineStyle){
            PWLineParam.style = properties.PWLineStyle.value;
        }
		//方向
		if(properties.PWLineDirection){
            PWLineParam.Direction = properties.PWLineDirection.value;
        }
		//线宽
		if(properties.PWLineWidth){
            CTXLine.lineWidth = PWLineParam.lineWidth = properties.PWLineWidth.value;
        }
		//间距
		if(properties.PWLineSpacing){
            PWLineParam.sw = properties.PWLineSpacing.value/10;
        }
		//疏密
		if(properties.PWLineDensity){
            PWLineParam.LineDensity = properties.PWLineDensity.value*10;
        }
		//幅度
		if(properties.PWLineRange){
            PWLineParam.range = properties.PWLineRange.value/5;
        }
		//可视化音频透明度
        if(properties.PWLineTransparency){
            PWLineParam.LineTransparency = properties.PWLineTransparency.value/100;
            CTXLine.globalAlpha = PWLineParam.LineTransparency;
        }
		// 颜色
        if(properties.PWLineColor){
            var c = properties.PWLineColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            CTXLine.strokeStyle = PWLineParam.color = 'rgba('+ c +',0.8)';
        }
        // 模糊颜色
        if(properties.PWLineBlurColor){
            var c = properties.PWLineBlurColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
            CTXLine.shadowColor = PWLineParam.blurColor = 'rgb('+ c +')';
        }
		// 圆的位置
        if(properties.PWLineX){
            PWLineParam.LineX = properties.PWLineX.value/100.0;
        }
        if(properties.PWLineY){
            PWLineParam.LineY = properties.PWLineY.value/100.0;
        }
		//中间线
		if(properties.PWMiddleLine){
            PWLineParam.MiddleLine = properties.PWMiddleLine.value;
        }
		//色彩模式
		if(properties.PWLineColorMode){
            PWLineParam.ColorMode = properties.PWLineColorMode.value;
        }
		//纯色渐变
		if(properties.PWLineSolidColorGradient){
            PWLineParam.SolidColorGradient = properties.PWLineSolidColorGradient.value;
			if(!PWLineParam.SolidColorGradient) CTXLine.strokeStyle = PWLineParam.color;
        }
		//模糊色渐变
		if(properties.PWLineBlurColorGradient){
            PWLineParam.BlurColorGradient = properties.PWLineBlurColorGradient.value;
        }
		//彩虹律动
		if(properties.PWLineColorRhythm){
            PWLineParam.ColorRhythm = properties.PWLineColorRhythm.value;
        }
		//渐变速率
		if(properties.PWLineGradientRate){
            PWLineParam.GradientRate = properties.PWLineGradientRate.value/10;
        }
		//可视化音频模板选择
		if(properties.visual_audio_model){
            visual_audio_model = properties.visual_audio_model.value;
			switch (visual_audio_model){
				case 0://无
					param.showCircle = false;
					PWLineParam.showLine = false;
					break;
				case 1://完美壁纸
					param.showCircle =PWCircle_show_bool;
					PWLineParam.showLine = false;
					break;
				case 2://完美直线
					param.showCircle = false;
					PWLineParam.showLine = PWLine_show_bool;
					break;
				case 3://come soon
					//wallpaper.audiovisualizer({});
					param.showCircle = false;
					PWLineParam.showLine = false;
                    //$('body').particles('startParticles');
					break;
				case 4://完美直线
					param.showCircle = false;
					PWLineParam.showLine = false;
					break;
				default:
			}
        }
		
			// 粒子参数
            //-----------------------------------------------------------

            // 显示粒子
            if (properties.particles_isParticles) {
                if (properties.particles_isParticles.value) {
                    wallpaper.particles('startParticles');
                } else {
                    wallpaper.particles('clearCanvas')
                        .particles('stopParticles');
                }
            }
            // 粒子数量
            if (properties.particles_number) {
                wallpaper.particles('addParticles', properties.particles_number.value);
            }
            // 粒子不透明度
            if (properties.particles_opacity) {
                wallpaper.particles('set', 'opacity', properties.particles_opacity.value / 100);
            }
            // 粒子随机不透明度
            if (properties.particles_opacityRandom) {
                wallpaper.particles('set', 'opacityRandom', properties.particles_opacityRandom.value);
            }
            // 粒子颜色
            if (properties.particles_color) {
                var color = properties.particles_color.value.split(' ').map(function (c) {
                    return Math.ceil(c * 255)
                });
                wallpaper.particles('set', 'color', color);
            }
            // 粒子模糊颜色
            if (properties.particles_shadowColor) {
                var color = properties.particles_shadowColor.value.split(' ').map(function (c) {
                    return Math.ceil(c * 255)
                });
                wallpaper.particles('set', 'shadowColor', color);
            }
            // 粒子模糊大小
            if (properties.particles_shadowBlur) {
                wallpaper.particles('set', 'shadowBlur', properties.particles_shadowBlur.value);
            }
			// 自定义粒子图片
            if (properties.particles_image) {
				cusmapRoute = properties.particles_image.value
				shouldShowMap();
            }
            // 粒子类型
            if (properties.particles_shapeType) {
                switch (properties.particles_shapeType.value) {
                    case 1:
                        wallpaper.particles('set', 'shapeType', 'circle');
                        break;
                    case 2:
                        wallpaper.particles('set', 'shapeType', 'edge');
                        break;
                    case 3:
                        wallpaper.particles('set', 'shapeType', 'triangle');
                        break;
                    case 4:
                        wallpaper.particles('set', 'shapeType', 'star');
                        break;
                    case 5:
                        wallpaper.particles('set', 'shapeType', 'image');
						shouldShowMap();
                        break;
                    default:
                        wallpaper.particles('set', 'shapeType', 'circle');
                }
            }
			//默认图片
			if(properties.particles_picdef)
			{
				mapRoute = 'map/' + properties.particles_picdef.value + '.png';
				shouldShowMap();
			}
            // 粒子大小
            if (properties.particles_sizeValue) {
                wallpaper.particles('set', 'sizeValue', properties.particles_sizeValue.value);
            }
            // 粒子随机大小
            if (properties.particles_sizeRandom) {
                wallpaper.particles('set', 'sizeRandom', properties.particles_sizeRandom.value);
            }
            // 显示连线
            if (properties.particles_linkEnable) {
                wallpaper.particles('set', 'linkEnable', properties.particles_linkEnable.value);
            }
            // 连线距离
            if (properties.particles_linkDistance) {
                wallpaper.particles('set', 'linkDistance', properties.particles_linkDistance.value);
            }
            // 连线宽度
            if (properties.particles_linkWidth) {
                wallpaper.particles('set', 'linkWidth', properties.particles_linkWidth.value);
            }
            // 连线颜色
            if (properties.particles_linkColor) {
                var color = properties.particles_linkColor.value.split(' ').map(function (c) {
                    return Math.ceil(c * 255)
                });
                wallpaper.particles('set', 'linkColor', color);
            }
            // 连线不透明度
            if (properties.particles_linkOpacity) {
                wallpaper.particles('set', 'linkOpacity', properties.particles_linkOpacity.value / 100);
            }
            // 粒子是否移动
            if (properties.particles_isMove) {
                wallpaper.particles('set', 'isMove', properties.particles_isMove.value);
            }
            // 粒子速度
            if (properties.particles_speed) {
                wallpaper.particles('set', 'speed', properties.particles_speed.value);
            }
            // 随机粒子速度
            if (properties.particles_speedRandom) {
                wallpaper.particles('set', 'speedRandom', properties.particles_speedRandom.value);
            }
            // 粒子方向
            if (properties.particles_direction) {
                switch (properties.particles_direction.value) {
                    case 1:
                        wallpaper.particles('set', 'direction', 'none');
                        break;
                    case 2:
                        wallpaper.particles('set', 'direction', 'top');
                        break;
                    case 3:
                        wallpaper.particles('set', 'direction', 'top-right');
                        break;
                    case 4:
                        wallpaper.particles('set', 'direction', 'right');
                        break;
                    case 5:
                        wallpaper.particles('set', 'direction', 'bottom-right');
                        break;
                    case 6:
                        wallpaper.particles('set', 'direction', 'bottom');
                        break;
                    case 7:
                        wallpaper.particles('set', 'direction', 'bottom-left');
                        break;
                    case 8:
                        wallpaper.particles('set', 'direction', 'left');
                        break;
                    case 9:
                        wallpaper.particles('set', 'direction', 'top-left');
                        break;
                    default:
                        wallpaper.particles('set', 'direction', 'none');
                }
            }
            // 粒子是否笔直移动
            if (properties.particles_isStraight) {
                wallpaper.particles('set', 'isStraight', properties.particles_isStraight.value);
            }
            // 粒子反弹
            if (properties.particles_isBounce) {
                wallpaper.particles('set', 'isBounce', properties.particles_isBounce.value);
            }
            // 粒子离屏模式
            if (properties.particles_moveOutMode) {
                switch (properties.particles_moveOutMode.value) {
                    case 1:
                        wallpaper.particles('set', 'moveOutMode', 'out');
                        break;
                    case 2:
                        wallpaper.particles('set', 'moveOutMode', 'bounce');
                        break;
                    default:
                        wallpaper.particles('set', 'moveOutMode', 'out');
                }
            }
			
			            // 音频参数
            //-----------------------------------------------------------

            // 音频振幅
            if (properties.audio_amplitude) {
                wallpaper.audiovisualizer('set', 'amplitude', properties.audio_amplitude.value);
            }
            // 音频衰弱
            if (properties.audio_decline) {
                wallpaper.audiovisualizer('set', 'decline', properties.audio_decline.value / 100);
            }

            // 圆环参数
            //-----------------------------------------------------------

            // 显示圆环
            if (properties.audio_isRing) {
                if (properties.audio_isRing.value) {
                    wallpaper.audiovisualizer('set', 'isRing', true);
                } else {
                    wallpaper.audiovisualizer('set', 'isRing', false);
                }
            }
            // 显示静态环
            if (properties.audio_isStaticRing) {
                if (properties.audio_isStaticRing.value) {
                    wallpaper.audiovisualizer('set', 'isStaticRing', true);
                } else {
                    wallpaper.audiovisualizer('set', 'isStaticRing', false);
                }
            }
            // 显示内环
            if (properties.audio_isInnerRing) {
                if (properties.audio_isInnerRing.value) {
                    wallpaper.audiovisualizer('set', 'isInnerRing', true);
                } else {
                    wallpaper.audiovisualizer('set', 'isInnerRing', false);
                }
            }
            // 显示内环
            if (properties.audio_isOuterRing) {
                if (properties.audio_isOuterRing.value) {
                    wallpaper.audiovisualizer('set', 'isOuterRing', true);
                } else {
                    wallpaper.audiovisualizer('set', 'isOuterRing', false);
                }
            }
            // 圆环半径
            if (properties.audio_radius) {
                wallpaper.audiovisualizer('set', 'radius', properties.audio_radius.value / 10);
            }
            // 圆环旋转
            if (properties.audio_ringRotation) {
                wallpaper.audiovisualizer('set', 'ringRotation', properties.audio_ringRotation.value);
            }
            // 圆环和小球不透明度
            if (properties.audio_opacity) {
                audio.opacity = properties.audio_opacity.value / 100;
                //if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'opacity', audio.opacity);
                //}
            }
            // 圆环和小球颜色
            if (properties.audio_color) {
                audio.color = properties.audio_color.value.split(' ').map(function (c) {
                    return Math.ceil(c * 255)
                });
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'color', audio.color);
                }
            }
            // 圆环和小球模糊颜色
            if (properties.audio_shadowColor) {
                audio.shadowColor = properties.audio_shadowColor.value.split(' ').map(function (c) {
                    return Math.ceil(c * 255)
                });
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'shadowColor', audio.shadowColor);
                }
            }
            // 圆环和小球发光程度
            if (properties.audio_shadowBlur) {
                audio.shadowBlur = properties.audio_shadowBlur.value * 5;
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'shadowBlur', audio.shadowBlur);
                }
            }
            // 圆环和小球X轴偏移
            if (properties.audio_offsetX) {
                audio.offsetX = properties.audio_offsetX.value / 100;
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'offsetX', audio.offsetX);
                }
            }
            // 圆环和小球Y轴偏移
            if (properties.audio_offsetY) {
                audio.offsetY = properties.audio_offsetY.value / 100;
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'offsetY', audio.offsetY);
                }
            }
            // 圆环和小球鼠标坐标偏移
            if (properties.audio_isClickOffset) {
                audio.isClickOffset = properties.audio_isClickOffset.value;
                if (isGlobalSettings == false) {
                    wallpaper.audiovisualizer('set', 'isClickOffset', audio.isClickOffset);
                }
            }

            // 线条参数
            //-----------------------------------------------------------

            // 是否连线
            if (properties.audio_isLineTo) {
                wallpaper.audiovisualizer('set', 'isLineTo', properties.audio_isLineTo.value);
            }
            // 第一点
            if (properties.audio_firstPoint) {
                wallpaper.audiovisualizer('set', 'firstPoint', properties.audio_firstPoint.value);
            }
            // 第二点
            if (properties.audio_secondPoint) {
                wallpaper.audiovisualizer('set', 'secondPoint', properties.audio_secondPoint.value);
            }
            // 圆环点数
            if (properties.audio_pointNum) {
                wallpaper.audiovisualizer('set', 'pointNum', properties.audio_pointNum.value);
            }
            // 内外环距离
            if (properties.audio_distance) {
                wallpaper.audiovisualizer('set', 'distance', properties.audio_distance.value);
            }
            // 线条粗细
            if (properties.audio_lineWidth) {
                wallpaper.audiovisualizer('set', 'lineWidth', properties.audio_lineWidth.value);
            }

            // 小球参数
            //-----------------------------------------------------------

            // 显示小球
            if (properties.audio_isBall) {
                wallpaper.audiovisualizer('set', 'isBall', properties.audio_isBall.value);
            }
            // 小球间隔
            if (properties.audio_ballSpacer) {
                wallpaper.audiovisualizer('set', 'ballSpacer', properties.audio_ballSpacer.value);
            }
            // 小球大小
            if (properties.audio_ballSize) {
                wallpaper.audiovisualizer('set', 'ballSize', properties.audio_ballSize.value);
            }
            // 圆环旋转
            if (properties.audio_ballRotation) {
                wallpaper.audiovisualizer('set', 'ballRotation', properties.audio_ballRotation.value);
            }
			
			//完美粒子
			// 数量等级
            	if(properties.number && properties.number.value != numLevel){
            		numLevel = properties.number.value;
            		createPoint();
            	};
            	// 背景颜色
				if(properties.bgcolor){
					var bgcolor = properties.bgcolor.value.split(' ').map(function(c){return Math.ceil(c*255)});
					CanPar.style.backgroundColor = 'rgb('+bgcolor+')';
				};
				// 背景图
				if(properties.image123){
					if(properties.image.value){
						CanPar.style.backgroundImage = 'url(file:///'+ properties.image.value +')';
						CanPar.style.backgroundSize = '100% 100%';
					}else{
						CanPar.style.backgroundImage = 'none';
					}
				};
				// 粒子大小（系数）
				if(properties.ratio){
					ratio = properties.ratio.value/1.5;
				};
				// 粒子大小动态补偿
				if(properties.tEqualize){
					equalize = 1-properties.tEqualize.value/10;
				};
				// 是否显示连线
				if(properties.showline){
					isShowLine = properties.showline.value;
				};
				// 是否显示粒子
				if(properties.showpoint){
					isShowPoint = properties.showpoint.value;
				};
				// 粒子是否跟随音频移动
				if(properties.smovefollow){
					isMoveFollow = properties.smovefollow.value;
				};
				// 粒子样式
				if(properties.style){
					pStyle = properties.style.value;
				};
				// 是否使用单色
				if(properties.usePColor){
					usePColor = properties.usePColor.value;
				};
				// 粒子颜色
				if(properties.pColor){
					var color = properties.pColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
					pColor = 'rgba('+color+',0.8)';
				};
				// 是否开启模糊
				if(properties.isBlur){
					isBlur = properties.isBlur.value;
				};
				// 模糊颜色
				if(properties.blurColor){
					var color = properties.blurColor.value.split(' ').map(function(c){return Math.ceil(c*255)});
					blurColor = 'rgb('+color+')';
				};
				FristLoad = false;
		
    },
    userDirectoryFilesAddedOrChanged: function(propertyName, changedFiles) {
        if (!files.hasOwnProperty(propertyName)) {
            // First time that files are sent.
            files[propertyName] = changedFiles;
        } else {
            files[propertyName] = files[propertyName].concat(changedFiles);

        }
        updateFileList(files[propertyName]);
    },
    userDirectoryFilesRemoved: function(propertyName, removedFiles) {
        // The user removed files from the directory while the wallpaper was running.
        // Remove these files from the global array first.
        for (var i = 0; i < removedFiles.length; ++i) {
            var index = files[propertyName].indexOf(removedFiles[i]);
            var myindex = myList.indexOf(removedFiles[i]);
            if (index >= 0) {
                files[propertyName].splice(index, 1);
            }
            if (myindex >= 0) {
                // 列表中删除
                myList.splice(myindex, 1);
            }
        }
        updateFileList(files[propertyName]);
    },
	setPaused: function( isPaused ) {
		if (isPaused){
			myvideo.pause();
			myAudio.pause();
		}
		else{
			if (myvideo.paused) {
				myvideo.play();
			}
			if (myAudio.paused) {
				myAudio.play();
			}
		}
	}
};

//多边形模式
var SetPolygonAngle = function(mode){

	switch (mode){
		case 1:
			param.PolygonAngle = 1;
			Polygon = 295; 
			break;
		case 2:
			param.PolygonAngle = 2;
			Polygon = 270;
			break;
		case 3:
			param.PolygonAngle = 4;
			Polygon = 245;
			break;
		case 4:
			param.PolygonAngle = 5;
			Polygon = 220;
			break;
		case 5:
			param.PolygonAngle = 7;
			Polygon = 195;
			break;
		case 6:
			param.PolygonAngle = 9;
			Polygon = 170;
			break;
		case 7:
			param.PolygonAngle = 10;
			Polygon = 145;
			break;
		case 8:
			param.PolygonAngle = 12;
			Polygon = 120;
			break;
		case 9:
			param.PolygonAngle = 30;
			Polygon = 95;
			break;
		case 10:
			param.PolygonAngle = 60;
			Polygon = 70;
			break;
		case 11:
			param.PolygonAngle = 90;
			Polygon = 45;
			break;
		case 12:
			param.PolygonAngle = 180;
			Polygon = 20;
			break;
		default:		
	}
	
};

var shouldShowMap = function(){
	if(cusmapRoute){
		wallpaper.particles('particlesImage', cusmapRoute,'false');
	}else{
		wallpaper.particles('particlesImage', mapRoute,'true');
	}
};


