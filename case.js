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
  if (!eintrag || typeof eintrag !== "object") {
    return { ok: false, fehler: ["Eintrag ist kein Objekt"] };
  }

  const pflichtfelder = ["file", "name", "rolle", "daten"];
  const fehlt = pflichtfelder.filter(
    feld => typeof eintrag[feld] !== "string" || !eintrag[feld].trim()
  );

  if (fehlt.length) {
    return { ok: false, fehler: [`Fehlende Felder: ${fehlt.join(", ")}`] };
  }

  // Spezifische Plausibilitätsprüfung für 2.html.
  if (eintrag.file === "2.html") {
    const istSteckkartenSchritt =
      eintrag.name === "Steckkarten" &&
      eintrag.rolle === "Noise" &&
      /\bSLI\b/i.test(eintrag.daten) &&
      /\b42\s*%/.test(eintrag.daten);

    if (!istSteckkartenSchritt) {
      return {
        ok: false,
        fehler: ["2.html erwartet Steckkarten, Noise und den SLI-Wert 42 %"]
      };
    }
  }

  return { ok: true, fehler: [] };
}

function pruefeAlphaLauf(eintraege) {
  if (!Array.isArray(eintraege) || eintraege.length === 0) {
    throw new Error("Alpha-Lauf benötigt mindestens einen Eintrag.");
  }

  const dateien = new Set();

  return eintraege.map((eintrag, index) => {
    const pruefung = pruefeEintrag(eintrag);
    const datei = eintrag?.file;

    if (pruefung.ok && dateien.has(datei)) {
      pruefung.ok = false;
      pruefung.fehler.push(`Datei doppelt: ${datei}`);
    }

    if (pruefung.ok) dateien.add(datei);

    return {
      ...eintrag,
      schritt: index + 1,
      status: pruefung.ok ? "BEREIT" : "FEHLER",
      meldung: pruefung.ok
        ? datei === "2.html"
          ? "Steckkarten-Daten geprüft; SLI-Wert: 42 %."
          : "Pflichtfelder geprüft."
        : pruefung.fehler.join(" · ")
    };
  });
}

const ergebnisse = pruefeAlphaLauf(alphaLauf);

for (const eintrag of ergebnisse) {
  console.log(
    `${eintrag.status} · Schritt ${eintrag.schritt} · ` +
    `${eintrag.file} · ${eintrag.name} · ${eintrag.meldung}`
  );
}
