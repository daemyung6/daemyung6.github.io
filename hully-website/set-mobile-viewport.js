;(function() { 
    const viewport = document.getElementsByName("viewport")[0];
    const page = document.getElementById("page");
    
    function setMinimumWidth() {
        if(window.screen.width <= 750) {
            viewport.setAttribute('content', "width=750, height=" + window.screen.height + ", initial-scale=" + (window.screen.width / 750));
        }
        else {
            viewport.setAttribute('content', "width=device-width, initial-scale=1.0");
        }
    }
    window.addEventListener("resize", setMinimumWidth);
    setMinimumWidth();
})();