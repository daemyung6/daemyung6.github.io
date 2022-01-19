import * as app from './app.js';
import layout from './layout.js';
import * as util from './util.js';

const canvas = document.getElementById('canvas');
canvas.width = 1920;
canvas.height = 1080;
const ctx = canvas.getContext('2d');
ctx.font = '48px serif';



export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let position = layout.trackBarPercent / 100 * layout.trackLength;
    for (let i = 0; i < app.tracks.length; i++) {
        let start = app.tracks[i].trackStart;
        let end = app.tracks[i].trackStart + app.tracks[i].trackLength;

        if(
            (start <= position) &&
            (position < end)
        ) {
            let video = app.tracks[i].shot.parent.parent.video;
            if(!video.seeking) {
                let scene = app.tracks[i].shot.parent;
                let shot = app.tracks[i].shot;
                let track = app.tracks[i];
            
                video.currentTime = util.getSec(scene.start) + util.getSec(shot.start) + position - track.trackStart;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            
            ctx.fillText(`position : ${position}`, 10, 50);
            break;
        }
    }

    setTimeout(function() {
        draw();
    }, 1000 / 60)
}
