tippy.setDefaults({
    interactive: true,
    arrow: true,
    arrowType: 'round',
    arrowTransform: 'scale(1.9)',
    duration: 200,
    inertia: true,
    flip: false,
    trigger: 'mouseenter click'
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
    var sections = $('.section');
    var navigation_links = $('.menu a');
    sections.waypoint({
        handler: function(event, direction) {
            var active_section = $(this.element);
            var id = active_section.attr("id");
            if (direction === "up") active_section = active_section.prev();
            var active_link = $('.menu a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass("is-active");
            active_link.addClass("is-active");
        },
        offset: '35%'
    });

    if ($(window).width() >= 960) {
        var hintsProperty = document.querySelectorAll('.btn-tips-onscroll[data-tippy]');
        var waypoint = new Waypoint({
            element: document.querySelector('.property'),
            handler: function (direction) {
                var delay = 0;
                hintsProperty.forEach(function (item, i, arr) {
                    delay = delay + 500;
                    setTimeout(function () {
                        item._tippy.show();
                    }, delay);

                });
                this.destroy();
            },
            offset: 'bottom-in-view'
        });
    }

    var waypoint2 = new Waypoint({
        element: document.querySelector('.regions__map'),
        handler: function (direction) {
            $('.regions-desc').each(function(){
                var h = $(this).attr('data-height');
                $(this).height($(window).width() >= 960 ? h : (h/1.4)).find('span').css('opacity', 1);
            });
            
            this.destroy();
        },
        offset: '50%'
    });

    if ($(window).width() >= 768) {
        var stepItem = $(".steps__item");
        stepItem.waypoint({
            handler: function(direction) {
                if (direction === 'down') {
                    console.log($(this.element).index());
                    $(this.element).addClass('show');
                    if ($(this.element).index() >= 1) {
                        $(this.element).closest('.steps').find('.cilinder-lines svg line').eq($(this.element).index() - 1).addClass('show');
                    }
                }
            },
            offset: '80%'
        });
    } else {
        $('.steps__item, .cilinder-lines svg line').addClass('show');
    }

    var stepItem = $("#property");
    stepItem.waypoint({
        handler: function(direction) {
            if (direction === 'down' && $(window).width() >= 1200) {
                $('.btn-menu, .menu__body').addClass('is-active');
            }
        },
        offset: '20%'
    });


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
        $('.menu__body').toggleClass('is-active');
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
                $(this).addClass('show');
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


    // Create Countdown
    var Countdown = {
    
        // Backbone-like structure
        $el: $('.countdown'),
        
        // Params
        countdown_interval: null,
        total_seconds     : 0,
        
        // Initialize the countdown  
        init: function() {
        
        // DOM
            this.$ = {
            hours  : this.$el.find('.bloc-time.hours .figure'),
            minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
            };
    
        // Init countdown values
        this.values = {
                hours  : this.$.hours.parent().attr('data-init-value'),
            minutes: this.$.minutes.parent().attr('data-init-value'),
            seconds: this.$.seconds.parent().attr('data-init-value'),
        };
        
        // Initialize total seconds
        this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
    
        // Animate countdown to the end 
        this.count();    
        },
        
        count: function() {
        
        var that    = this,
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1  = this.$.minutes.eq(0),
            $min_2  = this.$.minutes.eq(1),
            $sec_1  = this.$.seconds.eq(0),
            $sec_2  = this.$.seconds.eq(1);
        
            this.countdown_interval = setInterval(function() {
    
            if(that.total_seconds > 0) {
    
                --that.values.seconds;              
    
                if(that.values.minutes >= 0 && that.values.seconds < 0) {
    
                    that.values.seconds = 59;
                    --that.values.minutes;
                }
    
                if(that.values.hours >= 0 && that.values.minutes < 0) {
    
                    that.values.minutes = 59;
                    --that.values.hours;
                }
    
                // Update DOM values
                // Hours
                that.checkHour(that.values.hours, $hour_1, $hour_2);
    
                // Minutes
                that.checkHour(that.values.minutes, $min_1, $min_2);
    
                // Seconds
                that.checkHour(that.values.seconds, $sec_1, $sec_2);
    
                --that.total_seconds;
            }
            else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);    
        },
        
        animateFigure: function($el, value) {
        
        var that         = this,
                $top         = $el.find('.top'),
            $bottom      = $el.find('.bottom'),
            $back_top    = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');
    
        // Before we begin, change the back value
        $back_top.find('span').html(value);
    
        // Also change the back bottom value
        $back_bottom.find('span').html(value);
    
        // Then animate
        TweenMax.to($top, 0.8, {
            rotationX           : '-180deg',
            transformPerspective: 300,
                ease                : Quart.easeOut,
            onComplete          : function() {
    
                $top.html(value);
    
                $bottom.html(value);
    
                TweenMax.set($top, { rotationX: 0 });
            }
        });
    
        TweenMax.to($back_top, 0.8, { 
            rotationX           : 0,
            transformPerspective: 300,
                ease                : Quart.easeOut, 
            clearProps          : 'all' 
        });    
        },
        
        checkHour: function(value, $el_1, $el_2) {
        
        var val_1       = value.toString().charAt(0),
            val_2       = value.toString().charAt(1),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html();
    
        if(value >= 10) {
    
            // Animate only if the figure has changed
            if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        }
        else {
    
            // If we are under 10, replace first figure with 0
            if(fig_1_value !== '0') this.animateFigure($el_1, 0);
            if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }    
        }
    };

    // init timer
    Countdown.init(); 
  
});






