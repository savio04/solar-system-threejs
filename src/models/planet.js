import * as THREE from 'three';

export function createPlanet(
  planetName,
  size,
  position,
  tilt,
  texture,
  bump,
  ring,
  atmosphere,
  moons
) {
  const loadTexture = new THREE.TextureLoader();
  let material;

  if (texture instanceof THREE.Material) {
    material = texture;
  } else if (bump) {
    material = new THREE.MeshPhongMaterial({
      map: loadTexture.load(texture),
      bumpMap: loadTexture.load(bump),
      bumpScale: 0.7
    });
  } else {
    material = new THREE.MeshPhongMaterial({
      map: loadTexture.load(texture)
    });
  }

  const geometry = new THREE.SphereGeometry(size, 32, 20);
  const planet = new THREE.Mesh(geometry, material);
  const planet3d = new THREE.Object3D;

  const planetSystem = new THREE.Group();
  planetSystem.add(planet);

  let Atmosphere;
  let Ring;
  planet.position.x = position;
  planet.rotation.z = tilt * Math.PI / 180;

  // add orbit path
  const orbitPath = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    position, position, // xRadius, yRadius
    0, 2 * Math.PI,   // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  );

  const pathPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.01 });
  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  planetSystem.add(orbit);

  //add ring
  if (ring) {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
    const RingMat = new THREE.MeshStandardMaterial({
      map: loadTexture.load(ring.texture),
      side: THREE.DoubleSide
    });
    Ring = new THREE.Mesh(RingGeo, RingMat);
    planetSystem.add(Ring);
    Ring.position.x = position;
    Ring.rotation.x = -0.5 * Math.PI;
    Ring.rotation.y = -tilt * Math.PI / 180;
  }

  //add atmosphere
  if (atmosphere) {
    const atmosphereGeom = new THREE.SphereGeometry(size + 0.1, 32, 20);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      map: loadTexture.load(atmosphere),
      transparent: true,
      opacity: 0.4,
      depthTest: true,
      depthWrite: false
    })
    Atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMaterial)

    Atmosphere.rotation.z = 0.41;
    planet.add(Atmosphere);
  }

  //add moons
  if (moons) {
    moons.forEach(moon => {
      let moonMaterial;

      if (moon.bump) {
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture),
          bumpMap: loadTexture.load(moon.bump),
          bumpScale: 0.5
        });
      } else {
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture)
        });
      }
      const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 20);
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      const moonOrbitDistance = size * 1.5;
      moonMesh.position.set(moonOrbitDistance, 0, 0);
      planetSystem.add(moonMesh);
      moon.mesh = moonMesh;
    });
  }

  planet3d.add(planetSystem);

  return { planet, planet3d }
}
