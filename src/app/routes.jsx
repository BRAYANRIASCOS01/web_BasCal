import { Suspense, lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";

import Navbar from "../shared/components/Navbar.jsx";
import Footer from "../shared/components/Footer.jsx";

const HomePage = lazy(() => import("../features/home/pages/HomePage.jsx"));
const ServicesBimPage = lazy(() => import("../features/home/pages/ServicesBimPage.jsx"));
const ServicesProfessionalPage = lazy(() => import("../features/home/pages/ServicesProfessionalPage.jsx"));
const ServicesConstruccionPage = lazy(() => import("../features/home/pages/ServicesConstructionPage.jsx"));
const ServicesStaffAugmentationPage = lazy(() => import("../features/home/pages/ServicesStaffAugmentationPage.jsx"));
const PortafolioPage = lazy(() => import("../features/home/pages/PortfolioPage.jsx"));
const EmpresaFAQPage = lazy(() => import("../features/home/pages/EmpresaFAQPage.jsx"));
const ContactPage = lazy(() => import("../features/home/pages/ContactPage.jsx"));
const EmpresaSobreNosotros = lazy(() => import("../features/home/pages/EmpresaSobreNosotros.jsx"));
const EmpresaBlogPage = lazy(() => import("../features/home/pages/EmpresaBlogPage.jsx"));
const NotFoundPage = lazy(() => import("../features/home/pages/NotFoundPage.jsx"));

const SUPPORTED_LANGUAGES = ["es", "en"];
const DEFAULT_LANG = "es";

const RouteFallback = () => <main className="app" aria-busy="true" style={{ minHeight: "40vh" }} />;

const LanguageLayout = () => {
  const { lang } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [i18n, lang]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Evita sobrescribir navegación por ancla en la misma página
    if (location.hash) return undefined;

    const id = window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }, 40);

    return () => window.clearTimeout(id);
  }, [location.pathname, location.search, location.hash]);

  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}/404`} replace />;
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />

    <Route path=":lang" element={<LanguageLayout />}>
      {/* Inicio */}
      <Route index element={<HomePage />} />

      {/* Servicios */}
      <Route path="servicios/bim" element={<ServicesBimPage />} />
      <Route path="servicios/profesionales" element={<ServicesProfessionalPage />} />
      <Route path="servicios/construccion" element={<ServicesConstruccionPage />} />
      <Route path="servicios/staff-augmentation" element={<ServicesStaffAugmentationPage />} />

      {/* Portafolio */}
      <Route path="portafolio" element={<PortafolioPage />} />

      {/* Empresa */}
      <Route path="empresa/faq" element={<EmpresaFAQPage />} />
      <Route path="empresa/sobre-nosotros" element={<EmpresaSobreNosotros />} />
      <Route path="empresa/blog" element={<EmpresaBlogPage />} />

      {/* Contacto */}
      <Route path="contacto" element={<ContactPage />} />
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>

    <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}/404`} replace />} />
  </Routes>
);

export default AppRoutes;
