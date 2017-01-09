/* javascript */
!(function(win, doc){
    function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        //var winWidth =  window.innerWidth;
        var winWidth = $(window).width();
        //console.log(winWidth);
        if(winWidth<320) width=320;
        // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;
        
        // 2016-01-13 订正
        // 640宽度以上进行限制 需要css进行配合
        var size = (winWidth / 640) * 100;
        //var size =  Math.floor(winWidth/640*100);
        //doc.documentElement.style.fontSize = (size < 295? size : 295) + 'px' ;
        $("html").css("font-size",size);
    }
 
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    
    var timer = null;
 
    win.addEventListener(evt, function () {
        clearTimeout(timer);
 
        timer = setTimeout(setFontSize, 300);
    }, false);
    
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
 
            timer = setTimeout(setFontSize, 300);
        }
    }, false);
 
    // 初始化
    setFontSize();
 
}(window, document));



//让子元素水平居中父元素
function boxCenter(obj){
	var popupHeight = $(obj).height();
	var popupWidth = $(obj).width();
	
	//console.log($(".twovio .videoplay").height());
	$(obj).css({
		"position": "absolute",
		"left": 50+"%",
		"margin-left": -(popupWidth  / 2)
	});
};

function navActive()
{
	$(".listThead ul li").click(
		function() 
		{
			$(this).addClass('active').siblings().removeClass('active')
			var _index = $(this).index();
			//console.log(_index);
			var h = $(".tabs_1").eq(_index).position().top;
			$( "#mCSB_1").animate({ "scrollTop" : h },1000);  //滚动到指定位置
			console.log(h);
		});

}

function toggleGz(){
	$(".gz h2").bind("click",function(){
		$(".gz_txt").slideToggle();
		$(".gz h2 i").toggleClass("up")
	});
};

function sfq(){
	$(".sfq .box").not('.firstBox').hide();
	$(".sfq .title").click(function(){
		$(this).siblings('.box').slideDown()
		.parent('li').siblings()
		.find('.box').hide();
				
		$(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

/*
	调用：
	jqTab(".tabs .tabList .jb_ul li",".tabs .tabBox .show")

	@css主要对应样式
	.dj_tabs .dj_tabBox .shows{width: 100%;height: auto;display: none;margin-top: 10px;}
*/

function argumentsTab(tabList,tabbox)
{
	var $div_li =$(tabList);
	$div_li.click(function(){
		$(this).addClass('active').siblings().removeClass('active');  
		var index =  $div_li.index(this); 
		//alert(index);
		$(tabbox).eq(index).show().siblings().hide(); 
	})
}

//点击关闭
function closePop()
{
	var oDiv = $(".pop");
	var oBlackOverlay = $(".black_overlay");
	
	oBlackOverlay.bind("click",function(e){
	var target = $(e.target);
	if(target.closest(".pop").length == 0){
		oDiv.hide();
		oBlackOverlay.hide();
	} 
	})
};

//弹出居中
function showDiv(obj) {
	$(obj).hide();
	center(obj);
	$(window).scroll(function() {
		center(obj);
	});
	$(window).resize(function() {
		center(obj);
	});
}

function center(obj) {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $(obj).height();
	var popupWidth = $(obj).width();
	$(obj).css({
		"position": "absolute",
		"top": (windowHeight - popupHeight) / 2 + $(document).scrollTop(),
		"left": (windowWidth - popupWidth) / 2
	});
}

//广告滚动条
function ScrollImgLeft(){
	var speed=20
	var scroll_begin = document.getElementById("scroll_begin");
	var scroll_end = document.getElementById("scroll_end");
	var scroll_div = document.getElementById("scroll_div");
	scroll_end.innerHTML=scroll_begin.innerHTML
	
	function Marquee(){
		if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0)
		scroll_div.scrollLeft-=scroll_begin.offsetWidth
		else
		scroll_div.scrollLeft++
	}
	var MyMar=setInterval(Marquee,speed)
	scroll_div.onmouseover=function() {clearInterval(MyMar)}
	scroll_div.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
}


$(function()
{	
	//导航
	$('.nav li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
	});
	//导航
	$('.right_links a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
	});
});

//点击显示隐藏
function showHide(Ele,iTaget){
		$(Ele).show();
		$(iTaget).show();
		$('#wrapper').addClass('row');
	}

//点击显示隐藏
function hide(Ele,iTaget){
		$(Ele).hide();
		$(iTaget).hide();
		$('#wrapper').removeClass('row');
	}
//竖向tabs
function tabH(){
	var $aLi = $(".tabH li");
	var $aDiv = $(".dright");
	var $wrap = $(".wrap");
	
	$aLi.click(function()
	{
	for (var i =0;i<$aLi.length;i++) 
	{
		var $this = $(this);
		var $t = $this.index();
		//alert($t);
		if ($t == 0) {
			$wrap.removeClass().addClass('wrap');
		}
		if ($t == 1) {
			$wrap.removeClass().addClass('wrap1');
		}
		if ($t == 2) {
			$wrap.removeClass().addClass('wrap');
		}
		$(this).addClass("tabH_active").siblings().removeClass("tabH_active");	
		$aDiv.removeClass("tabH_show").eq($t).addClass("tabH_show");
		}
	});
};

//上下自动滚动
function aotoTop(id){
	var box = document.getElementById(id),
		can = true;
	box.innerHTML += box.innerHTML;
	box.onmouseover = function() {
		can = false
	};
	box.onmouseout = function() {
		can = true
	};
	new function() {
		var stop = box.scrollTop % 50 == 0 && !can;
		if (!stop) box.scrollTop == parseInt(box.scrollHeight / 2) ? box.scrollTop = 0 : box.scrollTop++;
		setTimeout(arguments.callee, box.scrollTop % 100 ? 10 : 500);
	};
};

//智能设定高度
function dleftHerght(ELement){
	var Height = document.body.clientHeight;
	$(ELement).css({'*height':Height,'_height':Height,'height':Height});
	alert(Height)
};

//关闭
function closeDiv(){
    $("#alertInfo").stop(true,true).animate({
        "top":"-100%",
        "opacity":"0"
    },"fast",function(){
        $("#maskLayer,#alertInfo").remove().hide();
    });
}

//遮罩
function maskLayer(itarget){
	$("#maskLayer,#alertInfo").remove();			
    var maskLayer="<div id='maskLayer'></div>";
    var alertInfo="<div id='alertInfo'><span class='close'>关闭</span></div>";
    $(itarget).append(maskLayer,alertInfo);
    $("#maskLayer").height($(itarget).height()).show();
    $("#maskLayer").width($(itarget).width()).show();
}

//显示提示信息框
function showInfo(alertHtml,parent,itarget){
    maskLayer(itarget);
    var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
    var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　├→注意这2断代码的先后顺序
    $(parent).append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
    
    var _thisDomWidth=$("#alertInfo").width()+parseInt($("#alertInfo").css("border-left-width"))*2;
    var _thisDomHeight=$("#alertInfo").height()+parseInt($("#alertInfo").css("border-left-width"))*2;
    var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
    var mL=parseInt(_thisDomWidth/2);
    
    if(_thisDomHeight>=_winH){
        topD=_scrollTop;
        if(_scrollTop+_thisDomHeight>=$(document).height()){
            topD=$(document).height()-_thisDomHeight;
        }
    };
    
    $("#alertInfo").css({
        "margin-left":"-"+mL+"px"
    }).stop(true,true).animate({
        "top":topD+"px",
		"margin-left":"-"+mL+"px",
        "opacity":"1"
    },"fast");
  }