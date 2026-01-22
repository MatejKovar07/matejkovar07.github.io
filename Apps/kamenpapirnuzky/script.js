function play(player) {
  const p = parseInt(player);
  const computer = Math.floor(Math.random() * 5);

  document.getElementById("your-img").src = `images/${p}.png`;
  document.getElementById("comp-img").src = `images/${computer}.png`;

  document.getElementById("result").textContent = getResult(p, computer);
}

function getResult(p, c) {
  if (p === c) return "Remíza!";

  // Logika: Klíč vyhrává nad hodnotami v poli
  const win = {
    0: [1, 4], // Kámen tupí Nůžky a drtí Tapíra
    1: [2, 4], // Nůžky stříhají Papír a dekapitují Tapíra
    2: [0, 3], // Papír balí Kámen a usvědčuje Spocka
    3: [0, 1], // Spock vypořádá Kámen a rozbíjí Nůžky
    4: [2, 3]  // Tapír (Ještěr) jí Papír a otráví Spocka
  };

  // Kontrola, zda volba počítače 'c' je v seznamu poražených pro hráče 'p'
  return win[p].includes(c) ? "Vyhrál jsi" : "Prohrál jsi";
}