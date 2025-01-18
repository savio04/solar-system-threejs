import * as THREE from "three";

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
    emissiveIntensity: 1.6,
    emissive: 0xFFC072
  })

  const sun = new THREE.Mesh(geometry, surface);

  const sunLight = new THREE.PointLight(0xFDFFD3, 1200, 400, 1.4);

  sunLight.castShadow = true;

  sun.add(sunLight);

  return sun
}

