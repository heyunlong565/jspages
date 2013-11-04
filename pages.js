(function($){
    $.category = $.category || {};
    $.htmldata = $.htmldata || [];
    
    $.extend($.category, {
        main: function(){
            $.htmldata = $.category.init($("div.pic_list"));
            $.category.initEvent($.htmldata);
        },
        init: function(obj){
            var data;
            if(obj.length > 0) {
                data = obj;
            }else{
                data = 0;                
            }
            return data;
        },
        initEvent: function(html){ //未完善的功能点：① 分色色块的处理 ② 图片的tips提示 ③ 大图链接的拼取规则
            html.each(function(index, ele){
                var that = $(ele);              
                var totalpage = that.find("dd");
                var dd = that.find('img');
                
                if(dd.length > 5) {
                    var pages = Math.ceil(dd.length/5);
                    var prev = that.find("a.btn_l");
                    var next = that.find("a.btn_r");
                    var pagenum = 1;
                    prev.addClass('unable_l');
                    $(prev).bind('click', function(){
                        if(next.hasClass('unable_r')) {
                            next.removeClass('unable_r');
                        }   
                        if(--pagenum < 1) {
                            //左翻页置灰
                            pagenum = 1;
                            return false;
                        }
                        if(pagenum <= 1){
                            if(!prev.hasClass('unable_l')) {
                                prev.addClass('unable_l');
                            }                            
                        }
                        $.category.showpage(that, totalpage, pagenum);
                    });
                    $(next).bind('click', function(){ 
                        if(prev.hasClass('unable_l')) {
                            prev.removeClass('unable_l');
                        }
                        if(++pagenum > pages){
                            //右翻页置灰
                            pagenum = pages;
                            return false;
                        }
                        if(pagenum >= pages){
                            if(!next.hasClass('unable_r')) {
                                next.addClass('unable_r');
                            }                            
                        }
                        $.category.showpage(that,totalpage,pagenum);
                    });
                }else{
                    that.find("a.btn_l").hide();
                    that.find("a.btn_r").hide();
                }
                $.category.bigimg(dd, that);
            });
        },
        bigimg: function(dd, pp){
            $(dd).each(function(){
                $(this).bind('click', function(){
                    var b = pp.parent().find("a.pic");
                    //这里span的作用主要是加载图片慢时提示loading图片
                    var s = document.createElement("span");
                    $(s).addClass('pic');
                    b.empty().append(s);
                    
                    var img = new Image();
                    $(img).bind('load', function(){
                       //console.log('Loading...');
                       b.empty().append(img); 
                    });
                    img.src = this.src; //src赋值处理放在这个位置，可以解决ie8 7 6下的bug 加载缓冲区太快 onload事件没来及处理
                    $(img).attr({'height':200,'width':200});
                });
            });
        },
        showpage: function(parent, total, page){
            var dl = parent.find("dl").empty();
            var curnum = parseInt((page-1)*5);
            var jumnum = curnum + 5;
//            console.log({'cur':curnum, 'jumnum':jumnum});
            var cur = total.slice(curnum, jumnum);
            var dd = cur.find("img");
            this.bigimg(dd, parent);
            dl.append(cur);
        }
    });   
    
    $.category.main();
    
})(jQuery)
