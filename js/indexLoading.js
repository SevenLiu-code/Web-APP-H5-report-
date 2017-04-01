var getPage=[];
var H5_loading = function(images, fristPage){
	getPage.push(fristPage);
	var id=this.id;
	if (this._images===undefined) {//第一次进入
		this._images=(images || []).length;
		this._loaded=0;
		window[id]=this;	
		for ( s in images){
			var item=images[s];
			var img=new Image;
			img.onload=function(){
				window[id].loader();
			};
			img.src=item;
		}

		$(".loading .rate").text("0%");
		return this;
	}else {
		this._loaded++;
		$(".loading .rate").text(( (this._loaded / this._images*100) >> 0)+"%");
		if (this._loaded < this._images) {
			return this;
		};
	};
	window[id]=null;
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
	  if (getPage[0]) {
	   		$.fn.fullpage.moveTo(getPage[0]);
	   };
	   return this;
}