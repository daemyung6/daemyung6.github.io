const innerDiv = document.getElementsByClassName("inner")[0];

const nextbt = document.getElementsByClassName("menu-next")[0];
const prevbt = document.getElementsByClassName("menu-prev")[0];


let menuCount = 0;
nextbt.onclick = function() {
    if(menuCount == 5) { return }
    ++menuCount;
    innerDiv.style.left =  `calc(-1 * (${menuCount * 100}%))`
}
prevbt.onclick = function() {
    if(menuCount == 0) { return }
    --menuCount;
    innerDiv.style.left =  `calc(-1 * (${menuCount * 100}%))`
}
