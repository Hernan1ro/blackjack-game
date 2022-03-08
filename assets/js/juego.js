const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    letras = ["A", "J", "K", "Q"];
  // let puntosJugador = 0,
  //   puntosComputadora = 0;
  let puntosJugadores = [];

  //referencias del html
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevoJuego = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    smalls = document.querySelectorAll("small");

  //Esta funcion incicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    smalls.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerText = ""));
    btnDetener.disabled = false;
    btnPedir.disabled = false;
  };

  // funcion crea un nuevo deck
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      // for (let j = 0; j < tipos.length; j++) {
      //   deck.push(i + tipos[j]);
      // }
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let letra of letras) {
        deck.push(letra + tipo);
      }
    }
    return _.shuffle(deck);
  };

  // esta funcion me permite tomar una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el Deck";
    }
    return deck.shift();
  };

  // console.log(pedirCarta());

  // funcion valor carta

  // const valorCarta = (carta) => {
  //   const valor = carta.substring(0, carta.length - 1);
  //   let puntos = 0;
  //   if (isNaN(valor)) {
  //     puntos = valor === "A" ? 11 : 10;
  //   } else {
  //     console.log("es un numero");
  //     puntos = valor * 1;
  //   }
  //   console.log(puntos);
  // };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    // let puntos = 0;
    // puntos =
    //   isNaN(valor) == true
    //     ? (puntos = valor === "A" ? 11 : 10)
    //     : (puntos = valor * 1);
    // console.log({ puntos });
  };

  //  turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    smalls[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie Gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Genial! Has ganado");
      } else {
        alert("Computadora Gana");
      }
    }, 500);
  };

  //Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  // valor = valorCarta(pedirCarta());
  // // console.log({ valor });

  // Eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      console.warn("Has perdido");
    } else if (puntosJugador === 21) {
      btnDetener.disabled = true;
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);
      console.warn("Genial! Un 21, has ganado");
    }
  });
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevoJuego.addEventListener("click", () => {
    console.clear();
    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego,
  };
})();
