import * as THREE from 'three';
import { createSunAndAddToScene } from './models/sun.js'
import { createPlanet } from './models/planet.js'
import { EffectComposer, OrbitControls, OutlinePass, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import bgTexture1 from '/assets/textures/1.jpg';
import bgTexture2 from '/assets/textures/2.jpg';
import bgTexture3 from '/assets/textures/3.jpg';
import bgTexture4 from '/assets/textures/4.jpg';

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

// START BACKGROUND
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  bgTexture3,
  bgTexture1,
  bgTexture2,
  bgTexture2,
  bgTexture4,
  bgTexture2
]);

//SUN
const sun = createSunAndAddToScene()

scene.add(sun)

//RENDER
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// POSTPROCESSING
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// BLOOM PASS
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0.80);
bloomPass.threshold = 1;
bloomPass.radius = 0.9;
composer.addPass(bloomPass);

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

const asteroids = []

function createAsteroid() {
  const numberOfAsteroids = 8000

  for (let i = 0; i < numberOfAsteroids / 12; i++) { // Divide by 12 because there are 12 asteroids in the pack
    const geometry = new THREE.IcosahedronGeometry(1, 2); // Geometria irregular

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/assets/textures/asteroid.jpg"); // Substitua pela URL da sua textura

    const material = new THREE.MeshStandardMaterial({ map: texture });

    const asteroid = new THREE.Mesh(geometry, material);

    const orbitRadius = THREE.MathUtils.randFloat(130, 160);

    const angle = Math.random() * Math.PI * 2;
    const x = orbitRadius * Math.cos(angle);
    const y = 0;
    const z = orbitRadius * Math.sin(angle);
    asteroid.position.set(x, y, z);

    scene.add(asteroid);
    asteroids.push(asteroid);
  }

}

createAsteroid()


const jupiterTexture = "/assets/textures/jupiter.jpg"
const jupiter = createPlanet('Jupiter', 69 / 4, 200, 3, jupiterTexture, null, null, null);

scene.add(jupiter.planet3d)

const saturnTexture = "/assets/textures/saturn.jpg"
const saturn = createPlanet('Saturn', 58 / 4, 270, 26, saturnTexture, null, {
  innerRadius: 18,
  outerRadius: 29,
});

scene.add(saturn.planet3d)

const uranusTexture = "/assets/textures/uranus.jpg"
const uranus = createPlanet('Uranus', 25 / 4, 320, 82, uranusTexture, null, {
  innerRadius: 6,
  outerRadius: 8,
});

scene.add(uranus.planet3d)

//
// const neptune = createPlanet('Neptune', 24 / 4, 340, 28, neptuneTexture);
//
// const pluto = createPlanet('Pluto', 1, 350, 57, plutoTexture)

renderer.shadowMap.enabled = true;

function animate() {
  sun.rotateY(0.001 * 2);

  mercury.planet.rotateY(0.0005 * 1)
  mercury.planet3d.rotateY(0.0006 * 1);
  venus.planet.rotateY(0.0005 * 10)
  venus.planet3d.rotateY(0.0006 * 3);
  earth.planet.rotateY(0.005 * 1);
  earth.planet3d.rotateY(0.001 * 1);
  mars.planet.rotateY(0.01 * 2);
  mars.planet3d.rotateY(0.0007 * 1);
  jupiter.planet.rotateY(0.005 * 1);
  jupiter.planet3d.rotateY(0.0003 * 2);
  saturn.planet.rotateY(0.005 * 1);
  saturn.planet3d.rotateY(0.0003 * 2);
  uranus.planet.rotateY(0.005 * 1);
  uranus.planet3d.rotateY(0.0003 * 3);

  asteroids.forEach(asteroid => {
    asteroid.rotation.y += 0.0001;
    asteroid.position.x = asteroid.position.x * Math.cos(0.0001 * 10) + asteroid.position.z * Math.sin(0.0001 * 10);
    asteroid.position.z = asteroid.position.z * Math.cos(0.0001 * 10) - asteroid.position.x * Math.sin(0.0001 * 10);
  });

  controls.update()

  renderer.render(scene, camera);
  composer.render();
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
