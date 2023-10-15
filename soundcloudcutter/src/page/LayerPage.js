import ImageLayer from '../comp/ImageLayer.js?ver=1';
import FontLayer from '../comp/fontLayer.js?ver=1';
import ColorValue from '../comp/ColorValue.js?ver=1';
import Toggle from '../comp/Toggle.js?ver=1';

/**
 * 
 * @class
 * @constructor
 * @public
 */
export default class LayerPage {
    /**
     * 
     * @callback onProfileSetCallback
     * @param {boolean} value
     */

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {onProfileSetCallback} onProfileSet 
     */
    constructor(ctx, onProfileSet) {
        this.layer = [];
        this.elements = {}

        /**
         * 
         * @type {CanvasRenderingContext2D}
         * @public
         */
        this.ctx = ctx;

        let isPress = false;
        let lastPos = {x: 0, y: 0};

        ctx.canvas.addEventListener('mousedown', (e) => {
            isPress = true;
            lastPos.x = e.clientX;
            lastPos.y = e.clientY;

            document.body.style.cursor = 'grabbing'
            ctx.canvas.style.cursor = 'grabbing'
        })
        window.addEventListener('mousemove', (e) => {
            if(this.lastSelectLayer && isPress) {
                this.lastSelectLayer.setValue(
                    'x', 
                    this.lastSelectLayer.x + (e.clientX - lastPos.x) * 2
                )
                this.lastSelectLayer.setValue(
                    'y', 
                    this.lastSelectLayer.y + (e.clientY - lastPos.y) * 2
                )

                lastPos.x = e.clientX;
                lastPos.y = e.clientY;
            }
        })
        window.addEventListener('mouseup', () => {
            if(isPress) {
                document.body.style.cursor = '';
                ctx.canvas.style.cursor = '';
                isPress = false;
            }
        })
        

        this.lastSelectLayer;


        this.dom = document.createElement('div');
        this.dom.classList.add('mainPage');
        this.dom.classList.add('layerPage');

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('layer');
            div.classList.add('headerLayer');

            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('input-item');
                div.classList.add('file');

                div.innerText = 'Add Image'

                div.addEventListener('click', () => {
                    this.addLayer('image');
                })

                return div;
            })())

            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('input-item');
                div.classList.add('file');

                div.innerText = 'Add Text'

                div.addEventListener('click', () => {
                    this.addLayer('font');
                })

                return div;
            })())

            let color = new ColorValue('Background');
            this.background = color;
            color.addEvent('*', () => {
                this.draw();
            })
            color.setValue('#ff5252');
            div.appendChild(color.dom)

            let profileToggle = new Toggle('profile box', true);
            div.appendChild(profileToggle.dom)
            profileToggle.addEvent('*', () => {
                onProfileSet(profileToggle.value)
            })

            return div;
        })())


        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('layers');
            this.elements.layers = div;
            return div;
        })())

    }
    /**
     * 
     * @param {'image' | 'font'} type 
     */
    addLayer(type) {
        let layer;
        if (type === 'image') {
            layer = new ImageLayer();
        }
        if (type === 'font') {
            layer = new FontLayer();
            
        }

        layer.addEvent('layerUp', () => {
            let idx = this.layer.indexOf(layer);
            if (idx === -1) { return }
            if (idx < 1) { return }
            this.layer.splice(idx, 1);
            this.layer.splice(idx - 1, 0, layer);
            this.elements.layers.innerHTML = null;
            for (let i = 0; i < this.layer.length; i++) {
                this.elements.layers.appendChild(this.layer[i].dom);
            }
        })
        layer.addEvent('layerDown', () => {
            let idx = this.layer.indexOf(layer);
            if (idx === -1) { return }
            if (idx >= this.layer.length - 1) { return }
            this.layer.splice(idx, 1);
            this.layer.splice(idx + 1, 0, layer);
            this.elements.layers.innerHTML = null;
            for (let i = 0; i < this.layer.length; i++) {
                this.elements.layers.appendChild(this.layer[i].dom);
            }
        })
        layer.addEvent('layerDelete', () => {
            let idx = this.layer.indexOf(layer);
            if (idx === -1) { return }
            this.layer.splice(idx, 1);
            this.elements.layers.innerHTML = null;
            for (let i = 0; i < this.layer.length; i++) {
                this.elements.layers.appendChild(this.layer[i].dom);
            }
        })
        layer.addEvent('*', () => {
            this.draw();
        })

        layer.dom.addEventListener('click', () => {
            if(this.lastSelectLayer) {
                this.lastSelectLayer.dom.classList.remove('select');
            }
            this.lastSelectLayer = layer;

            layer.dom.classList.add('select');
        })

        this.layer.push(layer);
        this.elements.layers.appendChild(layer.dom);
    }

    draw() {
        this.ctx.fillStyle = this.background.value;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let i = this.layer.length - 1; i > -1; i--) {
            this.layer[i].draw(this.ctx);
        }
    }
}
