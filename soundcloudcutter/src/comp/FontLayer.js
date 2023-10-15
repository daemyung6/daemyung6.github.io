import Layer from "./Layer.js?ver=1";
import ValueButton from "./ValueButton.js?ver=1";
import * as app from '../../app.js?ver=1';
import ColorValue from "./ColorValue.js?ver=1";


export default class FontLayer extends Layer {
    constructor() {
        super();

        this.width = 500;
        this.height = 500;
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.size = 100;
        this.rotate = 0;
        this.text = '';
        this.font = 'Arial';

        this.rotateCanvas = document.createElement('canvas');
        this.rotateContext = this.rotateCanvas.getContext('2d');

        this.textCanvas = document.createElement('canvas');
        this.textContext = this.textCanvas.getContext('2d');
        
        this.dom.classList.add('font-layer');

        let XInput = new ValueButton('x', 'px');
        this.elements.line.appendChild(XInput.dom);
        XInput.addEvent('*', () => {
            this.x = XInput.value;
            this.onClick('update');
        })
        XInput.setValue(this.x)

        let YInput = new ValueButton('y', 'px');
        this.elements.line.appendChild(YInput.dom);
        YInput.addEvent('*', () => {
            this.y = YInput.value;
            this.onClick('update');
        })
        YInput.setValue(this.y)

        let width = new ValueButton('width', 'px');
        width.setValue(500)
        this.elements.line.appendChild(width.dom);
        width.addEvent('*', () => {
            this.width = width.value;
            this.onClick('update');
        })

        let height = new ValueButton('height', 'px');
        height.setValue(500)
        this.elements.line.appendChild(height.dom);
        height.addEvent('*', () => {
            this.height = height.value;
            this.onClick('update');
        })


        let sizeInput = new ValueButton('size', 'px');
        this.elements.line.appendChild(sizeInput.dom);
        sizeInput.addEvent('*', () => {
            this.size = sizeInput.value;
            this.onClick('update');
        })
        sizeInput.setValue(this.size);

        let rotate = new ValueButton('rotate', 'deg');
        this.elements.line.appendChild(rotate.dom);
        rotate.addEvent('*', () => {
            this.rotate = rotate.value;
            this.onClick('update');
        })

        this.valueTypeSetter = {
            x: (num) => {
                XInput.setValue(num)
            },
            y: (num) => {
                YInput.setValue(num)
            },
            width: (num) => {
                width.setValue(num)
            },
            height: (num) => {
                height.setValue(num)
            },
            text: (text) => {
                this.text = text;
            }
        }    

        this.elements.line.appendChild((() => {
            return document.createElement('br')
        })());


        this.elements.line.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('font-select');

            div.appendChild((() => {
                let div = document.createElement('div');
                div.innerText = `font : `
                div.classList.add('label');
                return div;
            })())
            div.appendChild((() => {

                let select = document.createElement('select');

                for (let i = 0; i < app.fontList.length; i++) {
                    select.appendChild((() => {
                        let option = document.createElement('option');
                        option.innerText = app.fontList[i];
                        option.value = app.fontList[i];

                        return option;
                    })())
                }

                select.addEventListener('change', () => {
                    this.font = select.value;
                    this.onClick('update');
                })

                select.value = this.font;
                
                return select;
            })())

            return div
        })())

        this.color = '#ffffff'

        let color = new ColorValue('color');
        this.elements.line.appendChild(color.dom);
        color.addEvent('*', () => {
            this.color = color.value;
            this.onClick('update');
        })
        

        this.elements.line.appendChild((() => {
            return document.createElement('br')
        })());

        this.elements.line.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('font');


            let textarea = document.createElement('textarea');
            textarea.classList.add('input-set')
            div.appendChild(textarea);

            
            const onChage = (e) => {
                this.setValue('text', e.target.value)
                textarea.style.height = textarea.scrollHeight + 'px'
            }

            textarea.addEventListener('input', onChage)
            textarea.addEventListener('change', onChage)

            
            return div;
        })())
    }
    /**
     * 
     * @param {'x' | 'y' | 'text'} type 
     * @param {Number | String} value 
     */
    setValue(type, value) {
        this.valueTypeSetter[type](value);
        this.onClick('update');
    }

    rotateImage() {
        let delta = this.rotate * Math.PI * 2 / 360;

        let points = []
        points.push([- this.width / 2,   this.height / 2])
        points.push([  this.width / 2,   this.height / 2])
        points.push([- this.width / 2, - this.height / 2])
        points.push([  this.width / 2, - this.height / 2])

        for (let i = 0; i < points.length; i++) {
            points[i] = [
                Math.cos(delta) * points[i][0] - Math.sin(delta) * points[i][1],
                Math.sin(delta) * points[i][0] + Math.cos(delta) * points[i][1],
            ]
        }

        points.sort((a, b) => {
            return a[0] - b[0]
        })
        let minX = points[0][0]
        let maxX = points[3][0]

        points.sort((a, b) => {
            return a[1] - b[1]
        })

        let minY = points[0][1]
        let maxY = points[3][1]

        this.rotateCanvas.width = Math.abs(minX - maxX)
        this.rotateCanvas.height = Math.abs(minY - maxY)

        this.rotateContext.clearRect(0, 0, this.rotateCanvas.width, this.rotateCanvas.height)

        this.rotateContext.setTransform(1, 0, 0, 1, 0, 0);
        this.rotateContext.translate(this.rotateCanvas.width / 2, this.rotateCanvas.height / 2);
        this.rotateContext.rotate(delta);

        this.rotateContext.drawImage(
            this.textCanvas,
            0, 0,

            this.width, this.height,
            - this.width / 2,  - this.height / 2,

            this.width, this.height
        )
    }


    /**
     * 
     * @param {CanvasRenderingContext2D} g 
     */
    draw(g) {
        this.textCanvas.width = this.width;
        this.textCanvas.height = this.height;

        this.textContext.clearRect(0, 0, this.width, this.height)

        this.textContext.textBaseline = 'middle';
        this.textContext.textAlign = "center";

        this.textContext.fillStyle = this.color;

        this.textContext.font = `${this.size}px ${this.font}`;

        this.textContext.fillText(this.text, this.width / 2, this.height / 2)


        this.rotateImage();

        g.drawImage(
            this.rotateCanvas, 
            0, 0, 
            this.rotateCanvas.width, this.rotateCanvas.height, 

            this.x - this.rotateCanvas.width / 2, 
            this.y - this.rotateCanvas.height / 2, 
            
            this.rotateCanvas.width, this.rotateCanvas.height
        )
    }
}