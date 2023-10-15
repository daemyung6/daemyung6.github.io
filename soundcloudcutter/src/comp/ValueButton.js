export default class ValueButton {
    constructor(name, unit) {
        this.elements = {};
        this.events = [];
        this.value = 0;
        this.type = 'number';

        let div = document.createElement('div');
        div.classList.add('input-item');
        div.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = `${name} : `
            div.classList.add('label');

            let isPress = false;
            let lastPos = 0;
            div.addEventListener('mousedown', (e) => {
                isPress = true;
                lastPos = e.clientY;
                document.body.style.cursor = 'ns-resize';
            })
            window.addEventListener('mousemove', (e) => {
                if(isPress) {
                    this.setValue(this.value + lastPos - e.clientY);
                    lastPos = e.clientY;
                }
            })
            window.addEventListener('mouseup', () => {
                if(isPress) {
                    document.body.style.cursor = '';
                    isPress = false;
                }
            })
            return div;
        })())
        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('flex-input-box');

            div.appendChild((() => {
                let span = document.createElement('span');
                span.classList.add('input-label')
                span.classList.add('input-set')
                span.innerText = '0.00'
                
                this.elements.valueSpan = span;
                return span;
            })())

            div.appendChild((() => {
                let input = document.createElement('input');
                this.elements.input = input;
                input.classList.add('input-set');

                input.addEventListener('change', (e) => {
                    if(isNaN(input.value)) {
                        input.value = this.value.toFixed(2);
                        return;
                    }
                    
                    this.setValue(Number(input.value))
                })
                
                input.value = this.value.toFixed(2);
                return input;
            })())
            return div;
        })())
        
        div.appendChild((() => {
            let div = document.createElement('div');
            div.innerText = unit;
            div.classList.add('unit');
            return div;
        })())
        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('num-bt-box');
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('num-bt');
                div.innerText = '⬆';
                this.elements.up = div;
                div.addEventListener('click', () => {
                    this.setValue(this.value + 1)
                })
                return div;
            })())
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('num-bt');
                div.innerText = '⬇';
                this.elements.down = div;
                div.addEventListener('click', () => {
                    this.setValue(this.value - 1)
                })
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
     * @param {Number} newValue 
     */
    setValue(newValue) {
        if((this.type === 'number') && (typeof newValue !== 'number')) {
            throw new Error('매개변수가 숫자가 아닙니다.');
            return
        }

        let type = '*';
        if(this.type === 'number') {
            if(this.value < newValue) {
                type = 'valueUp'
            }
            if(this.value > newValue) {
                type = 'valueDown'
            }
        }
        

        this.value = newValue;
        if(this.type === 'number') {
            this.elements.input.value = newValue.toFixed(2);
            this.elements.valueSpan.innerText = newValue.toFixed(2);
        }
        else {
            this.elements.input.value = newValue;
            this.elements.valueSpan.innerText = newValue;
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
     /**
      * 
      * @param {'number'|'string'} valueType 
      */
    setType(valueType) {
        this.type = valueType;
    }
}
