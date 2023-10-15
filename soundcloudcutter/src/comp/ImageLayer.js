import Layer from "./Layer.js?ver=1";
import ValueButton from "./ValueButton.js?ver=1";
import * as app from '../../app.js?ver=1';


export default class ImageLayer extends Layer {
    constructor() {
        super();

        this.img = document.createElement('img');
        this.img.onload = () => {
            let tempSet = this.isRatioFixed;
            this.isRatioFixed = false;
            this.setValue('width', this.img.width)
            this.setValue('height', this.img.height)
            this.setValue('x', this.img.width / 2)
            this.setValue('y', this.img.height / 2)
            this.isRatioFixed = tempSet;
            this.isImageLoaded = true;
        }
        this.isImageLoaded = false;

        this.rotateCanvas = document.createElement('canvas');
        this.rotateCanvas.width = 10;
        this.rotateCanvas.height = 10;
        // this.canvas.style.css?ver=1Text = `
        //     position: absolute;
        //     top: 500px;
        //     left: 40px;
        //     border: 1px solid;
        // `
        this.rotateContext = this.rotateCanvas.getContext('2d');

        this.cutCanvas = document.createElement('canvas');
        // this.cutCanvas.style.css?ver=1Text = `
        //     position: absolute;
        //     top: 500px;
        //     left: 40px;
        //     border: 1px solid;
        // `
        this.cutCanvas.width = 10;
        this.cutCanvas.height = 10;
        this.cutContext = this.cutCanvas.getContext('2d');
        // document.body.appendChild(this.cutCanvas)

        this.width = 0;
        this.height = 0;
        this.isRatioFixed = true;
        this.isRatioFixedWidth = false;
        this.isRatioFixedHeight = false;

        this.dom.classList.add('img-layer');

        this.elements.line.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('file');

            div.addEventListener('click', () => {
                app.selectImage((data, fileName) => {
                    this.img.src = data;
                    this.elements.fileName.innerText = fileName;
                })
            })
            
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('file-name');
                this.elements.fileName = div;
                div.innerText = "no select"
                

                return div;
            })())
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('file-select');
                div.appendChild((() => {
                    let img = document.createElement('img');
                    img.src = './asset/img/image-upload.png?ver=1';
                    return img;
                })())

                return div;
            })())

            return div;
        })())

        let XInput = new ValueButton('x', 'px');
        this.elements.line.appendChild(XInput.dom);
        XInput.addEvent('*', () => {
            this.x = XInput.value;
            this.onClick('update');
        })

        let YInput = new ValueButton('y', 'px');
        this.elements.line.appendChild(YInput.dom);
        YInput.addEvent('*', () => {
            this.y = YInput.value;
            this.onClick('update');
        })

        let widthInput = new ValueButton('width', 'px');
        this.elements.line.appendChild(widthInput.dom);
        widthInput.addEvent('*', () => {
            if(widthInput.value < 0) {
                widthInput.setValue(0);
                return;
            }

            if(!this.isRatioFixedWidth && this.isRatioFixed && (this.width !== 0) && (this.height !== 0)) {
                this.isRatioFixedHeight = true;
                heightInput.setValue((this.height / this.width) * widthInput.value)
            }
            if(this.isRatioFixedWidth) {
                this.isRatioFixedWidth = false;
            }

            this.width = widthInput.value;
            
            this.onClick('update');
        })

        let heightInput = new ValueButton('height', 'px');
        this.elements.line.appendChild(heightInput.dom);
        heightInput.addEvent('*', () => {
            
            if(heightInput.value < 0) {
                heightInput.setValue(0);
                return;
            }

            if(!this.isRatioFixedHeight && this.isRatioFixed && (this.width !== 0) && (this.height !== 0)) {
                this.isRatioFixedWidth = true;
                widthInput.setValue((this.width / this.height) * heightInput.value)
            }

            if(this.isRatioFixedHeight) {
                this.isRatioFixedHeight = false;
            }

            this.height = heightInput.value;
            
            this.onClick('update');
        })

        this.elements.line.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('clip');
            div.classList.add('active');

            this.elements.ratioFixed = div;

            div.addEventListener('click', () => {
                this.setValue('isRatioFixed', !this.isRatioFixed);
                this.onClick('update');
            })
            
            div.appendChild((() => {
                let img = document.createElement('img');
                img.src = './asset/img/clip.png?ver=1';
                
                return img;
            })())


            return div;
        })())

        this.elements.line.appendChild((() => {
            return document.createElement('br');
        })())

        this.cutx = 0;
        let cutXInput = new ValueButton('cutx', 'px');
        this.elements.line.appendChild(cutXInput.dom);
        cutXInput.addEvent('*', () => {
            this.cutx = cutXInput.value;
            this.onClick('update');
        })

        this.cutWidth = 0;
        let cutWidth = new ValueButton('cutw', 'px');
        this.elements.line.appendChild(cutWidth.dom);
        cutWidth.addEvent('*', () => {
            this.cutWidth = cutWidth.value;
            this.onClick('update');
        })

        this.cuty = 0;
        let cutYInput = new ValueButton('cuty', 'px');
        this.elements.line.appendChild(cutYInput.dom);
        cutYInput.addEvent('*', () => {
            this.cuty = cutYInput.value;
            this.onClick('update');
        })        

        this.cutHeight = 0;
        let cutHeight = new ValueButton('cuth', 'px');
        this.elements.line.appendChild(cutHeight.dom);
        cutHeight.addEvent('*', () => {
            this.cutHeight = cutHeight.value;
            this.onClick('update');
        })

        let rotateInput = new ValueButton('rotate', 'deg');
        this.elements.line.appendChild(rotateInput.dom);
        rotateInput.addEvent('*', () => {
            this.rotate = rotateInput.value;
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
                widthInput.setValue(num)
            },
            height: (num) => {
                heightInput.setValue(num)
            },
            cutx: (num) => {
                cutXInput.setValue(num)
            },
            cuty: (num) => {
                cutHeight.setValue(num)
            },
            cutWidth: (num) => {
                cutWidth.setValue(num)
            },
            cutHeight: (num) => {
                cutHeight.setValue(num)
            },
            isRatioFixed: (bool) => {
                this.isRatioFixed = bool;
                if(bool) {
                    this.elements.ratioFixed.classList.add('active');
                }
                else {
                    this.elements.ratioFixed.classList.remove('active');
                }
            },
        }    
    }
    /**
     * 
     * @param {'x' | 'y' | 'width' | 'height' | 'isRatioFixed'} type 
     * @param {Number} number 
     */
    setValue(type, number) {
        this.valueTypeSetter[type](number);
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
            this.cutCanvas,
            0, 0,

            this.img.width, this.img.height,
            - this.width / 2,  - this.height / 2,

            this.width, this.height
        )
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} g 
     */
    draw(g) {
        if(!this.isVisible) {
            return;
        }
        if(!this.isImageLoaded) {
            return;
        }

        this.cutCanvas.width = this.img.width;
        this.cutCanvas.height = this.img.height;
        this.cutContext.drawImage(
            this.img,
            this.cutx, this.cuty,

            this.img.width - this.cutx - this.cutWidth,
            this.img.height - this.cuty - this.cutHeight,

            this.cutx, this.cuty,
            this.img.width - this.cutx - this.cutWidth,
            this.img.height - this.cuty - this.cutHeight,
        )

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