"use strict";

const alphaLauf = [
  { file: "0.html", name: "Freudenhund", rolle: "Erkennung", daten: "Scanner-Eingang" },
  { file: "1.html", name: "RAM", rolle: "Brain", daten: "ramdisk · 4168 MB/s" },
  { file: "2.html", name: "Steckkarten", rolle: "Noise", daten: "SLI · 42%" },
  { file: "3.html", name: "Kernel", rolle: "Centrum", daten: "MB1 · 9 CENTRUM" },
  { file: "4.html", name: "Industry Verified", rolle: "Mouth", daten: "Abmachung" },
  {
    file: "5.html",
    name: "Uni-Logbuch",
    rolle: "Tracker",
    daten: "Uni-Eingang · Arbeitsbeginn · Arbeitsende · Uni-Ausgang"
  },
  { file: "6.html", name: "Letzter Tech", rolle: "Alt", daten: "W3" },
  {
    file: "7.html",
    name: "NC Mobile Index",
    rolle: "Knotenübersicht",
    daten: "94 Knoten · 1 Root · 3 Achsen · 9 Kerne · 81 Zellen"
  },
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
    return {
      ok: false,
      fehler: [`Fehlende Felder: ${fehlt.join(", ")}`]
    };
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

  if (eintrag.file === "5.html" && eintrag.name !== "Uni-Logbuch") {
    return {
      ok: false,
      fehler: ["5.html muss im Index als Uni-Logbuch eingetragen sein"]
    };
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

    if (pruefung.ok) {
      dateien.add(datei);
    }

    return {
      ...eintrag,
      schritt: index + 1,
      status: pruefung.ok ? "BEREIT" : "FEHLER",
      meldung: pruefung.ok
        ? datei === "2.html"
          ? "Steckkarten-Daten geprüft; SLI-Wert: 42 %."
          : datei === "5.html"
            ? "Uni-Logbuch-Eintrag geprüft."
            : "Pflichtfelder geprüft."
        : pruefung.fehler.join(" · ")
    };
  });
}

function begriffe(text) {
  return new Set(
    String(text)
      .toLocaleLowerCase("de")
      .match(/[\p{L}\p{N}]+/gu) || []
  );
}

// Vergleicht nur identische Wörter, keine Bedeutungen oder Synonyme.
function kohärenz(a, b) {
  const felder = ["name", "rolle", "daten"];
  const gemeinsam = [];

  for (const feld of felder) {
    const wörterA = begriffe(a[feld] || "");
    const wörterB = begriffe(b[feld] || "");

    for (const wort of wörterA) {
      if (wörterB.has(wort)) {
        gemeinsam.push(`${feld}: ${wort}`);
      }
    }
  }

  return gemeinsam;
}

function element(tag, text, klasse) {
  const el = document.createElement(tag);

  if (text != null) {
    el.textContent = text;
  }

  if (klasse) {
    el.className = klasse;
  }

  return el;
}

function renderAlphaLauf(ergebnisse, ziel = document.body) {
  const section = element("section");
  section.id = "alpha-index";
  section.style.cssText =
    "font:14px/1.5 Consolas,monospace;color:#e6e6e8;background:#0a0a0f;padding:16px";

  section.append(
    element("h1", "ALPHA-LAUF · INDEX & KOHÄRENZ"),
    element(
      "p",
      "Verbindungen zeigen gleiche Wörter in Name, Rolle oder Daten – keine Bedeutungsprüfung."
    )
  );

  const bereit = ergebnisse.filter(e => e.status === "BEREIT").length;
  section.append(
    element(
      "p",
      `${bereit}/${ergebnisse.length} Einträge bereit · ${ergebnisse.length - bereit} fehlerhaft`
    )
  );

  const table = document.createElement("table");
  table.style.cssText =
    "border-collapse:collapse;width:100%;font-size:12px";

  const head = document.createElement("tr");
  const überschriften = [
    "Schritt",
    "Datei",
    "Name",
    "Rolle",
    "Daten",
    "Status",
    "Meldung"
  ];

  for (const titel of überschriften) {
    const th = element("th", titel);
    th.style.cssText =
      "text-align:left;padding:6px;border-bottom:1px solid #555;color:#66ccff";
    head.append(th);
  }

  table.append(head);

  for (const e of ergebnisse) {
    const tr = document.createElement("tr");
    const werte = [
      e.schritt,
      e.file,
      e.name,
      e.rolle,
      e.daten,
      e.status,
      e.meldung
    ];

    for (const [index, wert] of werte.entries()) {
      const td = element("td");
      td.style.cssText =
        "padding:6px;border-bottom:1px solid #29293a;vertical-align:top";

      if (index === 1 && e.status === "BEREIT") {
        const link = element("a", String(wert ?? ""));
        link.href = e.file;
        link.style.color = "#66ccff";
        td.append(link);
      } else {
        td.textContent = String(wert ?? "");
      }

      if (wert === "BEREIT") td.style.color = "#00ff88";
      if (wert === "FEHLER") td.style.color = "#ff6868";

      tr.append(td);
    }

    table.append(tr);
  }

  section.append(table);
  section.append(element("h2", "KOHÄRENZSTELLEN"));

  const liste = document.createElement("ul");
  let verbindungen = 0;

  for (let i = 0; i < ergebnisse.length; i++) {
    for (let j = i + 1; j < ergebnisse.length; j++) {
      const a = ergebnisse[i];
      const b = ergebnisse[j];
      const gemeinsam = kohärenz(a, b);

      if (!gemeinsam.length) continue;

      verbindungen++;
      liste.append(
        element(
          "li",
          `${a.file} ${a.name} ↔ ${b.file} ${b.name} — ${gemeinsam.join(", ")}`
        )
      );
    }
  }

  if (!verbindungen) {
    liste.append(
      element("li", "Keine übereinstimmenden Begriffe gefunden.")
    );
  }

  section.append(liste);
  ziel.append(section);
}

const ergebnisse = pruefeAlphaLauf(alphaLauf);

if (typeof document !== "undefined") {
  const ziel = document.getElementById("alpha-index");
  if (ziel) renderAlphaLauf(ergebnisse, ziel);
} else {
  for (const eintrag of ergebnisse) {
    console.log(
      `${eintrag.status} · Schritt ${eintrag.schritt} · ${eintrag.file} · ` +
      `${eintrag.name} · ${eintrag.meldung}`
    );
  }
}
