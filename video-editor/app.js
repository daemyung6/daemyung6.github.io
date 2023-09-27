import layout from './layout.js';
import * as comp from './comp.js';
import * as util from './util.js';
import * as getPreview from './getPreview.js';
import * as player from './player.js';
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
        projectInit(json);
    })
})

export let project;
export let shots = [];
export let tracks = [];
export let trackIndexNum;
export function addTrackIndexNum() {
    trackIndexNum++;
}

export let fileList = [];

function projectInit(projectdata) {
    layout.setLoading(true);
    layout.setLoadingPercent(0);
    getPreview.setOnProgress(function(per) {
        layout.setLoadingPercent(per * 100);
    });
    getPreview.setOnEnd(function() {
        player.draw();
        layout.setLoading(false);
        getPreview.setOnEnd(function() {});
    });


    fileList = [];
    project = projectdata;
    trackIndexNum = project.trackIndexNum;
    shots = [];
    tracks = [];
    fileList = [];
    fileListDiv.innerHTML = null;
    sceneListDiv.innerHTML = null;
    trackVideoDiv.innerHTML = null;

    window.pro = project;
    
    layout.setTrackLength(util.getSec(project.length));
    layout.setTrackRatio(trackBox.offsetWidth / util.getSec(project.length) * 80);


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
        if(typeof data.shot === 'undefined') { 
            console.error('프로젝트 파일 이상');
        }
        let track = new comp.TrackItem(data);
        tracks.push(track);
        trackVideoDiv.appendChild(track.element);
    }
    window.test = tracks;
}