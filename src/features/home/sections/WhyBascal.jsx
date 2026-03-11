import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const WhyBascal = () => {
  const { t } = useTranslation();
  const paragraphs = t("home.whyBascal.paragraphs", { returnObjects: true });
  const videoTitle = t("home.whyBascal.videoTitle");
  const videoDescription = t("home.whyBascal.videoDescription");
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const animatedNodes = sectionEl.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry;
          if (isIntersecting) {
            target.classList.add("is-visible");
          } else {
            target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    animatedNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section why-bascal" id="why-bascal" ref={sectionRef}>
      <div className="container">
        <div className="why-bascal__heading" data-animate>
          <p className="section-kicker">{t("home.whyBascal.kicker")}</p>
          <h2 className="section-title">
            {t("home.whyBascal.title").includes("BasCal") ? (
              (() => {
                const [before, after = ""] = t("home.whyBascal.title").split("BasCal");
                return (
                  <>
                    {before.trimEnd()}
                    <br className="why-bascal__break" />
                    <span className="why-bascal__brand">BasCal</span>
                    {after}
                  </>
                );
              })()
            ) : (
              t("home.whyBascal.title")
            )}
          </h2>
          <span className="why-bascal__heading-underline" aria-hidden="true" />
        </div>
        <div className="why-bascal__grid">
          <div className="why-bascal__content" data-animate style={{ animationDelay: "0.1s" }}>
            {paragraphs.map((text, index) => (
              <p
                className="text-muted why-bascal__paragraph"
                key={`why-bascal-${index}`}
                data-animate
                style={{ animationDelay: `${0.15 + index * 0.08}s` }}
              >
                {text}
              </p>
            ))}
          </div>
          <div
            className="why-bascal__video"
            aria-label={videoTitle}
            data-animate
            style={{ animationDelay: `${0.1 + paragraphs.length * 0.08}s` }}
            title={videoDescription}
          >
            <div className="why-bascal__video-frame">
              <iframe
                src="https://www.youtube.com/embed/9y2X2PpcQoc?si=QuFB-V8JMp1oNLmS"
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBascal;
