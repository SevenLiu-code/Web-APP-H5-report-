function H5componentBar(name, cfg){
	var component=H5componentBase(name, cfg);
	$.each(cfg.data, function(index, item){
		var line=$('<div class="line">'),
			name=$('<div class="name">'),
			rate=$('<div class="rate">'),
			per=$('<div class="per">');
		var width=Math.floor(item[1]*100)+"%";
		var left=(item[1]+0.05)*100+"%";
		var bg='';
		if (item[2]) {
			bg='style=background-color:'+item[2]+';';
		};	
		name.text(item[0]);
		per.text(width);

		per.css({"left":left});
		rate.width(width).html('<div class="bg"' +bg+ '></div>');

		line.append(name).append(rate).append(per);
		component.append(line);
	});
	return component;
}