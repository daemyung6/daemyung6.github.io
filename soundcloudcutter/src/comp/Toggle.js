export default class Toggle {
    constructor(name, value) {
        this.elements = {};
        this.events = [];
        this.value = value;

        let div = document.createElement('div');
        div.classList.add('input-item');
        div.classList.add('toggle');
        
        div.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = `${name}`
            div.classList.add('label');

            return div;
        })())
        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('toggleBox')
            this.elements.toggleBox = div;
            div.addEventListener('click', () => {
                this.setValue(!this.value)

            })

            if(value) {
                div.classList.add('active')
            }

            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('toggleDot');
                
                

                return div;
            })())

            return div;
        })())


        this.dom = div
    }
    /**
     * 
     * @param {'valueUp' | 'valueDown' | '*'} type 
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
     * @param {Number} number 
     */
    setValue(boole) {
        let type = '*';
        this.value = boole;

        if(boole) {
            this.elements.toggleBox.classList.add('active');
        }
        else {
            this.elements.toggleBox.classList.remove('active');
        }
        

        this.onClick(type);
    }

    /**
     * 
     *  @param {'valueUp' | 'valueDown' | '*'} type 
     */
    onClick(type) {
        for (let i = 0; i < this.events.length; i++) {
            if((this.events[i].type === type) || this.events[i].type === '*') {
                // requestAnimationFrame(() => {
                    this.events[i].callback();
                // })
            }
        }
    }
}
