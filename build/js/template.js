$(document).ready(function(){tippy.setDefaults({arrow:!0,arrowType:"round",arrowTransform:"scale(1.9)",duration:200,inertia:!0,flip:!1,offset:"0, 28",trigger:"mouseenter click"});var e=document.querySelectorAll(".btn-tips-onscroll[data-tippy]"),t=(new Waypoint({element:document.querySelector(".property"),handler:function(t){var i=0;e.forEach(function(t,e,n){i+=500,setTimeout(function(){t._tippy.show()},i)}),this.destroy()},offset:"bottom-in-view"}),new Waypoint({element:document.querySelector(".regions__map"),handler:function(t){var e=$(".regions-desc").attr("data-height");$(".regions-desc").height(e).find("span").css("opacity",1),this.destroy()},offset:"50%"}),$(".steps__item"));function n(){$(".cilinder-lines svg").attr("viewBox","0 0 "+$(".cilinder-lines").width()+" "+$(".cilinder-lines").height()),$(".steps__item").each(function(t,e){var n=$(this).find(".cylinder"),i=n.position().top,o=n.position().left,s=n.width(),a=n.height();if(!$(this).next().length)return!1;var r=$(this).next().find(".cylinder"),l=r.position().top,c=r.position().left,p=r.width(),u=r.height();$(".cilinder-lines svg line").eq(t).attr({x1:o+s/2,y1:i+a/2,x2:c+p/2,y2:l+u/2})})}t.waypoint({handler:function(t){"down"===t&&(console.clear(),console.log(),$(this.element).find(".cylinder").addClass("is-up"))},offset:"80%"}),t.waypoint({handler:function(t){},offset:"bottom-in-view"}),n(),$(window).resize(function(){n()}),$(".faq__question").on("click",function(){$(this).toggleClass("is-active").next().slideToggle(),$(".faq__question").not(this).removeClass("is-active").next().slideUp()}),$(".btn-menu").on("click",function(){$(this).toggleClass("is-active"),$(".menu__list").toggleClass("is-active")}),$(".input-range output").text($('.input-range input[type="range"]').val()),$('input[type="range"]').rangeslider({polyfill:!1,onInit:function(){var t=$('input[type="range"]').val();t=String(t).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$(".rangeslider__handle").append("<output>"+t+"</output>")},onSlide:function(t,e){e=String(e).replace(/(\d)(?=(\d{3})+([^\d]|$))/g,"$1 "),$("output").text(e+"руб.")}}),$('a[href*="#"]:not([href="#"])').on("click",function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);(e=e.length?e:$("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),$("html, body").animate({scrollTop:e.offset().top},1e3,function(){var t=$(e);if(t.focus(),t.is(":focus"))return!1;t.attr("tabindex","-1"),t.focus()}))}})});