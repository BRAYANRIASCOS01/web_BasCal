import React from "react";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const ServicesStaffAugmentationPage = () => {
    return (
        <main className="app" id="top">
            <h1>Servicios de Staff Augmentation</h1>
            <p>Bienvenido a la página de servicios de staff augmentation.</p>
            <ScrollTop threshold={260} label="Subir" />
            <WhatsAppButton
              phone="573001112233"
              message="Hola, quiero más información sobre servicios de staff augmentation."
              label="Chat"
            />
        </main>
    );
};

export default ServicesStaffAugmentationPage;
