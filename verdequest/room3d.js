import * as THREE from "three";

const garden = document.querySelector("#garden");

if (garden) {
  garden.classList.add("garden-3d");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#dce8df");
  scene.fog = new THREE.Fog("#dce8df", 10, 24);

  const camera = new THREE.PerspectiveCamera(
    42,
    garden.clientWidth / garden.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 3.1, 8.8);
  camera.lookAt(0, 1.6, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(garden.clientWidth, garden.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  renderer.domElement.className = "room3d-canvas";
  renderer.domElement.setAttribute("aria-label", "Cômodo 3D do VerdeQuest");
  garden.prepend(renderer.domElement);

  // Luz ambiente suave
  const ambientLight = new THREE.HemisphereLight(
    "#f3f8ff",
    "#9b876e",
    2.1
  );
  scene.add(ambientLight);

  // Luz principal
  const sunlight = new THREE.DirectionalLight("#fff1ce", 3.2);
  sunlight.position.set(-4, 7, 5);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024, 1024);
  sunlight.shadow.camera.left = -7;
  sunlight.shadow.camera.right = 7;
  sunlight.shadow.camera.top = 7;
  sunlight.shadow.camera.bottom = -7;
  scene.add(sunlight);

  function material(color, roughness = 0.9) {
    return new THREE.MeshStandardMaterial({ color, roughness });
  }

  function box(name, size, position, color, options = {}) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(...size),
      material(color, options.roughness ?? 0.9)
    );

    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = options.castShadow ?? true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }

  // Piso
  box("Piso de madeira", [10, 0.18, 9], [0, -0.1, 0], "#b99168");

  // Paredes do cômodo, com a frente aberta para visualizar o interior
  box("Parede do fundo", [10, 5.5, 0.18], [0, 2.65, -3.8], "#e7e2d5");
  box("Parede esquerda", [0.18, 5.5, 7.6], [-5, 2.65, 0], "#d6dfd0");
  box("Parede direita", [0.18, 5.5, 7.6], [5, 2.65, 0], "#d6dfd0");

  // Rodapés
  box("Rodapé esquerdo", [0.08, 0.2, 7.5], [-4.88, 0.1, 0], "#f4eee2");
  box("Rodapé direito", [0.08, 0.2, 7.5], [4.88, 0.1, 0], "#f4eee2");
  box("Rodapé fundo", [9.8, 0.2, 0.08], [0, 0.1, -3.67], "#f4eee2");

  // Tábuas decorativas no piso
  for (let i = 0; i < 12; i++) {
    const z = -3.4 + i * 0.62;
    box(
      `Junta do piso ${i}`,
      [9.8, 0.012, 0.018],
      [0, 0.0, z],
      "#99744f",
      { castShadow: false }
    );
  }

  // Janela na parede do fundo
  box("Moldura da janela", [2.1, 2.3, 0.12], [-2.5, 3.0, -3.65], "#faf7ee");
  box("Vidro da janela", [1.82, 2.02, 0.035], [-2.5, 3.0, -3.56], "#a8d7e3", {
    roughness: 0.25,
    castShadow: false
  });
  box("Divisória vertical", [0.07, 2.0, 0.05], [-2.5, 3.0, -3.51], "#faf7ee");
  box("Divisória horizontal", [1.8, 0.07, 0.05], [-2.5, 3.0, -3.51], "#faf7ee");
  box("Peitoril", [2.35, 0.12, 0.35], [-2.5, 1.82, -3.43], "#f5eee1");

  // Prateleira lateral
  box("Prateleira de madeira", [2.1, 0.12, 0.48], [3.25, 1.65, -2.75], "#986c48");
  box("Suporte da prateleira 1", [0.09, 0.55, 0.1], [2.6, 1.35, -2.8], "#79583d");
  box("Suporte da prateleira 2", [0.09, 0.55, 0.1], [3.9, 1.35, -2.8], "#79583d");

  // Quadro decorativo
  box("Moldura do quadro", [1.05, 1.25, 0.12], [2.8, 3.4, -3.65], "#f8f2e5");
  box("Arte do quadro", [0.86, 1.06, 0.04], [2.8, 3.4, -3.56], "#9ebc91", {
    castShadow: false
  });

  // Luz de sol entrando pela janela
  const windowLight = new THREE.SpotLight("#ffe4a6", 35, 12, Math.PI / 5, 0.6, 1.4);
  windowLight.position.set(-2.5, 3.4, -3.2);
  windowLight.target.position.set(-1.2, 0.2, 0.5);
  scene.add(windowLight, windowLight.target);

  // Pequena mesa para dar escala ao cômodo
  box("Tampo da mesa", [1.8, 0.14, 1.1], [1.3, 1.15, 0.1], "#b99168");
  box("Pé da mesa 1", [0.12, 1.1, 0.12], [0.6, 0.55, -0.25], "#8a6446");
  box("Pé da mesa 2", [0.12, 1.1, 0.12], [2.0, 0.55, -0.25], "#8a6446");
  box("Pé da mesa 3", [0.12, 1.1, 0.12], [0.6, 0.55, 0.45], "#8a6446");
  box("Pé da mesa 4", [0.12, 1.1, 0.12], [2.0, 0.55, 0.45], "#8a6446");

  // Posição inicial para futuras plantas 3D
  const plantSpots = [
    new THREE.Vector3(-3.3, 0, 0.8),
    new THREE.Vector3(-1.8, 0, 1.5),
    new THREE.Vector3(3.2, 0, 0.7)
  ];

  scene.userData.plantSpots = plantSpots;

  function resize() {
    const width = garden.clientWidth;
    const height = garden.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(garden);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // Disponibiliza a cena para adicionar plantas 3D na próxima etapa.
  garden.threeScene = scene;
  garden.threeCamera = camera;
  garden.threeRenderer = renderer;
  garden.threePlantSpots = plantSpots;
}
