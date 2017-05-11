$('body').on('click', '.tabs-item', function() {

  var $this = $(this),
      parentData = $this.parent().data('tabs'),
      index = $this.index();

  $this.addClass('active').siblings().removeClass('active');

  $(parentData).each(function(){
    $(this).children('.tabs-section').eq(index).addClass('active')
      .siblings().removeClass('active');
  });

});

$('body').on('click', '.next-tab', function(e) {
  e.preventDefault();
  
  let $this = $(this),
      $tabS = $this.closest('.tabs-section'),
      $tabI = $tabS.index();

      $tabS.removeClass('active').next().addClass('active');
});
