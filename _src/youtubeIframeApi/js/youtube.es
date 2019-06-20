
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.onload = function(){
      onYouTubePlayerAPIReady();
    }
    // Replace the 'YTplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    var player;
    function onYouTubePlayerAPIReady() {
      player = new YT.Player('YTplayer', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': function(){
            player.playVideo();
          }
        }
      });
    }