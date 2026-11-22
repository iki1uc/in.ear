// kern.js — Formeln. Nicht ändern:  WERT = QUOTIENT × ETAGE + REST   ·   9 × 40° = 360° = 1 KREIS
const ETAGEN=[1,3,9,27,81,243,729,2187,6561,19683];
const STEP=40;                 // Grad pro Schritt (1 Atom)
const KREIS=9*STEP;            // 360

function trennung(wert,etage){
  const quotient=Math.floor(wert/etage),rest=wert-quotient*etage;
  return{wert,etage,quotient,rest,mod:wert%etage,geteilt:wert/etage};
}
// pruefe: rechnet WERT = QUOTIENT × ETAGE + REST wirklich nach (und 0 <= REST < ETAGE)
function pruefe(wert,etage){
  const t=trennung(wert,etage);
  t.ok=(t.quotient*etage+t.rest===wert)&&t.rest>=0&&t.rest<etage;
  return t;
}
