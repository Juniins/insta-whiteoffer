!(function () {
  let e = document.querySelectorAll(
      '[class*="track-"], [class*="atomicat-track-"]'
    ),
    t = document.body.getAttribute("id")?.replace("_", ""),
    i = document.body.getAttribute("data-page")?.replace("_", ""),
    n = [],
    a = 0,
    o = document.documentElement.scrollHeight - window.innerHeight,
    c = new Date();
  function r(e) {
    let o = "https://apidopro.atomicat-api.com/lytics/save";
    (e.visitorId = (function e() {
      try {
        var t,
          i,
          n = localStorage.getItem("atomicat.host");
        t = JSON.parse(n).uuid;
      } catch (a) {
        (t =
          ((i = new Date().getTime()),
          (i * Math.random() * 1e5).toString(36) +
            "-" +
            i +
            "-" +
            (i * Math.random() * 1e5).toString(36))),
          localStorage.setItem("atomicat.host", JSON.stringify({ uuid: t }));
      }
      return t;
    })()),
      (e.duration = (new Date() - c) / 1e3),
      (e.btnClicks = n),
      (e.uid = t),
      (e.pid = i),
      (e.search = window.location.search),
      (e.pathname = window.location.pathname),
      (e.scrolled = isNaN(a) ? 0 : a),
      t &&
        i &&
        (navigator && navigator.sendBeacon
          ? navigator.sendBeacon(o, JSON.stringify(e))
          : ((e.origin = window.location.hostname),
            fetch(o, {
              keepalive: !0,
              method: "POST",
              mode: "no-cors",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(e),
            })),
        (n = []));
  }
  document.addEventListener("visibilitychange", function e() {
    "hidden" === document.visibilityState &&
      r({ action: "left", listenerType: "visibilitychange" });
  }),
    "onpagehide" in window &&
      window.addEventListener("pagehide", () => {
        r({ action: "left", listenerType: "pagehide" });
      }),
    "onbeforeunload" in window &&
      window.addEventListener("beforeunload", (e) => {
        r({ action: "left", listenerType: "beforeunload" });
      }),
    document.addEventListener("mouseleave", function (e) {
      e.clientY <= 0 &&
        (console.log("mouseleave..."),
        r({ action: "left", listenerType: "mouseleave" }));
    }),
    e.forEach((e) => {
      e.addEventListener("click", (t) =>
        (function e(t, i) {
          t.target;
          let a = i.classList,
            o = "";
          for (let c = 0; c < a.length; c++)
            if (
              a[c].startsWith("track-") ||
              a[c].startsWith("atomicat-track-")
            ) {
              o = a[c].replace("atomicat-track-", "").replace("track-", "");
              break;
            }
          let r = n.findIndex((e) => e.id == o);
          -1 !== r
            ? (n[r].count = n[r].count + 1)
            : n.push({ id: o, count: 1 });
        })(t, e)
      );
    }),
    window.addEventListener("scroll", function e() {
      let t = window.pageYOffset || document.documentElement.scrollTop;
      if (o <= 0) a = 0;
      else {
        let i = (t / o) * 100;
        a = isNaN(i) ? 0 : Math.max(a, i).toFixed(2);
      }
    }),
    r({ action: "viewed" });
})();
