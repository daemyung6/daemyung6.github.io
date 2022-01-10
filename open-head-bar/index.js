window.addEventListener("DOMContentLoaded", function() {
    const headerElement = document.getElementsByTagName("header")[0];
    const items = headerElement.getElementsByClassName("item");
    const detailBoxs = document.getElementsByClassName("detail-box");

    let lastClickdetailBox = detailBoxs[0];

    for (let i = 0; i < items.length; i++) {
        const id = i;
        items[id].onclick = function() {
            lastClickdetailBox.classList.remove("active");
            detailBoxs[id].classList.add("active");
            lastClickdetailBox = detailBoxs[id];
        }
        detailBoxs[id].getElementsByClassName("close-bt")[0].onclick = function() {
            detailBoxs[id].classList.remove("active");
            isClick = false
        }
    }
});