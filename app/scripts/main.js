var $module = angular.module('car', []);


$(document).ready(function() {
  // select list
  // var $selectWrap = $('.select-wrap');

  // $selectWrap.on('click', '.select-item', function(e) {
  //   var $thisText = $(this).html(),
  //       $thisWrap = $(this).closest('.select-wrap'),
  //       $selectBtn = $thisWrap.find('.select-show');
  //
  //   $(this).addClass('active').siblings().removeClass('active');
  //
  //   $thisWrap.removeClass('select-open');
  //   $selectBtn.html($thisText);
  // });
  //
  // $selectWrap.on('click', '.select-show', function() {
  //   var $selectBtn = $(this).closest('.select-wrap');
  //
  //   $selectBtn.toggleClass('select-open');
  // });
  //
  // $selectWrap.on('click', function() {
  //   var $this = $(this);
  //
  //   $selectWrap.not($this).removeClass('select-open');
  // });

  // dropdown
  // var $ddWrap = $('.dd-wrap');

  // $ddWrap.on('click', '.dd-show', function() {
  //   var $this = $(this),
  //       $par = $this.closest('.dd-wrap'),
  //       $dd = $par.find('.dd');
  //
  //   $('.dd-open').not($par).removeClass('dd-open');
  //   $par.toggleClass('dd-open');
  // });

  // $('body').on('click', function(e) {
  //   if ($(e.target).closest('.select-wrap').length != 1) {
  //     $('.select-open').removeClass('select-open');
  //   }
  //
  //   if ($(e.target).closest('.dd-wrap').length != 1) {
  //     $('.dd-open').removeClass('dd-open');
  //   }
  //
  // });

  // Scroll
  $('.scroll').mCustomScrollbar();


  $.scrollSpeed(100, 300, 'easeOutCubic');
});
