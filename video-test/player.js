import * as app from './app.js';
import layout from './layout.js';
import * as util from './util.js';
const startPoint = document.getElementById('start-point');
const endPoint = document.getElementById('end-point');


export const canvas = document.getElementById('canvas');
export function setSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}
//default
canvas.width = 1920;
canvas.height = 1080;
const ctx = canvas.getContext('2d');
ctx.font = '52px serif';
ctx.fillStyle = 'white';

export let isPlaying = false;
let isFirstPlay = false;
export function play() {
  isPlaying = true;
  isFirstPlay = true;
  draw();
}
export function stop() {
  isPlaying = false;
}

let isBlack = false;

let nowPlayID;
function onChangeTrack(i) {
  console.log(i)
}
export let fps = 1000 / 60;
export function setFPS(num) {
  fps = 1000 / num;
}
window.setFPS = setFPS;

export let mod = 'track';
export function setMod(modValue) {
  mod = modValue;
  console.log(modValue);
}


export let scenePreview;
export function setScenePreview(video) {
  scenePreview = video;
}


export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let mainVideo;
  let mainVideoPosition;

  if(mod === 'track') {
    let position = layout.trackBarPercent / 100 * layout.trackLength;
    mainVideoPosition = position;
    isBlack = true;
    for (let i = 0; i < app.tracks.length; i++) {
      let start = app.tracks[i].trackStart;
      let end = app.tracks[i].trackStart + app.tracks[i].trackLength;

      if(
        (start <= position) &&
        (position < end)
      ) {
        isBlack = false;
        
        let video = app.tracks[i].shot.parent.parent.video;
        mainVideo = video;
        let scene = app.tracks[i].shot.parent;
        let shot = app.tracks[i].shot;
        let track = app.tracks[i];

        if(nowPlayID !== app.tracks[i].id) {
          onChangeTrack(app.tracks[i].id);
          if(typeof nowPlayID !== 'undefined') {
            console.log(nowPlayID)
            app.tracks[i].shot.parent.parent.video.pause();
            app.tracks[i].shot.parent.parent.video.currentTime = 0;
          }
          if(isPlaying) {
            video.currentTime = scene.start + shot.start + position - track.trackStart;
            video.play();
          }
          nowPlayID = app.tracks[i].id;
        }
        
        if(!video.seeking && !isPlaying) {
          video.currentTime = scene.start + shot.start + position - track.trackStart;
        }

        if(isFirstPlay) { 
          video.currentTime = scene.start + shot.start + position - track.trackStart;
          video.play();
          isFirstPlay = false; 
        }

        break;
      }
    }


    if(isBlack && (typeof nowPlayID !== 'undefined')) {
      onChangeTrack(undefined);
      nowPlayID = undefined;
    }

    if(isPlaying) {
      let movement = layout.trackBarPercent + (fps / (layout.trackLength * 10));

      if(movement > 100) {
        layout.setTrackBarPercent(100);
        layout.setProgress(100);
        isPlaying = false;
      }
      else {
        layout.setTrackBarPercent(movement);
        layout.setProgress(movement);
      }
    }

    startPoint.innerText = util.sec2str(Math.round(position));
    endPoint.innerText = util.sec2str(layout.trackLength);
  }

  if(mod === "scenePreview") {
    mainVideo = scenePreview.parent.video;

    if(isPlaying && isFirstPlay) {
      scenePreview.parent.video.currentTime = scenePreview.start + (scenePreview.length * layout.progress / 100);
      scenePreview.parent.video.play();
      isFirstPlay = false;
    }
    if(!isPlaying && !mainVideo.seeking) {
      scenePreview.parent.video.currentTime = scenePreview.start + (scenePreview.length * layout.progress / 100);
    }

    let nowTime = scenePreview.parent.video.currentTime;
    if(isPlaying) {
      layout.setProgress(((nowTime - scenePreview.start) / scenePreview.length) * 100);
      if(nowTime >= (scenePreview.start + scenePreview.length)) {
        stop();
      }
    }
    startPoint.innerText = util.sec2str(nowTime - scenePreview.start);
    endPoint.innerText = util.sec2str(scenePreview.length);

  }

  if(typeof mainVideo !== 'undefined') {
    let sizeRatio = canvas.height / mainVideo.videoHeight;

    ctx.drawImage(
      mainVideo, 
      (canvas.width - mainVideo.videoWidth * sizeRatio) / 2,
      0,
      mainVideo.videoWidth * sizeRatio, 
      mainVideo.videoHeight * sizeRatio
    );


    ctx.fillText(`position : ${mainVideoPosition}`, 10, 50);
    ctx.fillText(`mod : ${mod}`, 10, 100);
  }

  if(isPlaying) {
    setTimeout(function() {
      draw();
    }, fps)
  }
}