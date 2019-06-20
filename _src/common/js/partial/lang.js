// 言語切替
//--------------------------------------------------------
//このテンプレートでは使用停止しています。
$(function(){
  var browserlanguage = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage) == "zh-TW" ? "tc" : "sc";
  var lang = localStorage.lang;
  var url = location.pathname.split('/');
  var redirectUrl;
  var redirect = function(){
    url[4]=localStorage.lang;
    redirectUrl = url.join('/');
    // location.pathname = redirectUrl;
  }
  $('.js-langswitch').on('click',function(e){
    e.preventDefault();
    localStorage.lang = $(this).data('lang');
    redirect();
  })
  //言語未設定の場合はブラウザの言語に従う
  if((lang!='sc')&&(lang!='tc')){
    localStorage.lang = browserlanguage;
    redirect();
  }
  //言語設定済みで他言語に移動したとき、言語設定に従う
  if(((lang=='sc')||(lang=='tc'))&&(url[4]!=lang)){
    redirect();
  }
})
