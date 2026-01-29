import React from "react";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const ServicesConstructionPage = () => {
    return (
        <main className="app" id="top">
            <h1>Servicios de Construcción</h1>
            <p>Bienvenido a la página de servicios de construcción.</p>
            <ScrollTop threshold={260} label="Subir" />
            <WhatsAppButton
              phone="573001112233"
              message="Hola, quiero más información sobre servicios de construcción."
              label="Chat"
            />
        </main>
    );
};

export default ServicesConstructionPage;
