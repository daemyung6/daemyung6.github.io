
export default class ColorValue {
    constructor(name, unit) {
        this.elements = {};
        this.events = [];
        this.value = '#ffffff';

        let div = document.createElement('div');
        div.classList.add('input-item');
        div.classList.add('color');

        div.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = `${name} : `

            return div;
        })())
        div.appendChild((() => {
            let input = document.createElement('input');
            input.value = this.value;
            input.classList.add('color-text')

            input.addEventListener('change', (e) => {
                this.setValue(input.value);
            })
            
            this.elements.label = input;
            input.value = this.value;
            
            return input;
        })())

        div.appendChild((() => {
            let input = document.createElement('input');
            input.setAttribute('type', 'color')
            this.elements.input = input;
            input.classList.add('color-pick');

            input.addEventListener('change', (e) => {
                this.setValue(input.value);
            })

            input.value = this.value;
            return input;
        })())

        this.dom = div
    }
    /**
     * 
     * @param {'*'} type 
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
     * @param {string} color 
     */
    setValue(color) {
        this.value = color;
        this.elements.input.value = color;
        this.elements.label.value = color;

        this.onClick();
    }

    onClick() {
        for (let i = 0; i < this.events.length; i++) {
            requestAnimationFrame(() => {
                this.events[i].callback();
            })
        }
    }
}
