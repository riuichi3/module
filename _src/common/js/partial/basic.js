// JavaScript Document



    var nUa=navigator.userAgent;
    var sW=screen.width;

    var nUaIPh=nUa.indexOf('iPhone;')!=-1;//iPhone
    var nUaIPa=nUa.indexOf('iPad;')!=-1;//iPad
    var nUaIPo=nUa.indexOf('iPod;')!=-1;//iPod
    var nUaAnd=nUa.indexOf('Linux; U; Android ')!=-1;//Android
    //var nUaBlb=nUa.indexOf('BlackBerry')!=-1;//BlackBerry
    //var nUaWmb=nUa.indexOf('Windows Phone')!=-1;//Windows Mobile

    var nUaDocomo=nUa.toLowerCase().indexOf('docomo')!=-1;//docomo
    var nUaAu=nUa.toLowerCase().indexOf('kddi')!=-1;//au
    var nUaSb=nUa.toLowerCase().indexOf('softbank')!=-1;//softbank

    var nUaOp=nUa.toLowerCase().indexOf('opera')!=-1;//Opera

    var nUaSmp;
    if(nUaIPh||nUaIPo||nUaAnd){
      nUaSmp=1;//smartPhone
    }
    var nUaPC;
    if((sW>=800)&&!nUaAnd&&!nUaDocomo&&!nUaAu&&!nUaSb){
      nUaPC=1;//PC
    }
    var nUaMB;
    if(nUaDocomo||nUaAu||nUaSb){
      nUaMB=1;//MOBILE
    }



////////////////////////////////////////////////////////////////////////////////
/// Tel Link解除
////////////////////////////////////////////////////////////////////////////////

$( function(){
  if(nUaPC){
    $('a.tel').each(function(){
      $(this).attr('href','javascript:void(0);');
      $(this).css('color','inherit').css('text-decoration','none').css('cursor','text');
    });
  }


//ルートパスで書かれたアンカーを同ページ内遷移の時書き換え
//--------------------------------------------------------
// var pathname = location.pathname;
// var hash = location.hash;
// var pathnameHash = pathname+hash;
// $('.c-nav a').each(function(){
//   var a = $(this).attr('href').split('#');
//   if( a[0] == pathname && a[1]==undefined){
//     $(this).attr('href',$(this).attr('href').replace(pathname,'javascript:void(0)'));
//   }
//   if( a[0] == pathname && a[1]!=''){
//     $(this).attr('href',$(this).attr('href').replace(pathname,''));
//   }
// })



// スムーススクロール
//--------------------------------------------------------
  $('a[href^="#"]').on('click',function(){
    var href= $(this).attr("href");
    smoothScroll(href);
    return false;
  });
  function smoothScroll(href){
    if(href==''){ return; }
    var speed = 500;
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
  }

// 上に戻る
//--------------------------------------------------------
  $('.scrollTop').hide();
    $(window).on('scroll',function(){
    if($(window).scrollTop()>500){
      $('.scrollTop').fadeIn();
    } else {
      $('.scrollTop').fadeOut();
    }
  });
});




