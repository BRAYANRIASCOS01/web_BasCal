import { useState } from "react";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) || [];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq__section">
      <div className="container__faq">
        <header className="faq__header">
          <span className="faq__pill">FAQ</span>
          <h2 className="section-title-faq">{t("faq.title")}</h2>
          <div className="projects__divider" aria-hidden="true"></div>
          <p className="text-muted-faq">{t("faq.subtitle")}</p>
        </header>

        <div className="faq__list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={index} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq__question"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className="faq__question-text">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq__answer" id={answerId} role="region" aria-label={item.q}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
