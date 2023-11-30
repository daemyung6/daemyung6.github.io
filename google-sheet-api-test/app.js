window.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('calender-box');

    for (let i = 0; i < 14; i++) {
        let line = document.createElement('div');
        line.classList.add('line');

        for (let j = 0; j < 8; j++) {
            let item = document.createElement('div');
            item.classList.add('item');

            if(i === 0) {
                item.classList.add('header');
            }
            if(j === 0) {
                item.classList.add('header');
            }

            line.appendChild(item)
        }

        box.appendChild(line)
    }
})

window.addEventListener('DOMContentLoaded', function() {
    let style = document.createElement('style');
    document.head.appendChild(style);

    const mainDiv = document.getElementById('main');

    function update() {
        style.innerText = `:root { --main-width: ${mainDiv.offsetWidth}px; }`;
    }
    update();

    window.addEventListener('resize', function() {
        update();
    })
})


function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
function initClient() {
    const box = document.getElementById('calender-box');
    const CLIENT_ID = '988055380111-davuia92msoc73t8pc8n90ofd5a6mtjc.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyAtBo4MzNab3FYOI3E7VHdjw6m6fjrsK5s';


    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

    const docID = '12QJPl-f5Bo93QUs264t3ojUpz8CjmhaL5Eu7gX0yXL0'

    /**
     *  On load, called to load the auth2 library and API client library.
     */

    console.log(gapi)

    console.log('')

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
    .then(function () {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: docID,
            range: 'main',
        })
    })
    .then(data => {
        console.log(data)
        const values = data.result.values;

        let style = document.createElement('style');
        document.head.appendChild(style);

        style.innerText = /* css */`
            :root {
                --table-width: ${values[0].length};
            }
        `
        
        box.innerHTML = null
        
        for (let i = 0; i < values.length; i++) {
            let line = document.createElement('div');
            line.classList.add('line');
    
            for (let j = 0; j < values[i].length; j++) {
                let item = document.createElement('div');
                item.classList.add('item');
    
                if(i === 0) {
                    item.classList.add('header');
                }
                if(j === 0) {
                    item.classList.add('header');
                }

                item.innerText = values[i][j]
    
                line.appendChild(item)
            }
    
            box.appendChild(line)
        }
    })
    .catch(e => {
        console.log('error', e)
    }) 
    
}

