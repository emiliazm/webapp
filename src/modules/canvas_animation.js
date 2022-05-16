import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  alpha: true,
});

const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
camera.position.z = 400;

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshPhongMaterial({
  color: 0x555555,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light1 = new THREE.PointLight(0xff80C0, 2, 0);
light1.position.set(200, 200, 300);
scene.add(light1);

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
  }
}

function animate(time) {
  time *= 0.001; // seconds

  resizeCanvasToDisplaySize();

  mesh.rotation.y = time * 0.5;
  mesh.rotation.z = time * 0.3;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);