import React from "react";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Collection from "./components/Collection/Collection";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />


      <Routes>
        <Route path="/" element={<PageWrapper><Logo /></PageWrapper>} />
        <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
        <Route path="/collection/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
