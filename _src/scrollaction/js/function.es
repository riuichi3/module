var scrollaction = {
  init:function(){
    const vHeight = $(window).height();
    const $target = $('[data-js-scaction]');
    $target.each(function(i){
      $(this).addClass('_isinactive');
    });

    window.addEventListener('scroll', () => {
      const scTop = $(window).scrollTop();
      $target.each(function(){
        const thisTop = $(this).offset().top;
        const thisHeight = $(this).height();
        if((thisTop>scTop-thisHeight)&&(thisTop+thisHeight/2<scTop+vHeight)){
          $(this).removeClass('_isinactive');
          $(this).addClass('_sca-'+$(this).data('js-scaction'));
        }else{
          $(this).addClass('_isinactive');
          const CLASS = $(this).attr('class').split(' ');
          for(var i=0; i<CLASS.length; i++){
            if(CLASS[i].indexOf('_sca-')>-1){
              CLASS.splice(i, 1);
              $(this).attr('class','').addClass(CLASS);

            }
          }
            // $(this).removeClass('_sca-*');
        }
      });
    }, false);
  }
}

$(function(){
  scrollaction.init();
});
