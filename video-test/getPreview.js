let workList = [];

let isWorking = false;
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
            setTimeout(() => {
                work(indexNum);
            }, 0);
        }
        else {
            isWorking = false;
        }
    }
    
    video.currentTime = time <= 0 ? 0.01 : time;
}