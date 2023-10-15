import * as app from '../app.js?ver=1';
import LayerPage from './page/LayerPage.js?ver=1';
import ExportPage from './page/ExportPage.js?ver=1';
import CreatorPage from './page/CreatorPage.js?ver=1';


/**
 * 전체적인 dom을 초기화 합니다.
 * @returns {{elements: {mainCanvas: Canvas, headerItems: {text: String, onclick: Function}[], mainPage: HTMLElement}, dom: HTMLElement, pages: {layerPage: LayerPage, exportPage: page, creatorPage: page}}}
    
 }}
 */
function init() {
    let elements = {};

    let rootDom = document.createElement('div');
    rootDom.classList.add('root');

    rootDom.appendChild((() => {
        let div = document.createElement('div');
        div.classList.add('mainCanvasBox');
        div.appendChild((() => {
            let canvas = document.createElement('canvas');
            canvas.classList.add('mainCanvas')
            canvas.width = app.canvasWidth;
            canvas.height = app.canvasHeight;
            elements.mainCanvas = canvas;
            return canvas
        })())

        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('profile');
            div.classList.add('showBorder');
            
            elements.profile = div;

            return div
        })())

        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('info');
            
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('name');
                let innerText;
                div.appendChild((() => {
                    let div = document.createElement('div');
                    div.innerText = 'user name'
                    div.classList.add('text');

                    innerText = div;
        
                    return div
                })())
                div.appendChild((() => {
                    let input = document.createElement('input');
                    input.value = 'user name'

                    input.addEventListener('change', () => {
                        innerText.innerText = input.value;
                    })
                    input.addEventListener('input', (e) => {
                        innerText.innerText = e.target.value
                    })
        
                    return input
                })())
    
                return div
            })())

            div.appendChild((() => {
                return document.createElement('br')
            })())


            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('country');
                let innerText;
                div.appendChild((() => {
                    let div = document.createElement('div');
                    div.innerText = 'User Country'
                    div.classList.add('text');

                    innerText = div;
        
                    return div
                })())
                div.appendChild((() => {
                    let input = document.createElement('input');
                    input.value = 'User Country'

                    input.addEventListener('change', () => {
                        innerText.innerText = input.value;
                    })
                    input.addEventListener('input', (e) => {
                        innerText.innerText = e.target.value
                    })
        
                    return input
                })())
    
                return div
            })())

            return div
        })())

        return div;
    })())

    

    elements.headerItems = [];


    let layerPage = new LayerPage(
        elements.mainCanvas.getContext('2d'),
        onProfileSet
    );

    /**
     * 
     * @param {boolean} bool 
     */
    function onProfileSet(bool) {
        if(bool) {
            elements.profile.classList.add('showBorder')
        }
        else {
            elements.profile.classList.remove('showBorder')
        }
    }

    let exportPage = new ExportPage();
    let creatorPage = new CreatorPage();

    let headerItems = [
        {
            text: 'Layers',
            onclick: () => {
                changePage(layerPage.dom, 0)
            }
        },
        {
            text: 'Export',
            onclick: () => {
                changePage(exportPage.dom, 1)
            }
        },
        {
            text: 'Creator',
            onclick: () => {
                changePage(creatorPage.dom, 2)
            }
        },
    ]
    rootDom.appendChild((() => {
        let div = document.createElement('div');
        div.classList.add('header');
        elements.header = div;
        
        for (let i = 0; i < headerItems.length; i++) {
            div.appendChild((() => {
                let span = document.createElement('span');
                span.classList.add('header-item');
                const id = i;
                span.innerText = headerItems[id].text;
                span.onclick = headerItems[id].onclick;

                elements.headerItems.push(span);

                return span;
            })())
        }
        return div;
    })())

    let lastMainPage = layerPage.dom;
    let lastSelectHeaderItem = elements.headerItems[0];
    /**
     * 
     * @param {HTMLElement} dom 
     * @param {number} idx 
     */
    function changePage(dom, idx) {
        rootDom.removeChild(lastMainPage);
        lastMainPage = dom
        rootDom.appendChild(lastMainPage);
        lastSelectHeaderItem.classList.remove('select');
        lastSelectHeaderItem = elements.headerItems[idx];
        lastSelectHeaderItem.classList.add('select');
        
    }


    elements.headerItems[0].classList.add('select');
    elements.headerItems[0].classList.remove

    rootDom.appendChild(lastMainPage);

    console.log(234)
    document.body.appendChild(rootDom);

    // let mainPageHeightStyle = document.createElement('style');
    // document.head.appendChild(mainPageHeightStyle);
    // function mainPageHeightCalc() {
    //     mainPageHeightStyle.innerText = `:root {--mainPageHeightSub: ${elements.mainCanvas.offsetHeight + elements.header.offsetHeight}px;}`;
    // }

    // window.addEventListener('resize', mainPageHeightCalc);
    // mainPageHeightCalc();

    
    return {
        elements : elements,
        dom: rootDom
    };
}

export default init;