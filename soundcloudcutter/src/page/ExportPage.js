export default class ExportPage {
    constructor() {
        this.dom = document.createElement('div');
        this.dom.classList.add('mainPage');
        this.dom.classList.add('exportPage');

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = 'ExportPage';
            return div;
        })())
    }
}
