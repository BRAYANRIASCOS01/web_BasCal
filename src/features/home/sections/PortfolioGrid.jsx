import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gasPlantaImage from "../../../assets/GAS_planta.png";
import gasPlantaNavarraImage from "../../../assets/GAS_Planta-2.png";
import rciCuartoBombasImage from "../../../assets/RCI_CUARTO BOMBAS.png";
import scanToBimAirportImage from "../../../assets/image (11).png";
import rciRedPerimetralImage from "../../../assets/RCI, Red Perimetral.png";
import scanToBimHospitalChileImage from "../../../assets/RVT_Image_01.png";
import shopDrawingsHvacUsImage from "../../../assets/Image_01.webp";

const normalizeText = (text) =>
  text
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const PortfolioGrid = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const cardRefs = useRef({});
  const lastScrollRef = useRef(null);

  const projects = useMemo(() => {
    const raw = t("portfolioPage.projects", { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  }, [t, i18n.language]);

  const projectImages = useMemo(
    () => ({
      "cdi-barrio-nuevo": gasPlantaImage,
      "cdi-navarra": gasPlantaNavarraImage,
      "megacolegio-bello": rciCuartoBombasImage,
      "scan-to-bim-airport": scanToBimAirportImage,
      "pao-bello": rciRedPerimetralImage,
      "scan-to-bim-hospital-chile": scanToBimHospitalChileImage,
      "shop-drawings-hvac-us": shopDrawingsHvacUsImage,
    }),
    []
  );

  const categories = useMemo(() => {
    const fromLocale = t("portfolioPage.filters.categories", { returnObjects: true });
    if (Array.isArray(fromLocale) && fromLocale.length > 0) {
      return fromLocale;
    }
    const values = projects.map((project) => project.category).filter(Boolean);
    return Array.from(new Set(values));
  }, [projects, t, i18n.language]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [visibleIds, setVisibleIds] = useState([]);

  useEffect(() => {
    setActiveCategory("all");
    setExpandedId(null);
    setVisibleIds([]);
  }, [i18n.language]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory !== "all" && project.category !== activeCategory) return false;
      return true;
    });
  }, [projects, activeCategory]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const animated = el.querySelectorAll("[data-animate]");
    if (!animated.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-card-id");
          if (!id) {
            entry.target.classList.add("is-visible");
            return;
          }
          setVisibleIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        });
      },
      { threshold: 0.2 }
    );
    animated.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [i18n.language, activeCategory, projects.length]);

  const metaLabel = {
    type: t("portfolioPage.meta.type"),
    location: t("portfolioPage.meta.location"),
    scale: t("portfolioPage.meta.scale"),
    services: t("portfolioPage.meta.services"),
    software: t("portfolioPage.meta.software"),
  };

  const iconMap = {
    fire: (
      <svg viewBox="0 0 17 21" aria-hidden="true" focusable="false">
        <path
          d="M12.5428 3.32648C11.3769 2.09789 10.065 1.01671 8.63625 0.107107C8.5196 0.0370247 8.38608 0 8.25 0C8.11392 0 7.9804 0.0370247 7.86375 0.107107C6.43501 1.01671 5.12305 2.09789 3.95719 3.32648C1.36781 6.04523 0 9.04429 0 12.0002C0 14.1883 0.869194 16.2867 2.41637 17.8339C3.96354 19.381 6.06196 20.2502 8.25 20.2502C10.438 20.2502 12.5365 19.381 14.0836 17.8339C15.6308 16.2867 16.5 14.1883 16.5 12.0002C16.5 9.04429 15.1322 6.04523 12.5428 3.32648ZM5.25 15.7502C5.25 13.1562 7.36219 11.3177 8.25 10.6596C9.13875 11.3159 11.25 13.1562 11.25 15.7502C11.25 16.5459 10.9339 17.3089 10.3713 17.8716C9.80871 18.4342 9.04565 18.7502 8.25 18.7502C7.45435 18.7502 6.69129 18.4342 6.12868 17.8716C5.56607 17.3089 5.25 16.5459 5.25 15.7502ZM12.4941 17.2437C12.6635 16.764 12.7501 16.259 12.75 15.7502C12.75 11.6252 8.80406 9.20742 8.63625 9.10711C8.5196 9.03703 8.38608 9 8.25 9C8.11392 9 7.9804 9.03703 7.86375 9.10711C7.69594 9.20742 3.75 11.6252 3.75 15.7502C3.74992 16.259 3.83647 16.764 4.00594 17.2437C3.22348 16.612 2.5923 15.8133 2.15868 14.906C1.72507 13.9987 1.50001 13.0058 1.5 12.0002C1.5 8.77429 3.4125 6.07992 5.0175 4.38867C5.9961 3.36349 7.07953 2.44377 8.25 1.64461C9.42065 2.44353 10.5041 3.36327 11.4825 4.38867C14.3897 7.45336 15 10.219 15 12.0002C15 13.0058 14.7749 13.9987 14.3413 14.906C13.9077 15.8133 13.2765 16.612 12.4941 17.2437Z"
          fill="currentColor"
        />
      </svg>
    ),
    alarm: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M11.25 1.5V0.75C11.25 0.551088 11.329 0.360322 11.4697 0.21967C11.6103 0.0790176 11.8011 0 12 0C12.1989 0 12.3897 0.0790176 12.5303 0.21967C12.671 0.360322 12.75 0.551088 12.75 0.75V1.5C12.75 1.69891 12.671 1.88968 12.5303 2.03033C12.3897 2.17098 12.1989 2.25 12 2.25C11.8011 2.25 11.6103 2.17098 11.4697 2.03033C11.329 1.88968 11.25 1.69891 11.25 1.5ZM18.75 4.5C18.8485 4.50008 18.9461 4.48074 19.0371 4.4431C19.1282 4.40546 19.2109 4.35025 19.2806 4.28062L20.0306 3.53062C20.1714 3.38989 20.2504 3.19902 20.2504 3C20.2504 2.80098 20.1714 2.61011 20.0306 2.46938C19.8899 2.32864 19.699 2.24958 19.5 2.24958C19.301 2.24958 19.1101 2.32864 18.9694 2.46938L18.2194 3.21938C18.1144 3.32427 18.0428 3.45796 18.0139 3.60352C17.9849 3.74908 17.9997 3.89998 18.0565 4.03709C18.1133 4.17421 18.2096 4.29139 18.333 4.37379C18.4565 4.45619 18.6016 4.50012 18.75 4.5ZM4.71938 4.28062C4.78906 4.35031 4.87178 4.40558 4.96283 4.44329C5.05387 4.48101 5.15145 4.50042 5.25 4.50042C5.34855 4.50042 5.44613 4.48101 5.53717 4.44329C5.62822 4.40558 5.71094 4.35031 5.78062 4.28062C5.85031 4.21094 5.90558 4.12822 5.94329 4.03717C5.98101 3.94613 6.00042 3.84855 6.00042 3.75C6.00042 3.65145 5.98101 3.55387 5.94329 3.46283C5.90558 3.37178 5.85031 3.28906 5.78062 3.21938L5.03062 2.46938C4.88989 2.32864 4.69902 2.24958 4.5 2.24958C4.30098 2.24958 4.11011 2.32864 3.96938 2.46938C3.82864 2.61011 3.74958 2.80098 3.74958 3C3.74958 3.19902 3.82864 3.38989 3.96938 3.53062L4.71938 4.28062ZM12.8756 6.76031C12.7781 6.74306 12.678 6.74531 12.5814 6.76693C12.4847 6.78855 12.3932 6.82911 12.3123 6.88627C12.2314 6.94343 12.1626 7.01606 12.1099 7.09997C12.0572 7.18387 12.0216 7.27738 12.0053 7.3751C11.989 7.47282 11.9921 7.57281 12.0146 7.66929C12.0372 7.76577 12.0786 7.85684 12.1365 7.93723C12.1944 8.01762 12.2676 8.08574 12.352 8.13765C12.4364 8.18957 12.5303 8.22425 12.6281 8.23969C14.4066 8.53875 15.75 10.155 15.75 12C15.75 12.1989 15.829 12.3897 15.9697 12.5303C16.1103 12.671 16.3011 12.75 16.5 12.75C16.6989 12.75 16.8897 12.671 17.0303 12.5303C17.171 12.3897 17.25 12.1989 17.25 12C17.25 9.43125 15.3684 7.17844 12.8738 6.76031H12.8756ZM21.75 16.5V18.75C21.75 19.1478 21.592 19.5294 21.3107 19.8107C21.0294 20.092 20.6478 20.25 20.25 20.25H3.75C3.35218 20.25 2.97064 20.092 2.68934 19.8107C2.40804 19.5294 2.25 19.1478 2.25 18.75V16.5C2.25 16.1022 2.40804 15.7206 2.68934 15.4393C2.97064 15.158 3.35218 15 3.75 15V12C3.74997 10.9113 3.96542 9.83334 4.38395 8.82829C4.80247 7.82323 5.41579 6.91096 6.18853 6.14405C6.96128 5.37714 7.87818 4.77076 8.88638 4.35987C9.89458 3.94898 10.9741 3.74171 12.0628 3.75C16.5769 3.78375 20.25 7.52719 20.25 12.0938V15C20.6478 15 21.0294 15.158 21.3107 15.4393C21.592 15.7206 21.75 16.1022 21.75 16.5ZM5.25 15H18.75V12.0938C18.75 8.34375 15.7453 5.27719 12.0516 5.25H12C10.2098 5.25 8.4929 5.96116 7.22703 7.22703C5.96116 8.4929 5.25 10.2098 5.25 12V15ZM20.25 18.75V16.5H3.75V18.75H20.25Z"
          fill="currentColor"
        />
      </svg>
    ),
    gas: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M20.9643 21.2268C20.9345 21.3207 20.8865 21.4078 20.823 21.4831C20.7595 21.5584 20.6817 21.6205 20.5942 21.6658C20.5067 21.711 20.4112 21.7386 20.313 21.747C20.2149 21.7553 20.116 21.7442 20.0222 21.7143L12 19.1615L3.97778 21.7143C3.88391 21.7442 3.78507 21.7553 3.68692 21.7469C3.58876 21.7386 3.49321 21.711 3.40572 21.6657C3.31823 21.6205 3.24052 21.5584 3.17701 21.4831C3.1135 21.4078 3.06545 21.3207 3.03559 21.2268C3.00574 21.133 2.99467 21.0341 3.00301 20.936C3.01135 20.8378 3.03894 20.7423 3.08421 20.6548C3.12948 20.5673 3.19154 20.4896 3.26684 20.4261C3.34215 20.3626 3.42922 20.3145 3.52309 20.2847L9.5231 18.375L3.52309 16.4643C3.42663 16.4367 3.33668 16.39 3.25859 16.327C3.18049 16.264 3.11583 16.186 3.06843 16.0976C3.02104 16.0091 2.99187 15.9121 2.98266 15.8122C2.97345 15.7122 2.98438 15.6115 3.01481 15.5159C3.04524 15.4202 3.09455 15.3317 3.15981 15.2555C3.22507 15.1793 3.30497 15.1169 3.39476 15.0721C3.48456 15.0274 3.58242 15.0011 3.68257 14.9948C3.78271 14.9885 3.8831 15.0024 3.97778 15.0356L12 17.5875L20.0222 15.0356C20.1168 15.0024 20.2172 14.9885 20.3174 14.9948C20.4175 15.0011 20.5154 15.0274 20.6052 15.0721C20.695 15.1169 20.7749 15.1793 20.8401 15.2555C20.9054 15.3317 20.9547 15.4202 20.9851 15.5159C21.0156 15.6115 21.0265 15.7122 21.0173 15.8122C21.0081 15.9121 20.9789 16.0091 20.9315 16.0976C20.8841 16.186 20.8195 16.264 20.7414 16.327C20.6633 16.39 20.5733 16.4367 20.4768 16.4643L14.4768 18.375L20.4768 20.2847C20.5707 20.3145 20.6578 20.3625 20.7331 20.426C20.8084 20.4896 20.8705 20.5673 20.9158 20.6548C20.961 20.7423 20.9886 20.8378 20.997 20.936C21.0053 21.0341 20.9942 21.133 20.9643 21.2268ZM6.37497 10.125C6.37497 8.2406 7.29091 6.29341 9.02247 4.49997C9.79942 3.69202 10.6667 2.97607 11.6072 2.36622C11.7253 2.29358 11.8613 2.25513 12 2.25513C12.1387 2.25513 12.2746 2.29358 12.3928 2.36622C12.6065 2.49279 17.625 5.63247 17.625 10.125C17.625 11.6168 17.0323 13.0476 15.9774 14.1024C14.9226 15.1573 13.4918 15.75 12 15.75C10.5081 15.75 9.07739 15.1573 8.02249 14.1024C6.9676 13.0476 6.37497 11.6168 6.37497 10.125ZM12 14.25C12.3978 14.25 12.7793 14.0919 13.0606 13.8106C13.3419 13.5293 13.5 13.1478 13.5 12.75C13.5 11.4778 12.5625 10.4568 12 9.95716C11.4375 10.4568 10.5 11.4778 10.5 12.75C10.5 13.1478 10.658 13.5293 10.9393 13.8106C11.2206 14.0919 11.6021 14.25 12 14.25ZM7.87497 10.125C7.87464 11.1805 8.2805 12.1956 9.00841 12.96C9.00841 12.8906 8.99997 12.8203 8.99997 12.75C8.99997 10.125 11.4787 8.44591 11.5837 8.3756C11.707 8.29337 11.8518 8.24949 12 8.24949C12.1481 8.24949 12.293 8.29337 12.4162 8.3756C12.5212 8.44591 15 10.125 15 12.75C15 12.8203 15 12.8906 14.9915 12.96C15.7194 12.1956 16.1253 11.1805 16.125 10.125C16.125 7.12497 13.1006 4.68747 12 3.9056C10.9003 4.68747 7.87497 7.12497 7.87497 10.125Z"
          fill="currentColor"
        />
      </svg>
    ),
    safety: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 3.2 19 6v5.4c0 4.4-3.1 7.6-7 9.4-3.9-1.8-7-5-7-9.4V6l7-2.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.3" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M7.8 16.3c1.3-2.1 3-3.2 4.2-3.2s2.9 1.1 4.2 3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
    bim3d: (
      <svg viewBox="0 0 73 73" aria-hidden="true" focusable="false">
        <path
          d="M66.1562 13.6875V25.0938C66.1562 25.6988 65.9159 26.279 65.4881 26.7068C65.0603 27.1347 64.48 27.375 63.875 27.375C63.27 27.375 62.6897 27.1347 62.2619 26.7068C61.8341 26.279 61.5938 25.6988 61.5938 25.0938V15.9688H52.4688C51.8637 15.9688 51.2835 15.7284 50.8557 15.3006C50.4278 14.8728 50.1875 14.2925 50.1875 13.6875C50.1875 13.0825 50.4278 12.5022 50.8557 12.0744C51.2835 11.6466 51.8637 11.4062 52.4688 11.4063H63.875C64.48 11.4063 65.0603 11.6466 65.4881 12.0744C65.9159 12.5022 66.1562 13.0825 66.1562 13.6875ZM20.5312 57.0312H11.4062V47.9062C11.4062 47.3012 11.1659 46.721 10.7381 46.2932C10.3103 45.8653 9.73003 45.625 9.125 45.625C8.51997 45.625 7.93973 45.8653 7.51191 46.2932C7.0841 46.721 6.84375 47.3012 6.84375 47.9062V59.3125C6.84375 59.9175 7.0841 60.4978 7.51191 60.9256C7.93973 61.3534 8.51997 61.5938 9.125 61.5938H20.5312C21.1363 61.5938 21.7165 61.3534 22.1443 60.9256C22.5722 60.4978 22.8125 59.9175 22.8125 59.3125C22.8125 58.7075 22.5722 58.1272 22.1443 57.6994C21.7165 57.2716 21.1363 57.0312 20.5312 57.0312ZM63.875 45.625C63.27 45.625 62.6897 45.8653 62.2619 46.2932C61.8341 46.721 61.5938 47.3012 61.5938 47.9062V57.0312H52.4688C51.8637 57.0312 51.2835 57.2716 50.8557 57.6994C50.4278 58.1272 50.1875 58.7075 50.1875 59.3125C50.1875 59.9175 50.4278 60.4978 50.8557 60.9256C51.2835 61.3534 51.8637 61.5938 52.4688 61.5938H63.875C64.48 61.5938 65.0603 61.3534 65.4881 60.9256C65.9159 60.4978 66.1562 59.9175 66.1562 59.3125V47.9062C66.1562 47.3012 65.9159 46.721 65.4881 46.2932C65.0603 45.8653 64.48 45.625 63.875 45.625ZM9.125 27.375C9.73003 27.375 10.3103 27.1347 10.7381 26.7068C11.1659 26.279 11.4062 25.6988 11.4062 25.0938V15.9688H20.5312C21.1363 15.9688 21.7165 15.7284 22.1443 15.3006C22.5722 14.8728 22.8125 14.2925 22.8125 13.6875C22.8125 13.0825 22.5722 12.5022 22.1443 12.0744C21.7165 11.6466 21.1363 11.4063 20.5312 11.4063H9.125C8.51997 11.4063 7.93973 11.6466 7.51191 12.0744C7.0841 12.5022 6.84375 13.0825 6.84375 13.6875V25.0938C6.84375 25.6988 7.0841 26.279 7.51191 26.7068C7.93973 27.1347 8.51997 27.375 9.125 27.375ZM53.6094 47.6211L37.6406 56.7461C37.2959 56.9432 36.9057 57.0468 36.5086 57.0468C36.1115 57.0468 35.7212 56.9432 35.3765 56.7461L19.3906 47.6211C19.0408 47.4191 18.7509 47.1279 18.5505 46.7772C18.3501 46.4265 18.2464 46.0289 18.25 45.625V27.375C18.2464 26.9711 18.3501 26.5735 18.5505 26.2228C18.7509 25.8721 19.0408 25.5809 19.3906 25.3789L35.3594 16.2539C35.7041 16.0568 36.0943 15.9532 36.4914 15.9532C36.8885 15.9532 37.2788 16.0568 37.6235 16.2539L53.5923 25.3789C53.9421 25.5809 54.232 25.8721 54.4324 26.2228C54.6328 26.5735 54.7365 26.9711 54.7329 27.375V45.625C54.7382 46.0272 54.6371 46.4237 54.4398 46.7743C54.2425 47.1248 53.956 47.417 53.6094 47.6211ZM25.128 27.375L36.5 33.8737L47.872 27.375L36.5 20.8763L25.128 27.375ZM22.8125 44.3019L34.2188 50.8177V37.8231L22.8125 31.3073V44.3019ZM50.1875 44.3019V31.3073L38.7812 37.8231V50.8177L50.1875 44.3019Z"
          fill="currentColor"
        />
      </svg>
    ),
    pumpingFamilies: (
      <svg viewBox="0 0 73 73" aria-hidden="true" focusable="false">
        <path
          d="M36.5002 22.8124C33.7931 22.8124 31.1467 23.6152 28.8958 25.1192C26.6449 26.6232 24.8906 28.7609 23.8546 31.262C22.8186 33.763 22.5476 36.5151 23.0757 39.1702C23.6038 41.8254 24.9074 44.2642 26.8217 46.1785C28.7359 48.0927 31.1748 49.3963 33.8299 49.9244C36.485 50.4526 39.2371 50.1815 41.7382 49.1456C44.2392 48.1096 46.3769 46.3552 47.8809 44.1043C49.3849 41.8534 50.1877 39.2071 50.1877 36.5C50.1839 32.871 48.7406 29.3917 46.1746 26.8256C43.6085 24.2595 40.1292 22.8162 36.5002 22.8124ZM36.5002 45.625C34.6954 45.625 32.9312 45.0898 31.4306 44.0871C29.93 43.0844 28.7604 41.6593 28.0698 39.9919C27.3791 38.3246 27.1984 36.4898 27.5505 34.7198C27.9026 32.9497 28.7717 31.3238 30.0478 30.0476C31.324 28.7714 32.9499 27.9024 34.72 27.5503C36.4901 27.1982 38.3248 27.3789 39.9922 28.0695C41.6596 28.7602 43.0847 29.9298 44.0874 31.4304C45.09 32.931 45.6252 34.6952 45.6252 36.5C45.6252 38.9201 44.6638 41.241 42.9525 42.9523C41.2413 44.6636 38.9203 45.625 36.5002 45.625ZM61.5939 37.1159C61.6054 36.7053 61.6054 36.2946 61.5939 35.884L65.8485 30.5687C66.0716 30.2896 66.226 29.962 66.2993 29.6124C66.3726 29.2627 66.3627 28.9007 66.2705 28.5555C65.573 25.9338 64.5297 23.4166 63.168 21.0701C62.9897 20.7631 62.7422 20.5019 62.4452 20.3073C62.1481 20.1128 61.8098 19.9902 61.4571 19.9495L54.6932 19.1967C54.4118 18.9001 54.1267 18.6149 53.8377 18.3412L53.0393 11.5602C52.9982 11.2072 52.8752 10.8687 52.6802 10.5716C52.4851 10.2746 52.2233 10.0272 51.9157 9.84924C49.5684 8.49004 47.0514 7.44776 44.4304 6.7496C44.085 6.65777 43.7229 6.64837 43.3732 6.72218C43.0235 6.79598 42.696 6.95091 42.4172 7.17448L37.1161 11.4062C36.7055 11.4062 36.2949 11.4062 35.8843 11.4062L30.5689 7.16022C30.2899 6.93714 29.9623 6.78272 29.6126 6.70942C29.2629 6.63612 28.9009 6.64597 28.5557 6.73819C25.9344 7.4369 23.4174 8.48016 21.0704 9.84069C20.7633 10.019 20.5021 10.2665 20.3076 10.5635C20.113 10.8606 19.9905 11.1989 19.9497 11.5516L19.1969 18.3269C18.9003 18.6102 18.6152 18.8954 18.3414 19.1824L11.5604 19.9609C11.2074 20.002 10.8689 20.1249 10.5719 20.32C10.2748 20.515 10.0275 20.7768 9.84949 21.0844C8.49028 23.4317 7.448 25.9487 6.74984 28.5698C6.65801 28.9151 6.64862 29.2773 6.72242 29.627C6.79622 29.9767 6.95115 30.3041 7.17472 30.583L11.4064 35.884C11.4064 36.2946 11.4064 36.7053 11.4064 37.1159L7.16046 42.4312C6.93738 42.7103 6.78297 43.0379 6.70966 43.3875C6.63636 43.7372 6.64621 44.0992 6.73843 44.4444C7.4359 47.0661 8.47922 49.5833 9.84093 51.9298C10.0192 52.2368 10.2667 52.498 10.5638 52.6926C10.8608 52.8871 11.1991 53.0097 11.5519 53.0504L18.3158 53.8032C18.599 54.0998 18.8842 54.3849 19.1712 54.6587L19.9611 61.4397C20.0022 61.7927 20.1252 62.1312 20.3202 62.4283C20.5153 62.7253 20.7771 62.9727 21.0846 63.1507C23.4319 64.5099 25.949 65.5521 28.57 66.2503C28.9154 66.3421 29.2775 66.3515 29.6272 66.2777C29.9769 66.2039 30.3044 66.049 30.5832 65.8254L35.8843 61.5937C36.2949 61.6051 36.7055 61.6051 37.1161 61.5937L42.4314 65.8482C42.7105 66.0713 43.0381 66.2257 43.3878 66.299C43.7375 66.3723 44.0995 66.3625 44.4446 66.2703C47.0664 65.5728 49.5836 64.5295 51.93 63.1678C52.2371 62.9895 52.4983 62.742 52.6928 62.4449C52.8874 62.1479 53.0099 61.8096 53.0507 61.4568L53.8035 54.6929C54.1 54.4116 54.3852 54.1264 54.6589 53.8375L61.44 53.039C61.793 52.9979 62.1315 52.875 62.4285 52.6799C62.7256 52.4849 62.9729 52.2231 63.1509 51.9155C64.5101 49.5682 65.5524 47.0512 66.2505 44.4301C66.3424 44.0848 66.3518 43.7226 66.278 43.3729C66.2042 43.0232 66.0492 42.6958 65.8257 42.4169L61.5939 37.1159ZM57.0029 35.2624C57.0514 36.0867 57.0514 36.9132 57.0029 37.7375C56.969 38.3019 57.1458 38.8588 57.4991 39.3002L61.5455 44.356C61.0812 45.8316 60.4867 47.263 59.7689 48.6334L53.3244 49.3633C52.7632 49.4256 52.245 49.6939 51.8701 50.1162C51.3212 50.7335 50.7366 51.3181 50.1193 51.867C49.697 52.2419 49.4287 52.7601 49.3664 53.3213L48.6507 59.7602C47.2805 60.4782 45.8491 61.0727 44.3734 61.5367L39.3147 57.4903C38.9099 57.1669 38.407 56.9909 37.8889 56.9913H37.752C36.9277 57.0398 36.1012 57.0398 35.2769 56.9913C34.7125 56.9573 34.1556 57.1341 33.7142 57.4875L28.6441 61.5367C27.1685 61.0724 25.7371 60.4779 24.3668 59.7602L23.6368 53.3242C23.5745 52.7629 23.3063 52.2448 22.884 51.8699C22.2666 51.321 21.682 50.7364 21.1331 50.119C20.7582 49.6967 20.2401 49.4285 19.6788 49.3662L13.24 48.6476C12.5219 47.2774 11.9274 45.846 11.4635 44.3703L15.5098 39.3116C15.8632 38.8702 16.04 38.3133 16.006 37.7489C15.9575 36.9246 15.9575 36.0981 16.006 35.2738C16.04 34.7094 15.8632 34.1525 15.5098 33.7111L11.4635 28.6439C11.9278 27.1683 12.5223 25.7369 13.24 24.3666L19.676 23.6366C20.2372 23.5743 20.7554 23.306 21.1303 22.8837C21.6792 22.2664 22.2638 21.6818 22.8811 21.1329C23.3051 20.7577 23.5744 20.2384 23.6368 19.6757L24.3525 13.2398C25.7227 12.5217 27.1542 11.9272 28.6299 11.4632L33.6886 15.5096C34.13 15.8629 34.6868 16.0397 35.2512 16.0058C36.0756 15.9573 36.902 15.9573 37.7264 16.0058C38.2907 16.0397 38.8476 15.8629 39.289 15.5096L44.3563 11.4632C45.8318 11.9275 47.2633 12.522 48.6336 13.2398L49.3636 19.6757C49.4259 20.237 49.6941 20.7551 50.1164 21.13C50.7337 21.6789 51.3184 22.2635 51.8673 22.8809C52.2422 23.3032 52.7603 23.5714 53.3216 23.6337L59.7604 24.3494C60.4784 25.7196 61.073 27.1511 61.5369 28.6268L57.4905 33.6855C57.1338 34.1306 56.9568 34.6932 56.9944 35.2624H57.0029Z"
          fill="currentColor"
        />
      </svg>
    ),
    digitalPlans: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M19.5 3.0001H15C14.6022 3.0001 14.2206 3.15814 13.9393 3.43944C13.658 3.72075 13.5 4.10228 13.5 4.5001V19.5001C13.5 19.8979 13.658 20.2795 13.9393 20.5608C14.2206 20.8421 14.6022 21.0001 15 21.0001H19.5C19.8978 21.0001 20.2794 20.8421 20.5607 20.5608C20.842 20.2795 21 19.8979 21 19.5001V4.5001C21 4.10228 20.842 3.72075 20.5607 3.43944C20.2794 3.15814 19.8978 3.0001 19.5 3.0001ZM19.5 19.5001H15V16.5001H17.25C17.4489 16.5001 17.6397 16.4211 17.7803 16.2804C17.921 16.1398 18 15.949 18 15.7501C18 15.5512 17.921 15.3604 17.7803 15.2198C17.6397 15.0791 17.4489 15.0001 17.25 15.0001H15V12.7501H17.25C17.4489 12.7501 17.6397 12.6711 17.7803 12.5304C17.921 12.3898 18 12.199 18 12.0001C18 11.8012 17.921 11.6104 17.7803 11.4698C17.6397 11.3291 17.4489 11.2501 17.25 11.2501H15V9.0001H17.25C17.4489 9.0001 17.6397 8.92108 17.7803 8.78043C17.921 8.63978 18 8.44901 18 8.2501C18 8.05119 17.921 7.86042 17.7803 7.71977C17.6397 7.57912 17.4489 7.5001 17.25 7.5001H15V4.5001H19.5V19.5001ZM7.28063 2.46948C7.21097 2.39974 7.12825 2.34442 7.03721 2.30668C6.94616 2.26894 6.84856 2.24951 6.75 2.24951C6.65144 2.24951 6.55384 2.26894 6.4628 2.30668C6.37175 2.34442 6.28903 2.39974 6.21938 2.46948L3.21938 5.46948C3.14975 5.53918 3.09454 5.62192 3.0569 5.71296C3.01926 5.80401 2.99992 5.90158 3 6.0001V19.5001C3 19.8979 3.15804 20.2795 3.43934 20.5608C3.72064 20.8421 4.10218 21.0001 4.5 21.0001H9C9.39782 21.0001 9.77936 20.8421 10.0607 20.5608C10.342 20.2795 10.5 19.8979 10.5 19.5001V6.0001C10.5001 5.90158 10.4807 5.80401 10.4431 5.71296C10.4055 5.62192 10.3503 5.53918 10.2806 5.46948L7.28063 2.46948ZM4.5 16.5001V7.5001H6V16.5001H4.5ZM7.5 7.5001H9V16.5001H7.5V7.5001ZM6.75 4.06041L8.68969 6.0001H4.81031L6.75 4.06041ZM4.5 19.5001V18.0001H9V19.5001H4.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    shopDrawings: (
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 40 L40 34 L54 46 L24 52 Z" />
          <path d="M14 42 L42 37" />
          <path d="M18 49 L46 43" />

          <path d="M8 26 C8 22 11 19 15 19 H33 C37 19 40 22 40 26 C40 30 37 33 33 33 H15 C11 33 8 30 8 26 Z" />
          <path d="M15 19 C19 19 22 22 22 26 C22 30 19 33 15 33" />
          <path d="M15 23 C16.7 23 18 24.3 18 26 C18 27.7 16.7 29 15 29" />

          <path d="M30 30 H49" />
          <path d="M30 44 H49" />
          <path d="M38.5 30 V44" />
          <path d="M42.5 30 V44" />

          <path d="M46 16 H60" />
          <path d="M52 16 V26" />
          <path d="M56 16 V22" />
          <path d="M46 22 H58" />
          <path d="M48 26 L52 26" />

          <circle cx="52" cy="34" r="7" />
          <circle cx="52" cy="34" r="2.5" />
          <path d="M52 24 V27" />
          <path d="M52 41 V44" />
          <path d="M42 34 H45" />
          <path d="M59 34 H62" />
          <path d="M45.5 27.5 L47.6 29.6" />
          <path d="M56.4 38.4 L58.5 40.5" />
          <path d="M45.5 40.5 L47.6 38.4" />
          <path d="M56.4 29.6 L58.5 27.5" />
        </g>
      </svg>
    ),
    boqMto: (
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="16" y="10" width="32" height="44" rx="4" />
          <rect x="22" y="6.5" width="20" height="10" rx="4" />
          <path d="M26 10.5h12" />

          <path d="M22 24 l2 2 l4-4" />
          <path d="M30 24 h14" />
          <path d="M22 32 l2 2 l4-4" />
          <path d="M30 32 h14" />
          <path d="M22 40 l2 2 l4-4" />
          <path d="M30 40 h14" />

          <path d="M9 44 l4-2.5 h6 l4 2.5 v5 l-4 2.5 h-6 l-4-2.5 z" />
          <circle cx="16" cy="46.5" r="2.2" />

          <path d="M42 54 h12" />
          <path d="M54 54 v-4 h-4" />
          <path d="M44 54 v-3.5" />
          <path d="M47 54 v-3.5" />
          <path d="M50 54 v-3.5" />
        </g>
      </svg>
    ),
    hvacFamilies: (
      <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">
        <defs>
          <g id="tooth">
            <rect x="236" y="10" width="40" height="60" rx="6" ry="6" />
          </g>
          <g id="fanBlade">
            <path
              d="M256 206
               C288 206 304 234 292 258
               C284 274 266 282 256 278
               C246 282 228 274 220 258
               C208 234 224 206 256 206Z"
            />
          </g>
        </defs>

        <g fill="currentColor">
          <g>
            <use href="#tooth" transform="rotate(0 256 256)" />
            <use href="#tooth" transform="rotate(30 256 256)" />
            <use href="#tooth" transform="rotate(60 256 256)" />
            <use href="#tooth" transform="rotate(90 256 256)" />
            <use href="#tooth" transform="rotate(120 256 256)" />
            <use href="#tooth" transform="rotate(150 256 256)" />
            <use href="#tooth" transform="rotate(180 256 256)" />
            <use href="#tooth" transform="rotate(210 256 256)" />
            <use href="#tooth" transform="rotate(240 256 256)" />
            <use href="#tooth" transform="rotate(270 256 256)" />
            <use href="#tooth" transform="rotate(300 256 256)" />
            <use href="#tooth" transform="rotate(330 256 256)" />
          </g>
          <circle cx="256" cy="256" r="240" />
        </g>

        <circle cx="256" cy="256" r="190" fill="var(--color-surface)" />

        <g fill="currentColor">
          <circle cx="256" cy="256" r="78" />
          <circle cx="256" cy="256" r="60" fill="var(--color-surface)" />
          <use href="#fanBlade" transform="rotate(0 256 256)" />
          <use href="#fanBlade" transform="rotate(90 256 256)" />
          <use href="#fanBlade" transform="rotate(180 256 256)" />
          <use href="#fanBlade" transform="rotate(270 256 256)" />
          <circle cx="256" cy="256" r="14" />
          <circle cx="256" cy="256" r="7" fill="var(--color-surface)" />

          <path
            d="M325 140
             h70
             a12 12 0 0 1 12 12
             v42
             a12 12 0 0 1 -12 12
             h-28
             v54
             a12 12 0 0 1 -12 12
             h-42
             a12 12 0 0 1 -12 -12
             v-70
             a12 12 0 0 1 12 -12
             h24
             v-26
             a12 12 0 0 1 12 -12Z"
          />

          <circle cx="170" cy="320" r="12" />
          <circle cx="200" cy="350" r="12" />
          <circle cx="140" cy="350" r="12" />
          <rect x="164" y="328" width="44" height="6" rx="3" />
          <rect x="144" y="338" width="6" height="18" rx="3" />
          <rect x="194" y="338" width="6" height="18" rx="3" />
        </g>
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M10.5 7.5C10.5 7.20333 10.588 6.91332 10.7528 6.66664C10.9176 6.41997 11.1519 6.22771 11.426 6.11418C11.7001 6.00065 12.0017 5.97094 12.2926 6.02882C12.5836 6.0867 12.8509 6.22956 13.0607 6.43934C13.2704 6.64912 13.4133 6.91639 13.4712 7.20736C13.5291 7.49834 13.4994 7.79994 13.3858 8.07402C13.2723 8.34811 13.08 8.58238 12.8334 8.7472C12.5867 8.91203 12.2967 9 12 9C11.6022 9 11.2206 8.84196 10.9393 8.56066C10.658 8.27936 10.5 7.89782 10.5 7.5ZM6 7.5C6 5.9087 6.63214 4.38258 7.75736 3.25736C8.88258 2.13214 10.4087 1.5 12 1.5C13.5913 1.5 15.1174 2.13214 16.2426 3.25736C17.3679 4.38258 18 5.9087 18 7.5C18 13.1203 12.6019 16.2694 12.375 16.4016C12.2617 16.4663 12.1334 16.5004 12.0028 16.5004C11.8723 16.5004 11.744 16.4663 11.6306 16.4016C11.3981 16.2694 6 13.125 6 7.5ZM7.5 7.5C7.5 11.4563 10.86 14.0822 12 14.8594C13.1391 14.0831 16.5 11.4563 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5ZM19.0097 13.8403C18.8251 13.7793 18.624 13.7924 18.4489 13.8768C18.2738 13.9612 18.1382 14.1102 18.0709 14.2926C18.0035 14.475 18.0096 14.6764 18.0879 14.8543C18.1661 15.0323 18.3104 15.1729 18.4903 15.2466C20.0381 15.8194 21 16.5863 21 17.25C21 18.5025 17.5762 20.25 12 20.25C6.42375 20.25 3 18.5025 3 17.25C3 16.5863 3.96188 15.8194 5.50969 15.2475C5.6896 15.1739 5.8339 15.0332 5.91215 14.8553C5.99039 14.6773 5.99648 14.4759 5.92913 14.2935C5.86178 14.1112 5.72624 13.9621 5.5511 13.8777C5.37596 13.7933 5.1749 13.7803 4.99031 13.8412C2.73937 14.6709 1.5 15.8822 1.5 17.25C1.5 20.1731 6.91031 21.75 12 21.75C17.0897 21.75 22.5 20.1731 22.5 17.25C22.5 15.8822 21.2606 14.6709 19.0097 13.8403Z"
          fill="currentColor"
        />
      </svg>
    ),
    generic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 12.5h12M9 8.5h6M9 16.5h6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  };

  const resolveServiceLabel = (service) => {
    const normalized = normalizeText(service);
    if (!normalized) return service;
    if (normalized.includes("proteccion contra incendios") || normalized.includes("spci")) return "SPCI";
    if (normalized.includes("deteccion") || normalized.includes("alarma") || normalized.includes("sda")) return "SDA";
    if (normalized.includes("gas natural") || normalized.includes("gas")) return "Gas Natural";
    if (normalized.includes("seguridad humana")) return "Seguridad Humana";
    if (normalized.includes("seguridad")) return "Seguridad";
    return service.length > 26 ? `${service.slice(0, 23)}...` : service;
  };

  const resolveServiceIcon = (service) => {
    const normalized = normalizeText(service);
    if (!normalized) return iconMap.generic;
    if (normalized.includes("incendio") || normalized.includes("spci")) return iconMap.fire;
    if (normalized.includes("deteccion") || normalized.includes("alarma") || normalized.includes("sda")) return iconMap.alarm;
    if (normalized.includes("gas")) return iconMap.gas;
    if (normalized.includes("seguridad") || normalized.includes("life safety") || normalized.includes("safety")) return iconMap.safety;
    if (
      (normalized.includes("familias") && normalized.includes("bombeo")) ||
      (normalized.includes("mechanical families") && normalized.includes("pumping"))
    )
      return iconMap.pumpingFamilies;
    if (
      (normalized.includes("planos") && normalized.includes("digital")) ||
      (normalized.includes("digital") && normalized.includes("drawings"))
    )
      return iconMap.digitalPlans;
    if (normalized.includes("shop drawings") || normalized.includes("shop drawing")) return iconMap.shopDrawings;
    if (normalized.includes("boq") || normalized.includes("mto")) return iconMap.boqMto;
    if (normalized.includes("listados") && normalized.includes("materiales")) return iconMap.boqMto;
    if (normalized.includes("material takeoff") || normalized.includes("material takeoffs")) return iconMap.boqMto;
    if (normalized.includes("ubicacion") || normalized.includes("ubicación") || normalized.includes("location")) return iconMap.location;
    if (
      (normalized.includes("familias") && normalized.includes("hvac")) ||
      (normalized.includes("mechanical families") && normalized.includes("hvac"))
    )
      return iconMap.hvacFamilies;
    if (normalized.includes("3d")) {
      const hasBim = normalized.includes("bim");
      const hasModel =
        normalized.includes("modelado") ||
        normalized.includes("modelamiento") ||
        normalized.includes("modeling") ||
        normalized.includes("modelling") ||
        normalized.includes("modelacion");
      const hasSystems = normalized.includes("sistemas") || normalized.includes("systems");
      if ((hasBim && hasModel) || (hasModel && hasSystems) || (hasBim && hasSystems)) {
        return iconMap.bim3d;
      }
    }
    return iconMap.generic;
  };

  return (
    <section className="section portfolio-page" id="portfolio-projects" ref={sectionRef}>
      <div className="container">
        <header className="portfolio-page__header" data-animate>
          <p className="section-kicker">{t("portfolioPage.section.kicker")}</p>
          <h2 className="section-title">{t("portfolioPage.section.title")}</h2>
          <p className="section-subtitle text-muted">{t("portfolioPage.section.subtitle")}</p>
        </header>

        <div className="portfolio-page__filters" data-animate style={{ transitionDelay: "0.06s" }}>
          {categories.length > 0 && (
            <div className="portfolio-page__chips" role="list" aria-label={t("portfolioPage.filters.label")}>
              <button
                type="button"
                className={`portfolio-page__chip ${activeCategory === "all" ? "is-active" : ""}`}
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
              >
                {t("portfolioPage.filters.all")}
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`portfolio-page__chip ${activeCategory === category ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="portfolio-page__grid">
          {filteredProjects.map((project, index) => {
            const image = projectImages[project.id] || gasPlantaImage;
            const highlights = Array.isArray(project.services)
              ? project.services.slice(0, 4).map((service) => ({
                  label: resolveServiceLabel(service),
                  icon: resolveServiceIcon(service),
                  tooltip: service,
                }))
              : [];
            const isExpanded = expandedId === project.id;
            const isVisible = visibleIds.includes(project.id);
            const categoryKey = project.category
              ? normalizeText(project.category).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
              : "";

            return (
              <article
                key={project.id || project.title}
                className={`portfolio-card ${isVisible ? "is-visible" : ""} ${isExpanded ? "is-expanded" : ""}`}
                data-animate
                data-card-id={project.id}
                style={{ transitionDelay: `${0.08 + index * 0.08}s` }}
                ref={(el) => {
                  if (el) cardRefs.current[project.id] = el;
                }}
              >
                <div className="portfolio-card__media">
                  <img src={image} alt={project.title} loading="lazy" decoding="async" />
                  <span className="portfolio-card__icon-pill" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M6 19V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11M5 19h14M9 8V5h6v3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path d="M9 12h6M9 15h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  {project.category && (
                    <span className="portfolio-card__badge" data-category={categoryKey}>
                      {project.category}
                    </span>
                  )}
                </div>
                <div className="portfolio-card__body">
                  <h3 className="portfolio-card__title">{project.title}</h3>
                  {project.location && (
                    <p className="portfolio-card__subtitle portfolio-card__location">
                      <span className="portfolio-card__location-icon" aria-hidden="true">
                        {iconMap.location}
                      </span>
                      <span>{project.location}</span>
                    </p>
                  )}
                  {project.type && <p className="portfolio-card__meta-line">{project.type}</p>}
                  {project.scale && <p className="portfolio-card__meta-line">{project.scale}</p>}

                  {highlights.length > 0 && (
                    <div className="portfolio-card__highlights" aria-label={metaLabel.services}>
                      {highlights.map((item, index) => {
                        const tooltipText = item.tooltip;
                        const showTooltip = Boolean(tooltipText);
                        return (
                          <div
                            className={`portfolio-card__highlight ${showTooltip ? "has-tooltip" : ""}`}
                            key={`${item.label}-${index}`}
                            data-tooltip={showTooltip ? tooltipText : undefined}
                            tabIndex={showTooltip ? 0 : undefined}
                            aria-label={showTooltip ? tooltipText : undefined}
                          >
                            <span className="portfolio-card__highlight-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {isExpanded && (
                    <div className="portfolio-card__detail">
                      {project.description && (
                        <>
                          <p className="portfolio-card__detail-title">{t("portfolioPage.card.detailTitle")}</p>
                          <p className="portfolio-card__detail-text">{project.description}</p>
                        </>
                      )}
                      {Array.isArray(project.services) && project.services.length > 0 && (
                        <div className="portfolio-card__detail-block">
                          <p className="portfolio-card__detail-label">{metaLabel.services}</p>
                          <ul>
                            {project.services.map((service) => (
                              <li key={service}>{service}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(project.software) && project.software.length > 0 && (
                        <div className="portfolio-card__detail-block">
                          <p className="portfolio-card__detail-label">{metaLabel.software}</p>
                          <ul>
                            {project.software.map((tool) => (
                              <li key={tool}>{tool}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    className={`portfolio-card__cta ${isExpanded ? "is-expanded" : ""}`}
                    aria-expanded={isExpanded}
                    onClick={() => {
                      setExpandedId((prev) => {
                        const next = prev === project.id ? null : project.id;
                        if (next === null) {
                          const restoreTo = lastScrollRef.current;
                          if (typeof window !== "undefined" && typeof restoreTo === "number") {
                            requestAnimationFrame(() => {
                              window.scrollTo({ top: restoreTo, behavior: "smooth" });
                            });
                          }
                          return null;
                        }
                        if (typeof window !== "undefined") {
                          lastScrollRef.current = window.scrollY;
                        }
                        if (cardRefs.current[project.id]) {
                          requestAnimationFrame(() => {
                            cardRefs.current[project.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
                          });
                        }
                        return next;
                      });
                    }}
                  >
                    {isExpanded ? t("portfolioPage.card.detailClose") : t("portfolioPage.card.cta", "Ver más")}
                  </button>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
