import * as ErrorMsg from "../ErrorMsg.js";

export default class Layer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotate = 0;
        this.isVisible = true;

        this.elements = {};
        this.events = [];

        this.dom = document.createElement('div');
        this.dom.classList.add('layer');

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('layer-num-bt');
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('num-bt');
                div.innerText = '⬆';
                this.elements.up = div;
                div.addEventListener('click', () => {
                    this.onClick('layerUp')
                })
                return div;
            })())
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('num-bt');
                div.innerText = '⬇';
                this.elements.down = div;
                div.addEventListener('click', () => {
                    this.onClick('layerDown')
                })
                return div;
            })())
            return div;
        })())
        
        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('visible');
            div.classList.add('active');

            this.elements.visible = div;

            div.addEventListener('click', () => {
                this.isVisible = !this.isVisible;
                if(this.isVisible) {
                    div.classList.add('active');
                }
                else {
                    div.classList.remove('active');
                }
                this.onClick('update');
            })
            
            div.appendChild((() => {
                let img = document.createElement('img');
                img.src = './asset/img/visibility.png';
                
                return img;
            })())

            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('flag');
                return div;
            })())

            return div;
        })())

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('line');
            this.elements.line = div;
            return div;
        })())

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('delete');

            this.elements.delete = div;

            div.appendChild((() => {
                let img = document.createElement('img');
                img.src = './asset/img/bin.png';
                
                return img;
            })())

            div.addEventListener('click', () => {
                if(confirm(ErrorMsg.set['layer-delete-msg'][ErrorMsg.num])) {
                    this.onClick('layerDelete')
                }
            })

            return div;
        })())
    }

    /**
     * 
     * @param {'layerUp' | 'layerDown' | 'layerDelete'} type 
     * @param {Function} callback 
     */
    addEvent(type, callback) {
        this.events.push({
            type: type,
            callback: callback
        })
    }

    /**
     * 
     *  @param {'layerUp' | 'layerDown' | 'layerDelete' | 'update'} type 
     */
    onClick(type) {
        for (let i = 0; i < this.events.length; i++) {
            if((this.events[i].type === type) || (this.events[i].type === '*')) {
                requestAnimationFrame(() => {
                    this.events[i].callback();
                })
            }
        }
    }
}
