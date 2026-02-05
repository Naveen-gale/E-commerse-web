import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop",
    path: "/men", // Direct path to Men page
    description: "Modern tailoring & casual fits"
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    path: "/women", // Direct path to Women page
    description: "Elegance for every occasion"
  },
  {
    name: "Kids",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop",
    path: "/kids", // Direct path to Kids page
    description: "Comfort meets playful style"
  },
  {
    name: "Winter",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    path: "/winter", // Direct path to Winter page
    description: "Essential layers for the cold"
  },
];

const Categories = () => {
  const navigate = useNavigate();

  // Updated handler to accept the full path
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full bg-black py-24 px-4 md:px-8 border-t border-white/5">
      
      {/* --- Section Header --- */}
      <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
        <span className="text-blue-500 text-xs font-bold tracking-[0.3em] uppercase">
          Curated Collections
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white">
          Shop by Category
        </h2>
        <div className="w-24 h-[1px] bg-white/20 mx-auto mt-6"></div>
      </div>

      {/* --- Grid Container --- */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            // Now navigates to the specific path (e.g., /men)
            onClick={() => handleClick(cat.path)} 
            className="group relative h-[500px] w-full overflow-hidden rounded-xl border border-white/10 cursor-pointer"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

            {/* Content Layer */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start justify-end h-full">
              
              <h3 className="text-3xl font-serif text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                {cat.name}
              </h3>

              <p className="text-gray-400 text-sm mb-6 max-w-[80%] transform transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-75">
                 {cat.description}
              </p>

              <div className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors">
                <span className="text-xs font-bold tracking-[0.2em] uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                  Shop Now
                </span>
                <span className="bg-white text-black rounded-full p-1 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;