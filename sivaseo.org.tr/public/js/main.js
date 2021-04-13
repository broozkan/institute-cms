/*

Template:  Ricpro
Author: HasTech
Version: 1
Design and Developed by: HasTech
NOTE: If you have any note put here.

*/
/*================================================
[  Table of contents  ]
================================================
  1. Top menu stick
  2. Counter
  3. venobox
  4. jQuery MeanMenu
  5. wow js
  6. slider 1
  7. slider 2
  8. scrollUp jquery
  9. Brand carousel
  10. Tesitmonial carousel
  11. Portfolio
  12. Circular Bars - Knob
  13. MailChimp


======================================
[ End table content ]
======================================*/


(function ($) {
  "use strict";
  /* 1. Top menu stick */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (scroll > 150) {
        $(".card-sentinel-pharmacy").removeClass("d-none");
      }


      if (scroll < 150) {
        $(".card-sentinel-pharmacy").addClass("d-none");
      }
    } else {
      if (scroll > 150) {
        $(".card-sentinel-pharmacy").removeClass("d-none");
        $("#top-image").addClass("top-image-scroll");
        $("#sticky-header").addClass("sticky");
      }


      if (scroll < 150) {
        $("#sticky-header").removeClass("sticky");
        $("#top-image").removeClass("top-image-scroll");
        $(".card-sentinel-pharmacy").addClass("d-none");
      }
    }

  });

  /* 2. Counter */
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  /* 3. venobox */
  $('.venobox').venobox();


  /* 5. wow js */
  // new WOW().init();


  /* 8. scrollUp jquery */
  $.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
  });
  /* 9. Brand carousel */
  $("#brand-curosel").owlCarousel({
    autoPlay: false,
    slideSpeed: 2000,
    pagination: false,
    navigation: false,
    items: 6,
    navigationText: ["<span></span>", "<span></span>"],
    itemsDesktop: [992, 3],
    itemsDesktopSmall: [768, 3],
    itemsMobile: [479, 1],
  });

  /* 10. Tesitmonial carousel */
  $('.tesitmonial-carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  /* 11. Portfolio */
  $('.grid').imagesLoaded(function () {
    $('.portfolio-menu').on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
    $('.portfolio-menu li').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });

  });

  /* 12. Circular Bars - Knob */
  if (typeof ($.fn.knob) != 'undefined') {
    $('.knob').each(function () {
      var $this = $(this),
        knobVal = $this.attr('data-rel');

      $this.knob({
        'draw': function () {
          $(this.i).val(this.cv + '%')
        }
      });

      $this.appear(function () {
        $({
          value: 0
        }).animate({
          value: knobVal
        }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.val(Math.ceil(this.value)).trigger('change');
          }
        });
      }, { accX: 0, accY: -150 });
    });
  }

  /* 13. MailChimp */
  $('#mc-form').ajaxChimp({
    language: 'en',
    callback: mailChimpResponse,
    // ADD YOUR MAILCHIMP URL BELOW HERE!
    url: 'http://themeshaven.us8.list-manage.com/subscribe/post?u=759ce8a8f4f1037e021ba2922&amp;id=a2452237f8'

  });
  function mailChimpResponse(resp) {

    if (resp.result === 'success') {
      $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
      $('.mailchimp-error').fadeOut(400);

    } else if (resp.result === 'error') {
      $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
    }
  }

})(jQuery);
