const style = document.createElement('style');
style.innerText = /*css*/`
    .alertMessage {
        position: absolute;
        right: 20px;
        top: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .alertMessage .alertBox {
        opacity: 0;
        position: relative;
        z-index: 99;
        display: flex;
        color: white;
        font-size: 15px;
        transition: all 500ms ease 0s;
        background: #000000a8;
        backdrop-filter: blur(10px);
        padding: 10px 12px 10px 12px;
        line-height: 16px;
        inline-size: max-content;
        border-radius: 10px;
        align-items: center;
    }
    .alertMessage .outter {
        transition: all 500ms ease 0s;
        height: 0px;
        margin-bottom: 5px;
    }
    .alertMessage .closeBt {
        width: 16px;
        height: 16px;
        background: white;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        margin-left: 10px;
        cursor: pointer;
        font-weight: bolder;
    }
`
document.head.appendChild(style)

let lifeTime = 5000;

let messageElement = document.createElement('div');
messageElement.classList.add('alertMessage')
document.body.appendChild(messageElement)


export function print(msg) {
    let div = document.createElement('div');
    let outter = document.createElement('div');
    
    outter.classList.add('outter')
    div.innerText = msg;
    div.classList.add('alertBox')
    outter.appendChild(div)
    div.appendChild((() => {
        let closeBt = document.createElement('div');
        closeBt.classList.add('closeBt');

        closeBt.innerText = 'x';

        closeBt.onclick = () => {
            if(isDeleteStart) { return; }
            isDeleteStart = true;

            clearTimeout(deleteTime);

            deleteMsg();
        }
        return closeBt;
    })())
    messageElement.prepend(outter);
    setTimeout(function() {
        div.style.opacity = '1';
        outter.style.height = `${div.offsetHeight}px`
    }, 10)

    let deleteTime = setTimeout(function() {
        if(isDeleteStart) { return; }
        isDeleteStart = true;
        deleteMsg();
    }, lifeTime)

    let isDeleteStart = false;
    function deleteMsg() {
        div.style.opacity = '0';
        outter.style.height = '0px';

         setTimeout(function() {
            outter.remove();
        }, 500)
    }
}