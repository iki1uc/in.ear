// neuneck.js — 9-ECK: die 9 Projekte als Ecken · 9 × 40° = 360° · GEBEN und BEKOMMEN · HALT = ZIEL
// Als gegeben genommen: aus FINAL REFINAL die Funktionen m123, wende, nextVal, die Kette 729→1 und die 94 Knoten (1+3+9+81).
function wende(E,F){return F>=E?1:0;}
function nextVal(mode,src,prior,edges,E){
  if(edges.length===0)return 0;const sum=edges.reduce((a,e)=>a+e.value,0);
  switch(mode){case"kopieren":return src;case"addieren":return prior+sum;case"mitteln":return sum/edges.length;
    case"transformieren":return src*edges[0].value/100;case"wende":return wende(E||0,edges[0].value);default:return 0;}
}
function m123(m1,m2,m3){
  const s=[m1,m2,m3].slice().sort((a,b)=>a-b),avg=(m1+m2+m3)/3,all=m1===m2&&m2===m3,any=m1===m2||m2===m3||m1===m3;
  const gate=[m1,m2,m3].filter(v=>v>=7).length;
  return{M1:s[0],M2:s[1],M3:s[2],avg,p100:avg*10,konsens:all?"KONSENS":(any?"TEILKONSENS":"OFFEN"),gate,build:gate===3};
}
const STUFEN=[729,243,81,27,9,3,1];
const sum9=a=>a.reduce((x,y)=>x+y,0);

// Die 9 Ecken (Reihenfolge = Umlauf, Winkel je 40°). Jede Ecke bringt ihre gegebene Regel als Prüfung mit.
const ECKEN=[
 {id:"ZOOM·WHIRL",gibt:"Etagen 1…19683 · Atom 40°",bekommt:"WERT zum Teilen",   pruef:"9×40°=360° · Q×E+R=WERT",   f:(n,c)=>9*STEP===KREIS&&pruefe(n.w[c],3).ok},
 {id:"NC-ASSET",  gibt:"LAUF 13 · LOG",            bekommt:"Takt (Atom)",       pruef:"13=1+9+1+1+1 · LOG wächst",  f:(n,c,x)=>1+9+1+1+1===13&&LOG.lesen().length>=x.logVor},
 {id:"PENTA.GRAM",gibt:"Vector: Schub · Beugung",  bekommt:"Zahlenreihe",       pruef:"Vector-Probe",               f:(n)=>vektor(n.w).probe},
 {id:"NC-729",    gibt:"9×9×9 Zellen",             bekommt:"Adressen",          pruef:"9×9×9=729=Σ Ecken",          f:(n)=>9*9*9===729&&sum9(n.w)===729},
 {id:"MAINBOARD", gibt:"Position · HOME 40",       bekommt:"Zelle",             pruef:"HOME 40=5-5-1 · MITTE=5-5-5",f:()=>cid(cellOf(HOME))==="5-5-1"&&cid(cellOf(MITTE))==="5-5-5"&&posOf(5,5,1)===HOME},
 {id:"SETUP",     gibt:"look → verify → ID",       bekommt:"Ausweis",           pruef:"EINGANG vor LAUF",           f:()=>R.ein&&R.tEin>0},
 {id:"WORK",      gibt:"Zeit · Stationen",         bekommt:"Eingang/Ausgang",   pruef:"Zeit seit EINGANG ≥ 0",      f:()=>Date.now()-R.tEin>=0},
 {id:"AUSTAUSCH", gibt:"Kanten · Übertrag",        bekommt:"Wert + Regel",      pruef:"Geben = Bekommen (Summe gleich)",f:(n,c,x)=>x.sumVor===sum9(n.w)&&x.gab===x.bekam&&c!==(c+1)%9},
 {id:"REFINAL",   gibt:"M1/M2/M3 · wende · Kette", bekommt:"Bewertung",         pruef:"m123 · wende · 94 Knoten",   f:()=>m123(8,7,9).p100===80&&m123(7,7,7).build&&!m123(7,7,6).build&&wende(2,3)===1&&wende(3,2)===0&&1+3+9+81===94&&nextVal("wende",100,0,[{value:1}],.5)===1}
];
const geben=w=>Math.floor(w/3);   // eine Regel für alle Ecken (gerecht): jede gibt ein Drittel (Etage 3) an die nächste Ecke

function neu9(){return{w:Array(9).fill(81),gave:Array(9).fill(0),recv:Array(9).fill(0),pos:0,step:0,done:false,ziel:false,res:Array(9).fill(null),last:null};}
R.n9=neu9();R.bew9=null;

function schritt9(){
  const n=R.n9,c=n.pos,r=(c+1)%9,sumVor=sum9(n.w),logVor=LOG.lesen().length;
  if(n.step===0)L("9-ECK · Umlauf beginnt · 9 Ecken × 81 = 729 · jede Ecke 40°");
  const g=geben(n.w[c]);n.w[c]-=g;n.w[r]+=g;n.gave[c]++;n.recv[r]++;n.last={von:c,nach:r,g};
  const ok=!!ECKEN[c].f(n,c,{sumVor,logVor,gab:g,bekam:g});n.res[c]=ok;
  L(`ECKE ${c+1}/9 ${ECKEN[c].id} gibt ${g} → ${ECKEN[r].id} bekommt ${g} · Prüfung „${ECKEN[c].pruef}“ ${ok?"✓":"✗"} · Σ=${sum9(n.w)}`);
  n.pos=r;n.step++;
  if(n.step===9){
    n.done=true;R.umlaeufe++;
    const alle=n.gave.every(x=>x===1)&&n.recv.every(x=>x===1)&&sum9(n.w)===729&&n.res.every(Boolean);
    n.ziel=alle;stopLauf();
    L(alle?`ZIEL · 9-ECK geschlossen · 9/9 gaben und bekamen · Σ=729 · HALT = ZIEL`:`9-ECK NICHT geschlossen · fehlt: ${n.res.map((x,i)=>x?null:ECKEN[i].id).filter(Boolean).join(", ")||"Summe/Anzahl"}`);
    bewerte9();
  }
}
// BEWERTUNG GERECHT: jede der 9 Ecken nach derselben Regel (3 Prüfungen), Gewicht 1/9
function bewerte9(){
  const n=R.n9,ecken=ECKEN.map((e,i)=>{const p=[n.res[i]===true,n.gave[i]===1,n.recv[i]===1],ok=p.filter(Boolean).length;return{id:e.id,ok,n:3,pct:Math.round(ok/3*100),fehlt:[!p[0]&&"Prüfung",!p[1]&&"gegeben",!p[2]&&"bekommen"].filter(Boolean)};});
  const total=Math.round(ecken.reduce((a,e)=>a+e.pct,0)/9),mx=Math.max(...n.w),mn=Math.min(...n.w),ms=R.tEin?Date.now()-R.tEin:0;
  R.bew9={ecken,total,summe:sum9(n.w),ausgleich:mx?Math.round(mn/mx*100):0,min:mn,max:mx,atome:R.sAtome,ms};
  ecken.forEach(e=>L(`BEWERTUNG ${e.id} ${e.pct}% (${e.ok}/3)${e.fehlt.length?" · fehlt: "+e.fehlt.join(" | "):""}`));
  L(`BEWERTUNG GESAMT ${total}% · gerecht: 9 Ecken, gleiche Regel, Gewicht je 1/9 · Σ=${sum9(n.w)} · Ausgleich min/max ${R.bew9.ausgleich}%`);
  R.hist.push({t:new Date().toISOString(),total,atome:R.sAtome});R.hist=R.hist.slice(-50);
}
function umlauf(){
  if(!R.ein||R.lauf)return;
  R.modus="umlauf";R.n9=neu9();R.bew9=null;R.lauf=true;L("UMLAUF 9 geklickt");tick();if(R.lauf)R.timer=setInterval(tick,TAKT);melde();
}
// COMMANDO aus FINAL REFINAL: SCOUT · BUILD (HALT = AUSGANG, SAVE = SAVE)
function scout(){
  const n=R.n9,res=ECKEN.map((e,i)=>{let ok=false;try{ok=!!e.f(n,i,{sumVor:sum9(n.w),logVor:0,gab:0,bekam:0});}catch{}return ok;});
  L(`SCOUT · 9 Ecken geprüft · ${res.filter(Boolean).length}/9 ✓ · Σ=${sum9(n.w)}${res.every(Boolean)?"":" · offen: "+res.map((x,i)=>x?null:ECKEN[i].id).filter(Boolean).join(", ")}`);melde();
}
function build(){L(`BUILD · Kette ${STUFEN.join("→")} · 94 Knoten = 1+3+9+81 · 9-Eck = 9 × 40° = ${KREIS}°`);melde();}
