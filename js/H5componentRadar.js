function H5componentRadar(name, cfg){
  var component=H5componentBase(name, cfg);
  //绘制网格线；
  var w = cfg.width,
  	  h = cfg.height;
  var cns=document.createElement("canvas"),//加入一个画布，作为网格线的背景
  	  ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
  	component.append(cns);
  var r=w/2;
  var step=cfg.data.length;
  	// ctx.beginPath();
  	// ctx.arc(r, r, 5, 0 ,2*Math.PI);
  	// ctx.stroke();
  	// ctx.beginPath();
  	// ctx.arc(r, r, r, 0 ,2*Math.PI);
  	// ctx.stroke();
  //绘制雷达图背景；
  var isColor=true;	
  for (var s = 10; s > 0; s--) {
  	ctx.beginPath();
  	for (var i = 0; i < step; i++) {
  		var	rad=((2*Math.PI/360)*(360/step)*i)+360,
  			x=r+Math.sin(rad)*r*(s/10),
  			y=r+Math.cos(rad)*r*(s/10);
  			ctx.lineTo(x, y);
  	};
  	ctx.closePath();
  	ctx.fillStyle=(isColor=!isColor) ? "#f1f9ff" : "#99c0ff";
  	ctx.fill();
  };
  //绘制伞骨图	
  	for (var i = 0; i < step; i++) {
  		var	rad=((2*Math.PI/360)*(360/step)*i)+360,
  			x=r+Math.sin(rad)*r,
  			y=r+Math.cos(rad)*r;
  			ctx.beginPath();
  			ctx.strokeStyle="#e0e0e0";
  			ctx.moveTo(r, r);
  			ctx.lineTo(x, y);
  			ctx.stroke();
  		//添加类名
  		var text=$('<div class="text">');
  			text.css({"transition": 'all .5s '+i*.1+'s'});
  		  text.text(cfg.data[i][0]); 
  		  if (x>w/2) {
  		  	text.css({"left":x/2+5});
  		  }else {
  		  	text.css({"right":(w-x)/2+5});
  		  }	;
  		  if (y>h/2) {
  		  	text.css({"top":y/2+5});
  		  }else {
  		  	text.css({"bottom":(h-y)/2+5});
  		  };
  		  if (cfg.data[i][2]) {
  		  	text.css({"color":cfg.data[i][2]});
  		  };
  		  component.append(text);	
  	};
 //开发数据层；
 var cns=document.createElement("canvas"),
  	  ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
  	  component.append(cns);
  	  function drow(per){
  	  	ctx.clearRect(0,0,w,h);
  	  	for (var i = 0; i < step; i++) { //连线
	  		var	rata=cfg.data[i][1]*per,
	  		    rad=((2*Math.PI/360)*(360/step)*i)+360,
	  			x=r+Math.sin(rad)*r*rata,
	  			y=r+Math.cos(rad)*r*rata;
	  			ctx.strokeStyle="#f00";
	  			ctx.lineTo(x, y);	
  		}
  		  ctx.closePath();
  		  ctx.stroke();
  		for (var i = 0; i < step; i++) {//绘点
	  		var	rata=cfg.data[i][1]*per,
	  		    rad=((2*Math.PI/360)*(360/step)*i)+360,
	  			x=r+Math.sin(rad)*r*rata,
	  			y=r+Math.cos(rad)*r*rata;
	  			ctx.beginPath();
	  			ctx.fillStyle="#f00";
	  			ctx.arc(x,y,5,0,2*Math.PI);
	  			ctx.fill();	
  		}	
  	  };
  	 var setTime_load=null,
  	 	 setTime_leave=null;
  	  component.on("onLoad", function(){
  	  	clearTimeout(setTime_leave);
  	  	var s=0;
  	  	for (var i = 0; i < 100; i++) {	
  	  		setTime_load=setTimeout(function(){
  	  			 s+=.01;
  	  			 drow(s);
  	  		if (s>=1) {
  	  			$(".h5_componentRadar").find(".text").css({"opacity": 1});	
  	  			};
  	  		},10*i+1100);
  	  		
  	  	}
	  });
	  component.on("onLeave", function(){
	  	clearTimeout(setTime_load);
	  	var s=1;
	  	for (var i = 0; i < 50; i++) {	
	  		setTime_leave=setTimeout(function(){
	  			 s-=.02;
	  			 drow(s);
	  		if (s<=0) {
  	  		$(".h5_componentRadar").find(".text").css({"opacity": 0});
  	  		
  	  	};
	  		},10*i);
	  	}
	  });
  return component;
}