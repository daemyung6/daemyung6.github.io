import * as ErrorMsg from "./errorMsg.js?ver=1";
export default class ImageInput {
    constructor() {
        this.imageInput = document.createElement('input');
        this.imageInput.setAttribute('type', 'file');
        this.imageInput.setAttribute('accep', 'image/*');
        this.fileReader = new FileReader();

    }

    /**
     * 
     * @callback imageInputCallback
     * @param {string} data
     * @param {string} fileName
     */

    /**
     * 
     * @param {imageInputCallback} callback
     */
    selectImage(callback) {
        this.imageInput.onchange = (e) => {
            if (e.target.files.length < 1) { return }
            let file = e.target.files[0];
            this.fileReader.readAsDataURL(file);
            this.fileReader.onload = function (e1) {
                if (file.type.search('image/') === -1) {
                    alert(ErrorMsg.set['img-type-error'][ErrorMsg.num]);
                    return;
                }
                callback(e1.target.result, file.name);
            }
        }
        this.imageInput.click();
    }    
}