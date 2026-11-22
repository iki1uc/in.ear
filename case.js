"use strict";

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

  const pflicht = ["file", "name", "rolle", "daten"];
  const fehlt = pflicht.filter(
    feld => typeof eintrag[feld] !== "string" || !eintrag[feld].trim()
  );

  if (fehlt.length) {
    return { ok: false, fehler: [`Fehlende Felder: ${fehlt.join(", ")}`] };
  }

  if (eintrag.file === "2.html") {
    const korrekt =
      eintrag.name === "Steckkarten" &&
      eintrag.rolle === "Noise" &&
      /\bSLI\b/i.test(eintrag.daten) &&
      /\b42\s*%/.test(eintrag.daten);

    if (!korrekt) {
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
    const p = pruefeEintrag(eintrag);
    const datei = eintrag?.file;

    if (p.ok && dateien.has(datei)) {
      p.ok = false;
      p.fehler.push(`Datei doppelt: ${datei}`);
    }
    if (p.ok) dateien.add(datei);

    return {
      ...eintrag,
      schritt: index + 1,
      status: p.ok ? "BEREIT" : "FEHLER",
      meldung: p.ok
        ? datei === "2.html"
          ? "Steckkarten-Daten geprüft; SLI-Wert: 42 %."
          : "Pflichtfelder geprüft."
        : p.fehler.join(" · ")
    };
  });
}

// Gemeinsamkeiten werden ausdrücklich nur als gleiche Textbegriffe gewertet.
function begriffe(text) {
  return new Set(
    String(text)
      .toLocaleLowerCase("de")
      .match(/[\p{L}\p{N}]+/gu) || []
  );
}

function kohärenz(a, b) {
  const felder = ["name", "rolle", "daten"];
  const gemeinsam = [];

  for (const feld of felder) {
    const A = begriffe(a[feld] || "");
    const B = begriffe(b[feld] || "");
    for (const wort of A) {
      if (B.has(wort)) gemeinsam.push(`${feld}: ${wort}`);
    }
  }

  return gemeinsam;
}

function element(tag, text, klasse) {
  const el = document.createElement(tag);
  if (text != null) el.textContent = text;
  if (klasse) el.className = klasse;
  return el;
}

function renderAlphaLauf(ergebnisse, ziel = document.body) {
  const section = element("section");
  section.id = "alpha-index";
  section.style.cssText =
    "font:14px/1.5 Consolas,monospace;color:#f5f5f5;background:#050505;padding:16px";

  section.append(
    element("h1", "ALPHA-LAUF · INDEX & KOHÄRENZ"),
    element(
      "p",
      "Verbindungen zeigen übereinstimmende Wörter in Name, Rolle oder Daten – keine weitergehende Bedeutungsprüfung."
    )
  );

  const bereit = ergebnisse.filter(x => x.status === "BEREIT").length;
  section.append(element(
    "p",
    `${bereit}/${ergebnisse.length} Einträge bereit · ${ergebnisse.length - bereit} fehlerhaft`
  ));

  const table = document.createElement("table");
  table.style.cssText = "border-collapse:collapse;width:100%;font-size:12px";
  const head = document.createElement("tr");

  for (const titel of ["Schritt", "Datei", "Name", "Rolle", "Daten", "Status", "Meldung"]) {
    const th = element("th", titel);
    th.style.cssText = "text-align:left;padding:6px;border-bottom:1px solid #555;color:#66ccff";
    head.append(th);
  }
  table.append(head);

  for (const e of ergebnisse) {
    const tr = document.createElement("tr");
    const werte = [e.schritt, e.file, e.name, e.rolle, e.daten, e.status, e.meldung];

    for (const wert of werte) {
      const td = element("td", String(wert ?? ""));
      td.style.cssText = "padding:6px;border-bottom:1px solid #222;vertical-align:top";
      if (wert === "BEREIT") td.style.color = "#00ff66";
      if (wert === "FEHLER") td.style.color = "#ff5555";
      tr.append(td);
    }
    table.append(tr);
  }

  section.append(element("h2", "KOHÄRENZSTELLUNGEN"));
  const liste = document.createElement("ul");

  let verbindungen = 0;
  for (let i = 0; i < ergebnisse.length; i++) {
    for (let j = i + 1; j < ergebnisse.length; j++) {
      const a = ergebnisse[i];
      const b = ergebnisse[j];
      const gemeinsam = kohärenz(a, b);
      if (!gemeinsam.length) continue;

      verbindungen++;
      const li = element(
        "li",
        `${a.file} ${a.name} ↔ ${b.file} ${b.name} — ${gemeinsam.join(", ")}`
      );
      liste.append(li);
    }
  }

  if (!verbindungen) {
    liste.append(element("li", "Keine übereinstimmenden Begriffe gefunden."));
  }

  section.append(liste);
  ziel.append(section);
}

const ergebnisse = pruefeAlphaLauf(alphaLauf);

if (typeof document !== "undefined") {
  renderAlphaLauf(ergebnisse);
} else {
  for (const eintrag of ergebnisse) {
    console.log(
      `${eintrag.status} · Schritt ${eintrag.schritt} · ${eintrag.file} · ` +
      `${eintrag.name} · ${eintrag.meldung}`
    );
  }
}
