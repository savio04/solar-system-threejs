import * as THREE from "three";

export function createAsteroids(numberOfAsteroids, scene) {
  let asteroids = []

  for (let i = 0; i < numberOfAsteroids; i++) {
    const geometry = new THREE.SphereGeometry(1, 5);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/assets/textures/asteroid.jpg");

    const material = new THREE.MeshStandardMaterial({ map: texture });

    const asteroid = new THREE.Mesh(geometry, material);

    const orbitRadius = THREE.MathUtils.randFloat(130, 160);

    const angle = Math.random() * Math.PI * 2;
    const x = orbitRadius * Math.cos(angle);
    const y = 0;
    const z = orbitRadius * Math.sin(angle);
    asteroid.position.set(x, y, z);

    asteroid.receiveShadow = true

    scene.add(asteroid);
    asteroids.push(asteroid);
  }

  return asteroids
}

