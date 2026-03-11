import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactForm({ formName = "contacto-general" }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-bots
    if (data.get("company")) {
      setStatus("idle");
      return;
    }

    // Identificador del formulario (para tus 2 formularios)
    data.set("form_name", formName);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Formspree error");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!endpoint) {
    return (
      <div className="formCard">
        <p className="formAlert formAlert--error">
          Falta configurar <code>VITE_FORMSPREE_ENDPOINT</code> en <code>.env</code>.
        </p>
      </div>
    );
  }

  return (
    <section className="formSection">
      <div className="formCard">
        <header className="formHeader">
          <h2 className="formTitle">{t("contact.title", "Hablemos")}</h2>
          <div class="projects__divider" aria-hidden="true"></div>
          <p className="formSubtitle">
            {t("contact.subtitle", "Cuéntanos sobre tu proyecto y te responderemos pronto.")}
          </p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <div className="formGrid">
            <label className="formField">
              <span className="formLabel">{t("contact.name", "Nombre")}</span>
              <input
                className="formInput"
                name="name"
                autoComplete="name"
                placeholder={t("contact.namePlaceholder", "Tu nombre")}
                required
              />
            </label>

            <label className="formField">
              <span className="formLabel">{t("contact.email", "Correo")}</span>
              <input
                className="formInput"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("contact.emailPlaceholder", "tu@correo.com")}
                required
              />
            </label>
          </div>

          <div className="formGrid">
            <label className="formField">
              <span className="formLabel">{t("contact.phone", "Teléfono (opcional)")}</span>
              <input
                className="formInput"
                name="phone"
                autoComplete="tel"
                placeholder={t("contact.phonePlaceholder", "+57 300 000 0000")}
              />
            </label>

            <label className="formField">
              <span className="formLabel">{t("contact.service", "Servicio")}</span>
              <select className="formInput" name="service" defaultValue="bim">
                <option value="bim">{t("contact.services.bim", "BIM")}</option>
                <option value="profesionales">{t("contact.services.pro", "Profesionales")}</option>
                <option value="construccion">{t("contact.services.construction", "Construcción")}</option>
                <option value="staff">{t("contact.services.staff", "Staff Augmentation")}</option>
              </select>
            </label>
          </div>

          <label className="formField">
            <span className="formLabel">{t("contact.message", "Mensaje")}</span>
            <textarea
              className="formTextarea"
              name="message"
              rows={5}
              placeholder={t("contact.messagePlaceholder", "Cuéntanos qué necesitas...")}
              required
            />
          </label>

          {/* Honeypot oculto */}
          <input
            name="company"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <button className="formButton" type="submit" disabled={status === "sending"}>
            {status === "sending" ? t("contact.sending", "Enviando...") : t("contact.submit", "Enviar")}
          </button>

          {status === "success" && (
            <div className="formAlert formAlert--ok">
              {t("contact.success", "¡Gracias! Te responderemos pronto.")}
            </div>
          )}

          {status === "error" && (
            <div className="formAlert formAlert--error">
              {t("contact.error", "No pudimos enviar el formulario. Intenta de nuevo.")}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
