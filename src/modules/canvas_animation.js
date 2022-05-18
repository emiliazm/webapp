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

const light1 = new THREE.PointLight(0xfffacd, 2, 0);
light1.position.set(100, 200, 300);
scene.add(light1);

camera.position.y = -3;
camera.position.z = 7;
camera.rotation.x = 0.7;

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

const animate = () => {
  resizeCanvasToDisplaySize();
  requestAnimationFrame(animate);
  if (model !== undefined) {
    model.rotation.y += 0.007;
  }
  renderer.render(scene, camera);
};

animate();