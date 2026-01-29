import { useEffect, useMemo, useRef, useState } from "react";

const buildWhatsAppUrl = (phone, message) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

const WhatsAppButton = ({
  phone,
  message = "Hola, me gustaría saber más.",
  label = "Chat",
  email = "info@bascal.com",
  callNumber = phone,
}) => {
  if (!phone) return null;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const href = buildWhatsAppUrl(phone, message);
  const options = useMemo(
    () =>
      [
        { label: "WhatsApp", href, type: "external" },
        { label: "Correo", href: `mailto:${email}?subject=Consulta%20BasCal`, type: "email" },
        { label: "Llamar", href: callNumber ? `tel:${callNumber}` : undefined, type: "call" },
      ].filter((opt) => opt.href),
    [href, email, callNumber]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <div className="chat-launcher" ref={wrapperRef}>
      <button
        type="button"
        className={`whatsapp-button ${open ? "is-open" : ""}`}
        onClick={toggleOpen}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
      >
        <span className="whatsapp-button__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 12.6c0 3.08-2.84 5.6-6.34 5.6-.93 0-1.81-.18-2.59-.5l-3.73.96.99-3.42C6.67 14.3 6 13.01 6 11.6 6 8.52 8.84 6 12.34 6 15.84 6 19 8.52 19 11.6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 10.75h5m-5 2.1h3.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="whatsapp-button__label">{label}</span>
        <span className="whatsapp-button__caret" aria-hidden="true">⌄</span>
      </button>

      <div className={`chat-menu ${open ? "is-open" : ""}`} role="menu" id="chat-menu">
        {options.map((opt) => (
          <a
            key={opt.label}
            className="chat-menu__item"
            href={opt.href}
            target={opt.type === "external" ? "_blank" : "_self"}
            rel={opt.type === "external" ? "noreferrer" : undefined}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppButton;
