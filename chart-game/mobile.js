window.addEventListener('DOMContentLoaded', (event) => {
    const viewport = document.getElementsByName("viewport")[0];
    const minWidth = 1140;
    const mobileWidth = 500;
    let w = 0;
    function setMinimumWidth() {
        if (window.screen.width <= minWidth) {
            w = (window.screen.width <= mobileWidth ? mobileWidth : window.screen.width);
            viewport.setAttribute(
                'content', "width=" + w + ", " + 
                "initial-scale=" + (window.screen.width / w) + ", " + 
                "maximum-scale=" + (window.screen.width / w)
            );
        }
        else {
            viewport.setAttribute('content', "width=device-width, initial-scale=1.0");
        }
    }
    window.addEventListener("resize", setMinimumWidth);
    setMinimumWidth();
})


window.addEventListener('DOMContentLoaded', function () {
    const fixedMenu = document.getElementById('fixed-menu');
    const menuBT = fixedMenu.querySelector('.mobile-menu-bt');
    let isActive = false;

    menuBT.onclick = function() {
        if(!isActive) {
            fixedMenu.classList.add('active');
        }
        else {
            fixedMenu.classList.remove('active');
        }
        isActive = !isActive;
    }
})

window.addEventListener('DOMContentLoaded', function () {
    const mobilePageElements = document.getElementsByClassName('mobile-page');
    const mobilePages = {};
    let lastSelectPage;
    function Page(element) {
        const that = this;
        this.element = element;


        this.select = function() {
            if(typeof lastSelectPage !== 'undefined') {
                lastSelectPage.style.cssText = null;
            }
            that.element.style.zIndex = 1;
            that.element.style.opacity = 1;

            lastSelectPage = that.element;
        }
    }

    for (let i = 0; i < mobilePageElements.length; i++) {
        let name = mobilePageElements[i].getAttribute('data-page-name');
        console.log(name);
        mobilePages[name] = new Page(mobilePageElements[i]);
    }

    mobilePages.main.select();

    let lastSelectMenuPage;
    function selectMenuPage(name, element) {
        mobilePages[name].select();
        if(typeof lastSelectMenuPage !== 'undefined') {
            lastSelectMenuPage.classList.remove('select');
        }
        

        if(typeof element !== 'undefined') {
            element.classList.add('select');
            lastSelectMenuPage = element;
        }
    }

    const mobileBottomMenu = document.getElementById('mobile-bottom-menu');
    mobileBottomMenu.children[0].onclick = function() {
        selectMenuPage('game', this);
    }
    mobileBottomMenu.children[1].onclick = function() {
        selectMenuPage('rank', this);
    }
    mobileBottomMenu.children[2].onclick = function() {
        selectMenuPage('stats', this);
    }
    mobileBottomMenu.children[3].onclick = function() {
        selectMenuPage('my', this);
    }

    const logo = document.querySelector('#fixed-menu .logo');
    logo.onclick = function() {
        selectMenuPage('main');
    }
    const mainGameBt = document.querySelector('header.main .game-bt, header.main .chart-bt');
    mainGameBt.onclick = function() {
        selectMenuPage('game', mobileBottomMenu.children[0]);
    }  
})