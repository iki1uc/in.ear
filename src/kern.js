function trennung(wert, etage) {
  if (!Number.isFinite(wert) || !Number.isFinite(etage) ||
      wert < 0 || etage <= 0) {
    throw new RangeError("wert muss ≥ 0 und etage muss > 0 sein.");
  }

  const quotient = Math.floor(wert / etage);
  const rest = wert - quotient * etage;

  return {
    wert,
    etage,
    quotient,
    rest,
    mod: wert % etage,
    geteilt: wert / etage
  };
}

function pruefe(wert, etage) {
  const t = trennung(wert, etage);
  t.ok =
    t.quotient * etage + t.rest === wert &&
    t.rest >= 0 &&
    t.rest < etage;
  return t;
}
