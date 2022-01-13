import layout from './layout.js';
const sceneListDiv = document.getElementById('scene-bar');
const shotList = document.getElementById('shot-list');

/*

*/
export function TrackItem(id, start, length, trackStart, trackPoint, tracklength) {
    const that = this;
    this.trackStart = trackStart;
    this.trackLength = tracklength;
    this.trackPoint = trackPoint ? trackPoint : 0;

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
            startControlPress = false;
        })
        window.addEventListener('mousemove', function(e) {
            if(!startControlPress) { return }
            let movement = (e.x - lastX) * (100 / layout.trackRatio);
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
            endControlPress = false;
        })
        window.addEventListener('mousemove', function(e) {
            if(!endControlPress) { return }
            that.trackLength = that.trackLength + (e.x - lastX) * (100 / layout.trackRatio);
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
        `
    }
    update();
}


/*
<div class="click-bt active">
    <span class="file-icon"></span>
    <input type="text" class="name" value="파일1" />
</div>
*/

let lastClickFileItem;
export function FileItem(id, name, scenes) {
    const that = this;
    this.id = id;
    this.name = name;

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
        let sceneItem = new SceneItem(
            scenes[i].id,
            scenes[i].name,
            scenes[i].shots
        );
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
export function SceneItem(id, name, shots) {
    const that = this;
    this.id = id;
    this.name = name;

    let div = document.createElement('div');
    div.classList.add('click-bt');
    div.classList.add('item');
    this.element = div;

    div.appendChild((() => {
        let div = document.createElement('div');
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
        let shot = new ShotItem(
            shots[i].id,
            shots[i].name,
        );
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
export function ShotItem(id, name) {
    const that = this;
    this.id = id;
    this.name = name;

    let div = document.createElement('div');
    this.element = div;
    div.classList.add('item');
    div.classList.add('click-bt');

    div.appendChild((()=> {
        let div = document.createElement('div');
        div.classList.add('inner');
        return div;
    })());
    div.appendChild((()=> {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        return input;
    })());
}