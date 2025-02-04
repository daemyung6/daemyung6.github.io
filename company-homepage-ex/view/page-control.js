window.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("top-arrow").onclick = function() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    const pageControl = document.createElement("div");
    pageControl.setAttribute("id", 'page-control');
    document.body.appendChild(pageControl);

    let lastTime = new Date() - 1000;

    let pages = {};
    const io = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].intersectionRatio !== 0) {
                view(entries[i].target.classList[1], false);
                return;
            }
        }
    }, {
        rootMargin: "-50px -50px -50px -50px",
        threshold: 0
    });
    function Page(id, i, name, title, onView) {
        this.num = i;
        this.title = title;

        let element = document.getElementsByClassName(id)[0];
        io.observe(element);
        this.element = element;
        this.name = name;
        this.view = function () {
            onView(element);
            if(typeof lastClickpagebt !== 'undefined') {
                lastClickpagebt.classList.remove("active");
            }
            controlBt.element.classList.add("active");
            lastClickpagebt = controlBt.element;
        }
        let controlBt = new pageControlBt(id, name);
        this.bt = controlBt.element;

        pageControl.appendChild(controlBt.element);
    }
    

    let lastClickpagebt;
    function pageControlBt(id, name) {
        const icon = document.createElement("div");
        icon.classList.add("icon");

        icon.appendChild((function() {
            let nameDiv = document.createElement("div");
            nameDiv.classList.add("name");
            nameDiv.innerHTML = name;
            return nameDiv
        })())
        icon.appendChild((function() {
            let dotDiv = document.createElement("div");
            dotDiv.classList.add("dot");
            return dotDiv
        })())

        this.element = icon;
        
        icon.onclick = function() {
            view(id, true);
        }

    }

    for (let i = 0; i < pageList.length; i++) {
        pages[pageList[i].id] = new Page(pageList[i].id, i, pageList[i].name, pageList[i].title, pageList[i].onView);
        
    }

    function view(id, flag) {
        history.pushState({}, "", "#" + id);
        document.title = "KONDOR - " + pages[id].title;
        pages[id].view();
        function move() {
            window.scroll({
                top: pages[id].element.offsetTop,
                behavior: 'smooth'
            });
        }
        if (flag) {
            move();
            return;
        }
    }

    const viewBts = document.getElementsByClassName("view-bt");
    for (let i = 0; i < viewBts.length; i++) {
        viewBts[i].onclick = function () {
            view(this.getAttribute("data-page"), true);
        }
    }

    window.scroll(0, 0);

    if (location.toString().indexOf("#") != -1) {
        var urlQury = location.toString().split("#")[1].split(".");
        view(urlQury[0], true);
    }
    else {
        view('main', true);
    }

    
});