import React from "react";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const ContactPage = () => {
    return (
        <main className="app" id="top">
            <h1>Contacto</h1>
            <p>¡Ponte en contacto con nosotros!</p>
            <ScrollTop threshold={260} label="Subir" />
            <WhatsAppButton
              phone="573001112233"
              message="Hola, quiero más información."
              label="Chat"
            />
        </main>
    );
};

export default ContactPage;
