import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";

import Navbar from "../shared/components/Navbar.jsx"; // crea este archivo en el paso 2
import Footer from "../shared/components/Footer.jsx"; // opcional

import HomePage from "../features/home/pages/HomePage.jsx";
import ServicesBimPage from "../features/home/pages/ServicesBimPage.jsx";
import ServicesProfessionalPage from "../features/home/pages/ServicesProfessionalPage.jsx";
import ServicesConstruccionPage from "../features/home/pages/ServicesConstructionPage.jsx";
import ServicesStaffAugmentationPage from "../features/home/pages/ServicesStaffAugmentationPage.jsx";
import PortafolioPage from "../features/home/pages/PortfolioPage.jsx";
import EmpresaFAQPage from "../features/home/pages/EmpresaFAQPage.jsx";
import ContactPage from "../features/home/pages/ContactPage.jsx";
import EmpresaSobreNosotros from "../features/home/pages/EmpresaSobreNosotros.jsx";

const SUPPORTED_LANGUAGES = ["es", "en"];
const DEFAULT_LANG = "es";

const LanguageLayout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [i18n, lang]);

  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
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
      <Route path="servicios/staff-augmentation" element={<ServicesStaffAugmentationPage/>} />

      {/* Portafolio */}
      <Route path="portafolio" element={<PortafolioPage/>} />

      {/* Empresa */}
      <Route path="empresa/faq" element={<EmpresaFAQPage/>} />
      <Route path="empresa/sobre-nosotros" element={<EmpresaSobreNosotros/>} />
      <Route path="empresa/blog" element={<div style={{ padding: 24 }}>Blog</div>} />

      {/* Contacto */}
      <Route path="contacto" element={<ContactPage />} />
    </Route>

    <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
  </Routes>
);

export default AppRoutes;
