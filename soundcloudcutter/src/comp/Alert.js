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