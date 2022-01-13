const canvas = document.getElementById('canvas');
const shotList = document.getElementById('shot-list');
const editModeBt = document.getElementById('edit-mode-bt');

function Layout() {
    const that = this;

    let style = document.createElement('style');

    this.fileBarWidth = 256;
    this.setFileBarWidth = function(w) {
        if(w < 120) { w = 120 }
        that.fileBarWidth = w;
        update();
    }
    this.sceneBarWidth = 33;
    this.defaultSceneBarWidth = 230;
    this.setSceneBarWidth = function(w) {
        if(w < 33) { w = 33 }
        that.sceneBarWidth = w;
        update();
    }
    
    this.editBoxHeight = 437;
    this.setEditBoxWidth = function(w) {
        if(w > document.body.offsetHeight - 100) { 
            w = document.body.offsetHeight - 100 
        }
        if(w < 100 ) {
            w = 100;
        }
        that.editBoxHeight = w;
        update();
    }

    this.trackLength = 300;
    this.setTrackLength = function(w) {
        that.trackLength = w;
        update();
    }

    this.progress = 50;
    this.setTrackLength = function(percent) {
        that.progress = percent;
        update();
    }


    this.trackLength = 200;
    this.setTrackLength = function(w) {
        that.trackLength = w;
        update();
    }

    this.trackRatio = 100;
    this.setTrackRatio = function(w) {
        that.trackRatio = w;
        update();
    }

    this.isViewMain = true;
    shotList.style.display = 'none';
    canvas.style.display = null

    this.setViewMain = function(flag) {
        if(flag) {
            that.isViewMain = true;
            shotList.style.display = 'none';
            canvas.style.display = null
            editModeBt.classList.remove('active');
        }
        else {
            that.isViewMain = false;
            shotList.style.display = null;
            canvas.style.display = 'none';
            editModeBt.classList.add('active');
        }
    }

    editModeBt.addEventListener('click', function() {
        that.setViewMain(!that.isViewMain);
    })
    
    function update() {
        style.innerHTML = /*css*/`
            :root {
                --fileBarWidth: ${that.fileBarWidth}px;
                --sceneBarWidth: ${that.sceneBarWidth}px;
                --editBoxHeight: ${that.editBoxHeight}px;
                --progress: ${that.progress}%;
                --trackLength: ${that.trackLength}px;
                --trackRatio: ${that.trackRatio};
            }
        `;
    }
    //초기화
    update();

    document.head.appendChild(style);
}
const layout = new Layout();
export default layout;

window.addEventListener('DOMContentLoaded', function() {
    (function() {
        const bar = document.getElementById('file-bar-size');
        let ispress = false;
        bar.addEventListener('mousedown', function() {
            ispress = true;
        })
        window.addEventListener('mouseup', function() {
            ispress = false;
        })
    
        window.addEventListener('mousemove', function(e) {
            if(!ispress) { return }
    
            layout.setFileBarWidth(e.x);
        })
    
    })();
    
    (function() {
        const bar = document.getElementById('scene-bar-size');
        let ispress = false;
        bar.addEventListener('mousedown', function() {
            ispress = true;
        })
        window.addEventListener('mouseup', function() {
            ispress = false;
        })
    
        window.addEventListener('mousemove', function(e) {
            if(!ispress) { return }
    
            layout.setSceneBarWidth(e.x - layout.fileBarWidth);
        })
    
    })();
    
    (function() {
        const bar = document.getElementById('edit-box-size');
        let ispress = false;
        bar.addEventListener('mousedown', function() {
            ispress = true;
        })
        window.addEventListener('mouseup', function() {
            ispress = false;
        })
    
        window.addEventListener('mousemove', function(e) {
            if(!ispress) { return }
    
            layout.setEditBoxWidth(document.body.offsetHeight - e.y);
        })
    
    })();

    (function() {
        const bar = document.getElementById('track-length-control');
        let ispress = false;
        let lastX;
        bar.addEventListener('mousedown', function(e) {
            ispress = true;
            lastX = e.x;
        })
        window.addEventListener('mouseup', function() {
            ispress = false;
        })
    
        window.addEventListener('mousemove', function(e) {
            if(!ispress) { return }
        
            layout.setTrackLength(
                layout.trackLength + (e.x - lastX) * (100 / layout.trackRatio)
            );
            lastX = e.x;
        })
    
    })();


    let isControlPress = false;

    window.addEventListener('keydown', function(e) {
        if(e.key == "Control") {
            isControlPress = true;
        }
        
    });
    window.addEventListener('keyup', function(e) {
        if(e.key == "Control") {
            isControlPress = false;
        }
        
    });

    (function() {
        const box = document.getElementById('track-box');
        box.addEventListener('wheel', function(e) {
            if(isControlPress) {
                let num = layout.trackRatio + (e.deltaY > 0 ? 5 : -5);
                num < 0 ? 0.01 : num;
                layout.setTrackRatio(num);
            }
            else {
                box.scrollLeft += e.deltaY;
            }

            e.preventDefault();
        }, false);
    })();

})  


