import * as THREE from "three";
import { createSun } from "./models/sun.js";
import { createPlanet } from "./models/planet.js";
import { EffectComposer, OrbitControls, RenderPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import bgTexture1 from "/assets/textures/1.jpg";
import bgTexture2 from "/assets/textures/2.jpg";
import bgTexture3 from "/assets/textures/3.jpg";
import bgTexture4 from "/assets/textures/4.jpg";
import solarSystemData from "./data/solar-system.js"
import { createAsteroids } from "./models/asteroid.js";

const systemControls = {
  rotationSpeed: 1,
  translationSpeed: 1
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-240, 115, 5);

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
const sun = createSun()

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

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.75;

controls.screenSpacePanning = false;

// SHOW ROTATION CONTROLS
const speedContainerControl = document.getElementById("volume-control-container")

speedContainerControl.classList.add("show")

// MOUSE AND RAYCASTER 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//PLANETS
const planets = []

for (const { animate, ...planetData } of solarSystemData.planets) {
  const planet = createPlanet(planetData)

  scene.add(planet.planetGroup)

  planets.push({
    ...planet,
    animate
  })
}

// ASTEROIDS
const asteroids = createAsteroids(670, scene)

renderer.shadowMap.enabled = true;

// SELECT PLANET
let selectedPlanet = null;
let targetCameraPosition = new THREE.Vector3();

const zoomOutTargetPosition = new THREE.Vector3(-260, 115, 5);

let isZoomingIn = false;
let isZoomingOut = false;

function animate() {
  sun.rotateY(0.001 * 2);

  for (const planetInfo of planets) {
    // ROTATION
    planetInfo.planet.rotateY(planetInfo.animate.rotation * systemControls.rotationSpeed)

    // TRANSLATION
    planetInfo.planetGroup.rotateY(planetInfo.animate.translation * systemControls.translationSpeed)

    // MOONS
    if (planetInfo.moons) {
      for (const moon of planetInfo.moons) {
        const time = performance.now();
        const tiltAngle = 5 * Math.PI / 180;

        const moonX =
          planetInfo.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);

        const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.sin(tiltAngle);

        const moonZ = planetInfo.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.cos(tiltAngle);

        moon.mesh.position.set(moonX, moonY, moonZ);
        moon.mesh.rotateY(0.01);
      }
    }
  }

  asteroids.forEach(asteroid => {
    asteroid.rotation.y += 0.0001;
    asteroid.position.x = asteroid.position.x * Math.cos(0.0001) + asteroid.position.z * Math.sin(0.0001 * 2);
    asteroid.position.z = asteroid.position.z * Math.cos(0.0001) - asteroid.position.x * Math.sin(0.0001 * 2);
  });

  // OUTLINES ON PLANETS
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  const intersects = raycaster.intersectObjects(planets.map(item => item.planet));

  document.body.style.cursor = "crosshair";

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
  }

  if (isZoomingIn) {
    camera.position.lerp(targetCameraPosition, 0.03); // Movendo suavemente com uma interpolação

    if (camera.position.distanceTo(targetCameraPosition) < 2) {
      isZoomingIn = false;

      renderPlanetInfo(selectedPlanet);
    }
  }

  if (isZoomingOut) {
    camera.position.lerp(zoomOutTargetPosition, 0.05);

    if (camera.position.distanceTo(zoomOutTargetPosition) < 2) {
      isZoomingOut = false;
      systemControls.translationSpeed = 1
    }
  }

  controls.update()

  renderer.render(scene, camera);

  composer.render();
}

renderer.setAnimationLoop(animate);


function renderPlanetInfo(planet) {
  const planetInfoElement = document.getElementById("planet-info");
  const planetNameElement = document.getElementById("planet-name")
  const planetDescriptionElement = document.getElementById("planet-description")

  planetNameElement.innerText = planet.name
  planetDescriptionElement.innerText = planet.description
  planetInfoElement.classList.add("show");
}

function closePlanetInfo() {
  const planetInfoElement = document.getElementById("planet-info");
  planetInfoElement.classList.remove("show");
  speedContainerControl.classList.add("show")
  systemControls.translationSpeed = 1;
  isZoomingOut = true;
  controls.target.set(0, 0, 0);
}

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const intersects = raycaster.intersectObjects(
    planets.map(item => item.planet)
  );

  if (intersects.length > 0) {
    selectedPlanet = intersects[intersects.length - 1].object;

    const planetInfoElement = document.getElementById("planet-info")

    planetInfoElement.classList.remove("show")
    speedContainerControl.classList.remove("show")

    if (isZoomingOut) isZoomingOut = false

    systemControls.translationSpeed = 0

    const planetPosition = new THREE.Vector3();
    selectedPlanet.getWorldPosition(planetPosition);

    controls.target.copy(planetPosition);

    targetCameraPosition.copy(planetPosition)
      .add(
        camera.position.clone()
          .sub(planetPosition)
          .normalize()
          .multiplyScalar(selectedPlanet.offset || 50)
      );

    camera.lookAt(planetPosition);

    isZoomingIn = true;
  }
}

window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('click', onClick, false);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.closePlanetInfo = closePlanetInfo;

// ROTATION AND TRANSLATION CONTROLS
const sliderRotation = document.getElementById("volume-slider-rotation");
const valueRotation = document.getElementById("volume-value-rotation");

sliderRotation.addEventListener("input", () => {
  valueRotation.textContent = sliderRotation.value;
  systemControls.rotationSpeed = parseFloat(sliderRotation.value)
});

const sliderTranslation = document.getElementById("volume-slider-translation");
const valueTranslation = document.getElementById("volume-value-translation");

sliderTranslation.addEventListener("input", () => {
  valueTranslation.textContent = sliderTranslation.value;
  systemControls.translationSpeed = parseFloat(sliderTranslation.value)
});
