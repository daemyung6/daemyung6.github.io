import * as THREE from './build/three.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer, object;
let controls;

const displayDiv = document.createElement('div');;
displayDiv.classList.add('displayDiv');
document.body.appendChild(displayDiv);

init();
function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);

    // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    // camera.position.set( - 1.8, 0.6, 2.7 );

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 1 / 180 * Math.PI;
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 2500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const lightp = new THREE.PointLight(0xffffff, 1, 3000);
    lightp.position.set(0, 1000, 1000);
    scene.add(lightp);
    
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .setPath('textures/equirectangular/')
        .load('royal_esplanade_1k.hdr', function (texture) {

            const envMap = pmremGenerator.fromEquirectangular(texture).texture;

            scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            // model

            // use of RoughnessMipmapper is optional
            const roughnessMipmapper = new RoughnessMipmapper(renderer);

            let loader = new FBXLoader().setPath('my/');
            loader.load('Grate_low.fbx', function (gltf) {
                object = gltf;

                object.rotation.x = - Math.PI * 1 / 2;

                scene.add(object);

                render();
            });
        });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.target.set(0, 50, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function render() {
    renderer.render(scene, camera);
}