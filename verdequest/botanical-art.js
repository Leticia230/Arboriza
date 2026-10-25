
const plantArt = {
  jiboia: {
    title: "Jiboia",
    leaves: [
      [110, 48, -35, 1], [145, 80, 32, .9], [91, 105, -28, 1],
      [158, 133, 28, 1], [104, 165, -32, .95], [169, 192, 25, .9],
      [129, 225, -22, 1], [80, 245, -42, .85]
    ],
    shape: "heart",
    colors: ["#47764b", "#83a963", "#d7dca2"]
  },
  espada: {
    title: "Espada-de-são-jorge",
    leaves: [
      [119, 60, -12, 1], [135, 44, 8, 1], [155, 67, 20, .95],
      [100, 88, -23, .95], [144, 101, 9, 1], [170, 120, 23, .9]
    ],
    shape: "spear",
    colors: ["#285b42", "#598b56", "#d7d69a"]
  },
  zamioculca: {
    title: "Zamioculca",
    leaves: [
      [99, 76, -40, 1], [130, 62, 10, 1], [151, 91, 35, 1],
      [90, 119, -45, 1], [124, 113, 5, 1], [163, 143, 32, .9],
      [111, 158, -23, 1], [142, 178, 18, .95]
    ],
    shape: "oval",
    colors: ["#28553b", "#5b8954", "#a6bd7b"]
  },
  clorofito: {
    title: "Clorofito",
    leaves: [
      [110, 85, -48, 1], [140, 87, 48, 1], [88, 111, -60, 1],
      [154, 117, 57, 1], [111, 143, -35, 1], [136, 153, 35, 1],
      [88, 170, -50, 1], [164, 172, 49, 1]
    ],
    shape: "ribbon",
    colors: ["#427b47", "#9bbd71", "#e4e7c4"]
  },
  peperomia: {
    title: "Peperômia",
    leaves: [
      [109, 89, -35, 1], [140, 80, 30, 1], [90, 120, -25, 1],
      [152, 121, 30, 1], [110, 143, -20, .9], [137, 153, 20, .9]
    ],
    shape: "round",
    colors: ["#387148", "#75a666", "#c3d49b"]
  },
  lavanda: {
    title: "Lavanda",
    leaves: [
      [116, 115, -20, 1], [138, 133, 20, 1], [104, 151, -20, 1],
      [145, 162, 20, 1], [121, 184, -12, 1]
    ],
    shape: "narrow",
    colors: ["#58794c", "#9ab47a", "#8f78ad"]
  },
  manjericao: {
    title: "Manjericão",
    leaves: [
      [110, 87, -35, 1], [145, 83, 32, 1], [89, 119, -25, 1],
      [158, 117, 30, 1], [110, 144, -20, 1], [140, 151, 20, 1]
    ],
    shape: "oval",
    colors: ["#397044", "#6e9c55", "#b6ce87"]
  },
  maranta: {
    title: "Maranta",
    leaves: [
      [103, 78, -30, 1], [145, 73, 30, 1], [86, 112, -25, 1],
      [161, 108, 25, 1], [107, 143, -15, 1], [143, 145, 15, 1]
    ],
    shape: "oval",
    colors: ["#315c43", "#73945d", "#d7b0a0"]
  },
  aloe: {
    title: "Babosa",
    leaves: [
      [120, 115, -55, 1], [133, 100, -25, 1], [144, 114, 20, 1],
      [111, 127, -80, 1], [151, 133, 55, 1], [126, 143, -10, 1]
    ],
    shape: "spear",
    colors: ["#477d61", "#83ae80", "#c5d8a1"]
  },
  samambaia: {
    title: "Samambaia",
    leaves: [
      [100, 83, -42, 1], [146, 83, 42, 1], [83, 112, -48, 1],
      [161, 112, 48, 1], [102, 142, -35, 1], [145, 144, 35, 1],
      [118, 173, -20, 1], [135, 173, 20, 1]
    ],
    shape: "fern",
    colors: ["#306b43", "#65a35a", "#a4c67d"]
  }
};

function leafPath(shape) {
  switch (shape) {
    case "heart":
      return "M0 0 C-12 -15 -37 -31 -34 -48 C-31 -65 -10 -63 0 -47 C10 -63 31 -65 34 -48 C37 -31 12 -15 0 0Z";
    case "spear":
      return "M0 0 C-12 -20 -16 -52 0 -76 C16 -52 12 -20 0 0Z";
    case "ribbon":
      return "M0 0 C-19 -24 -10 -56 3 -75 C4 -46 12 -20 0 0Z";
    case "narrow":
      return "M0 0 C-7 -22 -7 -53 0 -73 C7 -53 7 -22 0 0Z";
    case "round":
      return "M0 0 C-27 -6 -38 -29 -26 -46 C-12 -65 13 -56 23 -40 C35 -21 21 -6 0 0Z";
    case "fern":
      return "M0 0 C-15 -12 -18 -29 -10 -43 C-3 -35 3 -15 0 0Z";
    default:
      return "M0 0 C-21 -10 -29 -32 -16 -47 C-3 -58 20 -45 23 -28 C26 -13 13 -3 0 0Z";
  }
}

function drawLeaf([x, y, angle, scale], shape, colors, index) {
  const fill = colors[index % 2];
  const vein = colors[2];

  return `
    <g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})">
      <path d="${leafPath(shape)}"
        fill="${fill}" stroke="#294e35" stroke-width="1.4"
        stroke-linejoin="round"/>
      <path d="M0 0 Q0 -22 0 -48"
        fill="none" stroke="${vein}" stroke-width="1.4"
        stroke-linecap="round" opacity=".9"/>
      <path d="M0 -15 L-10 -25 M0 -23 L10 -33 M0 -32 L-8 -39 M0 -39 L8 -45"
        fill="none" stroke="${vein}" stroke-width=".8"
        stroke-linecap="round" opacity=".7"/>
      <path d="M-7 -16 Q-13 -24 -17 -29"
        fill="none" stroke="#e5edc8" stroke-width=".65" opacity=".5"/>
    </g>`;
}

function drawFernFrond(i) {
  const side = i % 2 === 0 ? -1 : 1;
  const y = 92 + Math.floor(i / 2) * 18;
  const x = 125 + side * 6;
  const endX = 125 + side * (32 + Math.floor(i / 2) * 5);
  const endY = y - 57;

  let leaflets = "";
  for (let j = 0; j < 6; j++) {
    const t = j / 6;
    const px = x + (endX - x) * t;
    const py = y + (endY - y) * t;
    const spread = 7 + Math.sin(t * Math.PI) * 6;

    leaflets += `
      <path d="M${px} ${py} q${side * spread} -7 ${side * (spread + 3)} -3
        q-${side * 4} 7 -${side * (spread + 3)} 3Z"
        fill="${j % 2 ? "#639b52" : "#397647"}"
        stroke="#315b3c" stroke-width=".6"/>
      <path d="M${px} ${py} q${-side * spread} -7 ${-side * (spread + 3)} -3
        q${side * 4} 7 ${side * (spread + 3)} 3Z"
        fill="${j % 2 ? "#75a85c" : "#467f4b"}"
        stroke="#315b3c" stroke-width=".6"/>`;
  }

  return `
    <path d="M125 220 Q${x} ${y + 30} ${endX} ${endY}"
      fill="none" stroke="#507e47" stroke-width="2.4"/>
    ${leaflets}`;
}

export function botanicalArt(plantId, options = {}) {
  const plant = plantArt[plantId];
  if (!plant) {
    return fallbackArt(options.label || "Planta");
  }

  const leaves = plant.shape === "fern"
    ? Array.from({ length: 8 }, (_, i) => drawFernFrond(i)).join("")
    : plant.leaves.map((leaf, i) =>
        drawLeaf(leaf, plant.shape, plant.colors, i)
      ).join("");

  const pot = `
    <ellipse cx="125" cy="254" rx="38" ry="8" fill="#263d2a" opacity=".13"/>
    <path d="M91 207 L159 207 L151 247 Q125 258 99 247Z"
      fill="#bd805c" stroke="#8c5940" stroke-width="1.5"/>
    <path d="M99 218 L151 218 L146 243 Q125 250 104 243Z"
      fill="#cf9470" opacity=".65"/>
    <path d="M91 204 Q125 199 159 204 L159 214 Q125 220 91 214Z"
      fill="#d69a75" stroke="#8c5940" stroke-width="1.5"/>
    <ellipse cx="125" cy="205" rx="33" ry="6"
      fill="#624b36"/>
    <ellipse cx="125" cy="205" rx="28" ry="4.2"
      fill="#433c2c"/>`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 270" role="img"
      aria-label="${plant.title} em ilustração botânica"
      class="botanical-illustration">
      <defs>
        <linearGradient id="paper-${plantId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5f4e9"/>
          <stop offset="1" stop-color="#e6eadb"/>
        </linearGradient>
        <radialGradient id="light-${plantId}">
          <stop offset="0" stop-color="#fffdf1" stop-opacity=".9"/>
          <stop offset="1" stop-color="#fffdf1" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="250" height="270" rx="14"
        fill="url(#paper-${plantId})"/>
      <circle cx="125" cy="111" r="94"
        fill="url(#light-${plantId})"/>
      <path d="M125 208 Q120 165 125 112 Q128 82 125 65"
        fill="none" stroke="#527b47" stroke-width="3"
        stroke-linecap="round"/>
      <path d="M125 205 Q111 165 105 134 M125 185 Q147 150 153 125
        M125 162 Q101 122 100 98 M125 135 Q146 107 151 88"
        fill="none" stroke="#527b47" stroke-width="2"
        stroke-linecap="round"/>
      ${leaves}
      ${pot}
      <text x="125" y="263" text-anchor="middle"
        font-family="Georgia,serif" font-size="7"
        letter-spacing="1.4" fill="#5a7256">BOTANICAL STUDY</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function fallbackArt(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 270">
      <rect width="250" height="270" rx="14" fill="#edf1e5"/>
      <path d="M125 210 Q88 143 125 70 Q162 143 125 210Z"
        fill="#6f9764" stroke="#365e40" stroke-width="2"/>
      <path d="M125 205 L125 91" stroke="#365e40" stroke-width="2"/>
      <path d="M91 207 L159 207 L151 247 Q125 258 99 247Z"
        fill="#bd805c"/>
      <text x="125" y="263" text-anchor="middle"
        font-family="sans-serif" font-size="10" fill="#29452f">
        ${String(label).replace(/[<>&"']/g, "")}
      </text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function botanicalImage(plantId, className = "plant-image") {
  const src = botanicalArt(plantId);
  return `<img class="${className}" src="${src}"
    alt="${plantArt[plantId]?.title || "Ilustração botânica"}"
    loading="lazy">`;
}
