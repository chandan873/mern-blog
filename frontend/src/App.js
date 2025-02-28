import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Service from "./components/Service";
import Data from "./components/Data";
import Blog from "./components/Blog";
import Brain from "./components/Brain";
import Form from "./components/ContactForm";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";
import BlogSection from "./components/BlogSection";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Service />
              <Data />
              <Blog />
              <Brain />
              <Form />
              <WhyUs />
              <BlogSection />
            </>
          }
        />
        <Route path="/bloglist" element={<BlogList/>} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Route for BlogForm */}
        <Route
          path="/blogform"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;






