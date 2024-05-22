import { normalMap } from 'three/examples/jsm/nodes/Nodes.js';
import './style.css'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
const background = new THREE.TextureLoader().load("/space.jpg");

scene.background = background;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6200 });
const torus = new THREE.Mesh(geometry, material);

torus.position.setX(25);
torus.position.setY(3);

scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

const smokingEffectsTexture = new THREE.TextureLoader().load("/smoking.jpg");
const smokingEffects = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: smokingEffectsTexture}),
);

smokingEffects.position.setY(-1);
smokingEffects.position.setX(-92);
smokingEffects.scale.set(5, 5, 5);

scene.add(smokingEffects);

const questionTexture = new THREE.TextureLoader().load("/images.jpg");
const question = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: questionTexture}),
);

question.position.setY(3);
question.position.setX(-152);
question.scale.set(3, 3, 3);

scene.add(question);

const noSmokingTexture = new THREE.TextureLoader().load("/no-smoking.webp");
const noSmoking = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: noSmokingTexture}),
);

noSmoking.position.setX(25);
noSmoking.position.setY(3);

scene.add(noSmoking);

// const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  question.rotation.y += 0.01;

  smokingEffects.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

function move() {
  let t = document.body.getBoundingClientRect().top;

  camera.position.x = t * 0.1;

  noSmoking.rotation.x += 0.1;
  noSmoking.rotation.z += 0.1;

  smokingEffects.rotation.x += 0.01;
  smokingEffects.rotation.z += 0.01;

  renderer.render(scene, camera); 
  // controls.update();
}

document.onscroll = move;
move();