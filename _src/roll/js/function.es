$(function(){
  $('.spritespin').spritespin({
    source: SpriteSpin.sourceArray('http://placeholde.com/500x500/?text={frame}', {
      frame: [1, 44],
      digits: 2
    }),
    width: 1920,
    height: 1080,
    frameTime: 1000,
    responsive: true
  });
})