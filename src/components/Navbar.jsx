import { useState, useRef, useEffect } from 'react';
import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef();
  const menuItemsRef = useRef([]);
  const navbarRef = useRef();
  const lastScrollY = useRef(0);

  // Handle menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Enable interaction before animating
      gsap.set(mobileMenuRef.current, { pointerEvents: 'auto' });
      
      // Animate menu container
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate menu items with stagger
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power1.out"
      });

      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      // Animate out
      gsap.to([mobileMenuRef.current, ...menuItemsRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Disable interaction after animation
          gsap.set(mobileMenuRef.current, { pointerEvents: 'none' });
          // Restore body scroll
          document.body.style.overflow = '';
          document.body.style.position = '';
        }
      });
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, [isMobileMenuOpen]);

  // Add shadow and hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        navbarRef.current.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        
        // Hide navbar on scroll down (mobile only)
        if (window.innerWidth < 768) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            navbarRef.current.style.transform = 'translateY(-100%)';
          } else {
            navbarRef.current.style.transform = 'translateY(0)';
          }
        }
      } else {
        navbarRef.current.style.boxShadow = 'none';
        navbarRef.current.style.transform = 'translateY(0)';
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={navbarRef}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-black/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300"
      style={{ willChange: 'transform' }}
    >
      <nav className="flex w-full screen-max-width items-center justify-between mx-auto">
        {/* Apple Logo */}
        <img 
          src={appleImg} 
          alt="Apple" 
          width={14} 
          height={18} 
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          {navLists.map((nav) => (
            <div 
              key={nav} 
              className="px-5 text-sm cursor-pointer text-gray-400 hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        {/* Icons and Mobile Button */}
        <div className="flex items-center gap-4 md:gap-7">
          <img 
            src={searchImg} 
            alt="Search" 
            width={18} 
            height={18} 
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img 
            src={bagImg} 
            alt="Bag" 
            width={18} 
            height={18} 
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          
          <button 
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu - Full screen overlay */}
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-lg pt-8 px-6 opacity-0 -translate-y-5 pointer-events-none"
          style={{ zIndex: 40 }}
        >
          <div className="max-w-md mx-auto">
            {navLists.map((nav, index) => (
              <div 
                key={nav}
                ref={el => menuItemsRef.current[index] = el}
                className="py-4 text-center text-white text-lg hover:text-gray-300 transition-colors border-b border-gray-800 last:border-0 opacity-0 translate-y-2"
              >
                {nav}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;