;(function() { 
    const viewport = document.getElementsByName("viewport")[0];
    function setMinimumWidth() {
        if(window.screen.width <= 750) {
            viewport.setAttribute('content', "width=375, initial-scale=" + (window.screen.width / 375));
        }
        else {
            viewport.setAttribute('content', "width=device-width, initial-scale=1.0");
        }
    }
    window.addEventListener("resize", setMinimumWidth);
    setMinimumWidth();
})();