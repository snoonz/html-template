// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {

(function () {
   'use strict';

   /*====================================
    Page a Link Smooth Scrolling
    ======================================*/
    $('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Menu Active Calling Scroll Spy
    ======================================*/
    $('body').scrollspy({
      target: '.navmenu',
      offset: 80,
    });


// イベントを効かせるためにiOSのみCSSを追加
    var agent = navigator.userAgent;
    if ( agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('iPod') > 0) {
      $("body").addClass("iOS");
    };

    /* ==============================================
  Testimonial Slider
  =============================================== */

  $(document).ready(function() {

    $("#testimonial").owlCarousel({

        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        autoHeight : true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

  });
}());

var setTimeoutId = null;
$(document).on('scroll', function(){
  if( setTimeoutId ) {
    return false;
  }

  setTimeoutId = setTimeout( function() {
    // スクロールイベントの処理内容
    if ($(window).scrollTop() > 50) {
      $('#menu').addClass('fixed');
    } else {
      $('#menu').removeClass('fixed');
    }

    setTimeoutId = null ;
  }, 250 ) ;
});

}
main();
