// runtime.js — NC.OS 6Y-RUNTIME · 3 Projekte → 1 · EINGANG → LAUF → AUSGANG · alles NUR per Klick
// Als gegeben genommen (nicht verändert): WERT = QUOTIENT × ETAGE + REST · 9 × 40° = 360° · HALT = ZIEL
//   NC-ASSET: Etagen, 1 Atom = 40°, RUN 13   ·   PENTA.GRAM: gerade = voller Schub, ungerade beugen (je 40°)   ·   NC-729: 9×9×9, HOME 40
const FAST=/[?&]fast=1/.test(location.search),TAKT=FAST?5:700,UHR=FAST?40:1000;
const HOME=40,MITTE=364,ENDE=728;
const posOf=(i,j,k)=>(k-1)*81+(i-1)*9+(j-1);
const cellOf=p=>({k:Math.floor(p/81)+1,i:Math.floor((p%81)/9)+1,j:p%9+1});
const cid=c=>c.i+"-"+c.j+"-"+c.k;
const isEven=v=>((v%2)+2)%2===0;
function vektor(values){
  const od=values.filter(v=>!isEven(v)),schub=values.filter(isEven).reduce((a,b)=>a+b,0),bs=od.reduce((a,b)=>a+b,0);
  const w=(od.length*STEP)%KREIS,r=w*Math.PI/180;
  return{schub,ungerade:od.length,winkel:w,x:schub*Math.cos(r),y:schub*Math.sin(r),probe:schub+bs===values.reduce((a,b)=>a+b,0)};
}
const AXEN=["LAUF","FELD","ORT","HOME","ABHÄNGIGKEITEN","WERTE"];
const R={modus:"lauf",n9:null,umlaeufe:0,bew9:null,ein:false,timer:null,clock:null,lauf:false,step:0,runDone:false,runs:0,atome:0,sAtome:0,winkel:0,wert:81,pos:HOME,zoom:4,
  cv:{},tiefen:[],vec:null,homeSet:false,tEin:0,bew:null,hist:[],onChange:null};
const melde=()=>{if(R.onChange)R.onChange();};
const L=t=>LOG.anhaengen(t);

function atom(){R.atome++;R.sAtome++;R.winkel=(R.winkel+STEP)%KREIS;if(R.atome%9===0)L(`KREIS ${R.atome/9} | 9 × ${STEP}° = ${KREIS}°`);}

// ---- ABHÄNGIGKEITEN: jede mit echter Prüfung; "fällig" erst, wenn sie gelten muss ----
function deps(){
  const t=R.tiefen,fertig=R.runDone;
  return[
   {id:"D1",text:"LAUF ← EINGANG",faellig:R.step>0||fertig,ok:R.tEin>0},
   {id:"D2",text:"ORT ← HOME",faellig:R.ein||R.step>0,ok:R.homeSet},
   {id:"D3",text:"FELD ← ORT (Zellen liegen im Feld 1–9)",faellig:t.length>0,ok:t.every(x=>{const c=cellOf(posOf(...x.cell.split("-").map(Number)));return c.i>=1&&c.i<=9&&c.j>=1&&c.j<=9&&c.k>=1&&c.k<=9;})},
   {id:"D4",text:"WERTE ← FELD (Zellwert = Rest)",faellig:t.length>0,ok:t.every(x=>R.cv[x.cell]===x.rest)},
   {id:"D5",text:"BEWERTUNG ← WERTE (Vector-Probe)",faellig:fertig,ok:!!R.vec&&R.vec.probe},
   {id:"D6",text:"AUSGANG ← LAUF (Lauf vollständig)",faellig:fertig,ok:fertig},
   {id:"D7",text:"UHR ← EINGANG",faellig:R.ein,ok:R.clock!==null}
  ].map(d=>({...d,status:d.faellig?(d.ok?"✓":"✗"):"–"}));
}
// ---- BEWERTUNG: GERECHT = jede Achse nach derselben Regel (bestandene / alle Prüfungen), gleiches Gewicht 1/6 ----
function achsenPruefungen(){
  const t=R.tiefen,d=deps().filter(x=>x.faellig),c=cellOf(R.pos);
  return{
   "LAUF":[["EINGANG genommen",R.tEin>0],["13 Schritte vollständig",R.runDone&&R.step===13],["9 × 40° = 360°",9*STEP===360],["Rückkopplung angewendet",R.runDone]],
   "FELD":[["9 Ebenen beschrieben",t.length===9&&t.every((x,i)=>R.cv[x.cell]!==undefined&&x.cell.endsWith("-"+(i+1)))],["Zellwert = Rest",t.every(x=>R.cv[x.cell]===x.rest)],["Zellwerte ≥ 0",t.every(x=>R.cv[x.cell]>=0)]],
   "ORT":[["Position 0–728",Number.isInteger(R.pos)&&R.pos>=0&&R.pos<=ENDE],["Zelle rechnet zurück",posOf(c.i,c.j,c.k)===R.pos],["Ort im Feld",[c.i,c.j,c.k].every(v=>v>=1&&v<=9)]],
   "HOME":[["HOME 40 = 5-5-1",cid(cellOf(HOME))==="5-5-1"],["Start am HOME",R.homeSet],["HOME im Raum",HOME>=0&&HOME<=ENDE]],
   "ABHÄNGIGKEITEN":[["alle fälligen erfüllt",d.length>0&&d.every(x=>x.ok)],["mindestens eine fällig",d.length>0]],
   "WERTE":[["WERT = Q × E + R in allen 9 Etagen",t.length===9&&t.every(x=>x.ok)],["Vector-Probe",!!R.vec&&R.vec.probe],["WERT ≥ 1",R.wert>=1]]
  };
}
function bewerte(){
  if(!R.tiefen.length){L("BEWERTUNG · nicht bewertet (noch kein Schritt im Feld)");R.bew=null;return null;}
  const P=achsenPruefungen(),axes={};let sum=0;
  AXEN.forEach(a=>{const ok=P[a].filter(x=>x[1]).length,n=P[a].length,pct=Math.round(ok/n*100);axes[a]={ok,n,pct,fehlt:P[a].filter(x=>!x[1]).map(x=>x[0])};sum+=pct;L(`BEWERTUNG ${a} ${pct}% (${ok}/${n})${axes[a].fehlt.length?" · fehlt: "+axes[a].fehlt.join(" | "):""}`);});
  const total=Math.round(sum/AXEN.length),ms=R.tEin?Date.now()-R.tEin:0;
  R.bew={axes,total,atome:R.sAtome,ms,msProAtom:R.sAtome?Math.round(ms/R.sAtome):0};
  R.hist.push({t:new Date().toISOString(),total,atome:R.sAtome});R.hist=R.hist.slice(-50);
  L(`BEWERTUNG GESAMT ${total}% · gerecht: 6 Achsen, gleiche Regel, Gewicht je 1/6 · ${R.sAtome} Atome`);return R.bew;
}

// ---- LAUF: 13 Schritte = BOHRER · 9 TIEFEN · AUFFÄNGER · RÜCKKOPPLUNG · ZIEL ----
function schritt(){
  const s=R.step++;
  if(s===0){R.tiefen=[];R.vec=null;R.zoom=0;L(`LAUF 13 · BOHRER setzt an · WERT ${R.wert} · ORT ${cid(cellOf(R.pos))}`);}
  else if(s<=9){
    const E=ETAGEN[s],t=pruefe(R.wert,E),n=t.rest%81,i=Math.floor(n/9)+1,j=n%9+1,cell=i+"-"+j+"-"+s;
    R.zoom=s;R.pos=posOf(i,j,s);R.cv[cell]=t.rest;R.tiefen.push({t:s,E,q:t.quotient,rest:t.rest,ok:t.ok,cell});
    L(`TIEFE ${s}/9 · ETAGE ${E} · ${t.quotient} × ${E} + ${t.rest} = ${R.wert} ${t.ok?"✓":"✗ FEHLER"} · ORT ${cell} · FELD = ${t.rest}`);}
  else if(s===10){R.vec=vektor(R.tiefen.map(x=>x.rest));
    L(`AUFFÄNGER · ${R.tiefen.filter(x=>x.ok).length}/9 ✓ · Schub ${R.vec.schub} · Beugung ${R.vec.ungerade}×${STEP}°=${R.vec.winkel}° · Probe ${R.vec.probe?"✓":"✗"}`);}
  else if(s===11){const a=R.wert;R.wert=(R.wert*7+13)%999+1;L(`RÜCKKOPPLUNG · WERT ${a} → ${R.wert}`);}
  else{R.runDone=true;R.runs++;stopLauf();L(`ZIEL · LAUF ${R.runs} fertig (1+9+1+1+1) · HALT = ZIEL`);bewerte();}
}
function tick(){if(!R.lauf)return;atom();if(R.modus==="umlauf")schritt9();else schritt();melde();}
function stopLauf(){clearInterval(R.timer);R.timer=null;R.lauf=false;}

// ---- EINGANG / AUSGANG ----
function eingang(){
  if(R.ein)return;
  const ok=pruefe(81,3).ok&&pruefe(729,729).ok&&9*STEP===360&&ETAGEN.length===10;
  if(!ok){L("EINGANG abgelehnt · Kern-Formeln stimmen nicht");melde();return;}
  R.ein=true;R.tEin=Date.now();R.sAtome=0;R.pos=HOME;R.homeSet=true;R.zoom=4;R.step=0;R.runDone=false;R.tiefen=[];R.vec=null;R.bew=null;R.bew9=null;R.modus="lauf";R.n9=neu9();
  R.clock=setInterval(melde,UHR);
  L(`EINGANG geklickt · HOME ${HOME} = ${cid(cellOf(HOME))} · Uhr läuft`);melde();
}
function lauf(){
  if(!R.ein||R.lauf)return;
  if(R.runDone||R.step>0){R.step=0;R.runDone=false;R.tiefen=[];R.vec=null;R.bew=null;}
  R.modus="lauf";R.lauf=true;L("LAUF geklickt");tick();if(R.lauf)R.timer=setInterval(tick,TAKT);melde();
}
function ausgang(){
  if(!R.ein)return;
  const lief=R.lauf;stopLauf();L("HALT geklickt. HALT = ZIEL"+(lief?" · "+(R.modus==="umlauf"?"Umlauf bei Ecke "+R.n9.step+"/9":"Lauf bei Schritt "+R.step+"/13")+" angehalten":""));
  if(R.modus==="umlauf"){if(!R.bew9)bewerte9();}else if(!R.bew)bewerte();
  const ms=Date.now()-R.tEin;
  clearInterval(R.clock);R.clock=null;R.ein=false;R.pos=HOME;
  L(`AUSGANG · Zeit ${fmtMs(ms)} · ${R.sAtome} Atome · ${R.runs} Läufe · Bewertung ${aktBew()?aktBew().total+"%":"nicht bewertet"} · ORT zurück auf HOME`);melde();
}
const aktBew=()=>R.modus==="umlauf"?R.bew9:R.bew;
const p2=n=>String(n).padStart(2,"0");
const fmtMs=ms=>{ms=Math.max(0,ms);return p2(Math.floor(ms/3600000))+":"+p2(Math.floor(ms%3600000/60000))+":"+p2(Math.floor(ms%60000/1000));};
const uhr=()=>{const d=new Date();return p2(d.getHours())+":"+p2(d.getMinutes())+":"+p2(d.getSeconds());};
function geheZu(p,name){if(!R.ein||R.lauf)return;R.pos=p;L(`ORT → ${name} · ${cid(cellOf(p))} · Position ${p}`);melde();}

// ---- Speichern / Export / Import ----
const KEYS=["wert","atome","runs","pos","zoom","cv","hist","umlaeufe"];
function stand(){const o={};KEYS.forEach(k=>o[k]=R[k]);return o;}
function validStand(d){return d&&Number.isInteger(d.wert)&&d.wert>=1&&Number.isInteger(d.atome)&&d.atome>=0&&Number.isInteger(d.runs)&&d.runs>=0&&Number.isInteger(d.pos)&&d.pos>=0&&d.pos<=ENDE&&Number.isInteger(d.zoom)&&d.zoom>=0&&d.zoom<=9&&d.cv&&typeof d.cv==="object"&&!Array.isArray(d.cv)&&Object.entries(d.cv).every(([k,v])=>/^[1-9]-[1-9]-[1-9]$/.test(k)&&Number.isFinite(v))&&Array.isArray(d.hist)&&(d.umlaeufe===undefined||Number.isInteger(d.umlaeufe));}
function speichere(){try{localStorage.setItem("nc-runtime",JSON.stringify(stand()));}catch{}}
(function lade(){try{const d=JSON.parse(localStorage.getItem("nc-runtime"));if(validStand(d))KEYS.forEach(k=>{if(d[k]!==undefined)R[k]=d[k];});}catch{}R.winkel=(R.atome*STEP)%KREIS;})();
function save(){L("SAVE geklickt · NC-STATE.json");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({version:2,exported:new Date().toISOString(),state:stand(),log:LOG.lesen()},null,2)],{type:"application/json"}));a.download="NC-STATE.json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function ladeDatei(obj,name){
  if(R.ein){L(`LOAD abgelehnt · ${name} · erst AUSGANG nehmen`);return melde();}
  if(!obj||obj.version!==2||!validStand(obj.state)||!Array.isArray(obj.log)||!obj.log.every(z=>typeof z==="string")){L(`LOAD abgelehnt · ${name} · ungültiges Format`);return melde();}
  KEYS.forEach(k=>{if(obj.state[k]!==undefined)R[k]=obj.state[k];});R.winkel=(R.atome*STEP)%KREIS;R.bew=null;R.tiefen=[];R.runDone=false;R.step=0;speichere();
  const have=new Set(LOG.lesen().map(z=>z.slice(11)));
  L(`LOAD · ${name} · Stand geladen (Atome ${R.atome}, Läufe ${R.runs}, WERT ${R.wert})`);
  obj.log.slice(-300).filter(z=>!have.has(z.slice(11))).forEach(z=>L("IMPORT · "+String(z).slice(0,200)));   // nur anhängen
  melde();
}
function ladeAusFeld(f){if(!f)return;const r=new FileReader();r.onload=()=>{try{ladeDatei(JSON.parse(r.result),f.name);}catch{L(`LOAD abgelehnt · ${f.name} · kein gültiges JSON`);melde();}};r.readAsText(f);}
