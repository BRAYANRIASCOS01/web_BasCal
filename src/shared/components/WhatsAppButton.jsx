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
          <svg width="18" height="18" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M66.176 53.2558C67.7523 49.9865 68.5257 46.3882 68.4321 42.7599C68.3384 39.1316 67.3804 35.578 65.6375 32.3943C63.8947 29.2106 61.4173 26.4887 58.4113 24.4547C55.4052 22.4207 51.9572 21.1334 48.3537 20.6996C47.1547 17.9118 45.4115 15.3912 43.2262 13.2856C41.0409 11.1799 38.4575 9.53137 35.6271 8.43658C32.7968 7.34179 29.7764 6.82273 26.743 6.90978C23.7095 6.99683 20.7239 7.68825 17.961 8.94354C15.1981 10.1988 12.7134 11.9928 10.6525 14.2203C8.59156 16.4479 6.99577 19.0642 5.95858 21.9162C4.9214 24.7681 4.46367 27.7984 4.6122 30.8294C4.76073 33.8605 5.51254 36.8315 6.82359 39.5683L4.7505 46.6146C4.51871 47.4012 4.50321 48.2357 4.70564 49.0304C4.90806 49.825 5.32092 50.5505 5.90078 51.1303C6.48064 51.7102 7.20607 52.1231 8.00074 52.3255C8.79541 52.5279 9.62995 52.5124 10.4166 52.2806L17.4628 50.2075C19.7253 51.2946 22.151 52.0026 24.643 52.3034C25.8537 55.1402 27.6271 57.7019 29.856 59.8339C32.0848 61.9658 34.7228 63.6237 37.6106 64.7072C40.4983 65.7907 43.5758 66.2773 46.6569 66.1377C49.7381 65.9981 52.7589 65.2352 55.5368 63.895L62.583 65.9681C63.3694 66.1996 64.2035 66.215 64.9978 66.0127C65.7922 65.8104 66.5173 65.3978 67.0971 64.8184C67.6768 64.2389 68.0898 63.514 68.2925 62.7197C68.4952 61.9255 68.4802 61.0913 68.2491 60.3049L66.176 53.2558ZM17.6795 45.4825C17.4615 45.483 17.2446 45.5137 17.035 45.5737L9.1248 47.9063L11.4545 39.9904C11.6202 39.4185 11.5557 38.8045 11.2749 38.2794C9.21123 34.4201 8.60317 29.9476 9.56156 25.6774C10.5199 21.4072 12.9809 17.6236 16.4959 15.0162C20.0109 12.4089 24.3458 11.1515 28.7104 11.4733C33.075 11.7951 37.1787 13.6746 40.2733 16.7692C43.3679 19.8638 45.2474 23.9675 45.5692 28.3321C45.891 32.6967 44.6336 37.0316 42.0263 40.5466C39.419 44.0616 35.6353 46.5226 31.3651 47.481C27.0949 48.4393 22.6224 47.8313 18.7631 45.7676C18.4312 45.584 18.0588 45.486 17.6795 45.4825ZM61.5337 53.675L63.8748 61.5938L55.9589 59.2641C55.387 59.0984 54.7729 59.1629 54.2479 59.4437C50.0471 61.6869 45.1363 62.2005 40.5622 60.8752C35.9881 59.5499 32.1125 56.4905 29.7616 52.349C32.8851 52.023 35.9076 51.055 38.6393 49.5058C41.3711 47.9566 43.7533 45.8595 45.6363 43.3462C47.5194 40.8328 48.8627 37.9575 49.5821 34.9004C50.3014 31.8434 50.3813 28.6708 49.8166 25.5814C52.5381 26.2229 55.0758 27.4812 57.2339 29.2591C59.3919 31.037 61.1126 33.287 62.2631 35.8354C63.4135 38.3839 63.9631 41.1626 63.8692 43.9571C63.7754 46.7516 63.0407 49.4872 61.7219 51.9527C61.4379 52.4809 61.3734 53.0996 61.5422 53.675H61.5337Z"
              fill="currentColor"
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
