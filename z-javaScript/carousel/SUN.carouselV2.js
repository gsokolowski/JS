var SUN = window.SUN || {};

SUN.carouselV2 = {
    timer: [],
    timerActive: [],
    init: function () {

        var $carousel = $('.v2Carousel');
        if ($carousel.length < 1 || $carousel.hasClass('initialised')) {
            return false;
        }
        $.each($carousel, function (index) {
            var $this = $(this),
                $hoverElements = $this.find('ul.thumbnails li'),
                $mainLinks = $this.find('.bleedSplashElement'),
                $links = $this.find('ul.mainImages li'),
                slideHeight = $this.find('li:first-child img').attr('height') || $this.find('li:first-child img').innerHeight(),
                carouselWidth = 940;
            SUN.carouselV2.timer[index] = 0;
            SUN.carouselV2.setHeights($this, slideHeight);
            SUN.carouselV2.hoverEvent($hoverElements);
            SUN.carouselV2.clickThumbEvent($hoverElements, $this, index);
            SUN.carouselV2.clickMainEvent($mainLinks, index);
            SUN.carouselV2.clickLinkEvent($links, $this, carouselWidth);
            SUN.carouselV2.mousemoveEvent($this, carouselWidth);
            SUN.carouselV2.intervalTimer($this, index);
            SUN.carouselV2.controlTimer($this, index, carouselWidth);
            $this.addClass('initialised');
            if (Modernizr.csstransitions) {
                $this.addClass('trans');
            }
        });

    },
    setHeights: function ($carouselObj, height) {
        $carouselObj.find('ul.mainImages').css('height', height);
        $carouselObj.find('ul.mainImages li').css('height', height);
        $carouselObj.find('ul.mainImages li a').css('height', height);
    },
    controlTimer: function ($carouselObj, index, carouselWidth) {
        $carouselObj.on('mousemove', function (e) {
            var posX = e.pageX - $carouselObj.offset().left;
            if (posX < 0 || posX > carouselWidth) {
                if (!SUN.carouselV2.timerActive[index]) {
                    clearInterval(SUN.carouselV2.timer[index]);
                    SUN.carouselV2.timerActive[index] = false;
                    SUN.carouselV2.intervalTimer($carouselObj, index);
                }
            } else {
                if (SUN.carouselV2.timerActive[index]) {
                    clearInterval(SUN.carouselV2.timer[index]);
                    SUN.carouselV2.timerActive[index] = false;
                }
            }
        });
        $carouselObj.on('mouseleave', function () {
            if (!SUN.carouselV2.timerActive[index]) {
                clearInterval(SUN.carouselV2.timer[index]);
                SUN.carouselV2.timerActive[index] = false;
                SUN.carouselV2.intervalTimer($carouselObj, index);
            }
        });
    },
    intervalTimer: function ($carouselObj, index) {
        var duration = $carouselObj.data('duration');
        SUN.carouselV2.timer[index] = setInterval(function () {
            SUN.carouselV2.autoChange($carouselObj);
        }, duration);
        SUN.carouselV2.timerActive[index] = true;
        //SUN.carouselV2.autoChange($this);
    },
    autoChange: function ($carouselObj) {
        var $thumbUL = $carouselObj.find('ul.thumbnails'),
            $liElements = $thumbUL.find('li'),
            elementCount = $liElements.length,
            indexOfActive = $thumbUL.find('li.active').index();
        if (indexOfActive < 0) {
            indexOfActive = $thumbUL.find('li.active2').index();
        }
        // trigger next
        if ((indexOfActive + 1) < elementCount) {
            $thumbUL.find('li:eq(' + (indexOfActive + 1) + ')').trigger('fakeMouseenter');
        } else {
            $thumbUL.find('li:eq(0)').trigger('fakeMouseenter');
        }
    },
    clickLinkEvent: function ($links, $carouselObj, carouselWidth) {
        $links.on('click', function (e) {
            //e.preventDefault();
            //var $this = $(this);
            var posX = e.pageX - $carouselObj.offset().left;
            if (posX < 0 || posX > carouselWidth) {
                e.preventDefault();
            }
        });
    },
    fireTracking: function (index, link, type) {
        try {
            var totalCarCount = $('.v2Carousel').length,
                countString = (index + 1) + '_of_' + totalCarCount,
                valuesObject = {
                    eventCategory: 'carousel',
                    eventAction: 'carousel/' + countString,
                    eventLabel: 'carousel:' + link,
                    eventValue: 'carousel/' + type,
                    prop52: "sun/" + SUN.sectionName + "/carousel/" + countString
                };
            uEvent.trackSunHomepageTracking(valuesObject.eventCategory, valuesObject.eventAction, valuesObject.eventLabel, valuesObject.eventValue, valuesObject.prop52);
        } catch (e) {
            //tracking did not work
            console.log(e);
        }

    },
    mousemoveEvent: function ($carouselObj, carouselWidth) {
        $carouselObj.on('mousemove', 'ul.mainImages li.active, ul.mainImages li.active2 ', function (e) {
            var $this = $(this),
                posX = e.pageX - $carouselObj.offset().left;
            if (posX > 0 && posX < carouselWidth) {
                $this.find('a').css('cursor', 'pointer');
            } else {
                $this.find('a').css('cursor', 'default');
            }
        });
    },
    clickThumbEvent: function ($hoverElements, $carouselObj, index) {
        $hoverElements.on('click touchstart', function (e) {
            var $this = $(this),
                mytarget,
                $target,
                targetUrl;

            if ($this.hasClass('active') || $this.hasClass('active2')) {
                e.preventDefault();
                mytarget = $this.find('div.text a').attr('href');
                $target = $(mytarget);
                targetUrl = $target.find('a').attr('href');
                SUN.carouselV2.fireTracking(index, targetUrl, 'thumbnail');
                if ($target.length > 0) {
                    window.location = targetUrl;
                }
            } else if (e.type === "touchstart") {
                e.preventDefault();
                $this.trigger('fakeMouseenter');
                // need to restart the timer
                clearInterval(SUN.carouselV2.timer[index]);
                SUN.carouselV2.timerActive[index] = false;
                SUN.carouselV2.intervalTimer($carouselObj, index);
            }
        });
    },
    clickMainEvent: function ($mainElements, index) {
        $mainElements.on('click touchstart', function (e) {
            var targetHref = $(e.target).attr('href');

            if (!targetHref) {
                targetHref = $(e.target).closest('a').attr('href');
            }
            SUN.carouselV2.fireTracking(index, targetHref, 'main_image');
            return true;
        });
    },
    hoverEvent: function ($hoverElements) {
        $hoverElements.on('mouseenter fakeMouseenter', function () {
            var $this = $(this),
                mytarget = $this.find('div.text a').attr('href'),
                $target = $(mytarget);
            if ($this.hasClass('active') || $this.hasClass('active2')) {
                return false;
            }
            if (Modernizr.csstransitions) {
                //Toggle the hover Element
                $this.addClass('active');
                $this.siblings('.active').removeClass('active');
                //Toggle the target
                if ($target.length > 0) {
                    $target.addClass('active');
                    $target.siblings('.active').removeClass('active');
                }
            } else {
                //Toggle the hover Element
                $this.find('.pointerGroup').animate({opacity: 1}, {duration: 500, queue: false});
                $this.addClass('active2');
                $this.siblings('.active2, .active').find('.pointerGroup').animate({opacity: 0}, {duration: 500, queue: false });
                $this.siblings().removeClass('active2 active');
                //Toggle the target
                if ($target.length > 0) {

                    $target.animate({opacity: 1}, {duration: 500, queue: false});
                    $target.addClass('active2');

                    $target.siblings('.active2, .active').animate({opacity: 0}, {duration: 500, queue: false });
                    $target.siblings().removeClass('active2 active');
                }
            }
        });
    }
};