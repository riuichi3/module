// 要素の高さをそろえる
//--------------------------------------------------------
export function heightFix(breakpoint) {
  var pos = 0;
  var device = $(window).width() <= breakpoint ? 'sp' : 'pc';
  var column = $('.js-heightFix').data('column-'+device);
  var num = $('.js-heightFix .js-fix').length;

  if(column == 1){
    $('.js-heightFix .js-fix').height('auto');
    return;
  }

  do {
    var h = 0;
    for(var i=pos; i<pos+column; i++) {
      var height = $('.js-heightFix .js-fix').eq(i).height();
      h = h < height ? height : h;
    }
    for(var i=pos; i<pos+column; i++) {
      $('.js-heightFix .js-fix').eq(i).height(h);
    }
    pos += column;
  } while (pos < num)
}