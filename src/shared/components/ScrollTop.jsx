import { useEffect, useState } from "react";

const ScrollTop = ({ threshold = 200, label = "Subir" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button type="button" className="scroll-top" onClick={handleClick}>
      {label}
    </button>
  );
};

export default ScrollTop;
