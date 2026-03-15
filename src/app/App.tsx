import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MenuPage } from "./components/MenuPage"; // Ensure path is correct

// Extract the Landing Page components into a single Home component
function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      {/* Route Definitions */}
      <main>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Full Menu Page */}
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}