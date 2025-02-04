window.addEventListener('DOMContentLoaded', function () {
    fetch('./api/popup?display=true', {
        method: "GET"
    })
    .then(json => json.json())
    .then(json => {
        let cookie = document.cookie;
        cookie = cookie.split('; ');
        for (let i = 0; i < json.length; i++) {
            const ID = i;
            let isVisible = true;
            for (let i = 0; i < cookie.length; i++) {
                if(
                    (cookie[i].split('=')[0] === `popup-${json[ID].id}-exp`) &&
                    (Number(cookie[i].split('=')[1]) > (new Date().getTime()))
                ) {
                    isVisible = false;
                }  
            }

            if(isVisible === false) { continue }
        
            let div = document.createElement('div');
            div.style.opacity = 0;
            setTimeout(function() {
                div.style.opacity = 1;
            }, 500 + 500 * ID)
            let checkbox;
            let closeBt;
            div.classList.add('alert-popup');
            div.appendChild((function() {
                let div = document.createElement('div');
                div.classList.add('outter');
                div.appendChild((function() {
                    let img = document.createElement('img');
                    img.classList.add('title');
                    img.src = json[ID].img_url;
                    return img;
                })());
                div.appendChild((function() {
                    let div = document.createElement('div');
                    div.classList.add('popup-control');
                    div.appendChild((function() {
                        let div = document.createElement('div');
                        div.classList.add('week-bt');
                        div.appendChild((function() {
                            checkbox = document.createElement('input');
                            checkbox.setAttribute('type', 'checkbox');
                            return checkbox;
                        })());
                        div.appendChild((function() {
                            let span = document.createElement('span');
                            span.innerText = '일주일간 보지 않기';
                            return span;
                        })());
                        return div;
                    })());

                    div.appendChild((function() {
                        closeBt = document.createElement('div');
                        closeBt.classList.add('close-bt');
                        closeBt.innerText = '닫기';
                        return closeBt;
                    })());

                    return div;
                })());
                return div;
            })());


            closeBt.onclick = function() {
                div.style.opacity = 0;
                div.style.zIndex = -1;
                if(checkbox.checked) {
                    document.cookie = `popup-${json[ID].id}-exp=` + ((new Date()).getTime() + (1000 * 60 * 60 * 24 * 7));
                }
            }

            document.body.appendChild(div);
        }
    })
})