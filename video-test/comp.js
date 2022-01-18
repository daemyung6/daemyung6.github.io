import layout from './layout.js';
const sceneListDiv = document.getElementById('scene-bar');
const shotList = document.getElementById('shot-list');
import * as getPreview from './getPreview.js';
import * as util from './util.js';
import * as app from './app.js';

/*
<div class="click-bt active">
    <span class="file-icon"></span>
    <input type="text" class="name" value="파일1" />
</div>
*/

let lastClickFileItem;
export function FileItem(DATA) {
    let {id, name, scenes, url} = DATA;

    const that = this;
    this.id = id;
    this.name = name;

    this.video = document.createElement('video');
    this.video.src = url;

    let div = document.createElement('div');
    div.classList.add('click-bt');
    this.element = div;

    div.appendChild((() => {
        let span = document.createElement('span');
        span.classList.add('file-icon');
        return span;
    })());

    div.appendChild((() => {
        let input = document.createElement('input');
        input.classList.add('name');
        input.setAttribute('type', 'text');
        input.value = name;
        input.disabled = true;

        div.addEventListener('dblclick', function() {
            input.disabled = false;
            input.focus();
        })
        input.addEventListener('change', function() {
            input.disabled = true;
            that.name = input.value;
        })
        return input;
    })());


    this.scenes = [];
    
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].parent = that;
        let sceneItem = new SceneItem(scenes[i]);
        this.scenes.push(sceneItem);
    }

    div.addEventListener('click', function() {
        if(typeof lastClickFileItem !== 'undefined') {
            lastClickFileItem.element.classList.remove('active');
        }
        lastClickFileItem = that;
        that.element.classList.add('active');

        sceneListDiv.innerHTML = null;
        for (let i = 0; i < that.scenes.length; i++) {
            sceneListDiv.appendChild(that.scenes[i].element);
        }

        if(layout.defaultSceneBarWidth > layout.sceneBarWidth) {
            layout.setSceneBarWidth(layout.defaultSceneBarWidth);
        }
    })
}

/*
<div class="item click-bt active">
    <div class="preview"></div>
    <div class="name">
        <input value="scene 1">
    </div>
</div>
*/

let lastClicSceneItem;
export function SceneItem(DATA) {
    let {id, name, shots, start, length, parent} = DATA
    const that = this;
    this.id = id;
    this.name = name;
    this.start = start;
    this.length = length;
    this.parent = parent;

    let previewDiv;

    getPreview.add(
        parent.video, 
        util.getSec(start),
        function(imgData) {
            let img = new Image();
            img.draggable = false;
            img.onload = function() {
                previewDiv.appendChild(img);
            }
            img.src = imgData;
        }
    );

    let div = document.createElement('div');
    div.classList.add('click-bt');
    div.classList.add('item');
    this.element = div;

    div.appendChild((() => {
        let div = document.createElement('div');
        previewDiv = div;
        div.classList.add('preview');
        return div;
    })());

    div.appendChild((() => {
        let div = document.createElement('div');
        div.classList.add('name');
        div.appendChild((() => {
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.value = name;
            input.disabled = true;
    
            div.addEventListener('dblclick', function() {
                input.disabled = false;
                input.focus();
            })
            input.addEventListener('change', function() {
                input.disabled = true;
                that.name = input.value;
            })
            return input;
        })());

        return div;
    })());  


    this.shots = [];
    for (let i = 0; i < shots.length; i++) {
        shots[i].parent = that;
        let shot = new ShotItem(shots[i]);
        this.shots.push(shot);
    }
    
    div.addEventListener('click', function() {
        shotList.innerHTML = null;
        if(typeof lastClicSceneItem !== 'undefined') {
            lastClicSceneItem.element.classList.remove('active');
        }
        lastClicSceneItem = that;
        that.element.classList.add('active');
        for (let i = 0; i < that.shots.length; i++) {
            shotList.appendChild(that.shots[i].element);
        }
        layout.setViewMain(false);
    })
}


/*
<div class="item click-bt">
    <div class="inner"></div>
    <input type="text">
</div>
*/
export function ShotItem(DATA) {
    let { id, name, start, length, parent } = DATA;
    const that = this;
    app.shots.push(that);

    this.id = id;
    this.name = name;
    this.start = start;
    this.length = length;
    this.parent = parent;

    let previewDiv;

    getPreview.add(
        parent.parent.video, 
        util.getSec(start) + util.getSec(parent.start),
        function(imgData) {
            let img = new Image();
            img.draggable = false;
            img.onload = function() {
                previewDiv.appendChild(img);
            }
            img.src = imgData;
        }
    );

    let div = document.createElement('div');
    div.draggable = true;
    this.element = div;
    div.classList.add('item');
    div.classList.add('click-bt');

    div.appendChild((()=> {
        let div = document.createElement('div');
        div.classList.add('inner');
        previewDiv = div;
        return div;
    })());
    div.appendChild((()=> {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        return input;
    })());
}

export function TrackItem(DATA) {
    const that = this;
    let { id, shotID, trackStart, trackPoint, tracklength, shot } = DATA;

    this.id = id;
    this.shotID = shotID;
    this.trackStart = util.getSec(trackStart);
    this.trackLength = util.getSec(tracklength);
    this.trackPoint = util.getSec(trackPoint ? trackPoint : 0);
    this.shot = shot;

    let div = document.createElement('div');
    div.classList.add('item');
    this.element = div;

    this.isgrab = false;

    (function() {
        let ispress = false;
        let lastX;
        that.element.addEventListener('mousedown', function(e) {
            ispress = true;
            that.isgrab = true;
            lastX = e.x;
            update();
        })
        window.addEventListener('mouseup', function() {
            if(that.isgrab) { mouseUp(); }
            ispress = false;
            that.isgrab = false;

            update();
        })
        window.addEventListener('mousemove', function(e) {
            if(!ispress || endControlPress || startControlPress) { 
                return 
            }
            that.trackStart = that.trackStart + (e.x - lastX) * (100 / layout.trackRatio);
            lastX = e.x;
            e.stopPropagation();
            update();
        })
    })();

    let art;
    getPreview.add(
        shot.parent.parent.video,
        util.getSec(shot.start) + util.getSec(shot.parent.start),
        function(imgData) {
            let img = new Image();
            img.draggable = false;
            img.onload = function() {
                art.appendChild(img);
            }
            img.src = imgData;
        }
    );
    div.appendChild((function() {
        art = document.createElement('div');
        art.classList.add('art');

        return art;
    })())

    let startControl;
    let startControlPress = false;
    div.appendChild((function() {
        startControl = document.createElement('div');
        startControl.classList.add('start-control');

        let lastX;
        startControl.addEventListener('mousedown', function(e) {
            startControlPress = true;
            lastX = e.x;
        })
        window.addEventListener('mouseup', function() {
            if(startControlPress) { mouseUp() }
            startControlPress = false;
        })
        window.addEventListener('mousemove', function(e) {
            if(!startControlPress) { return }
            let movement = (e.x - lastX) * (100 / layout.trackRatio);

            if(
                (that.trackPoint + movement < 0) ||
                (that.trackLength - movement < 1) ||
                (that.trackLength - movement > util.getSec(shot.length))
            ) { return; }

            
            that.trackPoint += movement;
            that.trackStart += movement;
            that.trackLength -= movement;
            lastX = e.x;

            update();
        })

        return startControl;
    })())

    let endControl;
    let endControlPress = false;
    div.appendChild((function() {
        endControl = document.createElement('div');
        endControl.classList.add('end-control');

        let lastX;
        endControl.addEventListener('mousedown', function(e) {
            endControlPress = true;
            lastX = e.x;
        })
        window.addEventListener('mouseup', function() {
            if(endControlPress) { mouseUp(); }
            endControlPress = false;
        })
        window.addEventListener('mousemove', function(e) {
            if(!endControlPress) { return }
            let movement = (e.x - lastX) * (100 / layout.trackRatio);
            if(
                (that.trackLength + movement < 1) ||
                (that.trackLength + movement > util.getSec(shot.length))
            ) { return; }

            that.trackLength += movement;
            lastX = e.x;

            update();
        })

        return endControl;
    })())
    
    function update() {
        div.style.cssText = `
            width: calc(${that.trackLength}px * var(--trackRatio) / 100);
            left: calc(${that.trackStart}px * var(--trackRatio) / 100);
            cursor: ${that.isgrab ? 'grabbing' : 'grab'};
            ${that.isgrab ? 'z-index: 1;' : null}
        `
    }
    this.update = update;
    function mouseUp() {
        let thisStart = that.trackStart;
        let thisEnd = that.trackStart + that.trackLength;

        for (let i = 0; i < app.tracks.length; i++) {
            if(app.tracks[i].id == that.id) continue;

            let start = app.tracks[i].trackStart;
            let end = app.tracks[i].trackStart + app.tracks[i].trackLength;

            if(
                (thisStart < start) &&
                (end < thisEnd)
            ) {
                console.log(3);
                break;
            }

            if(
                (start < thisStart) &&
                (thisEnd < end)
            ) {
                console.log(4);
                break;
            }
            
            if(
                (start < thisStart) &&
                (thisStart < end)
            ) {
                console.log(1);
                break;
            }

            if(
                (start < thisEnd) &&
                (thisStart < end)
            ) {
                console.log(2);
                break;
            }
        }
    }
    
    update();
}