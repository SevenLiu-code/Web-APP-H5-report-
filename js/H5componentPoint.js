/* 散点图表组件对象*/
function H5componentPoint(name, cfg){
	var component=new H5componentBase(name, cfg);
	var base=cfg.data[0][1];//以第一个数据的大小为100%
	$.each( cfg.data,function(index, item){
		var point=$('<div class="point point_'+index+'">');
		var per=(item[1]/base*100)+"%";
		var name=$('<div class="name">'+item[0]+'</div>'),
			scl=$('<div class="per">'+item[1]*100+'%</div>');

		name.append(scl);
		point.append(name);		
		point.width(per).height(per);
	    point.css({"transition":"all 1s "+(index*.5)+"s", "fontSize": item[1]/base*30});
		if (item[2]) {
			point.css({"backgroundColor":item[2]});	
		};
		if (item[3] != undefined&&item[4] != undefined) {
			point.css({"left":item[3],"top":item[4]});
		};
		component.append(point);
	})
	return component;
};