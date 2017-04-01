function H5componentPolyline(name, cfg){
  var component=H5componentBase(name, cfg);
  //绘制网格线；
  var w = cfg.width,
  	  h = cfg.height;
  var cns=document.createElement("canvas"),//加入一个画布，作为网格线的背景
  	  ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
  	component.append(cns);
  var step=10;//定义网格的基数；
  	  
  	  for (var i = 0; i < step+1; i++) {//绘制背景网格线
  	  		var y=(h/step)*i;
  	  			ctx.beginPath();
			  	ctx.strokeStyle="#aaa";
			  	ctx.lineWidth=1;
  	  		  	ctx.moveTo(0,y);
  	  		  	ctx.lineTo(w,y);
  	  		  	ctx.stroke();  	 	  		  	
  	 };	
  	  		   
  	 //垂直线的数量根据数据的个数而定
  	 step=cfg.data.length+1;
  	 var text_w=w/step/2 >> 0;
  	 for (var i = 0; i < step+1; i++) {
  	 	var x=(w/step)*i;
	  	 	ctx.moveTo(x,0);
	  	 	ctx.lineTo(x,h);
	  	 	ctx.stroke();
	  	var text=$('<div class="text">');
	 //添加类名
  	 	if (cfg.data[i]) {
  	 		text.text(cfg.data[i][0]);
  	 		text.css({"width":text_w, "left": text_w*(i+1)-text_w/2});
  	 		component.append(text);
  	 	};
  	 };

  	 var cns=document.createElement("canvas"), //定义折线层
  	  	 ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
  	  step=cfg.data.length+1;
  	   component.append(cns);
  	  //绘制折线层
  	  var x=0,
  	  	  y=0;
  	  function drow(per){
  	  		ctx.clearRect(0,0,w,h);
	  	  	for(i in cfg.data){ //画点
	  	  	ctx.fillStyle="#ff8878";
	  	  	var i=parseInt(i),
	  	  		item=cfg.data[i],
	  	  		y=(1-item[1]*per)*h,
	  	  		x=(w/step)*(i+1);
	 		ctx.beginPath();
	  	  	ctx.arc(x,y,5,0,2*Math.PI);
	  	  	ctx.fill();
	  	  }

	  	  for(i in cfg.data){ //连线
	  	  	var  i=parseInt(i), 
		  	  item=cfg.data[i],
		  	     x=(w/step)*(i+1),
		  	     y=(1-item[1]*per)*h;
	  	  	if (i==0) {
	  	  		ctx.beginPath();
		 		ctx.strokeStyle="#ff8878";
		 		ctx.lineWidth=3;
		 		ctx.moveTo(x,y);
	  	  	}else {
	  	  		ctx.lineTo(x,y);
	  	  		ctx.stroke();
	  	  	}	  	
	  	  }
	  	  ctx.lineTo(x,h);
	  	  ctx.lineTo(w/step,h);
	  	  ctx.fillStyle="rgba(255,136,120,.2)";
	  	  ctx.fill();
	  	  for(i in cfg.data){ //写数据
	  	  	var i=parseInt(i),
	  	  		item=cfg.data[i],
	  	  		y=(1-item[1]*per)*h,
	  	  		x=(w/step)*(i+1);
	 		ctx.beginPath();
	 			ctx.font="25px serif";
	 			item[2] ? ctx.fillStyle=item[2] : ctx.fillStyle="#0a0a0a";
	  	  	ctx.fillText((item[1]*100>>0)+'%', x-15, y-15,25);
	  	  }
  	  }
  	 var setTime_load=null,
  	 	 setTime_leave=null;
  	  component.on("onLoad", function(){
  	  	clearTimeout(setTime_leave);
  	  	var s=0;
  	  	for (var i = 0; i < 100; i++) {	
  	  		setTime_load=setTimeout(function(){
  	  			 s+=.01;
  	  			 drow(s);
  	  		},10*i+1000);
  	  	}
	  });
	  component.on("onLeave", function(){
	  	clearTimeout(setTime_load);
	  	var s=1;
	  	for (var i = 0; i < 50; i++) {	
	  		setTime_leave=setTimeout(function(){
	  			 s-=.02;
	  			 drow(s);
	  		},10*i);
	  	}
	  });
  return component;
}