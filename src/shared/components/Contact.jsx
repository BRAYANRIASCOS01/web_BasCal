const Contact = ({
  title = "Contacto",
  description = "Cuéntanos qué necesitas y coordinamos una llamada.",
  channels = [],
  children,
}) => {
  return (
    <section className="contact">
      <header className="contact__header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </header>

      {channels.length > 0 && (
        <ul className="contact__channels">
          {channels.map(({ label, href, detail }) => (
            <li key={label}>
              <a href={href}>{label}</a>
              {detail && <small>{detail}</small>}
            </li>
          ))}
        </ul>
      )}

      {children && <div className="contact__form">{children}</div>}
    </section>
  );
};

export default Contact;
