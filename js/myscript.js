var fixed_menu = true;
window.jQuery = window.$ = jQuery;

/* Custom Scripts */


function calculateScroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $('.navmenu').find('a').each(function () {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    })
    $.each(contentTop, function (i) {
        if (winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom) {
            $('.navmenu li')
                .removeClass('active')
                .eq(i).addClass('active');

            $('#top .navmenu li').first().addClass('active');
            jQuery('.mobile_menu_wrapper').css({
                'display': 'none'
            });

        }
    })
};


jQuery(document).ready(function () {
    //Fixed Menu
    if (jQuery('.fixed-menu').size() && fixed_menu == true) {

        jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper">' + jQuery('#top header').html() + '</div>');
        jQuery('.fixed-menu').find('.menu').children('li').each(function () {
            jQuery(this).children('a').append('<div class="menu_fadder"/>');
        });

        var fixd_menu = setInterval(scrolled_menu, 100);
    }

    //MobileMenu
    jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
    jQuery('#top').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu"/></div>');
    jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
    jQuery('.mobile_menu_wrapper').hide();
    jQuery('.menu_toggler').click(function () {
        jQuery('.mobile_menu_wrapper').slideToggle(300);
    });

    // if single_page
    if (jQuery("#page").hasClass("single_page")) {} else {
        $(window).scroll(function (event) {
            calculateScroll();
        });
        $('.navmenu ul li a, .mobile_menu ul li a, .down_btn, .home_btn').click(function () {
            //$('html, body').animate({scrollTop: $(this.hash).offset().top - 67}, 1000);
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 124
            }, 1000);
            return false;
        });
    };


    //Iframe transparent
    $("iframe").each(function () {
        var ifr_source = $(this).attr('src');
        var wmode = "wmode=transparent";
        if (ifr_source.indexOf('?') != -1) {
            var getQString = ifr_source.split('?');
            var oldString = getQString[1];
            var newString = getQString[0];
            $(this).attr('src', newString + '?' + wmode + '&' + oldString);
        } else $(this).attr('src', ifr_source + '?' + wmode);
    });


    //Contact form
    $("#ajax-contact-form").submit(function () {
        var str = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "contact_form/contact_process.php",
            data: str,
            success: function (msg) {
                // Message Sent - Show the 'Thank You' message and hide the form
                if (msg == 'OK') {
                    result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
                    $("#fields").hide();
                } else {
                    result = msg;
                }
                $('#note').html(result);
            }
        });
        return false;
    });


    //PrettyPhoto
    $("a[rel^='prettyPhoto']").prettyPhoto();


    //Home Height
    sliderHeight();


    //Welcome Block Vertical Align
    mymargtop();


    //Contact Height
    contactHeight();

});

jQuery(window).load(function () {
    //Parallax Effect
    $(window).stellar();

    //About Slider
    $('.flexslider').flexslider({
        animation: "slide",
        slideshow: false,
        startAt: 1
    });

    //Blog Slider
    $('.blog_block').flexslider({
        animation: "slide",
        slideshow: false,
        startAt: 1
    });

    //Down Btn
    PulseArrows();

});


jQuery(window).resize(function () {
    //Home Height
    sliderHeight();

    //Welcome Block Vertical Align
    mymargtop();

    //Parallax Effect
    $(window).stellar();

    //Contact Height
    contactHeight();

});

function scrolled_menu() {
    if (jQuery(window).scrollTop() > jQuery('#top header').height() + 67) {
        jQuery('.fixed-menu').addClass('fixed_show');
    } else {
        jQuery('.fixed-menu').removeClass('fixed_show');
    }
};

//Home Height
function sliderHeight() {
    if ($(window).width() >= 767) {
        wh = $(window).height() - 94;
        $('#home').css({
            // height: wh
        });
    } else {
        wh = $(window).height();
        $('#home').css({
            //height: wh - 125

        });
    }

}

//Welcome Block Vertical Align
function mymargtop() {
    if ($(window).width() >= 767) {
        var body_h = $(window).height();
        var container_h = $('.welcome_block').height();
        //var marg_top = Math.abs((body_h - container_h)/2);
        var marg_top = Math.abs((body_h - container_h) / 4);
        //$('.welcome_block').css('padding-top', marg_top-67);
        $('.welcome_block').css('padding-top', marg_top - 200);
    } else {
        var body_h = $(window).height();
        var container_h = $('.welcome_block').height();
        var marg_top = Math.abs((body_h - container_h) / 2);
        $('.welcome_block').css('padding-top', marg_top - 100);
    }
}

//Contact Height
function contactHeight() {
    wh = $(window).height() - 67;
    $('#contact').css('min-height', wh - 226);

}


//Down Btn
function PulseArrows() {
    var arrows = $('.top_btn img');
    arrows.stop(true);
    arrows.css({
        'opacity': '0'
    });
    $(arrows[0])
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    $(arrows[1])
        .delay(100)
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    $(arrows[2])
        .delay(200)
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    $(arrows[3])
        .delay(200)
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    $(arrows[4])
        .delay(200)
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    $(arrows[5])
        .delay(200)
        .animate({
            'opacity': 1,
            'queue': true,
            'easing': 'easeInQuint',
            'duration': 100
        })
        .animate({
            'opacity': 0.2,
            'queue': true,
            'easing': 'easeOutQuint',
            'duration': 100
        });

    setTimeout(PulseArrows, 1000);
}
