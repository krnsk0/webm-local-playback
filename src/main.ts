import videojs from 'video.js';

const player1 = videojs(document.getElementById('video1')!, {
  autoplay: false,
  controls: true,
});

const player2 = videojs(document.getElementById('video2')!, {
  autoplay: false,
  controls: true,
});

(async () => {
  const response = await fetch('./video.webm');
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  player1.src('./video.webm');
  player2.src({ type: 'video/webm', src: objectURL });
})();
