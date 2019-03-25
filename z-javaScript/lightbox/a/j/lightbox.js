/*
*
* dodaj do slideshow templatu strulture DOM
* <div class="lightboxPopup"></div>
* add class hidden
*
*
*
* */


(function($){
    var lightbox = lightbox ||
    {
        config : {
            thumbs : $('[class*=_lb] img'),
            thumbWidth :  106,
            thumbsPerPage :  7,
            thumbMargin :  5,
            thumbBorder : 1
        },
        currentImg : 0,
        init : function() {

            if ($('[class*=_lb]') && $('[class*=_lb] img')) {

                //overlay
                var ol = $(document.createElement('div'));
                ol.addClass('lb_ol');

                //lightbox 
                var lb = $(document.createElement('div'));
                lb.addClass('lb');
                ol.append(lb);

                //close button
                var cl = $(document.createElement('div'));
                cl.addClass('close');
                cl.click(function(){
                    lightbox.close();
                });
                lb.append(cl);

                //stage
                var lb_stage = $(document.createElement('div'));
                lb_stage.addClass('stage');
                var lb_stage_img = $(document.createElement('img'));
                lb_stage_img.attr('src', '');
                lb_stage.append(lb_stage_img);
                lb.append(lb_stage);

                //carousel
                var lb_car = $(document.createElement('div'));
                lb_car.addClass('carousel');
                lb.append(lb_car);

                //carousel arrows
                var lb_car_l = $(document.createElement('div'));
                lb_car_l.addClass('left');
                lb_car_l.click(function(){
                    lightbox.move('left');
                });
                lb_car.append(lb_car_l);
                var lb_car_r = $(document.createElement('div'));
                lb_car_r.addClass('right');
                lb_car_r.click(function(e){

                    lightbox.move('right');
                    if(arguments[1] && arguments[1] > 1){
                        arguments.callee.call(this, e, arguments[1]-1);
                    }

                });
                lb_car.append(lb_car_r);

                //carousel inner
                var lb_car_inner = $(document.createElement('div'));
                lb_car_inner.addClass('inner');

                //slider
                var lb_car_inner_sl = $(document.createElement('div'));
                lb_car_inner_sl.addClass('slider');
                lb_car_inner_sl.css('width', (lightbox.config.thumbs.length * (lightbox.config.thumbWidth + (lightbox.config.thumbMargin * 2))) + (lightbox.config.thumbBorder * 2));
                lb_car_inner.append(lb_car_inner_sl);

                //thumbs
                for(var i = 0; i < lightbox.config.thumbs.length; i++){
                    var thumb = $(document.createElement('img'));
                    thumb.addClass('thumb');
                    thumb.attr('src', $(lightbox.config.thumbs[i]).attr('src'));
                    thumb.click(function(e){
                        lightbox.highlight($(e.currentTarget).index());
                    });
                    lb_car_inner_sl.append(thumb);
                }
                lb_car.append(lb_car_inner);

                $('body').append(ol);

            } else {
                console.log('Non lightboxed page OR lightbox not configured correctly');
            }
        },

        open : function(startImg) {
            $('body').addClass('body_lock');
            $('.lb_ol').show();
            $('.lb_ol').css("top", window.pageYOffset);
            lightbox.highlight(lightbox.currentImg);
            if(startImg > 0){
                $('.lb .carousel .right').trigger('click', startImg);
            }
        },

        close : function() {
            $('body').removeClass('body_lock');
            $('.lb_ol').hide();
            lightbox.reset();
            lightbox.highlight(lightbox.currentImg);
        },

        move : function(direction) {
            if(direction === 'right') {
                if((lightbox.currentImg % lightbox.config.thumbsPerPage) == lightbox.config.thumbsPerPage -1){
                    $('.lb .carousel .inner .slider').css('left', $('.lb .carousel .inner .slider').position().left - (((lightbox.config.thumbWidth + (lightbox.config.thumbMargin * 2)) * lightbox.config.thumbsPerPage) + lightbox.config.thumbMargin));
                }
                if(lightbox.currentImg == lightbox.config.thumbs.length -1){
                    lightbox.reset();
                } else {
                    lightbox.currentImg += 1;
                }
            } else {
                if((lightbox.currentImg % lightbox.config.thumbsPerPage) == 0){
                    $('.lb .carousel .inner .slider').css('left', $('.lb .carousel .inner .slider').position().left + (((lightbox.config.thumbWidth + (lightbox.config.thumbMargin * 2)) * lightbox.config.thumbsPerPage) - lightbox.config.thumbMargin));
                }
                if(lightbox.currentImg == 0){
                    lightbox.currentImg = lightbox.config.thumbs.length -1;
                    $('.lb .carousel .right').trigger('click', lightbox.config.thumbs.length);

                } else {
                    lightbox.currentImg -= 1;
                }
            }
            lightbox.highlight(lightbox.currentImg);
        },

        highlight : function(img){
            $('.lb .carousel .inner .slider .thumb').each(function(){
                $(this).removeClass('current');
            });
            $('.lb .carousel .inner .slider .thumb').eq(img).addClass('current');
            $('.lb .stage img').attr('src', $('.lb .carousel .inner .slider .thumb').eq(img).attr('src'));
            lightbox.currentImg = img;
        },
        reset : function(){
            lightbox.currentImg = 0;
            $('.lb .carousel .inner .slider').css('left', 0);
        }
    };
    $(document).ready(function() {
        console.log('-----lightbox moj-----');
        console.log('-----thumbs', lightbox.config.thumbs);
        $('[class*=_lb] img').click(function() {
            lightbox.open($(this).index())
        });
        lightbox.init();
    });

})(jQuery);