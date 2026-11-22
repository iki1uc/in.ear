function stopLauf() {
  if (R.timer !== null) {
    clearInterval(R.timer);
    R.timer = null;
  }
  R.lauf = false;
}

function lauf() {
  if (!R.ein || R.lauf) return;

  if (R.runDone || R.step > 0) {
    R.step = 0;
    R.runDone = false;
    R.tiefen = [];
    R.vec = null;
    R.bew = null;
  }

  R.modus = "lauf";
  R.lauf = true;
  L("LAUF geklickt");

  tick();
  if (R.lauf && R.timer === null) {
    R.timer = setInterval(tick, TAKT);
  }
  melde();
}
