import './partial/basic';
import './partial/faq';


var breakpoint = 767;
import { responsiveImage } from './partial/responsiveImage';
import {       heightFix } from './partial/heightFix';
import {         movPlay } from './partial/movPlay';
import {      menuToggle } from './partial/menuToggle';
import {      qImgLoaded } from './partial/qImgLoaded';

responsiveImage(breakpoint);
movPlay();
menuToggle(breakpoint);

// リサイズ時の処理
//--------------------------------------------------------
$(window).on('resize load orientationchange',function(){

  responsiveImage(breakpoint);
  heightFix(breakpoint);
})


// imgロード後行う処理
//--------------------------------------------------------
var imgSrc = new Array($('img').length);
for(var i=0;i<$('img').length;i++){
  imgSrc[i] = $('img').eq(i).attr('src');
}
qImgLoaded(imgSrc,heightFix(breakpoint));

$('.c-nav a').on('click',function(event){
  var pathname = location.pathname;
  var hash = location.hash;
  var pathnameHash = pathname+hash;
  // if(pathnameHash==$(this).attr('href')){return}
  if($(this).attr('href')=='javascript:void(0)'){return}

  event.preventDefault();
  var target = $(this).attr('href');
  $('body').addClass($('span',this).attr('class'));
  $('.c-loading').removeClass('is-loaded');

  setTimeout(
    function(){
      location.href=target;
    },1000);
})