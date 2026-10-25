import * as THREE from "three";

const garden = document.querySelector("#garden");
const scene = garden?.threeScene;

if (!garden || !scene) {
  console.error("VerdeQuest: cena 3D não encontrada.");
} else {
  garden.threePlants = garden.threePlants || {};

  const species = {
    jiboia: {
      leaves: 18, height: 1.2, spread: 0.8,
      colors: ["#397b43", "#79a85c", "#d7d58a"],
      shape: "heart", hanging: true
    },
    espada: {
      leaves: 9, height: 1.7, spread: 0.65,
      colors: ["#477e45", "#a7b96a", "#d7c879"],
      shape: "sword"
    },
    zamioculca: {
      leaves: 22, height: 1.25, spread: 0.85,
      colors: ["#285b35", "#4c8547", "#82a75d"],
      shape: "oval"
    },
    clorofito: {
      leaves: 20, height: 0.8, spread: 1.0,
      colors: ["#3f8848", "#d4dca0", "#8ebc70"],
      shape: "long", hanging: true
    },
    peperomia: {
      leaves: 18, height: 0.65, spread: 0.75,
      colors: ["#347548", "#5d9c61", "#91bd78"],
      shape: "round"
    },
    lavanda: {
      leaves: 28, height: 1.0, spread: 0.6,
      colors: ["#477d48", "#759d60", "#8d6cae"],
      shape: "lavender"
    },
    manjericao: {
      leaves: 24, height: 0.9, spread: 0.75,
      colors: ["#317443", "#5b9c50", "#83b765"],
      shape: "oval"
    },
    maranta: {
      leaves: 16, height: 0.75, spread: 0.85,
      colors: ["#28633e", "#75a65b", "#a94f55"],
      shape: "oval"
    },
    aloe: {
      leaves: 12, height: 0.9, spread: 0.65,
      colors: ["#438b63", "#80b98b", "#b4d6a0"],
      shape: "sword"
    }
  };

  const makeMaterial = (color, roughness = 0.78) =>
    new THREE.MeshStandardMaterial({ color, roughness });

  function addMesh(group, geometry, material, position, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  function createPot(group) {
    const clay = makeMaterial("#bd8060");
    const soil = makeMaterial("#453326");

    addMesh(
      group,
      new THREE.CylinderGeometry(0.25, 0.18, 0.32, 24),
      clay,
      [0, 0.16, 0]
    );

    addMesh(
      group,
      new THREE.TorusGeometry(0.235, 0.025, 8, 24),
      clay,
      [0, 0.31, 0]
    );

    addMesh(
      group,
      new THREE.CylinderGeometry(0.215, 0.215, 0.025, 24),
      soil,
      [0, 0.315, 0]
    );
  }

  function createPlant(id, data) {
    const group = new THREE.Group();
    group.name = `Planta 3D: ${id}`;
    group.userData.plantId = id;
    group.userData.isPlant = true;

    createPot(group);

    const foliageMaterials = data.colors.map(color => makeMaterial(color));
    const stemMaterial = makeMaterial("#527b43");

    for (let i = 0; i < data.leaves; i++) {
      const angle = i * 2.399;
      const fraction = (i + 1) / data.leaves;
      const y = 0.34 + fraction * data.height * 0.72;

      const radius = data.spread *
        (data.shape === "sword" ? 0.18 + fraction * 0.18 : 0.2 + fraction * 0.4);

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const leafLength = data.shape === "sword"
        ? 0.45 + fraction * 0.48
        : 0.22 + fraction * 0.18;

      const stem = addMesh(
        group,
        new THREE.CylinderGeometry(0.012, 0.018, Math.max(0.08, y - 0.34), 6),
        stemMaterial,
        [x * 0.35, (y + 0.34) / 2, z * 0.35],
        [Math.sin(angle) * 0.18, 0, Math.cos(angle) * 0.18]
      );

      let geometry;

      if (data.shape === "sword") {
        geometry = new THREE.ConeGeometry(0.105, leafLength, 8);
      } else if (data.shape === "round") {
        geometry = new THREE.SphereGeometry(0.14, 12, 10);
      } else if (data.shape === "heart") {
        geometry = new THREE.SphereGeometry(0.15, 12, 10);
      } else {
        geometry = new THREE.SphereGeometry(0.12, 12, 10);
      }

      const leaf = addMesh(
        group,
        geometry,
        foliageMaterials[i % foliageMaterials.length],
        [
          x,
          y + (data.shape === "sword" ? leafLength * 0.2 : 0),
          z
        ],
        [
          data.shape === "sword" ? -0.28 : 0.25,
          -angle,
          data.hanging ? 0.65 * Math.cos(angle) : 0.25 * Math.sin(angle)
        ]
      );

      if (data.shape === "lavender" && i % 3 === 0) {
        addMesh(
          group,
          new THREE.SphereGeometry(0.055, 8, 8),
          foliageMaterials[2],
          [x * 0.8, y + 0.12, z * 0.8]
        );
      }

      if (id === "maranta") {
        addMesh(
          group,
          new THREE.SphereGeometry(0.035, 8, 8),
          foliageMaterials[2],
          [x, y, z]
        );
      }
    }

    // A jiboia e o clorofito ganham ramos pendentes.
    if (data.hanging) {
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const vine = addMesh(
          group,
          new THREE.CylinderGeometry(0.012, 0.008, 0.55, 6),
          stemMaterial,
          [Math.cos(angle) * 0.2, 0.05, Math.sin(angle) * 0.2],
          [Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4]
        );
      }
    }

    group.visible = false;
    scene.add(group);
    garden.threePlants[id] = group;

    return group;
  }

  Object.entries(species).forEach(([id, data]) => {
    createPlant(id, data);
  });

  console.log("VerdeQuest: modelos 3D criados:", Object.keys(species));
}
