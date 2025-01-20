export default {
  planets: [
    {
      name: "Mercúrio",
      description: `Mercúrio é o planeta mais próximo do Sol, cerca de 57.910.000 km, e é o que possui a menor massa, ou seja, é o menor entre os planetas do Sistema Solar. A temperatura na sua superfície pode chegar, durante o período diurno, a 550ºC`,
      size: 2.4,
      position: 40,
      tilt: 0,
      texture: "/assets/textures/mercury.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      offset: 10,
      initialAngle: 0.8 * Math.PI,
      animate: {
        rotation: 0.001,
        translation: 0.004
      }
    },
    {
      name: "Vênus",
      description: `Vênus também conhecido como Estrela Dalva, é o segundo planeta em relação ao Sol, estando, aproximadamente, a 108.200.000 km de distância. É um planeta de fácil visibilidade, antes do nascer ou depois do pôr do Sol, a olho nu.`,
      size: 6.1,
      position: 65,
      tilt: 3,
      texture: "/assets/textures/venus.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      offset: 25,
      initialAngle: 0.7 * Math.PI,
      animate: {
        rotation: 0.0005,
        translation: 0.0006
      }
    },
    {
      name: "Terra",
      description: `Terra é o terceiro planeta na ordem de proximidade com o Sol, encontrando-se a 149.600.000 km de distância desse. É o planeta que apresenta condições favoráveis à existência de vida. Sua atmosfera é composta por nitrogênio, oxigênio, vapor d'água e outros gases em menor quantidade.`,
      size: 6.4,
      position: 90,
      tilt: 23,
      texture: "/assets/textures/earth_4k.jpg",
      bump: null,
      ring: null,
      atmosphere: "/assets/textures/earth_atmosphere.jpg",
      moons: null,
      offset: 25,
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
      description: `Marte também chamado de Planeta Vermelho, é o quarto planeta na ordem em relação ao Sol, estando a, aproximadamente, 227.940.000 km de distância dele. É um dos planetas que também apresentam condições de ser visto a olho nu. É constituído por silicatos e basaltos, e sua atmosfera é composta basicamente por gás carbônico, nitrogênio e alguns vestígios de oxigênio, monóxido de carbono e vapor d'água.`,
      size: 3.4,
      position: 115,
      tilt: 25,
      texture: "/assets/textures/mars.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      offset: 15,
      initialAngle: 0.5 * Math.PI,
      animate: {
        rotation: 0.01,
        translation: 0.0007
      }
    },
    {
      name: "Júpiter",
      description: `Júpiter é o maior planeta do Sistema Solar possuindo uma massa 318 vezes maior que a da Terra. Diferente dos quatro planetas mais próximos ao Sol, Júpiter é constituído de gases como hidrogênio, hélio, metano, amônia e vestígios de vapor d'água.`,
      size: 17.25,
      position: 200,
      tilt: 3,
      texture: "/assets/textures/jupiter.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      offset: 60,
      initialAngle: 0.17 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.0003
      }
    },
    {
      name: "Saturno",
      description: `Saturno encontra-se a, aproximadamente, 1.429.400.000 km do Sol e é o segundo maior planeta do Sistema Solar. Sua composição assemelha-se à de Júpiter: hidrogênio, hélio, metano, amônia e vestígios de vapor d'água.`,
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
      offset: 50,
      initialAngle: 0.65 * Math.PI,
      animate: {
        rotation: 0.01,
        translation: 0.0002
      },
    },
    {
      name: "Urano",
      description: `Urano é um dos planetas gasosos, é o terceiro maior planeta do Sistema Solar, estando a, aproximadamente, 2.880.990.000 km do Sol. Suas características assemelham-se às de Júpiter e Saturno.`,
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
      offset: 25,
      initialAngle: 1.04 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.0001
      },
    },
    {
      name: "Netuno",
      description: `Neturno foi descoberto em 1845 e não pode ser visto a olho nu. É o último planeta do Sistema Solar em relação ao Sol, estando a cerca de 4.504.300.000 km de distância desse.`,
      size: 6.25,
      position: 340,
      tilt: 28,
      texture: "/assets/textures/neptune.jpg",
      bump: null,
      ring: null,
      atmosphere: null,
      moons: null,
      offset: 20,
      initialAngle: 0.25 * Math.PI,
      animate: {
        rotation: 0.005,
        translation: 0.00008
      },
    },
  ]
}
