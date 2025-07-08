import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; action: string };
  };
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: "Conquer the",
      subtitle: "Roof of Africa",
      description: "Experience the ultimate adventure with Tanzania's premier tour operator. From Kilimanjaro's summit to the Serengeti's plains, we make dreams come true.",
      image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: {
        primary: { text: "Explore Kilimanjaro", link: "/tours/mountain-climbing" },
        secondary: { text: "Watch Climbing Video", action: "video" }
      }
    },
    {
      id: 2,
      title: "Witness the",
      subtitle: "Great Migration",
      description: "Join millions of wildebeest and zebras on their epic journey across the Serengeti. Experience nature's greatest spectacle with expert guides.",
      image: "https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: {
        primary: { text: "Safari Adventures", link: "/tours/safari" },
        secondary: { text: "Watch Safari Video", action: "video" }
      }
    },
    {
      id: 3,
      title: "Discover",
      subtitle: "Hidden Gems",
      description: "Explore Tanzania's best-kept secrets with our day trips and cultural experiences. From coffee plantations to local villages.",
      image: "https://images.pexels.com/photos/1821644/pexels-photo-1821644.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: {
        primary: { text: "Day Trips", link: "/tours/day-trips" },
        secondary: { text: "Cultural Experiences", action: "video" }
      }
    },
    {
      id: 4,
      title: "Explore",
      subtitle: "Zanzibar Paradise",
      description: "Combine your mainland adventure with the pristine beaches and rich culture of Zanzibar. The perfect end to your Tanzanian journey.",
      image: "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: {
        primary: { text: "Zanzibar Tours", link: "/tours/zanzibar" },
        secondary: { text: "Beach Paradise", action: "video" }
      }
    },
    {
      id: 5,
      title: "Experience",
      subtitle: "Wildlife Wonders",
      description: "Get up close with Africa's Big Five in their natural habitat. Professional guides ensure unforgettable wildlife encounters.",
      image: "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: {
        primary: { text: "Wildlife Safari", link: "/tours/safari" },
        secondary: { text: "Animal Encounters", action: "video" }
      }
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Transition */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <img 
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-orange-600 scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {currentSlideData.title}
          <span className="text-orange-600 block">{currentSlideData.subtitle}</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {currentSlideData.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={currentSlideData.cta.primary.link}
            className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 text-lg font-semibold"
          >
            <span>{currentSlideData.cta.primary.text}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center space-x-2 text-lg font-semibold">
            <Play className="h-5 w-5" />
            <span>{currentSlideData.cta.secondary.text}</span>
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-sm md:text-base">Successful Climbs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-sm md:text-base">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-sm md:text-base">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">2000+</div>
            <div className="text-sm md:text-base">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;