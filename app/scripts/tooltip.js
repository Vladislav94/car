$(document).ready(function() {
  var showingTooltip;

  $(document).on('mouseover', function(e) {
    var target = e.target;

    while (target !== this) {
      var tooltip = $(target).attr('data-tooltip');
      if (tooltip) break;
      target = target.parentNode;
    }

    if (!tooltip) return;

    showingTooltip = showTooltip(tooltip, $(target));
  });

  $(document).on('mouseout', function() {
    if (showingTooltip) {
      showingTooltip.remove();
      showingTooltip = false;
    }

  });


  function showTooltip(text, elem) {
    let $tooltipElem = $('<div class="tooltip">'+text+'</div>'),
        windowW = $(window).width(),
        windowH = $(window).height(),
        posTop = elem.offset().top - $(document).scrollTop(),
        posLeft = elem.offset().left - $(document).scrollLeft(),
        toolPos = elem.data('tool-pos'),
        elemW = elem.outerWidth(),
        elemH = elem.outerHeight();


    $('body').append($tooltipElem);

    let tooltipW = $tooltipElem.outerWidth(),
        tooltipH = $tooltipElem.outerHeight(),
        left = posLeft + elemW/2,
        top = posTop - tooltipH,
        newTop,
        newLeft;

    if (toolPos == 'cursor') {

      elem.on('mousemove', function(e) {
        let [scrollT, scrollL,leftM, topM] = [$(document).scrollTop(), $(document).scrollLeft(), e.pageX, e.pageY-tooltipH];
        checkPos(leftM, topM-scrollT);
      });

      return $tooltipElem;
    } else {
      checkPos(left, top);
    }

    function checkPos(l, t) {
      if (l+tooltipW > windowW) {
        newLeft = l-tooltipW;
        $tooltipElem.addClass('left').removeClass('right');
        posTool(newLeft, t);
      }

      if(t-tooltipH < 0) {
        newTop = posTop+elemH;
        $tooltipElem.addClass('bottom').removeClass('top');
        posTool(newLeft || l, newTop);
      }

      if (t-tooltipH > 0) {
        $tooltipElem.addClass('top').removeClass('bottom');
        posTool(newLeft || l, t);
      }
    }

    return $tooltipElem;

    function posTool(l, t) {
      $tooltipElem.css({
        'left': l+'px',
        'top': t+'px'
      });
    }
  }
});
