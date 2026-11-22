AXEN.forEach(a => {
  const pruefungen = P[a];
  const ok = pruefungen.filter(x => x[1]).length;
  const n = pruefungen.length;
  const pct = n ? Math.round(ok / n * 100) : 0;

  axes[a] = {
    ok,
    n,
    pct,
    fehlt: pruefungen.filter(x => !x[1]).map(x => x[0])
  };

  sum += pct;
  L(`BEWERTUNG ${a} ${pct}% (${ok}/${n})` +
    (axes[a].fehlt.length ? ` · fehlt: ${axes[a].fehlt.join(" | ")}` : ""));
});
