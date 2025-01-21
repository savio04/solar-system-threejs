import * as THREE from 'three';

export function createPlanet({
  size,
  position,
  name,
  description,
  tilt,
  texture,
  ring,
  atmosphere,
  moons,
  offset,
  initialAngle = 0
}) {
  const loadTexture = new THREE.TextureLoader();

  const material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture)
  })

  const geometry = new THREE.SphereGeometry(size, 32, 20);
  const planet = new THREE.Mesh(geometry, material);

  const planetGroup = new THREE.Group();
  planetGroup.add(planet);

  let Atmosphere;
  let Ring;

  const initialX = position * Math.cos(initialAngle);
  const initialZ = position * Math.sin(initialAngle);

  planet.position.set(initialX, 0, initialZ);
  planet.rotation.z = tilt * Math.PI / 180;

  planet["name"] = name
  planet["description"] = description
  planet["offset"] = offset

  const orbitPath = new THREE.EllipseCurve(
    0, 0,              // Centro da elipse (x, y)
    position, position, // Raios da elipse (raioX, raioY)
    0, 2 * Math.PI,     // Ângulo inicial e final (completa 360°)
    false,              // Sentido horário ou anti-horário (false = anti-horário)
    0                   // Rotação da elipse
  );

  const pathPoints = orbitPath.getPoints(150);

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.03 });

  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);

  orbit.rotation.x = Math.PI / 2;

  planetGroup.add(orbit);

  if (ring) {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
    const RingMat = new THREE.MeshStandardMaterial({
      map: loadTexture.load(ring.texture),
      side: THREE.DoubleSide
    });
    Ring = new THREE.Mesh(RingGeo, RingMat);
    planetGroup.add(Ring);
    Ring.position.set(initialX, 0, initialZ)
    Ring.rotation.x = -0.5 * Math.PI;
    Ring.rotation.y = -tilt * Math.PI / 180;
  }

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
      planetGroup.add(moonMesh);
      moon.mesh = moonMesh;
    });
  }

  planet.castShadow = true;
  planet.receiveShadow = true;

  return { planet, planetGroup, moons }
}
