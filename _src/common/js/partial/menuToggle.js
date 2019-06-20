
// スマホメニュー開閉
//--------------------------------------------------------
export function menuToggle(breakpoint) {
  var $navToggle = $('.c-gNav .sub-navToggle');
  var $navInner = $('.c-gNav>.c-nav>.sub-inner');
  var navHeight;
  $navToggle.on('click',function(){
    navHeight = parseInt($navInner.css('maxHeight'))==0 ? $('>.sub-navlist',$navInner).height()+50 : 0;
    $navInner.css('maxHeight',navHeight);
    $navToggle.toggleClass('isOpen')
  });


  // PCメニュー下層開閉
  //--------------------------------------------------------
  var $pcNavItem = $('.c-nav .sub-navitem');
  $pcNavItem.on('mouseover',function(){
    if($(window).width()>=breakpoint) {
      var h = parseInt($('.sub-iteminner .c-nav .sub-inner .sub-navlist',this).height()+50)
      $('.sub-iteminner .c-nav .sub-inner',this).css('maxHeight',h);
    }
  })
  $pcNavItem.on('mouseout',function(){
    if($(window).width()>=breakpoint) {
      $('.sub-iteminner .c-nav .sub-inner',this).css('maxHeight',0);
    }
  })
}
