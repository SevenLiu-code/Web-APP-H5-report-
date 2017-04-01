function H5componentBar_v2(name, cfg){
	var obj=new H5componentBar(name, cfg);
	var w=(100/cfg.data.length)>>0;
	obj.find(".line").width(w+"%");
	$.each(obj.find(".rate"), function(index,item){
		 var w=$(this).css("width");
		 $(item).width('').height(w);
	})
	$.each(obj.find(".per"), function(index,item){
		$(item).css({"bottom":$(item).css("left"),"left":0});
	})
	var cover=$('<div class="cover" >');
	obj.append(cover);
	return obj;
}