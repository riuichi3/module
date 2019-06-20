// レスポンシブな画像切り替え
//--------------------------------------------------------
export function responsiveImage(breakpoint) {
  $('img[data-imagesrc]').each(function(e){
    var _this = this;
    var src = $(_this).attr('data-imagesrc');
    var img = new Image();
    src = $(window).width() >= breakpoint ? src.replace("@2x", "") : src;
    img.src = src;
    $(_this).attr('src',src);
  });
}