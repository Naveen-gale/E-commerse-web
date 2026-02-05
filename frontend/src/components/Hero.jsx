import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
    title: "Ethereal Summer",
    subtitle: "The 2024 Collection",
    description: "Discover the warmth of the season with our latest sustainable fabrics and breezy cuts.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1920&auto=format&fit=crop",
    title: "Urban Elegance",
    subtitle: "City Chic Essentials",
    description: "Tailored for the modern metropolis. Sharp lines, neutral tones, and uncompromising comfort.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920&auto=format&fit=crop",
    title: "Evening Noir",
    subtitle: "Midnight Luxury",
    description: "Step into the spotlight with our exclusive evening wear designed to turn heads.",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per slide

  useEffect(() => {
    // Reset progress bar on slide change
    setProgress(0);
    
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((old) => (old < 100 ? old + (100 / (duration / 50)) : 100));
    }, 50);

    // Change slide
    const slideInterval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [current]);

  const handleManualChange = (index) => {
    setCurrent(index);
    setProgress(0); // Reset progress immediately
  };

  return (
    <div className="relative w-full h-[92vh] overflow-hidden bg-black text-white">
      
      {/* --- Background Images (Cross-Fade & Zoom) --- */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image with Slow Zoom Effect (Ken Burns) */}
          <div className={`w-full h-full transition-transform duration-[6000ms] ease-out ${
             current === index ? "scale-110" : "scale-100"
          }`}>
             <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>
      ))}

      {/* --- Content Content (Left Aligned Editorial Style) --- */}
      <div className="absolute inset-0 z-20 flex items-center pl-8 md:pl-20 pr-4">
        <div className="max-w-[600px] overflow-hidden">
          
          {slides.map((slide, index) => (
             current === index && (
              <div key={index} className="space-y-6">
                
                {/* Animated Subtitle */}
                <div className="overflow-hidden">
                   <p className="text-yellow-400/90 font-medium tracking-[0.3em] uppercase text-sm animate-slide-up-fade">
                    {slide.subtitle}
                   </p>
                </div>

                {/* Animated Title */}
                <div className="overflow-hidden py-2">
                  <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight animate-slide-up-fade [animation-delay:200ms]">
                    {slide.title.split(" ")[0]} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                      {slide.title.split(" ")[1]}
                    </span>
                  </h1>
                </div>

                {/* Animated Description */}
                <p className="text-gray-300 text-lg md:text-xl font-light max-w-md animate-fade-in [animation-delay:400ms]">
                  {slide.description}
                </p>

                {/* Animated Button */}
                <div className="pt-4 animate-fade-in [animation-delay:600ms]">
                  <button className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest text-xs uppercase overflow-hidden cursor-pointer" onClick={() => navigate('/collection')}>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300" >
                      Discover Collection
                    </span>
                    <div className="absolute inset-0 bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </button>
                </div>

              </div>
            )
          ))}
        </div>
      </div>

      {/* --- Controls Section (Bottom Right) --- */}
      <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-6">
        
        {/* Slide Counter (01 / 03) */}
        <div className="text-5xl font-serif font-light text-white/20">
          <span className="text-white">0{current + 1}</span>
          <span className="text-2xl mx-2">/</span>
          0{slides.length}
        </div>

        {/* Navigation Dots with Progress Ring effect */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleManualChange((current - 1 + slides.length) % slides.length)}
            className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
          >
            ←
          </button>
          
          <button 
             onClick={() => handleManualChange((current + 1) % slides.length)}
             className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {/* --- Bottom Progress Bar --- */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Add Custom Keyframes in Style tag (or use Tailwind config) */}
      <style>{`
        @keyframes slide-up-fade {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
      `}</style>
    </div>
  );
};

export default Hero;