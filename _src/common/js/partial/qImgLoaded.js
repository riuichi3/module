// image loading ?
// 画像パスを受け取り、全て読み込んだらtrueを返す
//--------------------------------------------------------
export function qImgLoaded(allImage,f) {
  var allImageCount = allImage.length;
  var completeImageCount = 0;
  var img = new Array( allImageCount );
  var func = function(){f};
  for(var i = 0; i < allImageCount; i++){
    img[i] = new Image();
    img[i].src = allImage[i];
    img[i].onload = function(){
      completeImageCount ++;
      if (allImageCount == completeImageCount){
        func();
      }
    };
  }
}