import React from "react";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Collection from "./components/Collection/Collection";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import GuiaTallas from "./components/Guia-Tallas/Guia-tallas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer/Footer";
import Anillos from "./components/Collection/Anillos/Anillos";
import Colgantes from "./components/Collection/Colgantes/Colgantes";
import Pendientes from "./components/Collection/Pendientes/Pendientes";

function App() {
  return (
    <Router>
      <Header />


      <Routes>
        <Route path="/" element={<PageWrapper><Logo /></PageWrapper>} />
        <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
        <Route path="/collection/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/collection/anillos" element={<PageWrapper><Anillos/></PageWrapper>} />
        <Route path="/collection/colgantes" element={<PageWrapper><Colgantes/></PageWrapper>} />
        <Route path="/collection/pendientes" element={<PageWrapper><Pendientes/></PageWrapper>} />


        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/guia-tallas" element={<PageWrapper><GuiaTallas/></PageWrapper>} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
