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
    var $tooltipElem = $('<div class="tooltip">'+text+'</div>'),
        windowW = $(window).width(),
        windowH = $(window).height(),
        posTop = elem.offset().top - $(document).scrollTop(),
        posLeft = elem.offset().left - $(document).scrollLeft(),
        elemW = elem.outerWidth(),
        elemH = elem.outerHeight();

    $('body').append($tooltipElem);

    var tooltipW = $tooltipElem.outerWidth(),
        tooltipH = $tooltipElem.outerHeight(),
        left = posLeft + elemW/2,
        top = posTop - elemH,
        newTop,
        newLeft;

    if (left+tooltipW > windowW) {
      newLeft = left-tooltipW;
      $tooltipElem.addClass('left');
      posTool(newLeft, top);
    }

    if(top-tooltipH < 0) {
      newTop = posTop+tooltipH;
      $tooltipElem.addClass('bottom');
      posTool(newLeft || left, newTop);
    }
    
    if (top-tooltipH > 0) {
      $tooltipElem.addClass('top');
      posTool(newLeft || left, top);
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
