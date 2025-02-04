const pageList = [
    {
        id: "main",
        name: "<span class='bold'>MAIN</span>",
        title: "MAIN",
        onView: function () {

        }
    },
    {
        id: "about",
        name: "<span>ABOUT</span><br /><span class='bold'>KONDOR</span>",
        title: "ABOUT",
        onView: function () {

        }
    },
    {
        id: "business-areas",
        name: "<span>Business</span><br /><span class='bold'>Area</span>",
        title: "Business Area",
        onView: function () {

        }
    },
    {
        id: "news",
        name: "<span class='bold'>NEWS</span>",
        title: "NEWS",
        onView: function () {

        }
    },
];

// window.addEventListener('DOMContentLoaded', function () {
    

//     const mainPage = document.getElementById("main-page");
//     const scrollDiv = mainPage.getElementsByClassName("scroll")[0];
//     const icons = mainPage.getElementsByClassName("icon");

//     let lastClick = icons[0];
//     for (let i = 0; i < icons.length; i++) {
//         const id = i;
//         icons[id].onclick = function () {
//             lastClick.classList.remove("active");
//             icons[id].classList.add("active");

//             scrollDiv.style.left = "-" + (100 * id) + "%";
//             lastClick = icons[id];
//         }

//     }
// })


window.addEventListener('DOMContentLoaded', function () {
    const mainPage = document.getElementById("business-areas");
    const scrollDiv = mainPage.getElementsByClassName("scroll")[0];
    const icons = mainPage.getElementsByClassName("icon");
    let lastClick = icons[0];
    const leftBt = mainPage.getElementsByClassName("arrow-left-bt")[0];
    const rightBt = mainPage.getElementsByClassName("arrow-right-bt")[0];

    leftBt.onclick = function() {
        selectNum--;
        selectNum = selectNum < 0 ? 0 : selectNum;
        setPosition();
        lastClick.classList.remove("active");
        icons[selectNum].classList.add("active");
        lastClick = icons[selectNum];
    }
    rightBt.onclick = function() {
        selectNum++;
        selectNum = selectNum > (icons.length - 1) ? icons.length - 1 : selectNum;
        setPosition();
        lastClick.classList.remove("active");
        icons[selectNum].classList.add("active");
        lastClick = icons[selectNum];
    }

    const itemWidth = 1140 + 107;
    
    let selectNum = 0;

    for (let i = 0; i < icons.length; i++) {
        const id = i;
        icons[id].onclick = function () {
            lastClick.classList.remove("active");
            icons[id].classList.add("active");
            lastClick = icons[id];
            selectNum = id;
            setPosition();
        }
    }

    function setPosition() {
        let winWidth = window.innerWidth || document.body.clientWidth;
        scrollDiv.style.left = ((winWidth / 2) - (itemWidth / 2) - (itemWidth * selectNum)) + "px";
    }
    window.addEventListener("resize", setPosition);
    setPosition();
})
window.addEventListener('DOMContentLoaded', function () {
    const alliancePopup = document.getElementById("alliance-popup");
    const exitBt = alliancePopup.getElementsByClassName("exit")[0];

    document.getElementById("alliance-bt").onclick = function() {
        alliancePopup.classList.add("active-popup");

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        textareaEl.value = '';
        
    }
    exitBt.onclick = function() {
        alliancePopup.classList.remove("active-popup");
    }

    const inputs = alliancePopup.getElementsByTagName('input');
    const textareaEl = alliancePopup.getElementsByTagName('textarea')[0];


})
window.addEventListener('DOMContentLoaded', function () {
    const newsList = document.getElementById("news-list");

    function block(data) {
        let div = document.createElement("div");
        div.classList.add("item");

        div.appendChild((() => {
            let div = document.createElement("div");
            div.classList.add("art");
            div.setAttribute("style", "background-image: url(" + data.imgUrl + ");");
            return div;
        })());

        div.appendChild((() => {
            let div = document.createElement("div");
            div.classList.add("title-text");
            div.appendChild((() => {
                let a = document.createElement("a");
                a.setAttribute("href", data.url);
                a.setAttribute("target", '_blank');
                a.innerText = data.title;

                return a;
            })());

            return div;
        })());

        div.appendChild((() => {
            let div = document.createElement("div");
            div.classList.add("date");
            div.innerText = data.date;
            return div;
        })());

        return div;
    }

    fetch("api/media?page=0&piece=3", {
        method: "GET"
    })
    .then(json => json.json())
    .then(json => {
        newsList.innerHTML = null;
        for (let i = 0; i < json.length; i++) {
            newsList.appendChild(block(json[i]));
        }
    })
})

window.addEventListener('DOMContentLoaded', function () {
    const applicationbt = document.getElementById('application-bt');
    const alliancePopupDiv = document.getElementById('alliance-popup');
    const inputs = alliancePopupDiv.getElementsByTagName('input');
    const textareaEl = alliancePopupDiv.getElementsByTagName('textarea')[0];

    applicationbt.onclick = function() {
        fetch('./api/application', {
            method: "POST",
            body: JSON.stringify({
                company: inputs[0].value,
                name: inputs[1].value,
                email: inputs[2].value,
                phone: inputs[3].value,
                body: textareaEl.value
            })
        })
        .then(json => json.json())
        .then(json => {
            console.log(json);
            if(json.err) {
                alert(json.msg);
                return;
            }
            if(json.success) {
                alert('등록에 성공 하였습니다.');
                alliancePopupDiv.classList.remove('active-popup');
            }
        })
    }
    
})

