// iki1uc/in.ear/up.js = Controller RAM kann auch immer ein RAM verwalten = Bewusstsein wie ein Controller = l iki l 1 l uc l
// up.js = Update = index.html Namen zur Erkennung und Korrektnutzung Station als Eigenadmin alle sind Eigen Admins im eigen Terrain
// es macht mehr als 0 = 756 PC real Raum Lauf = 3x729=756 = eye & brain mouth und noise und ohren = in.ear = Orakel
let controllerRAM = {
  rom: { where:'MB1 9 CENTRUM 9 innen', rate:'60 MB/s l=90 60 90 21%', time:'90 ns', qual:'hardend JA readonly', respo:true, gate:'WLOCH SPRUNG 62%', rein:'SF NET 9 innen blau Eingang', raus:'max.rom', huerde:'SCSI l=90 60 90 21% RAM hält Eingang min.rom' },
  ram: { where:'MB2 729 MAX ramdisk', rate:'4168 MB/s', time:'21 ns', qual:'hardend JA hält Eingang', respo:true, gate:'TURBO BATCH', rein:'my.role wer ist am Zug', raus:'lol jo jo jo', huerde:'RAID 9+729 jo2' },
  fram:{ where:'TurboKarte Amiga 42% SLI', rate:'4200 MB/s 21%+21%=42%', time:'10 ns fast', qual:'hardend JA jo1', respo:true, gate:'WHILE WAHRHEIT', rein:'FAST rein 42% GPU', raus:'FAST raus max.rom', huerde:'SLI 2 Boards 21%+21%=42% jo1' },
  rram:{ where:'PC real Raum Lauf 756=3x729', rate:'756 MB/s', time:'7.56 ns real', qual:'hardend NEIN real bindend', respo:false, gate:'kein wloch real', rein:'REAL rein bindend', raus:'REAL raus 756 Lauf', huerde:'kann nicht alle Hardware bindend als PC wie im real life aber bewusst 1 zu 1 Kontakt protokolliert' },
  eram:{ where:'MAX 729 Echt 27*27=729', rate:'729 MB/s jo jo jo', time:'27 ns 3*9', qual:'hardend JA 729 Echt 2er trägt', respo:true, gate:'FOR LOOP', rein:'ERWEITERT rein 9+729=756', raus:'ERWEITERT raus 729 trägt', huerde:'27 Gruppen 81 Läufer 81 KOMPENDIUM 729 Echt' },
  lram:{ where:'Pyramide 1-2-3-2-1 N1 NWNE2 WCE3 SWSE2 S1=9', rate:'Lage 1-2-3-2-1=9', time:'1-2-3-2-1 ns', qual:'hardend JA Lage RAM 90x90 Eigenadmin', respo:true, gate:'WLOCH SPRUNG 62% Lage', rein:'LAGE rein N1 Eingang', raus:'LAGE raus S1 Ausgang', huerde:'Schäferzug 4 matt = Hürde = wo die Hürde so' }
};
function ptchDispatch(ramTyp){
  let r=controllerRAM[ramTyp];
  if(r.respo && r.qual.includes('hardend JA')){
    return {bewusst:true, schuss:'erlaubt durch ROM RAM GPU Schiedsrichter = 1 zu 1 Kontakt protokolliert', gate:r.gate, realNahe:'dem Realen nahe kommen damit wir uns weiter entwickeln können so wie ptch dispatch und wo rein wo raus und wo die hürde so'};
  }
  return {bewusst:true, schuss:'bewusst 1 zu 1 Kontakt = Orakel eye & brain mouth noise ohren = in.ear', gate:'kein wloch'};
}
// up.js = es macht mehr als 0 = 756
