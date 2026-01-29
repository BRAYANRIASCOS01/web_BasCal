import { useEffect, useRef, useState } from "react";

const ScrollTop = ({ threshold = 200, label = "Subir" }) => {
  const [visible, setVisible] = useState(false);
  const [isLightBg, setIsLightBg] = useState(true);
  const ticking = useRef(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const getVars = () => {
      const root = getComputedStyle(document.documentElement);
      const toRgb = (val) => {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = val;
        return ctx.fillStyle; // returns normalized rgb(...)
      };
      return {
        surface: toRgb(root.getPropertyValue("--color-surface") || "#fff"),
        surfaceAlt: toRgb(root.getPropertyValue("--color-surface-alt") || "#f8fafc"),
      };
    };

    const vars = getVars();

    const luminance = (rgb) => {
      const match = rgb.match(/\d+(\.\d+)?/g);
      if (!match || match.length < 3) return 1;
      const [r, g, b] = match.slice(0, 3).map(Number).map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const dist = (rgb1, rgb2) => {
      const a = rgb1.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
      const b = rgb2.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
      return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
    };

    const getBgColor = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        if (node.dataset?.bg === "dark") return "rgb(0,0,0)";
        if (node.dataset?.bg === "light") return "rgb(255,255,255)";
        const style = getComputedStyle(node);
        if (style.backgroundColor && style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent") {
          return style.backgroundColor;
        }
        node = node.parentElement;
      }
      return getComputedStyle(document.body).backgroundColor || "rgb(255,255,255)";
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > threshold);
        let pointEl = null;
        const btn = btnRef.current;
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          // evitar capturar el propio botón
          if (btn.style.pointerEvents !== "none") btn.style.pointerEvents = "none";
          pointEl = document.elementFromPoint(x, y);
          btn.style.pointerEvents = "";
        }
        if (!pointEl) {
          pointEl = document.elementFromPoint(window.innerWidth - 20, window.innerHeight - 20);
        }
        const bg = getBgColor(pointEl || document.body);
        const closeToSurface = dist(bg, vars.surface) < 90 || dist(bg, vars.surfaceAlt) < 90;
        const light = closeToSurface || luminance(bg) > 0.6;
        setIsLightBg(light);
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top ${isLightBg ? "scroll-top--on-light" : "scroll-top--on-dark"}`}
      onClick={handleClick}
      aria-label={label}
      ref={btnRef}
    >
      <span className="scroll-top__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 19V6m0 0 6 6m-6-6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="scroll-top__label">{label}</span>
    </button>
  );
};

export default ScrollTop;
