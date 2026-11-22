// Log wird nur angehängt: keine Lösch-, Leer- oder Reset-Funktion.
const LOG = (() => {
  const KEY = "nc-asset.log";
  let zeilen = [];

  try {
    const gespeicherte = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(gespeicherte)) {
      zeilen = gespeicherte.filter(x => typeof x === "string");
    }
  } catch {
    // Beschädigte oder nicht verfügbare Speicherung ignorieren.
  }

  const p = n => String(n).padStart(2, "0");

  function zeit() {
    const d = new Date();
    return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }

  const api = {
    onAnhaengen: null,

    anhaengen(text) {
      const inhalt = String(text);
      const zeile = `${zeit()} | ${inhalt}`;

      zeilen.push(zeile);

      try {
        localStorage.setItem(KEY, JSON.stringify(zeilen));
      } catch {
        // Der Eintrag bleibt bis zum Neuladen im Arbeitsspeicher.
      }

      try {
        if (typeof api.onAnhaengen === "function") {
          api.onAnhaengen(zeile);
        }
      } catch (err) {
        console.error("LOG.onAnhaengen ist fehlgeschlagen:", err);
      }

      return zeile;
    },

    lesen() {
      return zeilen.slice();
    },

    alsDatei() {
      const blob = new Blob(
        [zeilen.length ? zeilen.join("\n") + "\n" : ""],
        { type: "text/plain;charset=utf-8" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "NC-LOG.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return api;
})();
