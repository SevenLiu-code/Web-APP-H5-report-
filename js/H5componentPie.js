/* 散点图表组件对象*/
var H5componentPie=function(name, cfg){
	var component=new H5componentBase(name, cfg);
	var w = cfg.width,
  	    h = cfg.height;
  	var cns=document.createElement("canvas"),//加入一个画布，作为网格线的背景
  	  ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
      $(cns).addClass("canvas1");
  	component.append(cns);
  	var colors=["red","green","blue","orange","pink","gray"];
  	var r=w/2;
  	var step=cfg.data.length;
  	var sAngle=0,
  		aAngle=2*Math.PI,
  		eAngle=0;	
  	function circle(r,r,r,sAngle,eAngle,color,bol){
  		ctx.beginPath();
  		ctx.fillStyle=ctx.strokeStyle=color || colors.pop();
  		ctx.lineWidth=1;
  		ctx.moveTo(r,r);
  		ctx.arc(r,r,r,sAngle,eAngle,bol);
  		ctx.fill();
  	}
  	for (var i = 0; i < step; i++) {//绘制饼
  		eAngle=sAngle+aAngle*cfg.data[i][1];
  		circle(r,r,r,sAngle, eAngle, cfg.data[i][2]);
  		sAngle=eAngle;
  		var text=$('<div class="text" >')
  			  per=$('<div class="per" >');
        text.css({transition: "all 3s "+i*.1+"s", opacity:0});
  			text.text(cfg.data[i][0]);
  			per.text(cfg.data[i][1]);
  		var x=r+Math.sin(.5*Math.PI-sAngle)*r,
  			y=r+Math.cos(.5*Math.PI-sAngle)*r;
    			if (x>w/2) {
    				text.css({"left": x/2});	
    			}else {
    				text.css({"right": (w-x)/2});
    			};
    			if (y>h/2) {
    				text.css({"top": y/2});
    			}else {
    				text.css({"bottom": (h-y)/2});
    			}

  			if (cfg.data[i][2]) {
  				text.css({"color":"#fff", "backgroundColor": cfg.data[i][2]});
  			};
  			text.append(per);
  			component.append(text);
  	};
  	var cns=document.createElement("canvas"),//加入一个画布，作为网格线的背景
  	  ctx=cns.getContext("2d");
  	  cns.width=ctx.width=w;
  	  cns.height=ctx.height=h;
  	component.append(cns);
  	circle(r,r,r,0,0,"#eee");//绘制覆盖层

  	function drow(per){
  		 ctx.clearRect(0,0,w,h);
  		 circle(r,r,r, 1.5*Math.PI, 2*Math.PI*per+1.5*Math.PI,"#eee",true);
  	};
  	var setTime_load=null,
  	 	setTime_leave=null;
  	var stopBoo=false; 	

  	var s=0;
  	  component.on("onLoad", function(){
        s=0;
        var that=this;
  	  	clearTimeout(setTime_leave);
  	  	for (var i = 0; i < 100; i++) {		  		
  	  			setTime_load=setTimeout(function(){
  	  			 s+=.01;
  	  			 s=Math.round(100*s)/100;
             
  	  			 drow(s);
  	  			 clearTimeout(setTime_leave);
               if (s>=1) {
                H5componentPie.reSort(component.find(".text"));
                component.find(".text").css({opacity:1});
              };    
    	  		 },10*i+1000);          			  		
  	  	}
	  });
	  component.on("onLeave", function(){	
	  	clearTimeout(setTime_load); 
	    s=0;
	  	for (var i = 0; i < 100; i++) {	
	  		setTime_leave=setTimeout(function(){
	  			 s-=.01;
	  			 s=Math.round(100*s)/100;
	  			  clearTimeout(setTime_load);
	  			 drow(s);
            if (s<=0) {
                $(".h5_componentPie").find(".text").css({opacity:0});
              };   
	  		},10*i);
	  	  }	
	  });
	return component;
};

H5componentPie.reSort=function(list){
  //检测相交
  var compare=function( domA, domB){
      var offsetA=$(domA).offset(),
          offsetB=$(domB).offset();
          //domA的投影
      var shadowA_x=[offsetA.left, $(domA).width()+offsetA.left],
          shadowA_y=[offsetA.top, $(domA).height()+offsetA.top];
          //domB的投影
      var shadowB_x=[offsetB.left, $(domB).width()+offsetB.left],
          shadowB_y=[offsetB.top, $(domB).height()+offsetB.top];   
          //检测
      var interset_x=(shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] )
                      || (shadowA_x[1] > shadowB_x[0] && shadowA_x[1] < shadowB_x[1]),
          interset_y=(shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] )
                      || (shadowA_y[1] > shadowB_y[0] && shadowA_y[1] < shadowB_y[1]);  
     return interset_x && interset_y;
  }

  var reset=function(domA, domB){
      if ($(domA).css("top")!="atuo") {
        console.log(parseInt($(domA).css("top")) +$(domA).height());
        $(domA).css({"top": parseInt($(domA).css("top")) + $(domA).height()});
      };
      if ($(domA).css("bottom")!="atuo") {
        $(domA).css({"bottom": parseInt($(domA).css("bottom")) + $(domA).height()});
      };
  };
//定义将要重排的元素
  var willComrpare=[list[0]];
  $.each(list, function(i, domTagert){
    if (compare( willComrpare[willComrpare.length-1], domTagert)) {
        willComrpare.push(domTagert);
    };   
  });
  if (willComrpare.length>1) {
    $.each(willComrpare, function(i, domA){
        if (willComrpare[i+1]) {
          // reset(domA, willComrpare[i+1]);
        };
        
    })
  };
};