$('body').on('click', '.accordion-head', function(e) {
  e.preventDefault();
  let $that = $(this),
      $par = $that.parent();

  $par.toggleClass('active').siblings().removeClass('active').children('.accordion-body').slideUp(200);

  $par.children('.accordion-body').slideToggle(200);
});
