import React from "react";
import "./contact.scss";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import Banner from "../../components/contactSection/banner/Banner";
import ContactContent from "../../components/contactSection/contact/ContactContent";

export default function Contact({ toast, toastOptions }) {
  return (
    <div className="contact" id="contact">
      {/* <NavBar /> */}
      <Banner />
      <ContactContent toastOptions={toastOptions} toast={toast} />
      {/* <Footer /> */}
    </div>
  );
}
