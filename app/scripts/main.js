
$(document).ready(function() {

  (function() {

    // dropdown

    $('body').on('click', '.dd-show', function(e) {
      e.preventDefault();

      let $this = $(this),
          $par = $this.closest('.dd-wrap'),
          $dd = $par.find('.dd');

      if($par.hasClass('disabled')) return;

      $par.find('.scroll').mCustomScrollbar();

      $('.dd-open').not($('.dd-open[data-out="false"]')).not($par).removeClass('dd-open');
      $par.toggleClass('dd-open');
    });

    $('body').on('click', '.select-item', function(e) {
      var $thisText = $(this).html(),
          $thisWrap = $(this).closest('.dd-wrap'),
          $ddBtn = $thisWrap.find('.dd-show');

      $(this).addClass('active').siblings().removeClass('active');

      $thisWrap.removeClass('dd-open');
      $ddBtn.html($thisText);
    });

    $('body').on('click', function(e) {
      isTarget(e ,'.dd-wrap', function($this) {
        $('.dd-open').not($('.dd-open[data-out="false"]')).removeClass('dd-open');
      });
    });

    function isTarget(ev, classN, callback) {

      if ($(ev.target).closest(classN).length != 1) {
        callback($(ev.target).closest(classN));
      }
    }

    // Scroll
    $('.scroll').mCustomScrollbar();
    $('.scroll-out').mCustomScrollbar({'scrollbarPosition': 'outside'});
    // $.scrollSpeed(100, 300, 'easeOutCubic');

    // Slider
    $('.slider').slick()

    $('.nav-slider').each(function() {
      var $that = $(this),
          $sliderFor = $that.find('.slider-for'),
          $sliderNav = $that.find('.slider-nav');

      $sliderFor.slick({asNavFor: $sliderNav});
      $sliderNav.slick({asNavFor: $sliderFor});

    });

    // lightBox init
    $('.swipebox').swipebox( {
      beforeOpen: function() {
        $('body').addClass('lb-open');
      },

      afterClose: function() {
        $('body').removeClass('lb-open');
      }
    } );

    $('body').on('click', '.modal-open', function() {
      var modal = $(this).attr('href').replace(/#/,'');
      $(modal).arcticmodal();
    });
  })();
});
