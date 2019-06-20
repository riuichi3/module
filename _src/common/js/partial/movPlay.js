// モーダル動画再生
//--------------------------------------------------------
export function movPlay() {
  $('.js-movPlay').on('click',function(){
    var movurl = $(this).attr('href')+'?rel=0&autoplay=1';
    var modal ='<div class="modalmovie"><div class="movwrap"><div class="inner"><iframe src="" frameborder="0" allowfullscreen id="modalmov"></iframe><span class="close">とじる</span></div></div></div>';
    var h = $(this).data('h')/$(this).data('w')*100;
    $('body').append(modal);
    $('.modalmovie .movwrap .inner').css('padding-top',h+'%');
    $('.modalmovie').height($('html').height());
    var top = $(window).scrollTop()+$(window).height()/2-parseInt($('.movwrap .inner').css('padding-top'))/2;
    top = top < 1 ? 0 : top;
    $('.movwrap').css('top',top);
    $('#modalmov').attr('src',movurl);
    $('.modalmovie').on('click',function(){
      $('.modalmovie').remove();
    });
    return false;
  });
}