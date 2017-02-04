function play() {
  var videos = window.document.querySelectorAll('video');
  Array.prototype.forEach.call(videos, (video, index) => {
    console.log('playing video: ' + index);
    try {
      video.play();
    } catch (e) {
      console.log('error playing video: %s', e.name);
    }
  });
}

module.exports = { play };
