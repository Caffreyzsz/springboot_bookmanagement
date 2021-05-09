		
		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					function( callback ){
						window.setTimeout(callback, 1000 / 60);
					};
		})();
		
		//var oShow = document.getElementById('show');
		var audioArrayPar = new Array(32);
		
		var CanPar = document.getElementById("CanPar");
		var CXTPar = CanPar.getContext("2d");
		// 控制画布大小
		wResize();
		function wResize(){
			CanPar.width = window.innerWidth;
			CanPar.height = window.innerHeight;
		};

		/* 自定义选项 */
		var ratio = 1; // 粒子大小（系数）
		var isShowLine = false; // 是否显示连线
		var isShowPoint = true; // 是否显示粒子
		var isMoveFollow = true; // 是否跟随音乐移动
		var numLevel = 3; // 数量等级
		var equalize = 0.5; // 动态补偿
		var pStyle = 1; // 粒子样式：0 描边，1 填充
		var usePColor = false; // 粒子是否使用自定义颜色
		var pColor = 'rgba(255,255,255,0.8)'; //自定义粒子颜色
		var isBlur = false;  // 是否开启模糊
		var blurColor = 'rgb(255,255,255)'; //模糊颜色
		
		// 初始鼠标位置
		var mouse = {
			x : CanPar.width/2,
			y : CanPar.height/2
		};
		CanPar.onmousemove = function(ev){
			var ev = ev||window.event;
			mouse.x = ev.clientX;
			mouse.y = ev.clientY;
		};
		// 粒子参数
		var points = {
			num : Math.floor(CanPar.width*CanPar.height/5000),  // 粒子初始数量
			maxSize : 2.5,  // 粒子最大半径
			mRadius : 120,  // 粒子与鼠标的距离(在此距离内的粒子允许连线)
			distance : 80,  // 粒子与粒子的距离(在此距离内的粒子间会连线)
			arr : []  // 保存每个粒子对象
		};
		var num = 0; //实际数量
		/*
		window.onresize = function(){
			wResize();
			points.num = Math.floor(CanPar.width*CanPar.height/5000);
			PWParcreatePoint();
		};
		/
		// 粒子颜色
		function ranColor(){  //  随机颜色
			return Math.floor(Math.random()*250+5);
		}
		function addColor(r, g, b, a){  // 组合颜色
			return "rgba("+r+","+g+","+b+","+a+")";
		}
		function mixColor(point1,point2,a){  // 混合颜色
			var r = Math.floor((point1.color.r*point1.radius+point2.color.r*point2.radius)/(point1.radius+point2.radius));
			var g = Math.floor((point1.color.g*point1.radius+point2.color.g*point2.radius)/(point1.radius+point2.radius));
			var b = Math.floor((point1.color.b*point1.radius+point2.color.b*point2.radius)/(point1.radius+point2.radius));
			return addColor(r,g,b,a);
		}
		function Color(){  // 创建颜色对象
			this.r = ranColor();
			this.g = ranColor();
			this.b = ranColor();
			this.all = addColor(this.r, this.g, this.b, 0.75);
		}
		// 创建粒子对象
		var pNum = 0;
		function Point(){
			this.random = Math.floor(Math.random()*90)*0.01+0.1;
			this.alpha = 1-this.random+0.05; // 粒子透明度
			this.radius = this.random*points.maxSize;  // 粒子半径
			this.x = Math.random()*CanPar.width;  // 粒子圆心坐标x,y
			this.y = Math.random()*CanPar.height;
			this.speedX = -0.5+Math.random();  // 粒子的移动速度
			this.speedY = -0.5+Math.random();
			this.color = new Color();  // 粒子的颜色
			this.index = pNum++;
			pNum %= 32;
			this.r = 0; // 粒子过渡半径
		};
		/*Point.prototype.draw = function(){
			CXTPar.beginPath();
			CXTPar.fillStyle = this.color.all;
			CXTPar.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
			CXTPar.fill();
		};*/
		/*Point.prototype.move = function(){
			this.x += this.speedX;
			this.y += this.speedY;
			if(this.x>=CanPar.width || this.x<=0){
				this.speedX = -this.speedX;
			}
			if(this.y>=CanPar.height || this.y<=0){
				this.speedY = -this.speedY;
			}
		};*/
		function PWParcreatePoint(){
			points.arr = [];
			num = Math.floor(points.num*numLevel/4);
			for(var i=0; i<num; i++){  // 将实例化的粒子对象存入数组
				points.arr.push(new Point());
			}
		}
		// 绘制
		function drawP(point){
			var l = audioArrayPar[point.index]/20;
			if(!l || l<1) l = 1;
			var radius = Math.min(point.radius*l,4)*ratio;
			if(point.r && equalize !=1) radius = radius*equalize+point.r*(1-equalize);
			/*if(isBlur && !usePColor){
				CXTPar.shadowColor = 'rgb('+point.color.r+','+point.color.g+','+point.color.b+')';
			};*/
			CXTPar.beginPath();
			var pointColor = usePColor ? pColor.replace(/0\.8/, point.alpha) : point.color.all;
			pStyle ? CXTPar.fillStyle = pointColor : CXTPar.strokeStyle = pointColor;
			CXTPar.arc(point.x, point.y, radius, 0, 2*Math.PI, false);
			pStyle ? CXTPar.fill() : CXTPar.stroke();
			if(equalize != 1) point.r = radius;
		}
		// 移动
		function moveP(point, sum){
			point.x += point.speedX*sum;
			point.y += point.speedY*sum;
			if(point.x>=CanPar.width){
				point.x = CanPar.width;
				point.speedX = -point.speedX;
			}else if(point.x<=0){
				point.x = 0;
				point.speedX = -point.speedX;
			};
			if(point.y>=CanPar.height){
				point.y = CanPar.height;
				point.speedY = -point.speedY;
			}else if(point.y<=0){
				point.y = 0;
				point.speedY = -point.speedY;
			};
		}
		// 绘制粒子
		var sum =0;
		function drawPoint(){
			CXTPar.shadowBlur = isBlur ? 10 : 0;
			//if(isBlur && usePColor) CXTPar.shadowColor = blurColor;
			if(isBlur) CXTPar.shadowColor = blurColor;
			if(isMoveFollow){
				var arr=audioArrayPar.slice(1,6);
				sum=arr.reduce(function(a,b){return a+b},0)*0.12;
				if(!sum || sum<0.5) sum = 0.5;
				sum = Math.min(sum, 5);
			}else{
				sum = 1.5;
			}
			CXTPar.lineWidth = 1.5;
			for(var i=0; i<num; i++){
				var point = points.arr[i];
				moveP(point, sum);
				if(isShowPoint) drawP(point);
			}
		}
		// 粒子连线
		function connect(){
			CXTPar.save();
			//CXTPar.shadowBlur = 10;
			CXTPar.lineWidth = 1;
			for(var i=0; i<num; i++){
				var pointI = points.arr[i];
				for(var j=0; j<num; j++){
					var pointJ = points.arr[j];
					if(Math.abs(pointI.x-mouse.x)<=points.mRadius && Math.abs(pointI.y-mouse.y)<=points.mRadius){
						if(Math.abs(pointI.x-pointJ.x)<=points.distance && Math.abs(pointI.y-pointJ.y)<=points.distance){
							var x = pointI.x-mouse.x;
							var y = pointI.y-mouse.y;
							var lineC = 10/Math.pow((x*x+y*y),0.5);
							lineC = Math.min(lineC, 1);
							CXTPar.beginPath();
							var lColor = usePColor ? pColor.replace(/0\.8/, lineC) : mixColor(pointI,pointJ,lineC);
							//CXTPar.shadowColor = lColor;
							CXTPar.strokeStyle = lColor;
							CXTPar.moveTo(pointI.x,pointI.y);
							CXTPar.lineTo(pointJ.x,pointJ.y);
							CXTPar.closePath();
							CXTPar.stroke();
						}
					}
				}
			}
			CXTPar.restore();
		}
		
		/*
		function showInfo(){ //测试用
			oShow.innerHTML = sum;
			for(var i=0, l=audioArrayPar.length; i<l; i++){
				oShow.innerHTML+=audioArrayPar[i]+'<br />';
			}
		}
		*/
		
		// 执行效果
		PWParcreatePoint();
		function auto(){
			CXTPar.clearRect(0,0,CanPar.width,CanPar.height);
			drawPoint();
			if(isShowLine) connect();
			//showInfo();
			requestAnimFrame(auto);
		}
		auto();
