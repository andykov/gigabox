// var lineDrawing = anime({
//     targets: '.property svg circle',
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 1500,
//     delay: function(el, i) { return i * 250 },
//     direction: 'alternate',
//     loop: true
// });





// function tipShow(){
//     hintsProperty.forEach(function(item, i, arr) {
//             item._tippy.show('slow');
//         });
// }

tippy.setDefaults({
        arrow: true,
        arrowType: 'round',
        arrowTransform: 'scale(1.9)',
        duration: 200,
        inertia: true,
        flip: false,
        offset: '0, 28',
        trigger: 'mouseenter click'
        // hideOnClick: 'toggle'
    });



$(document).ready(function () {

    var elementHeights = $('.business__advantage-inner').map(function() {
        return $(this).height();
    }).get();
    var maxHeight = Math.max.apply(null, elementHeights);
    $('.business__advantage-inner').height(maxHeight);

    var servicesHeights = $('.services__inner').map(function() {
        return $(this).height();
    }).get();
    var maxHeight = Math.max.apply(null, servicesHeights);
    $('.services__inner').height(maxHeight);



    // menu
    // var sections = $('.section');
    // var navigation_links = $('.menu a');
    // sections.waypoint({
    //     handler: function(event, direction) {
    //         // console.log(this);
    //         var active_section;
    //         active_section = $(this);
    //         // console.log(navigation_links);
    //         // active_section.attr("id")
    //         var id = active_section.attr("id");
    //         if (typeof id !== typeof undefined && id !== false) {
    //             // console.log(id);
    //         }
            
    //         if (direction === "up") active_section = active_section.prev();
    //         var active_link = $('.menu a[href="#' + active_section.attr("id") + '"]');
    //         navigation_links.removeClass("is-active");
    //         active_link.addClass("is-active");
    //     },
    //     offset: '35%'
    // });




    // var waypoints = $('.tips-2').waypoint({
    //     handler: function(direction) {
    //         notify(this.element.id + ' hit')
    //     }
    // });
    // $(window).resize(function(){
    //     var mw = $('.menu').width() / 2;
    //     console.log(mw);
    //     $('.btn-tips[data-tippy-offset]').attr('data-tippy-offset', mw + ', 0');
    // });
    var hintsProperty = document.querySelectorAll('.btn-tips-onscroll[data-tippy]');
    // console.log(hintsProperty[0]._tippy.options);

    var waypoint = new Waypoint({
        element: document.querySelector('.property'),
        handler: function (direction) {
            var delay = 0;
            hintsProperty.forEach(function (item, i, arr) {
                delay = delay + 500;
                // var popperInstance = item._tippy.popperInstance;
                // var options = item._tippy.options;
                // console.log(options);
                // options.delay = popperInstance.options.delay = 700;
                // popperInstance.update();
                // tippy.setDefaults({delay: 1700})
                setTimeout(function () {
                    item._tippy.show();
                }, delay);

            });
            this.destroy();
        },
        offset: 'bottom-in-view'
    });

    var waypoint2 = new Waypoint({
        element: document.querySelector('.regions__map'),
        handler: function (direction) {
            $('.regions-desc').each(function(){
                var h = $(this).attr('data-height');
                $(this).height(h).find('span').css('opacity', 1);
            });
            

            this.destroy();
        },
        offset: '50%'
    });

    // var step_cil = $('.cylinder');
    // var waypoint3 = new Waypoint({
    //     element: document.querySelector('.steps'),
    //     handler: function (direction) {
    //         step_cil.addClass('is-up');

    //         this.destroy();

    //         // if (direction === 'down') {
    //         // }
    //         // else {
    //         //     offset: '50%'
    //         // }
    //     },
    //     offset: '80%'
    // });

    var stepItem = $(".steps__item");

    stepItem.waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                // console.clear();
                console.log($(this.element).index());
                $(this.element).addClass('show');
                if ($(this.element).index() >= 1) {
                    $(this.element).closest('.steps').find('.cilinder-lines svg line').eq($(this.element).index() - 1).addClass('show');
                }
                
                
                // console.log($(this));
                // console.log($(this).find($('.cylinder')));
            // var title = this.element.getAttribute("data-title");
            // $("#header").text(title);
            }
        },
        offset: '80%'
    });

    // stepItem.waypoint({
    //     handler: function(direction) {
    //         if (direction === 'up') {
    //         // var title = this.element.getAttribute("data-title");
    //         // $("#header").text(title);

    //         //console.log($(window).height());
    //         //console.log(this.element.clientHeight);
    //         }
    //     },
    //     offset: 'bottom-in-view'
    // });

    function cilinder() {
        $('.cilinder-lines svg').attr('viewBox', "0 0 " + $('.cilinder-lines').width() + " " + $('.cilinder-lines').height());
        
        $('.steps__item').each(function (i, e) {
            var cylinder = $(this).find('.steps__step');
            var spanTop = cylinder.position().top;
            var spanLeft = cylinder.position().left;
            var spanWidth = cylinder.width();
            var spanHeight = cylinder.height();
            


            if ($(this).next().length) {
                console.log('NEXT');
                var cylinderNext = $(this).next().find('.steps__step');
                var spanTopNext = cylinderNext.position().top;
                var spanLeftNext = cylinderNext.position().left;
                var spanWidthNext = cylinderNext.width();
                var spanHeightNext = cylinderNext.height();
                // console.log($('.cilinder-lines svg line'));
        
                $('.cilinder-lines svg line').eq(i).attr({
                    'x1': spanLeft + (spanWidth / 2),
                    'y1': spanTop + (spanHeight / 2),
                    'x2': spanLeftNext + (spanWidthNext / 2),
                    'y2': spanTopNext + (spanHeightNext / 2)
                });
            } else {
                return false;
            }


        });
    }
    cilinder();


    $(window).resize(function () {
        cilinder();
    });

    $('.faq__question').on('click', function () {
        $(this).toggleClass('is-active').next().slideToggle();
        $('.faq__question').not(this).removeClass('is-active').next().slideUp();
    });

    // menu
    $('.btn-menu').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu__list').toggleClass('is-active');
    });

    // range price
    $('.input-range output').text($('.input-range input[type="range"]').val());

    $('input[type="range"]').rangeslider({
        polyfill: false,
        onInit: function () {
            var currentVal = $('input[type="range"]').val();
            currentVal = String(currentVal).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')

            $('.rangeslider__handle').append('<output>' + currentVal + 'руб.</output>');
        },
        onSlide: function (position, value) {
            value = String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            $('output').text(value + 'руб.');
        }
    });

    $('a[href*="#"]:not([href="#"])').on('click', function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();

                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });


    var stepItem = $("#price");

    stepItem.waypoint({
        handler: function(direction) {
            $('.product__size').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).attr('data-size')
                }, {
                    duration: 1800,
                    easing: 'swing',
                    step: function (now) {
                        $(this).attr('data-size', Math.ceil(now));
                    }
                });
            });
            this.destroy();
        },
        offset: '60%'
    });

    
    

    // services dropdown
    $('.services__inner').on('click', function(){
        $(this).parent().toggleClass('is-open');
    });

    // popup video
    $('[data-fancybox]').fancybox({
        youtube : {
            controls : 0,
            showinfo : 0
        }
    });




    
});


// function randomInteger(min, max) {
//     var rand = min - 0.5 + Math.random() * (max - min + 1)
//     rand = Math.round(rand);
//     return rand;
//   }

// var elements = document.querySelectorAll('path');
// Array.prototype.forEach.call(elements, function(el, i){
//    var delay = randomInteger(200, 1000);
//   el.style.transitionDelay = delay + 'ms';
//   console.log(el.className);
//   console.log(el.className);
//   if (el.classList) {
//     el.classList.add('show');
//   } else {
//     el.className += ' ' + 'show';
//   }
  
// });

// navigation_links.click( function(event) {
//     $.scrollTo(
//       $(this).attr("href"),
//       {
//         duration: 200,
//         offset: { 'left':0, 'top':-0.15*$(window).height() }
//       }
//     );
//   });