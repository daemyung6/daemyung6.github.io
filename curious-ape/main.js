window.addEventListener('DOMContentLoaded', (event) => {
    let lastPos = window.scrollY;
    let scrollList = [];
    window.addEventListener('scroll', function(e) {
        for (let i = 0; i < scrollList.length; i++) {
            let value = scrollList[i][0][0];

            if(
                (
                    (scrollList[i][1] === 'up') &&
                    (
                        (lastPos >= value) &&
                        (value >= window.scrollY)
                    )
                ) ||
                (
                    (scrollList[i][1] === 'down') &&
                    (
                        (lastPos <= value) &&
                        (value <= window.scrollY)
                    )
                ) ||
                (
                    (scrollList[i][1] === '*') &&
                    (
                        (
                            (lastPos >= value) &&
                            (value >= window.scrollY)
                        ) ||
                        (
                            (lastPos <= value) &&
                            (value <= window.scrollY)
                        )
                    )
                )
            ) {
                scrollList[i][2]();
            }
        }
        lastPos = window.scrollY;
    })

    ;(function() {
        const main = document.getElementById('main');
        function mainAnime() {
            main.getElementsByClassName('house')[0].classList.remove('animation');
            main.getElementsByClassName('back')[0].classList.remove('animation');
    
            setTimeout(function() {
                main.getElementsByClassName('house')[0]
                .classList.add('animation');
            }, 500)
            setTimeout(function() {
                main.getElementsByClassName('back')[0]
                .classList.add('animation');
            }, 600)
        }
        mainAnime()
    
        scrollList.push([[500, 0], 'up', function() {
            mainAnime();
        }])
    })();

    ;(function() {
        const main = document.getElementById('story');
        function mainAnime() {
            for (let i = 0; i < main.getElementsByClassName('item').length; i++) {
                main.getElementsByClassName('item')[i].classList.remove('animation');

                setTimeout(function() {
                    main.getElementsByClassName('item')[i].classList.add('animation');
                }, 500 + 100 * i)
            }
        }
    
        scrollList.push([[500, 0], 'down', function() {
            mainAnime();
        }])
    })();

    ;(function() {
        const main = document.getElementById('roadmap');
        function mainAnime() {
            for (let i = 0; i < main.getElementsByClassName('item').length; i++) {
                main.getElementsByClassName('item')[i].classList.remove('animation');

                setTimeout(function() {
                    main.getElementsByClassName('item')[i].classList.add('animation');
                }, 500 + 200 * i)
            }
        }
    
        scrollList.push([[2400, 0], 'down', function() {
            mainAnime();
        }])
    })();

    ;(function() {
        const main = document.getElementById('tag');
        function mainAnime() {
            for (let i = 0; i < main.getElementsByClassName('item').length; i++) {
                main.getElementsByClassName('item')[i].classList.remove('animation');

                setTimeout(function() {
                    main.getElementsByClassName('item')[i].classList.add('animation');
                }, 500 + 200 * i)
            }
        }
    
        scrollList.push([[4000, 0], 'down', function() {
            mainAnime();
        }])
    })();
    
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 200)
});