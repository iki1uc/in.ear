{
  id: "AUSTAUSCH",
  gibt: "Kanten · Übertrag",
  bekommt: "Wert + Regel",
  pruef: "Geben = Bekommen (Summe gleich)",
  f: (n, c, x) =>
    x.gab === x.bekam &&
    sum9(n.w) === x.sumVor &&
    n.last?.von === c &&
    n.last?.nach === (c + 1) % 9
}
