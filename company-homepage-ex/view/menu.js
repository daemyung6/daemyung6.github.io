window.addEventListener('DOMContentLoaded', function () {
    const langMenu= document.getElementById("lang-menu");
    let isClick = false;
    langMenu.onclick = function() {
        if(!isClick) {
            langMenu.classList.add("active");
        }
        else {
            langMenu.classList.remove("active");
        }
        isClick = !isClick
    }
})


window.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const menu = header.getElementsByClassName('menu')[0];
    const menuItems = menu.getElementsByClassName('item');

    for (let i = 0; i < menuItems.length; i++) {
        let mobileBt = menuItems[i].getElementsByClassName('mobile-bt')[0];
        if(typeof mobileBt === 'undefined') { continue }

        const id = i;
        let isClick = false;
        mobileBt.onclick = function() {
            if(!isClick) {
                menuItems[id].classList.add('active');
            }
            else {
                menuItems[id].classList.remove('active');
            }

            isClick = !isClick;
        }
    }

    const mobileMenu = document.getElementById('mobile-menu');
    let ismobileMenuClick = false;
    mobileMenu.onclick = function() {
        if(!ismobileMenuClick) {
            mobileMenu.classList.add('active');
            menu.classList.add('active');
        }
        else {
            mobileMenu.classList.remove('active');
            menu.classList.remove('active');
        }
        ismobileMenuClick = !ismobileMenuClick;
    }

    const childrenMenu = header.getElementsByClassName('children-menu');
    for (let i = 0; i < childrenMenu.length; i++) {
        const id = i;
        childrenMenu[id].onclick = function() {

            mobileMenu.classList.remove('active');
            menu.classList.remove('active');
            ismobileMenuClick = false;
        }
        
    }

})