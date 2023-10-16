import * as Alert from './Alert.js';

const mainDiv = document.createElement('div');
mainDiv.classList.add('main');
document.body.appendChild(mainDiv)

let setting = document.createElement('div');


setting.classList.add('setting')
setting.appendChild((() => {
    return document.createTextNode('camera: ');
})())

let select = document.createElement('select');
select.addEventListener('change', () => {
    getSteam( deviceDatas[Number(setting.value)].deviceId);
})
setting.appendChild(select)
setting.appendChild((() => {
    return document.createElement('br');
})())


const width = 1920;
const height = 1080;
//rgb
const colormargins = [30, 100, 30];
const greenColors = [0, 0, 0] 


for (let i = 0; i < colormargins.length; i++) {
    setting.appendChild((() => {
        const id = i;
        let input = document.createElement('input');
        input.setAttribute('type', 'range')
        input.setAttribute('max', '255')
        input.setAttribute('min', '0')

        input.value = colormargins[i]
    
        input.addEventListener('change', () => {
            colormargins[id] = Number(input.value)
            console.log(colormargins)
        })
        
        return input;
    })())
    setting.appendChild((() => {
        return document.createElement('br');
    })())
    
}


// const gif = document.createElement('img')
// gif.src = './1.gif';
// document.body.appendChild(gif);

const gif = document.createElement('video')
window.gif = gif;
function getGifCenterColor() {
    const canvas = document.createElement('canvas')
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(gif, 0, 0)
    
    let center = ctx.getImageData(width / 2, height / 2, 1, 1);

    if(
        (center.data[0] === 0) &&
        (center.data[1] === 0) &&
        (center.data[2] === 0)
    ) {
        setTimeout(() => {
            getGifCenterColor();
        }, 1000)
        return;
    }

    greenColors[0] = center.data[0]
    greenColors[1] = center.data[1]
    greenColors[2] = center.data[2]

    console.log('set green color: ', greenColors)
}
getGifCenterColor();
gif.setAttribute('loop', '');
gif.setAttribute('muted', '');
gif.setAttribute('autoplay', '');
gif.src = './vid.mp4';


const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'copy';
mainDiv.appendChild(canvas);

const camVideo = document.createElement('video');
camVideo.width = width;
camVideo.height = height;
camVideo.setAttribute('autoplay', '');


mainDiv.appendChild(setting)


window.addEventListener('DOMContentLoaded', () => {
    init()
})

let isDraw = false;
function init() {
    if(!isDraw) {
        draw();
        isDraw = true;
    }
    
    select.innerHTML = null
    getDevice();
    getSteam();
    gif.play()
}



let deviceDatas = [];
let isPermission = true;
function getDevice() {
    try {
        deviceDatas = [];
        navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            let count = 0;
            for (let i = 0; i < devices.length; i++) {
                console.log(devices[i])
                
                if(devices[i].kind !== 'videoinput') {
                    continue;
                }
                if(devices[i].deviceId.length === 0) {
                    isPermission = false;
                    console.log('isPermission', isPermission)
                    return;
                }

                deviceDatas.push(devices[i])

                select.appendChild((() => {
                    let option = document.createElement('option');
                    option.innerText = devices[i].label;
                    option.value = count
                    count++;
                    return option;
                })())
            }
        })
        .catch((e) => {
            console.log(e)
            Alert.print('장치목록을 가져오지 못했습니다.')
        });
    } catch (error) {
        console.log(error)
        Alert.print('장치목록을 가져오지 못했습니다.')
    }
}
let isSetSteam = false;
function getSteam(deviceId) {
    const option = {
        width : width,
        height : height
    }

    if(typeof deviceId === 'string') {
        option.deviceId = deviceId;
    }

    navigator.getUserMedia({
        video: option
    }, function(stream) {
        console.log('getUserMedia')
        if(!isPermission) {
            init();
            isPermission = true;
            return;
        }

        isSetSteam = true;
        camVideo.srcObject = stream;
    }, function(e) {
        console.log(e);
        Alert.print(e);
    });
}


function draw() {
    ctx.drawImage(gif, 0, 0)
    let imgdata = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    if(!camVideo.paused) {
        ctx.drawImage(camVideo, 0, 0)
        let videoImageData = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);
    
        for (let i = 0; i < width * height * 4; i += 4) {
            if(
                ((greenColors[0] - colormargins[0]) <= imgdata.data[i + 0] ) &&
                (imgdata.data[i + 0] <= (greenColors[0] + colormargins[0]) ) &&
    
                ((greenColors[1] - colormargins[1]) <= imgdata.data[i + 1] ) &&
                (imgdata.data[i + 1] <= (greenColors[1] + colormargins[1]) ) &&
    
                ((greenColors[2] - colormargins[2]) <= imgdata.data[i + 2] ) &&
                (imgdata.data[i + 2] <= (greenColors[2] + colormargins[2]) )
            ) {
                imgdata.data[i + 0] = videoImageData.data[i + 0]
                imgdata.data[i + 1] = videoImageData.data[i + 1]
                imgdata.data[i + 2] = videoImageData.data[i + 2]
            }
        }
    }
    

    ctx.putImageData(imgdata, 0, 0)

    requestAnimationFrame(draw);
}
window.draw = draw;