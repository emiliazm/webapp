import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../assets/remoteController.gltf';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const light2 = new THREE.PointLight(0xe1f3a5, 2, 0);
light2.position.set(-90, -100, -100);
scene.add(light2);

const light1 = new THREE.PointLight(0xc7a6f7, 2, 0);
light1.position.set(-60, 50, 300);
scene.add(light1);

camera.position.y = 7;
camera.position.z = 4;
camera.position.x = 5;
camera.rotation.y = 0.5;
camera.rotation.x = -1;
camera.rotation.z = 1.6;

const loader = new GLTFLoader();
let model;
loader.load('./remoteController.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 4 + t * 0.005;
  camera.position.x = 5 + t * 0.0009;
  camera.position.y = 7 + t * 0.01;
  camera.rotation.y = 0.5 + t * -0.003;
}
document.body.onscroll = moveCamera;

const animate = () => {
  resizeCanvasToDisplaySize();
  requestAnimationFrame(animate);
  if (model !== undefined) {
    model.rotation.x += 0.007;
  }
  renderer.render(scene, camera);
};

animate();