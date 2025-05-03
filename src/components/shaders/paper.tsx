interface ShaderOptions {
  type: "noise" | "gradient" | "dots";
  density?: number;
  speed?: number;
  color?: string;
}

export function createShader(
  canvas: HTMLCanvasElement,
  options: ShaderOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy: () => {} };

  // Set canvas size to match display size
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  resize();
  window.addEventListener("resize", resize);

  // Parse color to RGB
  const parseColor = (color = "#000000") => {
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const computedColor = getComputedStyle(div).color;
    document.body.removeChild(div);

    const match = computedColor.match(/\d+/g);
    if (match && match.length >= 3) {
      return {
        r: Number.parseInt(match[0]),
        g: Number.parseInt(match[1]),
        b: Number.parseInt(match[2]),
      };
    }

    return { r: 0, g: 0, b: 0 };
  };

  const rgb = parseColor(options.color);

  // Render function based on shader type
  const render = () => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (options.type === "noise") {
      const density = options.density || 0.1;
      const pixelSize = Math.max(1, Math.floor(1 / density));

      for (let x = 0; x < width; x += pixelSize) {
        for (let y = 0; y < height; y += pixelSize) {
          if (Math.random() < density) {
            const opacity = Math.random() * 0.5 + 0.1;
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
    } else if (options.type === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
      gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else if (options.type === "dots") {
      const density = options.density || 0.01;
      const dotCount = Math.floor(width * height * density);

      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5 + 0.1;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        ctx.fill();
      }
    }
  };

  // Initial render
  render();

  return {
    destroy: () => {
      window.removeEventListener("resize", resize);
    },
  };
}
