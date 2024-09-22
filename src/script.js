import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import spline from "/spline.js"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Initialize Scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.3)

// initialize the camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,200);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputColorSpace = THREE.SRGBColorSpace

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.autoRotate = false;

// Post-processing
const renderScene = new RenderPass(scene, camera)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight))
bloomPass.threshold = 0.002
bloomPass.strength = 1.5
bloomPass.radius = 0.8;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene)
composer.addPass(bloomPass)

// Creating the tube geometry for the same spline
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true)

const pointsMaterial = new THREE.PointsMaterial({
  color: 0x8888ff,
  size: 0.02,   // Adjust size for visibility
  sizeAttenuation: true,
  transparent: true,
  opacity: 1.0,
  emissive: 0xffffff, // Glowing effect
  emissiveIntensity: 2.5, // Add texture for the glow
});

const updateRGBGlow = (time) => {
  const r = Math.sin(time * 0.001) * 0.5 + 0.5; 
  const g = Math.sin(time * 0.001 + Math.PI / 3) * 0.5 + 0.5;
  const b = Math.sin(time * 0.001 + (2 * Math.PI) / 3) * 0.5 + 0.5;
  pointsMaterial.color.setRGB(r, g, b);
};

// Create Points object
const vertices = new THREE.Points(tubeGeo, pointsMaterial);
scene.add(vertices);

// Creating EdgeGeometry from the spline
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({
  color: 0x2222ff,
  emissive: 0x1111ff, // Glowing effect by adding emissive property
  emissiveIntensity: 1.5, // Controls the intensity of the glow
});
const tubeLines = new THREE.LineSegments(edges, lineMat)
scene.add(tubeLines)

const numBoxes = 55
const boxGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1)
for (let i = 0; i < numBoxes; i += 1){
  const boxMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true})
  const box = new THREE.Mesh(boxGeo, boxMat)
  const p = (i / numBoxes + Math.random() * 0.1) % 1
  const pos = tubeGeo.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;
  box.position.copy(pos)
  const rote = new THREE.Vector3(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
  )
  box.rotation.set(rote.x, rote.y, rote.z)
  const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
  const color = new THREE.Color().setHSL(1-p, 1, 0.5) // RGB Effect
  const lineMat = new THREE.LineBasicMaterial({ color })
  const boxLines = new THREE.LineSegments(edges, lineMat)
  boxLines.rotation.set(rote.x, rote.y, rote.z)
  boxLines.position.copy(pos)
  scene.add(boxLines)
}

const updateCamera = (t) => {
  const time = t * 0.1; 
  const looptime = 6 * 1000;
  const p = (time % looptime) / looptime; // (time divided by loop time) + 1
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1) // [NEW POS]
  camera.position.copy(pos) // move to that positiong
  camera.lookAt(lookAt) // then look at [NEW POS]
}


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = (t = 0) => {

  window.requestAnimationFrame(renderloop);
  updateRGBGlow(t);
  updateCamera(t);
  composer.render(scene, camera);
  controls.update();

};

renderloop();
