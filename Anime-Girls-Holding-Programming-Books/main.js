document.addEventListener('DOMContentLoaded', function() {
    const menuDiv = document.getElementById('menu');
    const listDiv = document.getElementById('list');
    const apiHost = 'https://api.github.com';
    const owner = 'cat-milk';
    const repo = 'Anime-Girls-Holding-Programming-Books';
    const key = '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';
    
    
    function getTree() {
        fetch(`${apiHost}/repos/${owner}/${repo}/branches/master`, {
            method: 'GET',
            headers: {
                Authorization: key
            }
        })
        .then(json => json.json())
        .then(json => {
            return fetch(`${apiHost}/repos/${owner}/${repo}/git/trees/${json.commit.sha}`, {
                method: 'GET',
                headers: {
                    Authorization: key
                }
            })
        })
        .then(json => json.json())
        .then(json => {
            for (let i = 0; i < json.tree.length; i++) {
                if(json.tree[i].type !== 'tree') { continue }
                menuDiv.appendChild(menuItem(json.tree[i]));
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
                    imgload(json.tree[i].url)
                }
            })
        }

        return div;
    }
    
    function imgload(url) {
        fetch(url, {
            method: 'GET'
        })
        .then(json => json.json())
        .then(json => {
            const img = new Image();
            img.onload = function() {
                listDiv.appendChild(img);
                setTimeout(function() {
                    img.style.opacity = 1;
                }, 100)
                listDiv.appendChild((function() {
                    let br = document.createElement('br');
                    return br;
                })())
            }
            img.src = 'data:image/png;base64,' + json.content;
        })
    }
})