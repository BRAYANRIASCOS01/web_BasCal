const buildWhatsAppUrl = (phone, message) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

const WhatsAppButton = ({
  phone,
  message = "Hola, me gustaría saber más.",
  label = "WhatsApp",
}) => {
  if (!phone) return null;

  const href = buildWhatsAppUrl(phone, message);

  return (
    <a
      className="whatsapp-button"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir chat de WhatsApp"
    >
      {label}
    </a>
  );
};

export default WhatsAppButton;
