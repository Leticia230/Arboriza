import * as THREE from "three";

const garden = document.querySelector("#garden");
const scene = garden?.threeScene;

if (!garden || !scene) {
  console.error(
    "VerdeQuest: cena 3D não encontrada. Confira a ordem dos scripts no index.html."
  );
} else {
  const fern = new THREE.Group();
  fern.name = "Samambaia 3D";
  fern.position.set(-3.1, 0, 1.15);
  scene.add(fern);

  const greenMaterials = [
    new THREE.MeshStandardMaterial({
      color: "#287345",
      roughness: 0.72,
      side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
      color: "#3c9250",
      roughness: 0.7,
      side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
      color: "#65ad61",
      roughness: 0.75,
      side: THREE.DoubleSide
    })
  ];

  const stemMaterial = new THREE.MeshStandardMaterial({
    color: "#52864a",
    roughness: 0.8
  });

  const potMaterial = new THREE.MeshStandardMaterial({
    color: "#b96f4b",
    roughness: 0.85
  });

  const soilMaterial = new THREE.MeshStandardMaterial({
    color: "#453629",
    roughness: 1
  });

  function addMesh(geometry, material, parent, position) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  // Vaso de terracota
  const pot = addMesh(
    new THREE.CylinderGeometry(0.31, 0.22, 0.48, 32, 1, false),
    potMaterial,
    fern,
    [0, 0.24, 0]
  );

  pot.name = "Vaso de terracota";

  const rim = addMesh(
    new THREE.CylinderGeometry(0.33, 0.31, 0.075, 32),
    potMaterial,
    fern,
    [0, 0.48, 0]
  );

  rim.name = "Borda do vaso";

  addMesh(
    new THREE.CylinderGeometry(0.285, 0.285, 0.025, 32),
    soilMaterial,
    fern,
    [0, 0.51, 0]
  );

  // Folhas formadas por folíolos alongados.
  const leafGeometry = new THREE.SphereGeometry(1, 10, 7);
  const frondTips = [];

  function makeLeaf(parent, start, end, width, material) {
    const direction = new THREE.Vector3(
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2]
    );

    const leaf = new THREE.Mesh(leafGeometry, material);
    leaf.position.set(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2
    );

    leaf.scale.set(width, direction.length() * 0.62, width * 0.34);
    leaf.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );

    leaf.castShadow = true;
    leaf.receiveShadow = true;
    parent.add(leaf);
    return leaf;
  }

  // Cada haste arqueada recebe pequenos folíolos dos dois lados.
  const frondCount = 13;

  for (let i = 0; i < frondCount; i++) {
    const angle = (i / frondCount) * Math.PI * 2;
    const length = 1.05 + 0.35 * (0.5 + 0.5 * Math.sin(i * 2.1));
    const height = 1.35 + 0.35 * Math.cos(i * 1.7);

    const direction = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );

    const points = [];

    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const radius = 0.08 + length * t;
      const y = 0.48 + height * t - 0.68 * t * t;

      points.push(
        new THREE.Vector3(
          direction.x * radius,
          y,
          direction.z * radius
        )
      );
    }

    const curve = new THREE.CatmullRomCurve3(points);

    const stem = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.014, 5, false),
      stemMaterial
    );

    stem.castShadow = true;
    fern.add(stem);

    for (let j = 1; j <= 9; j++) {
      const t = j / 10;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const leafLength = 0.17 * (1 - t * 0.45);
      const leafWidth = 0.055 * (1 - t * 0.4);
      const material = greenMaterials[(i + j) % greenMaterials.length];

      for (const sign of [-1, 1]) {
        const base = point.clone().addScaledVector(side, sign * 0.015);
        const tip = point.clone()
          .addScaledVector(side, sign * leafLength)
          .addScaledVector(tangent, 0.035);

        makeLeaf(
          fern,
          [base.x, base.y, base.z],
          [tip.x, tip.y, tip.z],
          leafWidth,
          material
        );
      }
    }

    frondTips.push({ stem, angle, height });
  }

  // Identificação para futuras interações com a planta.
  fern.userData.plantId = "samambaia";
  fern.userData.displayName = "Samambaia";
  fern.userData.isPlant = true;

  // Posição de referência para animação suave das hastes.
  const animatedStems = fern.children.filter(
    child => child.geometry?.type === "TubeGeometry"
  );

  let elapsed = 0;

  function animateFern() {
    requestAnimationFrame(animateFern);
    elapsed += 0.012;

    animatedStems.forEach((stem, index) => {
      stem.rotation.z = Math.sin(elapsed + index * 0.7) * 0.012;
    });
  }

  animateFern();

 garden.threePlants = garden.threePlants || {};
 garden.threePlants.samambaia = fern;

// A Samambaia começa escondida.
fern.visible = false;
}
