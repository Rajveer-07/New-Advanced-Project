import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGRadialGradientElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const gradient = gradientRef.current;

    if (!svg || !gradient) return;

    // Initial animation setup
    const texts = svg.querySelectorAll('text');
    texts.forEach(text => {
      text.style.opacity = '0';
      text.style.transform = 'translateY(50px)';
      text.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Trigger entrance animation
    setTimeout(() => {
      texts.forEach(text => {
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      });
    }, 300);

    const handleMouseMove = (event: MouseEvent) => {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
      gradient.setAttribute("cx", svgPoint.x.toString());
      gradient.setAttribute("cy", svgPoint.y.toString());
    };

    svg.addEventListener("mousemove", handleMouseMove);
    return () => svg.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-[Inter]">
      {/* Header with fade-in animation */}
      <header className="fixed top-5 left-10 right-0 z-10 flex items-center opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/67YdYqs5/Screenshot-2025-02-24-at-1-37-37-PM-removebg-preview.png"
            alt="xAI Logo"
            className="w-12 h-auto mr-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            {["RGPV", "Papers", "Gallery", "About", "Careers"].map((item, index) => (
              <li 
                key={item}
                className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <a
                  href={item.toLowerCase() === "rgpv" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[#B3B3B3] hover:text-white text-base transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-full h-[1.2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section with SVG */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-screen h-screen">
          <svg
            ref={svgRef}
            viewBox="0 3 2000 1100"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                <feOffset in="blur" dx="-10" dy="0" result="blurRed"/>
                <feFlood floodColor="red" result="redFlood"/>
                <feComposite in="redFlood" in2="blurRed" operator="in" result="redGlow"/>
                <feOffset in="blur" dx="20" dy="0" result="blurGreen"/>
                <feFlood floodColor="green" result="greenFlood"/>
                <feComposite in="greenFlood" in2="blurGreen" operator="in" result="greenGlow"/>
                <feOffset in="blur" dx="0" dy="-10" result="blurBlue"/>
                <feFlood floodColor="blue" result="blueFlood"/>
                <feComposite in="blueFlood" in2="blurBlue" operator="in" result="blueGlow"/>
                <feMerge>
                  <feMergeNode in="redGlow"/>
                  <feMergeNode in="greenGlow"/>
                  <feMergeNode in="blueGlow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <mask id="glow-mask">
                <radialGradient 
                  id="gradient" 
                  ref={gradientRef}
                  cx="1000" 
                  cy="200" 
                  r="200" 
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="5"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
                <rect width="90%" height="90%" fill="url(#gradient)"/>
              </mask>
            </defs>
            <text 
              x="50.5%" 
              y="50.5%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="360" 
              fontWeight="100" 
              stroke="#ffffff" 
              strokeWidth="1" 
              fill="none"
              letterSpacing="10"
            >
              RGPV
            </text>
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="360" 
              fontWeight="100" 
              stroke="#ffffff" 
              strokeWidth="1" 
              fill="none" 
              filter="url(#glow)" 
              mask="url(#glow-mask)"
              letterSpacing="10"
            >
              RGPV
            </text>
          </svg>
        </div>

        <div className="fixed bottom-[20%] left-0 right-0 space-y-6 px-4 text-center opacity-0 animate-[fadeSlideUp_1s_ease-out_1.2s_forwards]">
          <p className="text-xl opacity-85 font-medium">
            Announcing RGPV Papers Hub
          </p>
          <div className="flex justify-center items-center gap-6">
            <a
              href="/about"
              className="text-[#B3B3B3] hover:text-white text-base transition-colors underline"
            >
              Learn more
            </a>
            <a
              href="/papers"
              className="text-[#B3B3B3] hover:text-white text-base transition-colors underline group flex items-center"
            >
              Explore
              <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
