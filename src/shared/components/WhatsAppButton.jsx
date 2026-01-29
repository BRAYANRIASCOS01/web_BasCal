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
              d="M6.5 7h11a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-4.4l-3.4 2.8c-.8.65-1.95.07-1.95-.94V17H6.5A2.5 2.5 0 0 1 4 14.5v-5A2.5 2.5 0 0 1 6.5 7Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 11h5m-5 2.5h3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="whatsapp-button__label">{label || "Chat"}</span>
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
            <span className="chat-menu__item-icon" aria-hidden="true">
              {opt.label.toLowerCase().includes("whatsapp") ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3.5c-4.69 0-8.5 3.61-8.5 8.07 0 1.27.33 2.45.91 3.49l-0.84 3.06 3.14-0.82c0.99.54 2.13.85 3.3.85 4.69 0 8.5-3.61 8.5-8.07C18.5 7.11 14.69 3.5 12 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                  <path
                    d="M10.25 9.75c0 .4.08.79.24 1.15.14.31.07.68-.17.93l-.34.35c.53 1.02 1.35 1.84 2.37 2.37l.35-.34c.25-.24.62-.31.93-.17.36.16.75.24 1.15.24.28 0 .5.22.5.5v1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : opt.type === "email" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 7l6 5 6-5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.4 4c-.22 0-.45.02-.67.07a1.5 1.5 0 0 0-1.1 1.87 13.5 13.5 0 0 0 11.43 8.76 1.5 1.5 0 0 0 1.6-1.16l.42-1.88a1 1 0 0 0-.64-1.17l-2.22-.78a1 1 0 0 0-1.01.25l-.93.97a9.7 9.7 0 0 1-3.74-3.63l1.02-.95a1 1 0 0 0 .27-.98l-.7-2.3A1 1 0 0 0 10.46 3l-2.06-.02Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="chat-menu__item-text">{opt.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppButton;
