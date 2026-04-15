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
                subtitle={t("contacthero.hero.subtitle")}
                ctaLabel={t("contacthero.hero.cta")}
                ctaHref="#servicios-bim"
                ctaAriaLabel={t("contacthero.hero.cta")}
                id="hero-bim"
      />

               {/* SECCIÓN estilo “Servicios BIM” (título centrado + subtítulo + separador) */}
      <section className="section contact-section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-header__title">
              {t("contactInfo.sectionTitle", "Hablemos")}
            </h2>
            <p className="section-header__subtitle">
              {t(
                "contactInfo.sectionSubtitle",
                "Completa el formulario y te contactaremos en 24–48 horas hábiles."
              )}
            </p>
            <div className="section-header__divider" />
          </header>

          <div className="contact-layout">
            {/* Card del formulario */}
            <div className="contact-card">
              <Form/>
              <div className="contact-whatsapp">
                  <p className="contact-whatsapp__text">
                    {t("contactInfo.btnwhats", "¿Prefieres escribirnos directamente?")}
                  </p>

                  <a
                    href="https://wa.me/573147456473?text=Hola%20BasCal,%20quiero%20más%20información%20sobre%20sus%20servicios."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-whatsapp__button"
                    aria-label="Contactar por WhatsApp"
                  >
                    WhatsApp
                  </a>
                </div>

            </div>

            {/* Card informativa (mismo patrón visual) */}
            <aside className="contact-info-card" aria-label="Información de contacto">
              <div className="contact-info-card__head">
                <h3 className="contact-info-card__title">
                  {t("contactInfo.infoTitle", "Información de contacto")}
                </h3>
                <p className="contact-info-card__muted">
                  {t("contactInfo.infoSubtitle", "También puedes escribirnos directamente.")}
                </p>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.emailLabel", "Correo")}</p>
                <a className="contact-info-card__value">
                {t("contactInfo.email", "info@bascal-bim.com")}
                </a>
              </div>
              

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.locationLabel", "Ubicación")}</p>
                 <a className="contact-info-card__value">
                {t("contactInfo.location", "Medellín, Colombia")}
                </a>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.responseLabel", "Tiempo de respuesta")}</p>
                 <a className="contact-info-card__value">
                {t("contactInfo.responsetime", "24–48 horas hábiles")}
                </a>
              </div>

              <div className="contact-info-card__trust">
              <p className="contact-info-card__trustTitle">
                {t("contactInfo.coverageTitle", "Cobertura de proyectos")}
              </p>
              <p className="contact-info-card__trustCountries">
                Colombia · Ecuador · Venezuela · México · Estados Unidos
              </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
           
        </>
    );
};

export default ContactPage;
