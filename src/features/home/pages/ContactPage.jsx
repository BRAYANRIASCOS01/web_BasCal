import React from 'react';
import Hero from "../../../shared/components/Hero.jsx";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Form from "../../../shared/components/Form.jsx";

const ContactPage = () => {
    const { t, i18n } = useTranslation();
    const { lang = "es" } = useParams();
    const pageRef = useRef(null);
    return (
        <>
             <Hero
                title={t("contacthero.hero.title")}
                accent={null}
                subtitle={t("bimPage.hero.subtitle")}
                ctaLabel={t("bimPage.hero.cta")}
                ctaHref="#servicios-bim"
                ctaAriaLabel={t("bimPage.hero.cta")}
                id="hero-bim"
      />

               {/* SECCIÓN estilo “Servicios BIM” (título centrado + subtítulo + separador) */}
      <section className="section contact-section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-header__title">
              {t("contact.sectionTitle", "Hablemos")}
            </h2>
            <p className="section-header__subtitle">
              {t(
                "contact.sectionSubtitle",
                "Completa el formulario y te contactaremos en 24–48 horas hábiles."
              )}
            </p>
            <div className="section-header__divider" />
          </header>

          <div className="contact-layout">
            {/* Card del formulario */}
            <div className="contact-card">
              <Form/>
            </div>

            {/* Card informativa (mismo patrón visual) */}
            <aside className="contact-info-card" aria-label="Información de contacto">
              <div className="contact-info-card__head">
                <h3 className="contact-info-card__title">
                  {t("contact.infoTitle", "Información de contacto")}
                </h3>
                <p className="contact-info-card__muted">
                  {t("contact.infoSubtitle", "También puedes escribirnos directamente.")}
                </p>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contact.emailLabel", "Correo")}</p>
                <a className="contact-info-card__value" href="mailto:contacto@bascal.com">
                  contacto@bascal.com
                </a>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contact.locationLabel", "Ubicación")}</p>
                <p className="contact-info-card__value">Medellín, Colombia</p>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contact.responseLabel", "Tiempo de respuesta")}</p>
                <p className="contact-info-card__value">
                  {t("contact.responseValue", "24–48 horas hábiles")}
                </p>
              </div>

              <div className="contact-info-card__trust">
                <p>• {t("contact.trust1", "No compartimos tu información.")}</p>
                <p>• {t("contact.trust2", "Atendemos proyectos en LATAM y EE.UU.")}</p>
                <p>• {t("contact.trust3", "Podemos coordinar una llamada si lo necesitas.")}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
            <h1>Contacto</h1>
            <p>¡Ponte en contacto con nosotros!</p>
        </>
    );
};

export default ContactPage;
