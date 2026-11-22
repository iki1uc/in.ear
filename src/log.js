// log.js — Log wird NUR ANGEHÄNGT. Es gibt absichtlich kein löschen, kein leeren, kein reset.
const LOG=(function(){
  const KEY="nc-asset.log";
  let zeilen=[];
  try{const s=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(s))zeilen=s;}catch{}
  const p=n=>String(n).padStart(2,"0");
  const zeit=()=>{const d=new Date();return p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());};
  const api={
    onAnhaengen:null,
    anhaengen(text){
      const zeile=zeit()+" | "+text;
      zeilen.push(zeile);
      try{localStorage.setItem(KEY,JSON.stringify(zeilen));}catch{}
      if(api.onAnhaengen)api.onAnhaengen(zeile);
      return zeile;
    },
    lesen(){return zeilen.slice();},
    alsDatei(){
      const blob=new Blob([zeilen.join("\n")+"\n"],{type:"text/plain;charset=utf-8"});
      const a=document.createElement("a");
      a.href=URL.createObjectURL(blob);a.download="NC-LOG.txt";
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    }
  };
  return api;
})();
