const alphaLauf = [
  { file: "0.html", name: "Freudenhund", rolle: "Erkennung", daten: "Scanner-Eingang" },
  { file: "1.html", name: "RAM", rolle: "Brain", daten: "ramdisk · 4168 MB/s" },
  { file: "2.html", name: "Steckkarten", rolle: "Noise", daten: "SLI · 42%" },
  { file: "3.html", name: "Kernel", rolle: "Centrum", daten: "MB1 · 9 CENTRUM" },
  { file: "4.html", name: "Industry Verified", rolle: "Mouth", daten: "Abmachung" },
  { file: "5.html", name: "In-Ear Loader", rolle: "Orakel", daten: "In-Ear" },
  { file: "6.html", name: "Letzter Tech", rolle: "Alt", daten: "W3" },
  { file: "7.html", name: "11 zu 7", rolle: "SCSI", daten: "7 Geräte" },
  { file: "8.html", name: "Scanner", rolle: "Eye", daten: "1:1-Scan" }
];

function pruefeEintrag(eintrag) {
  const fehlt = ["file", "name", "rolle", "daten"]
    .filter((feld) => !eintrag[feld]?.trim());

  return {
    ok: fehlt.length === 0,
    fehler: fehlt
  };
}

function fuehreAlphaLaufAus(eintraege) {
  if (!Array.isArray(eintraege) || eintraege.length === 0) {
    throw new Error("Alpha-Lauf benötigt mindestens einen Eintrag.");
  }

  const dateien = new Set();
  const ergebnisse = [];

  for (const eintrag of eintraege) {
    const pruefung = pruefeEintrag(eintrag);

    if (!pruefung.ok) {
      ergebnisse.push({
        ...eintrag,
        status: "FEHLER",
        meldung: `Fehlende Felder: ${pruefung.fehler.join(", ")}`
      });
      continue;
    }

    if (dateien.has(eintrag.file)) {
      ergebnisse.push({
        ...eintrag,
        status: "FEHLER",
        meldung: `Datei doppelt: ${eintrag.file}`
      });
      continue;
    }

    dateien.add(eintrag.file);

    ergebnisse.push({
      ...eintrag,
      status: "BEREIT",
      meldung: `${eintrag.rolle} verarbeitet ${eintrag.daten}`
    });
  }

  return ergebnisse;
}

const ergebnisse = fuehreAlphaLaufAus(alphaLauf);

for (const eintrag of ergebnisse) {
  console.log(
    `${eintrag.status} · ${eintrag.file} · ${eintrag.name} · ` +
    `${eintrag.rolle} · ${eintrag.meldung}`
  );
}
