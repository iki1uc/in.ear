// WHIRL-Asset: 9 Marken gleichmäßig auf dem Kreis verteilt.
// Der Zeiger zeigt den Winkel.
function zeichneWhirl(el, n, winkel) {
  const STEP = 360 / 9;
  let marken = "";

  for (let k = 0; k < 9; k++) {
    const a = (-90 + k * STEP) * Math.PI / 180;
    const x = 60 + Math.cos(a) * 50;
    const y = 60 + Math.sin(a) * 50;
    const aktiv = n > 0 && ((n - 1) % 9) === k;

    marken += `<circle
      cx="${x.toFixed(1)}"
      cy="${y.toFixed(1)}"
      r="${aktiv ? 5 : 3}"
      fill="${aktiv ? "#f59e0b" : "#355"}"
    />`;
  }

  const w = (-90 + winkel) * Math.PI / 180;
  const zeigerX = 60 + Math.cos(w) * 40;
  const zeigerY = 60 + Math.sin(w) * 40;

  el.innerHTML =
    `<circle cx="60" cy="60" r="50" fill="none" stroke="#0a0" stroke-width="1"/>` +
    marken +
    `<line x1="60" y1="60" x2="${zeigerX.toFixed(1)}" y2="${zeigerY.toFixed(1)}" stroke="#0f0" stroke-width="2"/>` +
    `<circle cx="60" cy="60" r="3" fill="#0f0"/>`;
}
