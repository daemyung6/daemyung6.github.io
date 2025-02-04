window.addEventListener('DOMContentLoaded', function () {
    const tableDiv = document.getElementById("table");
    function Block(data) {
        let div = document.createElement("div");
        div.classList.add("block");

        div.onclick = function() {
            popup(data);
        }

        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("img");
            div.appendChild((function() {
                let img = document.createElement("img");
                img.setAttribute("src", data.imgUrl);
                return img;
            })());
            return div;
        })());

        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("description");
            div.appendChild((function() {
                let a = document.createElement('a');
                a.appendChild((function() {
                    let div = document.createElement("div");
                    div.classList.add("title");
                    div.innerText = data.title;
                    return div;
                })())
                return a;
            })());

            div.appendChild((function() {
                let div = document.createElement("div");
                div.classList.add("date");
                div.innerText = data.date;

                return div;
            })());

            div.appendChild((function() {
                let div = document.createElement("div");
                div.classList.add("text")
                div.innerText = data.description;
                return div;
            })());

            div.appendChild((function() {
                let div = document.createElement("div");
                div.classList.add("last")
                return div;
            })());
            return div;
        })());

        return div;
    }

    fetch("./api/media", {
        method: "GET"
    })
    .then(json => json.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            tableDiv.appendChild(Block(json[i]));
        }
    })

    const popupDiv = document.getElementById("popup");
    const listDiv = document.getElementById("list");
    const slider = document.getElementById("slider");
    const closeBt = document.getElementById("close-bt");
    closeBt.onclick = function() {
        popupDiv.classList.remove("active");
    }
    
    document.getElementById("arrow-left").onclick = function() {
        slider.scrollTo({
            left: slider.scrollLeft - 900,
            behavior: 'smooth',
        })
    }
    document.getElementById("arrow-right").onclick = function() {
        slider.scrollTo({
            left: slider.scrollLeft + 900,
            behavior: 'smooth',
        })
    }

    function popup(data) {
        slider.scrollTo({
            left: 0,
        })
        popupDiv.classList.add("active");
        popupDiv.getElementsByClassName("title")[0]
        .innerText = data.title;

        popupDiv.getElementsByClassName("link")[0]
        .setAttribute('href', data.url);

        popupDiv.getElementsByClassName("date")[0]
        .innerText = data.date;

        popupDiv.getElementsByClassName("slider")[0]
        .innerHTML = null;

        function img(url) {
            let img = document.createElement("img");
            img.setAttribute("src", url);
            return img;
        }

        popupDiv.getElementsByClassName("slider")[0].appendChild(img(data.imgUrl));

        for (let i = 0; i < data.detail.length; i++) {
            popupDiv.getElementsByClassName("slider")[0].appendChild(img(data.detail[i].imgUrl));
        }

        popupDiv.getElementsByClassName("description")[0]
        .innerText = data.description;
    }
})