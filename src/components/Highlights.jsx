import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    // Only initialize animations if not on mobile
    if (window.innerWidth >= 768) { // md breakpoint
      gsap.set(["#title", ".link"], { y: 50 });

      gsap.to("#title", {
        y: 10,
        opacity: 1,
        scrollTrigger: {
          trigger: "#title",
          start: "top 80%"
        }
      });

      gsap.to(".link", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".links-container",
          start: "top 70%"
        }
      });
    }
  }, []);

  return (
    <section id="highlights" className="hidden md:block w-full min-h-screen bg-zinc-900 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          
          <div className="links-container hidden md:flex gap-5">
            <a href="#" className="link flex items-center">
              Watch the film
              <img 
                src={watchImg} 
                alt="Play" 
                className="ml-2"
              />
            </a>
            <a href="#" className="link flex items-center">
              Watch the event
              <img 
                src={rightImg} 
                alt="Arrow" 
                className="ml-2"
              />
            </a>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;