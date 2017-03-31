
$(document).ready(function() {

  (function() {

    // dropdown
    let $ddWrap = $('.dd-wrap');

    $ddWrap.on('click', '.dd-show', function() {
      let $this = $(this),
          $par = $this.closest('.dd-wrap'),
          $dd = $par.find('.dd');

      $('.dd-open').not($par).removeClass('dd-open');
      $par.toggleClass('dd-open');
    });

    $ddWrap.on('click', '.select-item', function(e) {
      var $thisText = $(this).html(),
          $thisWrap = $(this).closest('.dd-wrap'),
          $ddBtn = $thisWrap.find('.dd-show');

      $(this).addClass('active').siblings().removeClass('active');

      $thisWrap.removeClass('dd-open');
      $ddBtn.html($thisText);
    });

    $('body').on('click', function(e) {
      isTarget(e ,'.dd-wrap', function() {
        $('.dd-open').removeClass('dd-open');
      });
    });

    function isTarget(ev, classN, callback) {

      if ($(ev.target).closest(classN).length != 1) {
        callback();
      }
    }

    // Scroll
    $('.scroll').mCustomScrollbar();

    // Slider
    $('.slider').slick({

    })

    // $.scrollSpeed(100, 300, 'easeOutCubic');


    // lightBox init
    $('.swipebox').swipebox( {
      beforeOpen: function() {
        $('body').addClass('lb-open');
      },

      afterClose: function() {
        $('body').removeClass('lb-open');
      }
    } );
  })();
});
