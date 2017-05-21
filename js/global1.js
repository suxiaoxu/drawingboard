
var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
ctx = canvas.getContext('2d');
ctx.lineWidth = 3.0; // 设置线宽
ctx.strokeStyle = "#CC0000"; // 设置线的颜色
flag = false;//是否直线
var isdrawing = true;//是否橡皮
var clearWight = 5; //橡皮宽度
var controluser = 1;


var canvas1 = document.getElementById('canvas1');
canvas1.addEventListener('mousemove', onMouseMove, false);
canvas1.addEventListener('mousedown', onMouseDown, false);
canvas1.addEventListener('mouseup', onMouseUp, false);

ctx1 = canvas1.getContext('2d');
ctx1.lineWidth = 3.0; // 设置线宽
ctx1.strokeStyle = "#CC0000"; // 设置线的颜色


var clear = document.getElementById('c');
clear.addEventListener('click',changeDrawing,false);

var clearfull = document.getElementById('cl');
clearfull.addEventListener('click',clearFull,false);

var control = document.getElementById('c2');
control.addEventListener('click',controlFF,false);

function clearFull(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
}

function controlFF(){
	if(controluser == 1){
		controluser = 2;
		control.setAttribute("value","2控制");
		
	}else{
		control.setAttribute("value","1控制");
		//clear.value("橡皮");
		controluser = 1;
	}
}

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

function clearBai(p){
	var pxmin =  p.x-clearWight;
	var pymin =  p.y-clearWight;
	var pxmax =  p.x+clearWight;
	var pymax =  p.y+clearWight;
	ctx.clearRect(pxmin,pymin ,clearWight*3 ,clearWight*3 );
	ctx1.clearRect(pxmin,pymin ,clearWight*3 ,clearWight*3 );
}
 
function onMouseDown(evt){
	var elementIds = evt.toElement.id;
	var p = pos(evt);
	if(isdrawing){
		if(controluser === 1){
			if(elementIds == "canvas1"){
				return;
			}
			onMoutseDownEventC(ctx,p.x,p.y);
			onMoutseDownEventC(ctx1,p.x,p.y);
		}else{
			if(elementIds == "canvas"){
				return;
			}
			onMoutseDownEventC(ctx1,p.x,p.y);
			onMoutseDownEventC(ctx,p.x,p.y);

		}
		flag = true;
	}else{
		clearBai(p);
		flag = true;
	}
}
 
function onMouseUp(evt){
	evt.preventDefault();
	flag = false;
}


function onMouseMove(evt)
{
	evt.preventDefault();
	if (flag)
	{
		var p = pos(evt);
		if(isdrawing){

			var p = pos(evt);
			var elementIds = evt.toElement.id;
			if(controluser === 1){
				if(elementIds == "canvas1"){
					return;
				}
				onMouseMoveEventC(ctx,p.x,p.y);
				onMouseMoveEventC(ctx1,p.x,p.y);
			}else{
				if(elementIds == "canvas"){
					return;
				}
				onMouseMoveEventC(ctx1,p.x,p.y);
				onMouseMoveEventC(ctx,p.x,p.y);
			}
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


function onMoutseDownEventC(ctx,x,y){
	ctx.beginPath();
	ctx.moveTo(x, y);
	
}

function onMouseMoveEventC(ctx,x,y){
	ctx.lineTo(x, y);
	ctx.lineWidth = 1.0; // 设置线宽
	ctx.shadowColor = "#CC0000";
	ctx.shadowBlur = 1;
	//ctx.shadowOffsetX = 6;
	//console.log("mousemove",x,y);
	ctx.stroke();
}
