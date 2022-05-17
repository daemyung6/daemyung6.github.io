import * as THREE from './build/three.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer, object;
let controls;
let mixer;

const clock = new THREE.Clock();

const displayDiv = document.createElement('div');;
displayDiv.classList.add('displayDiv');
document.body.appendChild(displayDiv);


let FBX = {}
let anime = [];
const FBXList = [
  './fbx/standing.fbx',
  './fbx/run.fbx'
]
let FBXloadCount = 0;
for (let i = 0; i < FBXList.length; i++) {
  const id = i;

  let loader = new FBXLoader();
  loader.load(FBXList[id], function (fbxData) {
    FBXloadCount++;
    let pathArr = FBXList[id].split('/');
    let name = pathArr[pathArr.length - 1].split('.')[0];
    FBX[name] = fbxData;

    if(FBXList.length === FBXloadCount) {
      onLoadDone();
    }
  });
}
function onLoadDone() {
  console.log(FBX);
  init();
}

function init() {

  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.rotation.y = 1 / 180 * Math.PI;
  camera.position.x = 0;
  camera.position.y = 300;
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa2eeff);

  const lightp = new THREE.PointLight(0xffffff, 1, 3000);
  lightp.position.set(0, 1000, 1000);
  scene.add(lightp);
  
  const light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );


  scene.add(FBX.standing);
  mixer = new THREE.AnimationMixer( FBX.standing );
  const standing = mixer.clipAction( FBX.standing.animations[0] );
  anime.push(standing);
  standing.play()

  const run = mixer.clipAction( FBX.run.animations[0] );
  anime.push(run);
  run.play()
  

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
  
  controls.target.set(0, 100, 0);
  controls.update();

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  render();
}





export let renderList = [];
function render() {
  requestAnimationFrame( render );

  mixer.update( clock.getDelta() );
  anime[0].weight = 1 - Number(input.value) / 100;
  anime[1].weight = Number(input.value) / 100;

  for (let i = 0; i < renderList.length; i++) {
    renderList[i]();
  }
  renderer.render(scene, camera);
}