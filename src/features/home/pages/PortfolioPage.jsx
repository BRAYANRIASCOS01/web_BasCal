import React from "react";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const PortafolioPage = () => {
    return (
        <main className="app" id="top">
            <h1>Portafolio</h1>
            <p>Bienvenido a la página de portafolio.</p>
            <ScrollTop threshold={260} label="Subir" />
            <WhatsAppButton
              phone="573001112233"
              message="Hola, quiero más información sobre el portafolio."
              label="Chat"
            />
        </main>
    );
};

export default PortafolioPage;
