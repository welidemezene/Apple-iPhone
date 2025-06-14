import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { heroVideo, smallHeroVideo } from '../utils';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  useEffect(() => {
    const handleVideoSrcSet = () => {
      setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    };

    const debouncedHandleResize = debounce(handleVideoSrcSet, 200);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 1.5 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 1.5 });
  }, []);

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  return (
    <section className="w-full h-screen bg-black relative overflow-hidden"> {/* Changed to h-screen */}
      {/* Full-screen video container */}
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p id="hero" className="hero-title opacity-0 mb-4">iPhone 15 Pro</p>
        
        {/* Video (responsive but full-width) */}
        <div className="w-full max-w-screen-2xl px-4"> {/* Added padding control */}
          <video
            autoPlay
            muted
            playsInline
            loop
            key={videoSrc}
            className="w-full h-auto max-h-[80vh] object-cover" /* Ensures video covers space */
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        {/* CTA positioned at bottom */}
        <div id="cta" className="absolute bottom-10 left-0 right-0 text-center opacity-0">
          <a href="#highlights" className="btn">Buy</a>
          <p className="text-white mt-2">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;