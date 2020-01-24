$(function(){
  $('.js-scAction').addClass('_invisible');
  $(window).on('scroll',function(){
    const scTop = $(this).scrollTop();
    const vh = $(window).height()*0.75;
    $('.js-scAction').each(function(){
      const offsetTop = $(this).offset().top;
      if(scTop+vh>offsetTop){
        $(this).removeClass('_invisible');
      }
    })
  })
})