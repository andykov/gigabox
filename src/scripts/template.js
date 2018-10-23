
        // var lineDrawing = anime({
        //     targets: '.property svg circle',
        //     strokeDashoffset: [anime.setDashoffset, 0],
        //     easing: 'easeInOutSine',
        //     duration: 1500,
        //     delay: function(el, i) { return i * 250 },
        //     direction: 'alternate',
        //     loop: true
        // });

        
        tippy.setDefaults({
            arrow: true,
            arrowType: 'round',
            duration: 200,
            inertia: true
        });

        // function tipShow(){
        //     hintsProperty.forEach(function(item, i, arr) {
        //             item._tippy.show('slow');
        //         });
        // }

        

        $(document).ready(function(){
            // var waypoints = $('.tips-2').waypoint({
            //     handler: function(direction) {
            //         notify(this.element.id + ' hit')
            //     }
            // });

            var hintsProperty = document.querySelectorAll('.btn-tips-onscroll[data-tippy]');
                // console.log(hintsProperty[0]._tippy.options);

            var waypoint = new Waypoint({
                element: document.querySelector('.property'),
                handler: function(direction) {
                    var delay=0;
                    hintsProperty.forEach(function(item, i, arr) {
                        delay = delay + 500;
                        // var popperInstance = item._tippy.popperInstance;
                        // var options = item._tippy.options;
                        // console.log(options);
                        // options.delay = popperInstance.options.delay = 700;
                        // popperInstance.update();
                        // tippy.setDefaults({delay: 1700})
                        setTimeout(function(){
                            item._tippy.show();
                        }, delay);
                        
                    });
                    this.destroy();
                },
                offset: 'bottom-in-view'
            });

            var waypoint2 = new Waypoint({
                element: document.querySelector('.regions__map'),
                handler: function(direction) {
                    var h = $('.regions-desc').attr('data-height');
                    $('.regions-desc').height(h).find('span').css('opacity', 1);

                    this.destroy();
                },
                offset: '50%'
            });

            // regions-desc--one

            
            function cilinder() {
                $('.cilinder-lines svg').attr('viewBox',"0 0 " + $('.cilinder-lines').width() + " " + $('.cilinder-lines').height());
                
                $('.how-work__item').each(function(i, e){
                    var cylinder = $(this).find('.cylinder');
                    var spanTop = cylinder.position().top;
                    var spanLeft = cylinder.position().left;
                    var spanWidth = cylinder.width();
                    var spanHeight = cylinder.height();

                        
                    if ($(this).next().length) {
                        var cylinderNext = $(this).next().find('.cylinder');
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

            
            $(window).resize(function() {
                cilinder();
            });

            $('.faq__question').on('click', function () {
                $(this).toggleClass('is-active').next().slideToggle();
                $('.faq__question').not(this).removeClass('is-active').next().slideUp();
            });

            // menu
            $('.btn-menu').on('click', function(){
                $(this).toggleClass('is-active');
                $('.menu__list').toggleClass('is-active');
            });

            // range price
            
            $('.input-range output').text($('.input-range input[type="range"]').val());
            $('input[type="range"]').rangeslider({
                polyfill: false,
                onInit: function() {
                    var currentVal = $('input[type="range"]').val();
                 
                    $('.rangeslider__handle').append('<output>'+ currentVal +'</output>');
                },
                onSlide: function(position, value) {
                    console.log();
                    $('output').text(value);
                }
            });
        });