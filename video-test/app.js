import layout from './layout.js';
import * as comp from './comp.js';
import * as util from './util.js';
const trackVideoDiv = document.getElementById('track-video');
const fileListDiv = document.getElementById('file-list');
const sceneListDiv = document.getElementById('scene-bar');
const trackBox = document.getElementById('track-box');

window.addEventListener('DOMContentLoaded', function() {
    fetch('./api-example/project.json', {
        method: "GET"
    })
    .then(json => json.json())
    .then(json => {
        project = json;
        init(project);
    })
})

export let project;
export let shots = [];
export let tracks = [];
let fileList;

function init(project) {
    console.log(project);
    fileList = [];
    fileListDiv.innerHTML = null;
    sceneListDiv.innerHTML = null;
    trackVideoDiv.innerHTML = null;

    window.pro = project;
    

    layout.setTrackLength(util.getSec(project.length));
    layout.setTrackRatio(trackBox.offsetWidth / util.getSec(project.length) * 80);

    // const vidTrack = new comp.TrackItem(1, 0, 100, 100, 0, 100);
    // trackVideo.appendChild(vidTrack.element);

    // window.test = fileList;

    for (let i = 0; i < project.files.length; i++) {
        let fileItem = new comp.FileItem(project.files[i]);
        fileList.push(fileItem);
        fileListDiv.appendChild(fileItem.element);
    }

    for (let i = 0; i < project.tracks.length; i++) {
        let data = project.tracks[i];
        for (let i1 = 0; i1 < shots.length; i1++) {
            if(shots[i1].id === data.shotID) {
                data.shot = shots[i];
                break;
            }
        }
        let track = new comp.TrackItem(data);
        tracks.push(track);
        trackVideoDiv.appendChild(track.element);
    }
    window.test = tracks;
}