// ————————————————————————————————————o————————————————————————————————————o Play/Pause Videos -->
// ————————————————————————————————————o Play/Pause Videos —>
// Handles video play/pause functionality with play buttons
//
// When one video is playing, clicking another video will pause the first
// and play the second
//
const videoPlayPause = () => {
  const videos = document.getElementsByTagName("video");
  const playButtons = document.getElementsByClassName("project-video__button");

  // Convert to arrays for easier manipulation
  const videosArray = Array.from(videos);
  const buttonsArray = Array.from(playButtons);

  // Helper function to pause all videos and show all play buttons
  const pauseAllVideos = () => {
    videosArray.forEach(video => video.pause());
    buttonsArray.forEach(button => button.classList.remove("project-video__button--hidden"));
  };

  // Helper function to play a specific video and hide its play button
  const playVideo = (video, button) => {
    video.volume = 0.3;
    video.play();
    button.classList.add("project-video__button--hidden");
  };

  // Add click handlers to play buttons
  buttonsArray.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      const videoContainer = button.closest('.project-video');
      const video = videoContainer ? videoContainer.querySelector('video') : null;
      
      if (video) {
        pauseAllVideos();
        playVideo(video, button);
      }
    });
  });

  // Add click handlers to videos
  videosArray.forEach((video, index) => {
    video.addEventListener("click", (event) => {
      const videoContainer = video.closest('.project-video');
      const button = videoContainer ? videoContainer.querySelector('.project-video__button') : null;
      
      if (video.paused) {
        pauseAllVideos();
        if (button) {
          playVideo(video, button);
        } else {
          video.volume = 0.3;
          video.play();
        }
      } else {
        video.pause();
        if (button) {
          button.classList.remove("project-video__button--hidden");
        }
      }
    });
  });
};

export const handleMedia = () => {
  let imgs = document.images,
    len = imgs.length,
    counter = 0;

  [].forEach.call(imgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener("load", incrementCounter, false);
  });

  function incrementCounter() {
    counter++;
    if (counter === len) {
      videoPlayPause();
    }
  }
};
