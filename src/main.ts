import videojs from 'video.js';

const webmPlayer = videojs(document.getElementById('video-webm')!, {
  autoplay: false,
  controls: true,
});

const dashPlayer = videojs(document.getElementById('video-dash')!, {
  autoplay: false,
  controls: true,
});

(async () => {
  const response = await fetch('./video.webm');
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  webmPlayer.src({ type: 'video/webm', src: objectURL });
  document.getElementById('video-dash')!.style.display = 'none';
})();

document.getElementById('play')?.addEventListener('click', () => {
  webmPlayer.play();
});

document.getElementById('swap')?.addEventListener('click', () => {
  dashPlayer.src({ type: 'application/dash+xml', src: './manifest.mpd' });
  dashPlayer.one('loadeddata', () => {
    // pre-seek to make transition faster
    const currentTime = webmPlayer.currentTime();
    dashPlayer.currentTime(currentTime);

    // when seek is done, do the swap
    dashPlayer.one('seeked', () => {
      const currentTime = webmPlayer.currentTime();
      dashPlayer.currentTime(currentTime);
      webmPlayer.pause();
      dashPlayer.play();
      document.getElementById('video-dash')!.style.display = 'inherit';
      document.getElementById('video-webm')!.style.display = 'none';
    });
  });
});
