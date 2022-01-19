export function setOnEnd(func) {
    onEnd = func;
}
export function setOnProgress(func) {
    onProgress = func;
}

function onEnd() { }
function onProgress() { }

let isWorking = false;
let workList = [];
export function add(video, time, callback) {
    workList.push({
        video, time, callback
    })
    if(!isWorking) {
        work(indexNum);
        ++indexNum;
        isWorking = true;
    }
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let indexNum = 0;
function work(indexNum) {
    let {video, time, callback} = workList[indexNum];

    video.onseeked = function(e) {
        done();
        video.onseeked = undefined;
    }
    function done() {
        canvas.width = video.videoWidth / 4;
        canvas.height = video.videoHeight / 4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        let dataURL = canvas.toDataURL();
        callback(dataURL);
        indexNum++;
        if(workList.length !== indexNum) {
            onProgress(indexNum / workList.length);
            setTimeout(() => {
                if(!isWorking) { return; }
                work(indexNum);
            }, 10);
        }
        else {
            workDone();
            onEnd();
        }
    }
    
    video.currentTime = time <= 0 ? 0.01 : time;
}
function workDone() {
    isWorking = false;
    workList = [];
    indexNum = 0;
}