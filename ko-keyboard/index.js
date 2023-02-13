window.addEventListener('DOMContentLoaded', function() {
    var keyboardzone = document.getElementById("keyboardzone");
    
    const keyboard = new customKeyboard(
        keyboardzone,
        null,
        function () {},
        function () {},
        function () {},
    );

    let inputElements = document.getElementsByTagName('input');
    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener("click", function () {
            keyboard.setInput(inputElements[i]);
        })
    }
})
