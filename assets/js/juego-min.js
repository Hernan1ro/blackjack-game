const miModulo = (() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    n = ["A", "J", "K", "Q"];
  let a = [];
  const r = document.querySelector("#btnPedir"),
    o = document.querySelector("#btnDetener"),
    l = document.querySelector("#btnNuevo"),
    s = document.querySelectorAll(".divCartas"),
    d = document.querySelectorAll("small"),
    c = (t = 2) => {
      (e = i()), (a = []);
      for (let e = 0; e < t; e++) a.push(0);
      d.forEach((e) => (e.innerText = 0)),
        s.forEach((e) => (e.innerText = "")),
        (o.disabled = !1),
        (r.disabled = !1);
    },
    i = () => {
      e = [];
      for (let n = 2; n <= 10; n++) for (let a of t) e.push(n + a);
      for (let a of t) for (let t of n) e.push(t + a);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw "No hay cartas en el Deck";
      return e.shift();
    },
    h = (e, t) => (
      (a[t] =
        a[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
        })(e)),
      (d[t].innerText = a[t]),
      a[t]
    ),
    f = (e, t) => {
      const n = document.createElement("img");
      (n.src = `/assets/cartas/${e}.png`),
        n.classList.add("carta"),
        s[t].append(n);
    },
    m = (e) => {
      let t = 0;
      do {
        const e = u();
        (t = h(e, a.length - 1)), f(e, a.length - 1);
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = a;
        setTimeout(() => {
          t === e
            ? alert("Nadie Gana :(")
            : e > 21
            ? alert("Computadora gana")
            : t > 21
            ? alert("Genial! Has ganado")
            : alert("Computadora Gana");
        }, 500);
      })();
    };
  return (
    r.addEventListener("click", () => {
      const e = u(),
        t = h(e, 0);
      f(e, 0),
        t > 21
          ? ((r.disabled = !0),
            (o.disabled = !0),
            m(t),
            console.warn("Has perdido"))
          : 21 === t &&
            ((o.disabled = !0),
            (r.disabled = !0),
            m(t),
            console.warn("Genial! Un 21, has ganado"));
    }),
    o.addEventListener("click", () => {
      (r.disabled = !0), (o.disabled = !0), m(a[0]);
    }),
    l.addEventListener("click", () => {
      console.clear(), c();
    }),
    { nuevoJuego: c }
  );
})();
