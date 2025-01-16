import * as THREE from 'three';

export function createSunAndAddToScene() {
  const loadTexture = new THREE.TextureLoader();

  const sunTexturePath = "/assets/textures/sun_detailed.png"
  const texture = loadTexture.load(sunTexturePath)

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.NearestFilter;

  const sunSize = 697 / 40;
  const geometry = new THREE.SphereGeometry(sunSize, 32, 20);
  const surface = new THREE.MeshPhongMaterial({
    map: texture,
    lightMap: texture,
    transparent: true,
    opacity: 0.8,
  })

  const sun = new THREE.Mesh(geometry, surface);

  const sunLight = new THREE.PointLight(
    0xffffff,
    5,
    50,
    2
  );

  sun.add(sunLight);

  return sun
}

