//TODO: TODO: Move these three functions to own file - https://trello.com/c/WebrWOBn/60-todo-move-these-three-functions-to-own-file
// ————————————————————————————————————o————————————————————————————————————o Images+Video -->
// ———————————————————————————————————— Img Sizing + Aspect Ratio —>
// Programmatically setting widths + heights + aspect ratios of all
// images on each individual page.
export const imagesLoad = () => {
  var allImages = document.getElementsByTagName("img");
  setTimeout(() => {
    for (const img of allImages) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
      img.style.aspectRatio = img.naturalWidth / img.naturalHeight;
      img.parentElement.style.aspectRatio =
        img.naturalWidth / img.naturalHeight;
      // console.log('aspect', img.style.aspectRatio)
      // console.log("allImages", allImages);
    }
  }, 100);
};

// ———————————————————————————————————— Video Sizing + Aspect Ratio —>
// delay for loop until all videos are loaded
//
export const videosLoad = () => {
  const allVideos = document.getElementsByTagName("video");

  setTimeout(() => {
    for (let oneVid of allVideos) {
      oneVid.width = oneVid.videoWidth;
      oneVid.height = oneVid.videoHeight;
      oneVid.style.aspectRatio = oneVid.videoWidth / oneVid.videoHeight;
      oneVid.parentElement.style.aspectRatio =
        oneVid.videoWidth / oneVid.videoHeight;
      console.log("aspect", oneVid.style.aspectRatio);
      // console.log("oneVid", oneVid.width);
    }
  }, 100);
};

// ————————————————————————————————————o————————————————————————————————————o Play/Pause Videos -->
// ————————————————————————————————————o Play/Pause Videos —>
// also ... add/remove play buttons
//
// When one video is playing, by clicking another vid the first
// pauses and let's the second play
//
export const videoPlayPause = () => {
  let vidsCollection = document.getElementsByTagName("video");
  const vidBtnsCollection = document.getElementsByClassName(
    "project-video__button"
  );

  // if (vidsBtnsArray > 0) {
  setTimeout(() => {
    let vidsArray = Array.from(vidsCollection);
    let vidsBtnsArray = Array.from(vidBtnsCollection);
    // console.log('vidsArray', vidsArray.length)

    if (vidsBtnsArray.length > 1) {
      for (let i = 0; i < vidsArray.length; i++) {
        vidsArray[i].addEventListener("click", (event) => {
          if (vidsArray[i].paused) {
            console.log(
              "vidsBtnsArray[i].classList",
              vidsBtnsArray[0].classList
            );
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
      // ————————————————————————————————————o no video hero + single video in body —>
    } else if (vidsBtnsArray.length === 1) {
      const soloVidInBody = vidsArray[0];
      const soloBtnInBody = vidsBtnsArray[0];

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
  }, 100);
  // }
};
