import React from "react";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const EmpresaFAQPage = () => {
    return (
        <main className="app" id="top">
            <h1>FAQ</h1>
            <p>Bienvenido a la página de preguntas frecuentes.</p>
            <ScrollTop threshold={260} label="Subir" />
            <WhatsAppButton
              phone="573001112233"
              message="Hola, quiero más información."
              label="Chat"
            />
        </main>
    );
};

export default EmpresaFAQPage;
