export default {
  sun: {

  },
  planets: [
    {
      name: "Mercúrio",
      size: 2.4,
      position: 40,
      tilt: 0,
      texture: "/assets/textures/mercury.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      initialAngle: 0.8 * Math.PI,
      animate: {
        rotation: 0.001,
        translation: 0.004
      }
    },
    {
      name: "Vênus",
      size: 6.1,
      position: 65,
      tilt: 3,
      texture: "/assets/textures/venus.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      initialAngle: 0.7 * Math.PI,
      animate: {
        rotation: 0.0005,
        translation: 0.0006
      }
    },
    {
      name: "Terra",
      size: 6.4,
      position: 90,
      tilt: 23,
      texture: "/assets/textures/earth_4k.jpg",
      bump: null,
      ring: null,
      atmosphere: "/assets/textures/earth_atmosphere.jpg",
      moons: null,
      initialAngle: 0.6 * Math.PI,
      moons: [
        {
          size: 1.6,
          texture: "/assets/textures/moonmap.jpg",
          bump: "/assets/textures/moonbump.jpg",
          orbitSpeed: 0.001,
          orbitRadius: 10
        }
      ],
      animate: {
        rotation: 0.005,
        translation: 0.001
      }
    },
    {
      name: "Marte",
      size: 3.4,
      position: 115,
      tilt: 25,
      texture: "/assets/textures/mars.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      initialAngle: 0.5 * Math.PI,
      animate: {
        rotation: 0.01,
        translation: 0.0007
      }
    },
    {
      name: "Júpiter",
      size: 17.,
      position: 200,
      tilt: 3,
      texture: "/assets/textures/jupiter.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      initialAngle: 0.17 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.0003
      }
    },
    {
      name: "Saturno",
      size: 14.5,
      position: 270,
      tilt: 26,
      texture: "/assets/textures/saturn.jpg",
      bump: null,
      ring: {
        innerRadius: 18,
        outerRadius: 29,
        texture: "/assets/textures/saturn_ring.png"
      },
      atmosphere: null,
      moons: null,
      initialAngle: 0.65 * Math.PI,
      animate: {
        rotation: 0.01,
        translation: 0.0002
      },
    },
    {
      name: "Urano",
      size: 6.25,
      position: 320,
      tilt: 82,
      texture: "/assets/textures/uranus.jpg",
      bump: null,
      ring: {
        innerRadius: 6,
        outerRadius: 8,
        texture: "/assets/textures/uranus_ring.png"
      },
      atmosphere: null,
      moons: null,
      initialAngle: 1.04 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.0001
      },
    },
    {
      name: "Netuno",
      size: 6.25,
      position: 340,
      tilt: 28,
      texture: "/assets/textures/neptune.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      initialAngle: 0.25 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.00008
      },
    },
  ]
}
