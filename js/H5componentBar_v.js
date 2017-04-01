function H5componentBar_v(name, cfg){
	var component=H5componentBase(name, cfg);
	$.each(cfg.data, function(idex, item){
		var line=$('<div class="line">'),
			name=$('<div class="name">'),
			per=$('<div class="per">'),
			rate=$('<div class="rate">');		
		var bg=$('<div class="bg">');
			if (item[2]) {
				bg.css({"backgroundColor":item[2]});
				name.css({"color":item[2]});
				per.css({"color":item[2]});
			};
			rate.height(item[1]*100+"%");
			rate.html(bg);	
			name.text(item[0]);
			per.css({"bottom":Math.round((item[1]+0.05)*100)+"%"}).text(Math.round(item[1]*100)+"%");
		line.append(per).append(rate).append(name);
		component.append(line);	
	})
	return component;
}