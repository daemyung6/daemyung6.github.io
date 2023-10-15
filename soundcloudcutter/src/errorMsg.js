
export let set = {
    'img-type-error' : [
        'The selected file is not an image.'
    ],
    'layer-delete-msg': [
        'Are you sure to delete this layer?'
    ],
    'fail-get-os-font-list': [
        'Failed to load the list of fonts in the OS'
    ],
    'dont-support' : [
        'This browser does not support the feature.'
    ]
}

export const emun = {
    en: 0,
}

export let num = emun.en;

export function setNum(enumCode) {
    num = enumCode;
}