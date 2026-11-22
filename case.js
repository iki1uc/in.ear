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

for (const lauf of alphaLauf) {
  console.log(`Alpha Lauf ${lauf.file} · ${lauf.name} · ${lauf.rolle} · ${lauf.daten}`);
}
