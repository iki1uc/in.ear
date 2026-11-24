"use strict";
// case.js V3 — Basis = NEU (flexibel), + Vollständigkeit 0–9, + textContent statt innerHTML.
// Prüft Struktur + Vollständigkeit. Prüft KEINEN alten Wortlaut (kein SLI 42 %-Zwang).
// Nur wenn du einen Inhalt bewusst verbindlich willst, trage ihn hier als eigene Regel ein — nicht als versteckten Test.
const alphaLauf = [
  { file: "0.html", name: "Freudenhund", rolle: "Erkennung", daten: "Scanner-Eingang" },
  { file: "1.html", name: "RAM", rolle: "Brain", daten: "ramdisk" },
  { file: "2.html", name: "Steckkarten", rolle: "Noise", daten: "Steckkarten" },
  { file: "3.html", name: "Kernel", rolle: "Centrum", daten: "Kernel" },
  { file: "4.html", name: "Industry Verified", rolle: "Mouth", daten: "Abmachung" },
  { file: "5.html", name: "Uni-Logbuch", rolle: "Tracker", daten: "Logbuch" },
  { file: "6.html", name: "CORE · NEU", rolle: "Kompetenz", daten: "XP · Elo · AUA · SEMARG · 729" },
  { file: "7.html", name: "NC Mobile Index", rolle: "Knotenübersicht", daten: "Mobile Index" },
  { file: "8.html", name: "Scanner", rolle: "Eye", daten: "1:1-Scan" },
  { file: "9.html", name: "ZOOM · WHIRL", rolle: "Bewegung", daten: "3 · 9 · 81" },
];
const ERWARTET = Array.from({ length: 10 }, (_, i) => i + ".html");
function pruefeEintrag(e){
  if(!e||typeof e!=="object") return {ok:false,fehler:["Eintrag ist kein Objekt"]};
  const fehlt=["file","name","rolle","daten"].filter(f=>typeof e[f]!=="string"||!e[f].trim());
  if(fehlt.length) return {ok:false,fehler:["Fehlt: "+fehlt.join(", ")]};
  if(!/^[0-9]\.html$/.test(e.file)) return {ok:false,fehler:["file muss 0.html–9.html sein, ist: "+e.file]};
  return {ok:true,fehler:[]};
}
function pruefeAlphaLauf(liste){
  if(!Array.isArray(liste)||!liste.length) throw new Error("Alpha-Lauf braucht Einträge.");
  const gesehen=new Set();
  const ergebnisse=liste.map((e,i)=>{
    const p=pruefeEintrag(e);
    if(p.ok&&gesehen.has(e.file)){p.ok=false;p.fehler.push("Datei doppelt: "+e.file);}
    if(p.ok) gesehen.add(e.file);
    return {...e,schritt:i+1,status:p.ok?"BEREIT":"FEHLER",meldung:p.ok?"Struktur geprüft.":p.fehler.join(" · ")};
  });
  // Vollständigkeit: genau 0.html–9.html, alle einmal, alle BEREIT
  const vorhanden=new Set(ergebnisse.filter(e=>e.status==="BEREIT").map(e=>e.file));
  const fehlend=ERWARTET.filter(f=>!vorhanden.has(f));
  const extra=ergebnisse.filter(e=>!ERWARTET.includes(e.file)).map(e=>e.file);
  return {ergebnisse, fehlend, extra, vollstaendig: fehlend.length===0 && extra.length===0 && ergebnisse.length===10};
}
const {ergebnisse, fehlend, extra, vollstaendig} = pruefeAlphaLauf(alphaLauf);
const bereit=ergebnisse.filter(e=>e.status==="BEREIT").length;
if(typeof document!=="undefined"){
  const s=document.createElement("section");s.id="alpha-index";s.style.cssText="font:14px/1.5 Consolas,monospace;color:#e6e6e8;background:#0a0a0f;padding:16px";
  const h=document.createElement("h1");h.textContent="ALPHA-LAUF · "+bereit+"/"+ergebnisse.length+" BEREIT · Vollständig: "+(vollstaendig?"JA":"NEIN");s.append(h);
  const p=document.createElement("p");p.textContent="Prüft Struktur + Vollständigkeit 0–9. Kein alter Wortlaut. Fehlt: "+(fehlend.length?fehlend.join(", "):"—")+" · Extra: "+(extra.length?extra.join(", "):"—");s.append(p);
  const ul=document.createElement("ul");ergebnisse.forEach(e=>{const li=document.createElement("li");li.textContent=e.schritt+" · "+e.file+" · "+e.name+" · "+e.status+" · "+e.meldung;ul.append(li);});s.append(ul);
  document.body.append(s);
}else{
  console.log("BEREIT "+bereit+"/"+ergebnisse.length+" · Vollständig: "+vollstaendig);
  if(fehlend.length) console.log("FEHLT: "+fehlend.join(", "));
  if(extra.length) console.log("EXTRA: "+extra.join(", "));
  ergebnisse.forEach(e=>console.log(e.status+" · "+e.file+" · "+e.name+" · "+e.meldung));
}
