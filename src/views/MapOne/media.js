// ————————————————————————————————————o————————————————————————————————————o Play/Pause Videos -->
// ————————————————————————————————————o Play/Pause Videos —>
// also ... add/remove play buttons
//
// When one video is playing, by clicking another vid the first
// pauses and let's the second play
//
const videoPlayPause = () => {
  let vidsCollection = document.getElementsByTagName("video");
  const vidBtnsCollection = document.getElementsByClassName(
    "project-video__button"
  );

  // if (vidsBtnsArray > 0) {
  setTimeout(() => {
    let vidsArray = Array.from(vidsCollection);
    let vidsBtnsArray = Array.from(vidBtnsCollection);
    // console.log('vidsArray', vidsArray.length)

    // Add play button click handlers for all videos
    for (let i = 0; i < vidsBtnsArray.length; i++) {
      vidsBtnsArray[i].addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // Find the corresponding video (should be the next sibling or within the same container)
        const videoContainer = vidsBtnsArray[i].closest('.project-video');
        const video = videoContainer ? videoContainer.querySelector('video') : null;
        
        if (video) {
          // Pause all other videos first
          vidsArray.forEach((vid) => {
            if (vid !== video) {
              vid.pause();
            }
          });
          
          // Hide all play buttons
          vidsBtnsArray.forEach((btn) => {
            btn.classList.remove("project-video__button--hidden");
          });
          
          // Play the clicked video and hide its play button
          video.volume = 0.3;
          video.play();
          vidsBtnsArray[i].classList.add("project-video__button--hidden");
        }
      });
    }

    if (vidsBtnsArray.length > 1) {
      for (let i = 0; i < vidsArray.length; i++) {
        vidsArray[i].addEventListener("click", (event) => {
          if (vidsArray[i].paused) {
            vidsArray.forEach((vid) => {
              vid.pause();
            });
            vidsBtnsArray.forEach((btn) => {
              btn.classList.remove("project-video__button--hidden");
            });
            vidsBtnsArray[i].classList.add("project-video__button--hidden");
            vidsArray[i].volume = 0.3;
            vidsArray[i].play();
          } else {
            vidsArray[i].pause();
            vidsBtnsArray[i].classList.remove("project-video__button--hidden");
          }
        });
      }
      // TODO: work on the logic here for other cases
      //
    } else if (vidsBtnsArray.length === 1) {
      const soloVidInBody = vidsArray[0];
      const soloBtnInBody = vidsBtnsArray[0];

      // ————————————————————————————————————o video hero + single video in body —>
      if (vidsArray[1]) {
        vidsArray[1].addEventListener("click", (event) => {
          console.log("soloBtn", soloBtnInBody);
          if (vidsArray[1].paused) {
            soloBtnInBody.classList.add("project-video__button--hidden");
            vidsArray[1].volume = 0.3;
            vidsArray[1].play();
          } else {
            vidsArray[1].pause();
            soloBtnInBody.classList.remove("project-video__button--hidden");
          }
        });
      }

      // ————————————————————————————————————o no video hero + single video in body —>
      //
      soloVidInBody.addEventListener("click", (event) => {
        console.log("soloBtn", soloBtnInBody);
        if (soloVidInBody.paused) {
          soloBtnInBody.classList.add("project-video__button--hidden");
          soloVidInBody.volume = 0.3;
          soloVidInBody.play();
        } else {
          soloVidInBody.pause();
          soloBtnInBody.classList.remove("project-video__button--hidden");
        }
      });
    } else {
      // TODO: work on the logic here for other cases
      //
      // ————————————————————————————————————o video hero + single video in body —>
      // this pertains to better breaks specifically
      // it has a video hero and a single video in the
      // body of the page
      //
      const soloVid = vidsArray[1];
      const soloBtn = vidsBtnsArray[0];

      if (typeof soloVid !== "undefined") {
        soloVid.addEventListener("click", (event) => {
          console.log("soloBtn", soloBtn);
          if (soloVid.paused) {
            soloBtn.classList.add("project-video__button--hidden");
            soloVid.volume = 0.3;
            soloVid.play();
          } else {
            soloVid.pause();
            soloBtn.classList.remove("project-video__button--hidden");
          }
        });
      }
    }
  }, 100);
  // }
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
