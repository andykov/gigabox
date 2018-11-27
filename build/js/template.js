tippy.setDefaults({interactive:!0,arrow:!0,arrowType:"round",arrowTransform:"scale(1.9)",duration:200,inertia:!0,flip:!1,trigger:"mouseenter click"}),$(document).ready(function(){var t=$(".business__advantage-inner").map(function(){return $(this).height()}).get(),e=Math.max.apply(null,t);$(".business__advantage-inner").height(e);var n,i,s=$(".services__inner").map(function(){return $(this).height()}).get();e=Math.max.apply(null,s);$(".services__inner").height(e),"no"!=(n="display_stock",(i=document.cookie.match(new RegExp("(?:^|; )"+n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)")))?decodeURIComponent(i[1]):void 0)&&$(document).mouseleave(function(t){if(t.clientY<0){$("#stock").length&&$.fancybox.open({src:"#stock",type:"inline",opts:{touch:!1,afterShow:function(t,e){console.log("done!")},afterClose:function(t,e){console.log("done CLOSW!"),console.log($(e.src).remove())}}});var e=new Date;e.setDate(e.getDate()+1),document.cookie="display_stock=no; path=/; expires="+e.toUTCString()}});var o=$(".section"),a=$(".menu a");if(o.waypoint({handler:function(t,e){var n=$(this.element);n.attr("id");"up"===e&&(n=n.prev());var i=$('.menu a[href="#'+n.attr("id")+'"]');a.removeClass("is-active"),i.addClass("is-active")},offset:"35%"}),960<=$(window).width()){var r=document.querySelectorAll(".btn-tips-onscroll[data-tippy]");new Waypoint({element:document.querySelector(".property"),handler:function(t){var i=0;r.forEach(function(t,e,n){i+=500,setTimeout(function(){t._tippy.show()},i)}),this.destroy()},offset:"bottom-in-view"})}new Waypoint({element:document.querySelector(".regions__map"),handler:function(t){$(".regions-desc").each(function(){var t=$(this).attr("data-height");$(this).height(960<=$(window).width()?t:t/1.4).find("span").css("opacity",1)}),this.destroy()},offset:"50%"});768<=$(window).width()?$(".steps__item").waypoint({handler:function(t){"down"===t&&(console.log($(this.element).index()),$(this.element).addClass("show"),1<=$(this.element).index()&&$(this.element).closest(".steps").find(".cilinder-lines svg line").eq($(this.element).index()-1).addClass("show"))},offset:"80%"}):$(".steps__item, .cilinder-lines svg line").addClass("show");function l(){$(".cilinder-lines svg").attr("viewBox","0 0 "+$(".cilinder-lines").width()+" "+$(".cilinder-lines").height()),$(".steps__item").each(function(t,e){var n=$(this).find(".steps__step"),i=n.position().top,s=n.position().left,o=n.width(),a=n.height();if(!$(this).next().length)return!1;console.log("NEXT");var r=$(this).next().find(".steps__step"),l=r.position().top,c=r.position().left,u=r.width(),h=r.height();$(".cilinder-lines svg line").eq(t).attr({x1:s+o/2,y1:i+a/2,x2:c+u/2,y2:l+h/2})})}$("#property").waypoint({handler:function(t){"down"===t&&1200<=$(window).width()&&$(".btn-menu, .menu__body").addClass("is-active")},offset:"20%"}),l(),$(window).resize(function(){l()}),$(".faq__question").on("click",function(){$(this).toggleClass("is-active").next().slideToggle(),$(".faq__question").not(this).removeClass("is-active").next().slideUp()}),$(".btn-menu").on("click",function(){$(this).toggleClass("is-active"),$(".menu__body").toggleClass("is-active")}),$(window).width()<768&&$('input[type="range"]').val("16500000"),$(".input-range output").text($('.input-range input[type="range"]').val()),$('input[type="range"]').rangeslider({polyfill:!1,onInit:function(){var t=$('input[type="range"]').val();t=String(t).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$(".rangeslider__handle").append("<output>"+t+"руб.</output>")},onSlide:function(t,e){var n=Number(1e5);e=String(e).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$("output").text(e+"руб."),console.log(+e-n)}}),$('a[href*="#"]:not([href="#"])').on("click",function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);(e=e.length?e:$("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),$("html, body").animate({scrollTop:e.offset().top},1e3,function(){var t=$(e);if(t.focus(),t.is(":focus"))return!1;t.attr("tabindex","-1"),t.focus()}))}}),$("#price").waypoint({handler:function(t){$(".product__size").each(function(){$(this).addClass("show"),$(this).prop("Counter",0).animate({Counter:$(this).attr("data-size")},{duration:1800,easing:"swing",step:function(t){$(this).attr("data-size",Math.ceil(t))}})}),this.destroy()},offset:"60%"}),$(".services__inner").on("click",function(){$(this).parent().toggleClass("is-open")}),$("[data-fancybox]").fancybox({youtube:{controls:0,showinfo:0}}),{$el:$(".countdown"),countdown_interval:null,total_seconds:0,init:function(){this.$={hours:this.$el.find(".bloc-time.hours .figure"),minutes:this.$el.find(".bloc-time.min .figure"),seconds:this.$el.find(".bloc-time.sec .figure")},this.values={hours:this.$.hours.parent().attr("data-init-value"),minutes:this.$.minutes.parent().attr("data-init-value"),seconds:this.$.seconds.parent().attr("data-init-value")},this.total_seconds=60*this.values.hours*60+60*this.values.minutes+this.values.seconds,this.count()},count:function(){var t=this,e=this.$.hours.eq(0),n=this.$.hours.eq(1),i=this.$.minutes.eq(0),s=this.$.minutes.eq(1),o=this.$.seconds.eq(0),a=this.$.seconds.eq(1);this.countdown_interval=setInterval(function(){0<t.total_seconds?(--t.values.seconds,0<=t.values.minutes&&t.values.seconds<0&&(t.values.seconds=59,--t.values.minutes),0<=t.values.hours&&t.values.minutes<0&&(t.values.minutes=59,--t.values.hours),t.checkHour(t.values.hours,e,n),t.checkHour(t.values.minutes,i,s),t.checkHour(t.values.seconds,o,a),--t.total_seconds):clearInterval(t.countdown_interval)},1e3)},animateFigure:function(t,e){var n=t.find(".top"),i=t.find(".bottom"),s=t.find(".top-back"),o=t.find(".bottom-back");s.find("span").html(e),o.find("span").html(e),TweenMax.to(n,.8,{rotationX:"-180deg",transformPerspective:300,ease:Quart.easeOut,onComplete:function(){n.html(e),i.html(e),TweenMax.set(n,{rotationX:0})}}),TweenMax.to(s,.8,{rotationX:0,transformPerspective:300,ease:Quart.easeOut,clearProps:"all"})},checkHour:function(t,e,n){var i=t.toString().charAt(0),s=t.toString().charAt(1),o=e.find(".top").html(),a=n.find(".top").html();10<=t?(o!==i&&this.animateFigure(e,i),a!==s&&this.animateFigure(n,s)):("0"!==o&&this.animateFigure(e,0),a!==i&&this.animateFigure(n,i))}}.init()});