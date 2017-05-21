function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
addLoadEvent(loadEvents)

var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
ctx = canvas.getContext('2d');
ctx.lineWidth = 3.0; // 设置线宽
ctx.strokeStyle = "#CC0000"; // 设置线的颜色
flag = false;
var isdrawing = true;
var vertix;

var clear = document.getElementById('c');
clear.addEventListener('click',changeDrawing,false);

var clearfull = document.getElementById('cl');
clearfull.addEventListener('click',clearFull,false);

var clearWight = 5;

function changeDrawing(){
	if(isdrawing){
		isdrawing = false;
		clear.setAttribute("value","橡皮");
		
	}else{
		clear.setAttribute("value","画笔");
		//clear.value("橡皮");
		isdrawing = true;
	}
}

function clearFull(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
}

function loadEvents(){
	var x = canvas.width;
	var y = canvas.height;
	vertix = new Array(x);
	for(var i=0;i<x;i++){          //一维长度为5
          	vertix[i] = new Array(y);
          	for(var j=0;j<y;j++){      //二维长度为5
             	vertix[i][j]=0;
            }

    }
}

function clearBai(p){
	var pxmin =  p.x-clearWight;
	var pymin =  p.y-clearWight;
	var pxmax =  p.x+clearWight;
	var pymax =  p.y+clearWight;
	ctx.clearRect(pxmin,pymin ,clearWight*3 ,clearWight*3 );
	ctx1.clearRect(pxmin,pymin ,clearWight*3 ,clearWight*3 );
}
 
function onMouseDown(evt){
	var p = pos(evt);
	if(isdrawing){
		evt.preventDefault();
		ctx.beginPath();
		ctx.moveTo(p.x, p.y);
		console.log("mousedown",p.x,p.y);
		flag = true;
		onMouseDownEvent(p.x,p.y);
	}else{
		clearBai(p);
		flag = true;
	}
}


 
 
function onMouseUp(evt){
	evt.preventDefault();
	flag = false;
	copyTonew();
}


function onMouseMove(evt)
{
	evt.preventDefault();
	if (flag)
	{
		var p = pos(evt);
		if(isdrawing){
			var p = pos(evt);
			ctx.lineTo(p.x, p.y);
			ctx.lineWidth = 1.0; // 设置线宽
			ctx.shadowColor = "#CC0000";
			ctx.shadowBlur = 1;
			//ctx.shadowOffsetX = 6;
			console.log("mousemove",p.x,p.y);
			ctx.stroke();
			onMouseMoveEvent(p.x,p.y);
		}
		else{
			clearBai(p);
		}
	}
}

function pos(event){
	var x,y;
	x = event.layerX;
	y = event.layerY;
	return {x:x,y:y};
}

/*function updatem(startx,staty,endx,endy,isadd){
	var put = 1;
	if(isadd){
		put = 1
	}else{
		put = 0;
	}
}*/

var canvas1 = document.getElementById('canvas1');
ctx1 = canvas1.getContext('2d');
ctx1.lineWidth = 3.0; // 设置线宽
ctx1.strokeStyle = "#CC0000"; // 设置线的颜色

function onMouseDownEvent(x,y){
	ctx1.beginPath();
	ctx1.moveTo(x, y);
}


function onMouseMoveEvent(x,y)
{
	ctx1.lineTo(x, y);
	ctx1.lineWidth = 1.0; // 设置线宽
	ctx1.shadowColor = "#CC0000";
	ctx1.shadowBlur = 1;
	ctx1.stroke();
} 

var canvas2 = document.getElementById('canvas2');
ctx2 = canvas2.getContext('2d');

function copyTonew(){
	var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
	ctx2.putImageData(imageData,0,0);
}