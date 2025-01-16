import * as THREE from 'three';
import { createSunAndAddToScene } from './sun.js'
import { createPlanet } from './planet.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-175, 115, 5);

//AMBIENT LIGHT
const ambientLightCount = 4;

for (var i = 0; i < ambientLightCount; i++) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

  switch (i) {
    case 0:
      directionalLight.position.set(0, 0, 10000);
      break;
    case 1:
      directionalLight.position.set(0, 0, -10000);
      break;
    case 2:
      directionalLight.position.set(10000, 0, 0);
      break;
    case 3:
      directionalLight.position.set(-10000, 0, 0);
      break;
  }

  scene.add(directionalLight);
}


//SUN
const sun = createSunAndAddToScene()

scene.add(sun)

//RENDER
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.75;

controls.screenSpacePanning = false;

//PLANETS
const mercuryTexture = "/assets/textures/mercury.jpg"
const mercury = createPlanet('Mercury', 2.4, 40, 0, mercuryTexture, null);

const venusTexture = "/assets/textures/venus.jpg"
const venus = new createPlanet(
  'Venus', 6.1, 65, 3, venusTexture, null, null);

const earthTexture = "/assets/textures/earth_4k.jpg"
const earth = new createPlanet(
  'Earth', 6.4, 90, 23, earthTexture, null, null);

const marsTexture = "/assets/textures/mars.jpg"
const mars = new createPlanet(
  'Mars', 3.4, 115, 25, marsTexture, null)

scene.add(mercury.planet3d)
scene.add(venus.planet3d)
scene.add(earth.planet3d)
scene.add(mars.planet3d)

renderer.shadowMap.enabled = true;


function animate() {
  sun.rotateY(0.001 * 2);

  mercury.planet.rotateY(0.0005 * 10)
  mercury.planet3d.rotateY(0.0006 * 10);
  venus.planet.rotateY(0.0005 * 10)
  venus.planet3d.rotateY(0.0006 * 3);
  earth.planet.rotateY(0.005 * 10);
  earth.planet3d.rotateY(0.001 * 3);
  mars.planet.rotateY(0.01 * 2);
  mars.planet3d.rotateY(0.0007 * 1);


  controls.update()

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
