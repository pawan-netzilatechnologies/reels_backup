"use strict";
// Creating video slide
const videoSrc = [
  {
    src: "./videos/1.mp4",
    loader: "./Images/loader.svg",
  },
  {
    src: "./videos/2.mp4",
    loader: "./Images/loader.svg",
  },
  {
    src: "./videos/3.mp4",
    loader: "./Images/loader.svg",
  },
  {
    src: "./videos/4.mp4",
    loader: "./Images/loader.svg",
  },
  {
    src: "./videos/5.mp4",
    loader: "./Images/loader.svg",
  },
  {
    src: "./videos/6.mp4",
    loader: "./Images/loader.svg",
  },
];

videoSrc.forEach((video) => {
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-wrap", "splide__slide");

  // setting attribute
  const setAttributes = function (el, attrs) {
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  const videoElement = document.createElement("video");
  setAttributes(videoElement, {
    muted: "muted",
    playsinline: "",
    crossorigin: "anonymous",
    poster: `${video.loader}`,
  });

  videoElement.muted = true;

  const src = document.createElement("source");
  src.src = `${video.src}`;
  setAttributes(src, {
    type: "video/mp4",
  });

  videoElement.prepend(src);
  videoContainer.prepend(videoElement);

  document.querySelector(".video-container").prepend(videoContainer);
});

document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    direction: "ttb",
    height: "100vh",
    wheel: true,
    speed: 1500,
    pagination: false,
    arrows: false,
  });

  splide.mount();
});

const videos = document.querySelectorAll(".video-wrap video");

// Looping Last video
[...videos].pop().loop = true;

// Creating Intersection observer
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

let callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.play();

      if (!entry.target.muted) {
        document.querySelector(".sound").classList.add("active");
        document.querySelector(".mute").classList.remove("active");
      }

      if (entry.target.muted) {
        document.querySelector(".sound").classList.remove("active");
        document.querySelector(".mute").classList.add("active");
      }

      entry.target.onended = function () {
        entry.target.parentNode.nextElementSibling &&
          entry.target.parentNode.nextElementSibling.scrollIntoView({
            behavior: "smooth",
          });
      };
    } else {
      entry.target.pause();
    }
  });
};

let observer = new IntersectionObserver(callback, options);

// UnMute video on click
videos.forEach((video) => {
  observer.observe(video);

  // video.addEventListener("click", (event) => {
  //   event.target.muted = !event.target.muted;

  //   if (!event.target.muted) {
  //     videos.forEach((video) => (video.muted = false));
  //     document.querySelector(".sound").classList.add("active");
  //     document.querySelector(".mute").classList.remove("active");
  //   } else {
  //     videos.forEach((video) => (video.muted = true));
  //     document.querySelector(".sound").classList.remove("active");
  //     document.querySelector(".mute").classList.add("active");
  //   }
  // });
});

// Comment section
const commentBtn = document.querySelector(".add_comment");
const fileBtn = document.querySelector(".add_video");
const reactionBtn = document.querySelector(".add-reaction");
const closeBtn = document.querySelectorAll(".close-btn");
const emojis = document.querySelectorAll(".emoji");
const comments = document.querySelector(".comments");
const files = document.querySelector(".files");
const reactions = document.querySelector(".reactions");

commentBtn.addEventListener("click", () => {
  reactions.classList.remove("active");
  files.classList.remove("active");

  comments.classList.toggle("active");
});

fileBtn.addEventListener("click", () => {
  reactions.classList.remove("active");
  comments.classList.remove("active");

  files.classList.toggle("active");
});

reactionBtn.addEventListener("click", () => {
  comments.classList.remove("active");
  files.classList.remove("active");

  reactions.classList.toggle("active");
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const container = event.target.closest(".wrapper");
    container.classList.remove("active");
  });
});

emojis.forEach((emoji) => {
  emoji.addEventListener("click", (event) => {
    event.target.parentElement.classList.remove("active");
  });
});

//Opening file manager
document.querySelector(".select-video-btn").addEventListener("click", () => {
  document.querySelector(".select-video").click();
});
