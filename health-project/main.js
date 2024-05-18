import { normalMap } from 'three/examples/jsm/nodes/Nodes.js';
import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
const background = new THREE.TextureLoader().load("space.jpg");

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

const noSmokingTexture = new THREE.TextureLoader().load("no-smoking.webp");
const noSmoking = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: noSmokingTexture}),
);

noSmoking.position.setX(25);
noSmoking.position.setY(3);


scene.add(noSmoking);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

function move() {
  let t = document.body.getBoundingClientRect().top;

  camera.position.y = t * 0.11;

  noSmoking.rotation.x += 0.01;
  noSmoking.rotation.y += 0.05;
  noSmoking.rotation.z += 0.01;

  renderer.render(scene, camera); 
}

document.onscroll = move;
move();

const noTobbaco = new THREE.TextureLoader().load("no-tobbaco.jpg");
let noTobbacoBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({map: noTobbaco})
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
