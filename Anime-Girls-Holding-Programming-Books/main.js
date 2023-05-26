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
                    close.innerText = "X";
                    close.classList.add('close-button');
                    close.onclick = onclose;
                    return close;
                })())
                return viewOut
            })())
        }
    }
})