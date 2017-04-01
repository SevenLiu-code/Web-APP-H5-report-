/* 内容管理对象*/
function H5(){
	this.id=("h5_"+Math.random()).replace('.','');
	this.el=$('<div class="h5" id="'+this.id+'">');
	this.el.hide();
	this.page=[];
	$("body").append(this.el);
	/*新增一个页*/
	this.addPage=function(name, text){
		var page=$('<div class="h5_page section">');
		if (name!=undefined) {
			page.addClass("h5_page_"+name);
		};
		if (text!=undefined) {
			page.text(text);
		};
		this.el.append(page);
		this.page.push(page);
		if (typeof this.whenAddpage === "function") {
			this.whenAddpage();
		};
		return this;
	};
	/*新增一个组件*/
	this.addComponent=function(name ,cfg){
		var cfg=cfg || {};
		if (cfg.type == undefined) {
			cfg=$.extend({
				type: "base"
			},cfg);
		};
		var component;//定义一个变量 存储组件元素
		var page=this.page.slice(-1)[0];
		switch(cfg.type){
			case "base" :
				component=new H5componentBase(name, cfg);
				break;
			case "polyline" :
			component=new H5componentPolyline(name, cfg);
				break;
			case "bar" :
			component=new H5componentBar(name, cfg );
				break;
			case "bar_v" :
			component=new H5componentBar_v(name, cfg);
				break;
			case "point" :
			component=new H5componentPoint(name, cfg);
				break;
			case "radar" :
			component=new H5componentRadar(name, cfg);
				break;
			case "pie" :
			component=new H5componentPie(name, cfg );
				break;
				default:break;
		}
		page.append(component);//给当前页添加组件
		return this;
	};
	this.loader=function(images, fristPage){
		this.el.show();
		this.el.fullpage({
		afterLoad: function(anchors, index){
			// alert("");
 			$(this).find(".h5_component").trigger("onLoad");
 			// console.log(1);
 			},
		onLeave: function(index, nextIndex, direction){
 			$(this).find(".h5_component").trigger("onLeave");
 			}	
		});
	   if (fristPage) {
	   		$.fn.fullpage.moveTo(fristPage);
	   };			     
	}
	this.loader=typeof H5_loading=="function" ? H5_loading : this.loader;
	return this;
}