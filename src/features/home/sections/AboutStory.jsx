import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AboutStory = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const animated = el.querySelectorAll("[data-animate]");
    if (!animated.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.2 }
    );
    animated.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [i18n.language]);

  const blocks = t("aboutPage.blocks", { returnObjects: true }) || [];

  return (
    <section className="section about-story" ref={sectionRef}>
      <div className="container about-story__inner">
        {blocks.map((block, idx) => (
          <article
            key={block.title}
            className="about-story__card"
            data-animate
            style={{ transitionDelay: `${0.06 + idx * 0.08}s` }}
          >
            <div className="about-story__card-head">
              <span className="about-story__badge" aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="about-story__title">{block.title}</h3>
            </div>
            <p className="about-story__text text-muted">{block.text}</p>
            {block.points && (
              <ul className="about-story__list text-muted">
                {block.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutStory;
