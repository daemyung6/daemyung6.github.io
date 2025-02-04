const pageList = [
    {
        id: "business-structure",
        name: "<span class='bold'>인재채용</span><br />",
        title: "business-structure",
        onView: function () {

        }
    },
    {
        id: "hr-vision",
        name: "<span>HR</span><br /><span class='bold'>Vision</span>",
        title: "HR Vision",
        onView: function () {

        }
    },
    {
        id: "process",
        name: "<span class='bold'>채용절차</span>",
        title: "채용절차",
        onView: function () {

        }
    },
    {
        id: "performance-management",
        name: "<span class='bold'>채용공고</span>",
        title: "performance Management",
        onView: function () {

        }
    },
];

window.addEventListener('DOMContentLoaded', function () {
    const tableDiv = document.getElementById("table");

    const progressBt = document.getElementById("progress-bt");
    const doneBt = document.getElementById("done-bt");
    const searchBt = document.getElementById("search-bt");
    const keywordInput = document.getElementById("keywordInput");

    let isProgress = true;

    searchBt.onclick = function() {
        tableDiv.innerHTML = null;
        tableDiv.appendChild(Row('모집부문', '모집인원', '근무형태', '모집마감', '진행상황'));
        tableDiv.appendChild(Row('-', '-', '-', '-', '-'));

        fetch('./api/careers?progress=' + (isProgress ? 'inprogress' : 'done') + '&keyword=' + keywordInput.value, {
            method : "GET"
        })
        .then(json => json.json())
        .then(json => {
            tableRender(json)
        })
        .catch(e => {
            console.log(e);
        });
    }

    progressBt.onclick = function() {
        isProgress = true;
        progressBt.classList.add("active");
        doneBt.classList.remove("active");
        tableDiv.innerHTML = null;
        tableDiv.appendChild(Row('모집부문', '모집인원', '근무형태', '모집마감', '진행상황'));
        tableDiv.appendChild(Row('-', '-', '-', '-', '-'));
        fetch('./api/careers?progress=inprogress', {
            method : "GET"
        })
        .then(json => json.json())
        .then(json => {
            tableRender(json)
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    doneBt.onclick = function() {
        isProgress = false;
        progressBt.classList.remove("active");
        doneBt.classList.add("active");
        fetch('./api/careers?progress=done', {
            method : "GET"
        })
        .then(json => json.json())
        .then(json => {
            tableRender(json);
        })
        .catch(e => {
            console.log(e);
        });
    }


    function tableRender(json, type) {
        if(json.err) {
            alert(json.msg);
            return;
        }
        console.log(json);

        tableDiv.innerHTML = null;
        tableDiv.appendChild(Row('모집부문', '모집인원', '근무형태', '모집마감', '진행상황'));
        for (let i = 0; i < json.length; i++) {
            tableDiv.appendChild(
                Row(
                    json[i].name, 
                    json[i].recruitment, 
                    json[i].work_type,
                    json[i].deadline,
                    isProgress ? json[i].progress : '완료'
                )
            );
        }
    }

    function Row(name, recruitment, work_type, deadline, progress) {
        let div = document.createElement("div");
        div.classList.add('row');
        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("colume1");
            div.innerText = name;
            return div;
        })());
        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("colume2");
            div.innerText = recruitment;
            return div;
        })());
        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("colume3");
            div.innerText = work_type;
            return div;
        })());
        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("colume4");
            div.innerText = deadline;
            return div;
        })());
        div.appendChild((function() {
            let div = document.createElement("div");
            div.classList.add("colume5");
            div.innerText = progress;
            return div;
        })());

        return div;
    }

    progressBt.onclick();
})