$(function(){
	//分屏
	var swiper = new Swiper('.swiper-container', {
//      pagination: '.swiper-pagination',
        pagination: null,
        direction: 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    swiperAnimate(swiper); //初始化完成开始动画
		  }, 
		  onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		  } 
    });
    
    //音乐
    var playing=false;
	$("#music_icon").bind("click",function(){
		if(playing){
			$(this).find(".icon-audio-off").removeClass("hide");
			$(this).find(".icon-audio-on").addClass("hide");
			document.getElementById("audio").pause();
			playing=false;
		}else{
			$(this).find(".icon-audio-off").addClass("hide");
			$(this).find(".icon-audio-on").removeClass("hide");
			document.getElementById("audio").play();
			playing=true;
		}
	});
	
	//关闭
	$(document).on("click","#alertInfo .close,.close",dialog.closeDiv);
	
	//视频播放
	/*  vu：乐视云视频的视频ID
		uu：乐视云视频的客户ID 
	*/
	$(document).on("click",".vBtn",function(){
		var url=$(this).attr("data-url");	
		var vuId=getQueryString(url).vu;
		var _ww = $("body").width(),
		video_w = 640,
		video_h = 360,
		player = new CloudVodPlayer();
		if(_ww<640){
			video_w = _ww;
			video_h = _ww*360/640
		}
		dialog.showInfo("<div id='vInfo' class='vInfo' style='height:"+video_h+"px'></div>");
		$("#maskLayer").addClass("close");
		player.init({"uu":"661c07e19e","vu":vuId,"auto_play":1,"pu":"5dd4aa0351","width":video_w,"height":video_h,"lang":"zh_CN"},"vInfo");
		
	})

	
	function getQueryString(url){
		var qs = url;
		var args = {};
		var items = qs.split("&");
		var ite = null;
		var name = null;
		var value = null;
		for (var i = 0; i < items.length; i++) {
			//ite=items[i].split("=");
			var firstEqual = items[i].indexOf("=")
			name = items[i].substring(0, firstEqual);
			value = items[i].substring(firstEqual + 1);
			args[name] = value;
		}
		return args;
	}
	
})


