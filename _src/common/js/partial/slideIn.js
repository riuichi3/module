// 横からスライドイン
//--------------------------------------------------------
$(function(){
  $('.js-slideIn').scrollInFunc({
    delayHeight: $(window).height(),
    targetReach: function( elm ) {
      elm.removeClass('st-fromLeft st-fromRight');
    }
  });
})