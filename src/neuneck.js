function istGueltigerUmlauf(n) {
  return n &&
    Array.isArray(n.w) && n.w.length === 9 &&
    n.w.every(v => Number.isFinite(v) && v >= 0) &&
    Number.isInteger(n.pos) && n.pos >= 0 && n.pos < 9 &&
    Number.isInteger(n.step) && n.step >= 0 && n.step <= 9 &&
    Array.isArray(n.gave) && n.gave.length === 9 &&
    Array.isArray(n.recv) && n.recv.length === 9 &&
    Array.isArray(n.res) && n.res.length === 9;
}

function schritt9() {
  const n = R.n9;

  if (!istGueltigerUmlauf(n)) {
    L("9-ECK abgebrochen · ungültiger Zustand");
    stopLauf();
    return;
  }

  if (n.done || n.step >= 9) {
    stopLauf();
    return;
  }

  const c = n.pos;
  const r = (c + 1) % 9;
  const sumVor = sum9(n.w);
  const logVor = LOG.lesen().length;
  const g = geben(n.w[c]);

  if (!Number.isFinite(g) || g < 0 || g > n.w[c]) {
    L(`9-ECK abgebrochen · ungültige Gabe an Ecke ${c + 1}`);
    stopLauf();
    return;
  }

  if (n.step === 0) {
    L("9-ECK · Umlauf beginnt · 9 Ecken × 81 = 729 · jede Ecke 40°");
  }

  n.w[c] -= g;
  n.w[r] += g;
  n.gave[c]++;
  n.recv[r]++;
  n.last = { von: c, nach: r, g };

  const ok = !!ECKEN[c].f(n, c, {
    sumVor,
    logVor,
    gab: g,
    bekam: g
  });

  n.res[c] = ok;
  n.pos = r;
  n.step++;

  L(`ECKE ${c + 1}/9 ${ECKEN[c].id} gibt ${g} → ${ECKEN[r].id} bekommt ${g} · Prüfung „${ECKEN[c].pruef}“ ${ok ? "✓" : "✗"} · Σ=${sum9(n.w)}`);

  if (n.step !== 9) return;

  n.done = true;
  R.umlaeufe++;

  const alle =
    n.gave.every(x => x === 1) &&
    n.recv.every(x => x === 1) &&
    sum9(n.w) === sumVor &&
    n.res.every(Boolean);

  n.ziel = alle;
  stopLauf();

  L(alle
    ? "ZIEL · 9-ECK geschlossen · 9/9 gaben und bekamen · HALT = ZIEL"
    : `9-ECK NICHT geschlossen · offen: ${n.res.map((x, i) => x ? null : ECKEN[i].id).filter(Boolean).join(", ") || "Summe/Anzahl"}`
  );

  bewerte9();
}
