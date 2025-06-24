function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;

    const pad = (n) => n.toString().padStart(2, '0');

    document.getElementById("hours").textContent = pad(h);
    document.getElementById("minutes").textContent = pad(m);
    document.getElementById("seconds").textContent = pad(s);
    document.getElementById("ampm").textContent = ampm;

    document.getElementById("hours-ref").textContent = pad(h);
    document.getElementById("minutes-ref").textContent = pad(m);
    document.getElementById("seconds-ref").textContent = pad(s);
    document.getElementById("ampm-ref").textContent = ampm;
  }

  setInterval(updateClock, 1000);
  updateClock();