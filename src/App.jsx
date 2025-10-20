import React, { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer/Footer";

// Lazy loading de componentes pesados
const Logo = lazy(() => import("./components/Logo/Logo"));
const Collection = lazy(() => import("./components/Collection/Collection"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const About = lazy(() => import("./components/About/About"));
const ProductDetail = lazy(() => import("./components/ProductDetail/ProductDetail"));
const Custom = lazy(() => import("./components/ProductDetail/Custom/Custom"));
const GuiaTallas = lazy(() => import("./components/Guia-Tallas/Guia-tallas"));
const Anillos = lazy(() => import("./components/Collection/Anillos/Anillos"));
const Colgantes = lazy(() => import("./components/Collection/Colgantes/Colgantes"));
const Pendientes = lazy(() => import("./components/Collection/Pendientes/Pendientes"));
const Colecciones = lazy(() => import("./components/Collection/Colecciones/Colecciones"));

// Componente de carga simple
const LoadingFallback = () => (
  <div style={{ 
    width: '100%', 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff'
  }}>
    Cargando...
  </div>
);

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <Logo />
              <Collection />
            </PageWrapper>
          } />
          <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
          <Route path="/collection/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
          <Route path="/custom" element={<PageWrapper><Custom /></PageWrapper>} />
          <Route path="/collection/anillos" element={<PageWrapper><Anillos/></PageWrapper>} />
          <Route path="/collection/colgantes" element={<PageWrapper><Colgantes/></PageWrapper>} />
          <Route path="/collection/pendientes" element={<PageWrapper><Pendientes/></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/guia-tallas" element={<PageWrapper><GuiaTallas/></PageWrapper>} />
          <Route path="/collection/colecciones" element={<PageWrapper><Colecciones/></PageWrapper>} />
        </Routes>
      </Suspense>
      
      <Footer />
    </Router>
  );
}

export default App;
