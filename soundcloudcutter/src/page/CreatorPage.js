export default class CreatorPage {
    constructor() {
        this.dom = document.createElement('div');
        this.dom.classList.add('mainPage');
        this.dom.classList.add('creatorPage');
        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = 'CreatorPage';
            return div;
        })())
    }
}
