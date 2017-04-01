// 基于图文组件对象
function H5componentBase(name, cfg){
	var cfg = cfg || {};
	var cls="h5_component"+cfg.type,
	    name=" h5_component"+name,//把当前的组件类型添加到样式中进行标记
		id=('h5_c_'+Math.random()).replace(".","");
	var component=$('<div class="h5_component '+cls+name+'"id="'+id+'">');

	cfg.text&&component.text(cfg.text);
	cfg.width&&component.width(cfg.width/2);
	cfg.height&&component.height(cfg.height/2);
	// cfg.homepage&&component.addClass("homepage_"+cfg.homepage); 
	cfg.bg&&component.css({"backgroundImage": 'url('+cfg.bg+')'});
	cfg.css&&component.css(cfg.css);
	if (cfg.center===true) {
		component.css({
			marginLeft:(cfg.width/4*-1)+"px",
			"left":"50%"
		});
	 }
	 if (typeof cfg.onclick === "function") {
	 	component.on("click",cfg.onclick);
	 };
	component.on("onLoad",function(){//给每个component添加onLoad事件
			setTimeout(function(){
				component.addClass(cls+"_load").removeClass(cls+"_leave");
				 // alert();
 				 cfg.animatIn&&component.css(cfg.animatIn);
 				}, cfg.delay || 0);	
			 return false;
 		});

 	component.on("onLeave",function(){
 			setTimeout(function(){
 			component.addClass(cls+"_leave").removeClass(cls+"_load");
 				cfg.animatOut&&component.css(cfg.animatOut);
 				}, cfg.delay || 0);
 		 	 return false;
	});
	return component;
};