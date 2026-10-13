// Controller RAM kann auch immer ein RAM verwalten = Bewusstsein wie ein Controller
let controllerRAM = {
  rom: { where: 'MB1 9 CENTRUM 9 innen', rate: '60 MB/s l=90 60 90 21%', time: '90 ns Höhe 90', qual: 'hardend JA readonly', respo: true, gate: 'WLOCH SPRUNG 62%', rein: 'SF NET 9 innen blau Eingang', raus: 'max.rom', huerde: 'SCSI Bus l=90 60 90 21% RAM hält Eingang min.rom' },
  ram: { where: 'MB2 729 MAX ramdisk', rate: '4168 MB/s ramdisk', time: '21 ns SLI 21%', qual: 'hardend JA hält Eingang', respo: true, gate: 'TURBO BATCH', rein: 'my.role wer ist am Zug', raus: 'lol jo jo jo', huerde: 'RAID 2 Disks 9+729 jo2' },
  fram: { where: 'TurboKarte Amiga 42% SLI', rate: '4200 MB/s 21%+21%=42%', time: '10 ns fast', qual: 'hardend JA SLI 2 Boards jo1', respo: true, gate: 'WHILE WAHRHEIT', rein: 'FAST rein 42% GPU', raus: 'FAST raus zeigt max.rom', huerde: 'SLI 2 Boards 21%+21%=42% jo1' },
  rram: { where: 'PC real Raum Lauf 756 = 3x729', rate: '756 MB/s 3x729=756', time: '7.56 ns real', qual: 'hardend NEIN real Hardware bindend', respo: false, gate: 'kein wloch real', rein: 'REAL rein Hardware bindend', raus: 'REAL raus PC real Raum Lauf', huerde: 'kann nicht alle Hardware bindend als PC wie im real life aber bewusst 1 zu 1 Kontakt' },
  eram: { where: 'MAX 729 Echt 27*27=729', rate: '729 MB/s 27*27=729 jo jo jo', time: '27 ns 3*9=27', qual: 'hardend JA 729 Echt 2er trägt', respo: true, gate: 'FOR LOOP', rein: 'ERWEITERT rein 9+729=756', raus: 'ERWEITERT raus 729 Echt trägt', huerde: '27 Gruppen 81 Läufer 81 KOMPENDIUM 729 Echt' },
  lram: { where: 'Pyramide 1-2-3-2-1 N 1 NW NE 2 W C E 3 SW SE 2 S 1=9', rate: 'Lage 1-2-3-2-1 = 9', time: '1-2-3-2-1 ns Pyramide', qual: 'hardend JA Lage RAM 90x90 Eigenadmin', respo: true, gate: 'WLOCH SPRUNG 62% Lage', rein: 'LAGE rein N 1 Eingang', raus: 'LAGE raus S 1 Ausgang', huerde: 'Schäferzug 4 matt = Hürde = wo die Hürde so' }
};

// ptch dispatch = wo rein wo raus wo die Hürde
function ptchDispatch(ramTyp, daten){
  let ram = controllerRAM[ramTyp];
  // wo rein = Eingang = SF NET 9 innen blau #00aaff = open.main
  // wo raus = Ausgang = 404.html 729 außen rot #ff0033 = my.role
  // wo die Hürde = gate wloch = WLOCH SPRUNG 62% TURBO BATCH WHILE WAHRHEIT FOR LOOP
  if(ram.respo && ram.qual.includes('hardend JA')){
    // nur respo keinr real hardware nur gate wloch und weiter rechung = dem Realen nahe kommen
    console.log(`ptch ${ramTyp} rein ${ram.rein} rate ${ram.rate} time ${ram.time} raus ${ram.raus} huerde ${ram.huerde} = Schuss erlaubt durch ROM RAM GPU Schiedsrichter = 1 zu 1 Kontakt protokolliert`);
    return { bewusst
