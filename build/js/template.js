tippy.setDefaults({arrow:!0,arrowType:"round",arrowTransform:"scale(1.9)",duration:200,inertia:!0,flip:!1,offset:"0, 28",trigger:"mouseenter click"}),$(document).ready(function(){var t=$(".business__advantage-inner").map(function(){return $(this).height()}).get(),e=Math.max.apply(null,t);$(".business__advantage-inner").height(e);var n=$(".services__inner").map(function(){return $(this).height()}).get();e=Math.max.apply(null,n);$(".services__inner").height(e);var s=document.querySelectorAll(".btn-tips-onscroll[data-tippy]");new Waypoint({element:document.querySelector(".property"),handler:function(t){var i=0;s.forEach(function(t,e,n){i+=500,setTimeout(function(){t._tippy.show()},i)}),this.destroy()},offset:"bottom-in-view"}),new Waypoint({element:document.querySelector(".regions__map"),handler:function(t){$(".regions-desc").each(function(){var t=$(this).attr("data-height");$(this).height(t).find("span").css("opacity",1)}),this.destroy()},offset:"50%"});function i(){$(".cilinder-lines svg").attr("viewBox","0 0 "+$(".cilinder-lines").width()+" "+$(".cilinder-lines").height()),$(".steps__item").each(function(t,e){var n=$(this).find(".steps__step"),i=n.position().top,s=n.position().left,o=n.width(),a=n.height();if(!$(this).next().length)return!1;console.log("NEXT");var r=$(this).next().find(".steps__step"),l=r.position().top,c=r.position().left,h=r.width(),p=r.height();$(".cilinder-lines svg line").eq(t).attr({x1:s+o/2,y1:i+a/2,x2:c+h/2,y2:l+p/2})})}$(".steps__item").waypoint({handler:function(t){"down"===t&&(console.log($(this.element).index()),$(this.element).addClass("show"),1<=$(this.element).index()&&$(this.element).closest(".steps").find(".cilinder-lines svg line").eq($(this.element).index()-1).addClass("show"))},offset:"80%"}),i(),$(window).resize(function(){i()}),$(".faq__question").on("click",function(){$(this).toggleClass("is-active").next().slideToggle(),$(".faq__question").not(this).removeClass("is-active").next().slideUp()}),$(".btn-menu").on("click",function(){$(this).toggleClass("is-active"),$(".menu__list").toggleClass("is-active")}),$(".input-range output").text($('.input-range input[type="range"]').val()),$('input[type="range"]').rangeslider({polyfill:!1,onInit:function(){var t=$('input[type="range"]').val();t=String(t).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$(".rangeslider__handle").append("<output>"+t+"руб.</output>")},onSlide:function(t,e){e=String(e).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$("output").text(e+"руб.")}}),$('a[href*="#"]:not([href="#"])').on("click",function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);(e=e.length?e:$("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),$("html, body").animate({scrollTop:e.offset().top},1e3,function(){var t=$(e);if(t.focus(),t.is(":focus"))return!1;t.attr("tabindex","-1"),t.focus()}))}}),$("#price").waypoint({handler:function(t){$(".product__size").each(function(){$(this).prop("Counter",0).animate({Counter:$(this).attr("data-size")},{duration:1800,easing:"swing",step:function(t){$(this).attr("data-size",Math.ceil(t))}})}),this.destroy()},offset:"60%"}),$(".services__inner").on("click",function(){$(this).parent().toggleClass("is-open")}),$("[data-fancybox]").fancybox({youtube:{controls:0,showinfo:0}})});