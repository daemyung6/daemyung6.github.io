import layout from './layout.js';
import * as comp from './comp.js';
const trackVideoDiv = document.getElementById('track-video');
const fileListDiv = document.getElementById('file-list');
const sceneListDiv = document.getElementById('scene-bar');

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

let project;
let fileList;
let sceneList;
let shotList;


function init(project) {
    console.log(project);

    // const vidTrack = new comp.TrackItem(1, 0, 100, 100, 0, 100);
    // trackVideo.appendChild(vidTrack.element);
    fileList = [];
    fileListDiv.innerHTML = null;

    window.test = fileList;
    for (let i1 = 0; i1 < project.files.length; i1++) {
        let fileItem = new comp.FileItem(
            project.files[i1].id,
            project.files[i1].name,
            project.files[i1].scenes
        );
        fileList.push(fileItem);
        fileListDiv.appendChild(fileItem.element);
    }

}