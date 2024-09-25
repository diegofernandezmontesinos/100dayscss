const numberOfRings = 10;
const numberOfDots = 12;
const radius = 40;

function injectCSS() {
  const style = document.createElement("style");
  let css = `
  @keyframes pulsate {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  `;

  for (let i = 1; i <= numberOfRings; i++) {
    css += `
    .ring-${i} .fill {
      animation: pulsate 2s ease-in-out ${i / 3}s alternate infinite both;
    }
    `;

    const dotsPerCircle = numberOfDots + i * 6;
    for (let j = 1; j <= dotsPerCircle; j++) {
      const angle = 360 / dotsPerCircle;
      const deg = (j - 1) * angle;
      const translateY = (radius + (i - 1) * 11) * -1;
      const originY = radius + (i - 1) * 11;

      css += `
      .ring-${i} .dot-${j} {
        transform: translate3d(0, ${translateY}px, 0) rotate(${deg}deg);
        transform-origin: 0 ${originY}px;
      }
      `;
    }
  }

  style.innerHTML = css;
  document.head.appendChild(style);
}

function createRings() {
  const frame = document.querySelector(".frame");

  for (let i = 1; i <= numberOfRings; i++) {
    const ring = document.createElement("div");
    ring.className = `ring ring-${i}`;
    ring.style.width = `${radius * 2}px`;
    ring.style.height = `${radius * 2}px`;
    ring.style.top = `${(300 - radius * 2) / 2}px`; // Center within the frame
    ring.style.left = `${(300 - radius * 2) / 2}px`;

    const dotsPerCircle = numberOfDots + i * 6;
    for (let j = 1; j <= dotsPerCircle; j++) {
      const dot = document.createElement("div");
      dot.className = `dot dot-${j}`;
      dot.style.top = `${radius}px`;
      dot.style.left = `${radius}px`;

      const fill = document.createElement("div");
      fill.className = "fill";
      dot.appendChild(fill);

      ring.appendChild(dot);
    }

    frame.appendChild(ring);
  }
}

injectCSS();
createRings();
