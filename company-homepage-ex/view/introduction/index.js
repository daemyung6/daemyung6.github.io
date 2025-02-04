const pageList = [
    {
        id: "overview",
        name: "<span class='bold'>OVERVIEW</span>",
        title: "OVERVIEW",
        onView: function () {

        }
    },
    {
        id: "vision",
        name: "<span class='bold'>VISION</span>",
        title: "VISION",
        onView: function () {

        }
    },
    {
        id: "philosophy",
        name: "<span class='bold'>Philosophy</span>",
        title: "Philosophy",
        onView: function () {

        }
    },
    {
        id: "message",
        name: "<span>CEO</span><br /><span class='bold'>메시지</span>",
        title: "CEO Message",
        onView: function () {

        }
    },
    {
        id: "ci",
        name: "<span class='bold'>CI</span>",
        title: "CI",
        onView: function () {

        }
    },
    {
        id: "map",
        name: "<span class='bold'>오시는길</span>",
        title: "오시는길",
        onView: function () {

        }
    },
];



window.addEventListener('DOMContentLoaded', function() {
    const visionBg = document.getElementById('vision-bg');
    window.addEventListener('resize', setSize);

    function setSize() {
        
        visionBg.style.transform = 'scale(' + (
            window.innerWidth > 1430 ? 1 : (window.innerWidth / 1430)
        ) +')';
    }
    setSize();
})