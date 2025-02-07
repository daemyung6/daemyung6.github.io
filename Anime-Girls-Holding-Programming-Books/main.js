document.addEventListener('DOMContentLoaded', function() {
    const menuDiv = document.getElementById('menu');
    const listDiv = document.getElementById('list');
    const apiHost = 'https://api.github.com';
    const owner = 'cat-milk';
    const repo = 'Anime-Girls-Holding-Programming-Books';
    const key = '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';
    const rawHost = 'https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master'
    
    
    function getTree() {
        let status = '';
        fetch(`${apiHost}/repos/${owner}/${repo}/branches/master`, {
            method: 'GET',
            headers: {
                Authorization: key
            }
        })
        .then(json => {
            status = json.statusText;
            return json.json();
        })
        .then(json => {
            if(
                (status[0] !== '2') &&
                (typeof json.message === 'string')
            ) {
                onError(json.message);
                return {then: function() {}}
            }
            return fetch(`${apiHost}/repos/${owner}/${repo}/git/trees/${json.commit.sha}`, {
                method: 'GET',
                headers: {
                    Authorization: key
                }
            })
        })
        .then(json => {
            status = json.statusText;
            return json.json();
        })
        .then(json => {
            if(
                (status[0] !== '2') &&
                (typeof json.message === 'string')
            ) {
                onError(json.message);
                return {then: function() {}}
            }

            for (let i = 0; i < json.tree.length; i++) {
                if(json.tree[i].type !== 'tree') { continue }
                menuDiv.appendChild(menuItem(json.tree[i]));
            }
        })
        .catch(function() {
            onError();
        })

        function onError(msg) {
            if(msg === undefined) { msg = '' };
            listDiv.appendChild((function() {
                let div = document.createElement('div');
                div.classList.add('desc');
                div.innerText = 'api 요청의 한도가 초과 되었습니다. 😥\n' + msg
                return div;
            })())
        }
    }
    getTree();

    let lastClickMenu;
    function menuItem(data) {
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerText = data.path;

        div.onclick = function() {
            if(typeof lastClickMenu !== 'undefined') {
                lastClickMenu.classList.remove('active');
            }
            lastClickMenu = div;
            div.classList.add('active');


            listDiv.innerHTML = null;
            fetch(data.url, {
                method: 'GET',
                headers: {
                    Authorization: key
                }}
            )
            .then(json => json.json())
            .then(json => {
                for (let i = 0; i < json.tree.length; i++) {
                    imgload(json.tree[i].path, data.path)
                }
            })
            .catch(function() {
                listDiv.appendChild((function() {
                    let div = document.createElement('div');
                    div.classList.add('desc');
                    div.innerText = 'api 요청의 한도가 초과 되었습니다. 😥'
                    return div;
                })())
            })
        }

        return div;
    }
    
    function imgload(file, dir) {
        const img = document.createElement('img');
        img.onload = function() {
            listDiv.appendChild(img);
            setTimeout(function() {
                img.style.opacity = 1;
            }, 100)
        }
        img.src = `${rawHost}/${encodeURIComponent(dir)}/${encodeURIComponent(file)}`;
        img.onclick = function() {
            document.body.appendChild((function() {
                function onclose() {
                    document.body.removeChild(viewOut);
                }
                let viewOut = document.createElement('div');
                viewOut.classList.add('viewOut');

                viewOut.appendChild((function() {
                    let img = document.createElement('img');
                    img.src = `${rawHost}/${encodeURIComponent(dir)}/${encodeURIComponent(file)}`;
                    img.classList.add('item');
                    return img
                })())
                viewOut.appendChild((function() {
                    let close = document.createElement('div');
                    close.innerHTML = /*svg*/`
                        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"/>
                        </svg>
                    `
                    close.classList.add('close-button');
                    close.onclick = onclose;
                    return close;
                })())

                let linkStr = `https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/tree/master/${encodeURIComponent(dir)}/${encodeURIComponent(file)}`;

                viewOut.appendChild((function() {
                    let div = document.createElement('div')
                    div.classList.add('description')

                    div.appendChild((() => {
                        let a = document.createElement('a')
                        a.href = linkStr
                        a.target = '_blank'
                        a.innerText = linkStr
                        return a
                    })())

                    return div
                })())

                return viewOut
            })())
        }
    }
})