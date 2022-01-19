const canvas = document.getElementById('canvas');
const shotList = document.getElementById('shot-list');
const editModeBt = document.getElementById('edit-mode-bt');
const loadingDiv = document.getElementById('loading');
const trackVideo = document.getElementById('track-video');
const editBox = document.getElementById('edit-box');
import * as app from './app.js';
import * as util from './util.js';
import * as comp from './comp.js';

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
    this.setProgress = function(percent) {
        that.progress = percent;
        update();
    }

    this.trackRatio = 500;
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

    this.setLoading = function(flag) {
        if(flag) {
            loadingDiv.classList.add('active');
        }
        else {
            loadingDiv.classList.remove('active');
        }
    }
    this.setLoadingPercent = function(per) {
        that.loadingPercent = per;
        update();
    }

    editModeBt.addEventListener('click', function() {
        that.setViewMain(!that.isViewMain);
    })

    this.lastDragX = 0;
    trackVideo.addEventListener("dragover", function(e) {
        that.lastDragX = e.x - 52 - that.sceneBarWidth - that.fileBarWidth + trackVideo.scrollLeft;
        e.preventDefault();
    }, false);

    this.trackBarPercent = 0;
    this.setTrackBarPercent = function(per) {
        that.trackBarPercent = per;
        update();
    }
  
    function update() {
        style.innerHTML = /*css*/`
            :root {
                --fileBarWidth: ${that.fileBarWidth}px;
                --sceneBarWidth: ${that.sceneBarWidth}px;
                --editBoxHeight: ${that.editBoxHeight}px;
                --progress: ${that.progress}%;
                --trackLength: ${that.trackLength}px;
                --trackRatio: ${that.trackRatio};
                --loadingPercent: ${that.loadingPercent}%;
                --trackBarPercent: ${that.trackBarPercent}%;
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

            app.project.length = util.sec2str(layout.trackLength + (e.x - lastX) * (100 / layout.trackRatio));
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
                let num = layout.trackRatio + (e.deltaY > 0 ? 25 : -25);
                num < 0 ? 0.01 : num;
                layout.setTrackRatio(num);
            }
            else {
                box.scrollLeft += e.deltaY;
            }

            e.preventDefault();
        }, false);
    })();

    (function() {
        const deleteBt = document.getElementById('delete-bt');
        deleteBt.addEventListener('click', del);
        window.addEventListener('keydown', function(e) {
            if(e.code === "Delete") {
                del();
            }
        })
        function del() {
            if(typeof comp.lastClickTrackItem === 'undefined') { return }
            comp.lastClickTrackItem.delete();    
        }
    })();

    (function() {
        const trackBar = document.getElementById('track-bar');
        let ispress = false;
        let lastX;
        trackBar.addEventListener('mousedown', function(e) {
            ispress = true;
            lastX = e.x;
        })
        window.addEventListener('mouseup', function() {
            ispress = false;
        })
    
        window.addEventListener('mousemove', function(e) {
            if(!ispress) { return }
        
            let movement = ((e.x - lastX) / (layout.trackLength * layout.trackRatio / 100)) * 100;
            if(layout.trackBarPercent + movement <= 0) { 
                layout.setTrackBarPercent(0);
                return; 
            }
            if(layout.trackBarPercent + movement >= 100) { 
                layout.setTrackBarPercent(100);
                return; 
            }

            layout.setTrackBarPercent(layout.trackBarPercent + movement);

            lastX = e.x;
        })



    })();

})  