import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Brain,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Send,
  Loader2,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Calendar,
  Layers,
  Upload,
  RefreshCcw,
  Check
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
// --- Assets & AI Initialization ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- Helper Components ---

const FireParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(40)].map((_, i) => {
      const size = Math.random() * 6 + 2;
      return (
        <motion.div
          key={i}
          className="absolute bottom-[-20px] rounded-full"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            background: Math.random() > 0.5 ? '#ff4500' : (Math.random() > 0.5 ? '#ffa500' : '#ff8c00'),
            boxShadow: '0 0 10px 2px rgba(255, 69, 0, 0.8)',
          }}
          animate={{
            y: [0, -(Math.random() * 200 + 100)],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 1, 0],
            scale: [1, Math.random() * 0.5 + 0.5]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 3
          }}
        />
      );
    })}
  </div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [theme, setTheme] = useState({ color: '#2563eb', shadow: 'rgba(37,99,235,0.4)', rgba: 'rgba(37,99,235,0.3)' });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    const handleScrollAndTheme = () => {
      const sectionColors = [
        { id: 'hero', color: '#2563eb', shadow: 'rgba(37,99,235,0.5)', rgba: 'rgba(37,99,235,0.3)' }, // Blue
        { id: 'solutions', color: '#8b5cf6', shadow: 'rgba(139,92,246,0.5)', rgba: 'rgba(139,92,246,0.3)' }, // Purple
        { id: 'training', color: '#10b981', shadow: 'rgba(16,185,129,0.5)', rgba: 'rgba(16,185,129,0.3)' }, // Green
        { id: 'registration', color: '#ec4899', shadow: 'rgba(236,72,153,0.5)', rgba: 'rgba(236,72,153,0.3)' }, // Pink
        { id: 'contact', color: '#ff4500', shadow: 'rgba(255,69,0,0.5)', rgba: 'rgba(255,69,0,0.3)' }, // Orange/Fire
      ];

      let activeTheme = sectionColors[0];
      for (const sec of sectionColors) {
        const el = document.getElementById(sec.id) || (sec.id === 'hero' ? document.querySelector('section') : null);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeTheme = sec;
            break;
          }
        }
      }
      setTheme(activeTheme);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', handleScrollAndTheme);
    handleScrollAndTheme(); // Initial call

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .group');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', handleScrollAndTheme);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor flex items-center justify-center relative"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2.5 : isClicking ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
    >
      <div
        className={`cursor-inner ${isHovering ? 'opacity-10' : 'opacity-100'}`}
        style={{ backgroundColor: theme.rgba, borderColor: theme.rgba }}
      />
      <div
        className={`cursor-dot ${isHovering ? 'scale-0' : 'scale-100'} transition-transform`}
        style={{ backgroundColor: theme.color }}
      />

      {/* Floating circular particles */}
      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[4px] h-[4px] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              x: Math.cos((i * 60 * Math.PI) / 180) * 22 - 2,
              y: Math.sin((i * 60 * Math.PI) / 180) * 22 - 2,
              backgroundColor: theme.color,
              boxShadow: `0 0 8px ${theme.color}`
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const useNetworkMonitor = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pflops, setPflops] = useState("1.28");
  const [pingColor, setPingColor] = useState("text-green-500");

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    const interval = setInterval(() => {
      if (!navigator.onLine) {
        setPflops("0.00");
        setPingColor("text-red-500 animate-pulse");
        return;
      }

      // Detect network speed via NetworkInformation API if available
      let rtt = 50;
      // @ts-ignore
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

      if (connection && connection.rtt) {
        rtt = connection.rtt;
      } else {
        // Fallback to random fluctuation if not supported by browser
        rtt = 40 + Math.random() * 60;
      }

      // Update PFLOPS and Colors based on connection tier
      if (rtt > 300) {
        setPingColor("text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]");
        setPflops((0.15 + Math.random() * 0.1).toFixed(2));
      } else if (rtt > 100) {
        setPingColor("text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]");
        setPflops((0.85 + Math.random() * 0.1).toFixed(2));
      } else {
        setPingColor("text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]");
        setPflops((1.20 + Math.random() * 0.15).toFixed(2));
      }

    }, 2000);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      clearInterval(interval);
    };
  }, []);

  return { isOnline, pflops, pingColor };
};

const ViewportReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

const roles = [
  { title: "Junior Web Developer", type: "Full-Time", desc: "Build responsive web applications using modern stacks." },
  { title: "AI & API Integrator", type: "Specialized", desc: "Connect advanced LLMs and AI services into production apps." },
  { title: "Backend Developer", type: "Full-Time", desc: "Architect scalable server-side systems and databases." },
  { title: "Full Stack Developer", type: "Full-Time", desc: "Frontend to backend mastery with MERN/Next.js." },
  { title: "UI/UX Designer", type: "Creative", desc: "Design intuitive and stunning user experiences." },
  { title: "Data Scientist", type: "Analytical", desc: "Extract insights from complex datasets using ML." },
  { title: "Digital Marketing Executive", type: "Marketing", desc: "Drive growth through strategic digital campaigns." },
  { title: "Business Development", type: "Strategy", desc: "Identify and scale new opportunities for the ecosystem." },
];

const VisualLogo = ({ darkTheme = false }: { darkTheme?: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-3 group cursor-pointer"
    onClick={() => window.location.href = '#'}
  >
    <div className={`relative h-24 flex items-center ${darkTheme ? 'bg-white/90 p-2 lg:p-3 rounded-2xl backdrop-blur-sm' : ''}`}>
      <img
        src="/logo.png"
        alt="Cognito Insights"
        className="h-full object-contain filter transition-all mix-blend-multiply drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    </div>
  </motion.div>
);

const HighTechButton = ({
  children,
  variant = "primary",
  className = "",
  onClick = () => { }
}: {
  children: React.ReactNode,
  variant?: "primary" | "secondary" | "outline",
  className?: string,
  onClick?: () => void
}) => {
  const base = "relative px-8 py-4 font-display font-bold text-[13px] uppercase tracking-[3px] transition-all overflow-hidden group";
  const variants = {
    primary: "bg-brand-primary text-white shadow-lg hover:shadow-xl",
    secondary: "bg-slate-100 text-brand-primary border border-brand-primary/20 hover:bg-slate-200",
    outline: "border border-brand-border text-brand-primary hover:bg-slate-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <div className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </div>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />
    </motion.button>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    x.set(mouseX / 10);
    y.set(-mouseY / 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
    >
      <div className="preserve-3d w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const BubbleGallery = () => {
  const technologies = [
    { name: "Generative AI", icon: <Brain />, color: "rgba(0, 242, 255, 0.4)" },
    { name: "Deep Learning", icon: <Cpu />, color: "rgba(112, 0, 255, 0.4)" },
    { name: "Predictive Core", icon: <BarChart3 />, color: "rgba(255, 0, 122, 0.4)" },
    { name: "Global Cloud", icon: <Globe />, color: "rgba(58, 134, 255, 0.4)" },
    { name: "Neural Sync", icon: <Zap />, color: "rgba(0, 242, 255, 0.4)" },
    { name: "Secured Edge", icon: <ShieldCheck />, color: "rgba(58, 240, 118, 0.4)" },
  ];

  const { scrollYProgress } = useScroll();
  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <section className="py-20 relative overflow-hidden bg-brand-dark/30 perspective-1000">
      <div className="atmosphere pointer-events-none opacity-20" />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-30"
      />

      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <ViewportReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-primary text-[10px] font-black uppercase tracking-[8px] mb-4"
          >
            Technology Stack
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-display font-light text-slate-900 uppercase tracking-tight">
            Our <b className="font-bold text-brand-primary text-glow">Cognitive</b> Ecosystem
          </h2>
        </ViewportReveal>
      </div>

      <div className="relative h-[450px] flex items-center justify-center -mt-10 overflow-hidden">
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-20 group preserve-3d"
        >
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
            <div key={i} className="flex-shrink-0">
              <TiltCard>
                <motion.div
                  whileHover={{ scale: 1.15, z: 80 }}
                  className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center p-8 transition-all duration-700 overflow-hidden preserve-3d dark-card group-hover:border-brand-primary/50 cursor-pointer"
                  style={{
                    boxShadow: `0 0 60px ${tech.color}44`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30" />
                  <div className="text-brand-primary mb-4 scale-[1.8] drop-shadow-[0_0_15px_rgba(0,242,255,0.6)]">{tech.icon}</div>
                  <span className="text-[12px] font-black text-white uppercase tracking-[3px] text-center leading-tight">{tech.name}</span>

                  {/* 3D Bubble shine */}
                  <div className="absolute top-8 left-8 w-20 h-20 bg-white/5 rounded-full blur-2xl font-mono" />
                </motion.div>
              </TiltCard>
            </div>
          ))}
        </motion.div>

        {/* Curvature overlays */}
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,242,255,0.15),transparent_70%)]" />
        </div>
        <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-brand-dark via-brand-dark/80 to-transparent z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(0,242,255,0.15),transparent_70%)]" />
        </div>

        {/* Curvature Lens Effect Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,7,10,0.6)_100%)]" />
      </div>
    </section>
  );
};

const HiringTicker = () => {
  const jobs = [
    "AI Architect",
    "Full Stack Neural Engineer",
    "Data Intelligence Specialist",
    "Cloud Cognitive Systems",
    "UI/UX Designer",
    "Digital Marketing Executive",
    "MERN Stack Specialist",
    "Cybersecurity Sentinel"
  ];

  return (
    <div className="w-full bg-brand-primary/10 border-b border-brand-primary/20 h-10 flex items-center overflow-hidden relative group">
      <div className="flex-shrink-0 bg-brand-dark px-8 h-full flex items-center z-20 border-r border-brand-primary/20">
        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] whitespace-nowrap">Hiring Now:</span>
      </div>
      <div className="flex gap-16 whitespace-nowrap ticker-item">
        {[...jobs, ...jobs, ...jobs].map((job, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-black uppercase tracking-[3px]">{job}</span>
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-dark to-transparent z-10" />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Training', href: '#training' },
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#registration' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 pointer-events-none`}>
      <div className={`transition-all duration-700 pointer-events-auto overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
        <HiringTicker />
      </div>
      <nav className={`mx-auto transition-all duration-700 pointer-events-auto ${isScrolled ? `w-[95%] max-w-7xl mt-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}` : 'w-full bg-white/20 backdrop-blur-lg border-b border-white/10'}`}>
        <div className={`transition-all duration-500 relative ${isScrolled ? 'py-3 px-2 md:px-6' : 'py-5'}`}>
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-brand-primary origin-left z-[60]"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <VisualLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-[11px] font-bold text-brand-text-dim hover:text-brand-primary transition-all uppercase tracking-[2px] relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <HighTechButton
              className="!py-2 !px-6"
              onClick={() => window.location.href = '#registration'}
            >
              Unlock your potential
            </HighTechButton>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-black hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/5 backdrop-blur-xl border-b border-white/20 overflow-hidden shadow-lg"
            >
              <div className="flex flex-col px-6 pt-2 pb-6 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-full py-4 border-b border-black/20 text-lg font-bold text-slate-800 uppercase tracking-[2px] hover:text-brand-primary transition-colors last:border-b-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '#registration';
                  }}
                  className="w-full py-4 mt-2 bg-brand-primary text-white text-[11px] uppercase tracking-[4px] shadow-lg shadow-brand-primary/20 rounded-xl font-black"
                >
                  Unlock Potential
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </nav>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I am CognitoAI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!ai) {
        setMessages(prev => [...prev, { role: 'ai', text: "Chatbot is temporarily disabled due to missing API key configuration." }]);
        setIsLoading(false);
        return;
      }
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{
              text: `You are CognitoAI Assistant, a helpful AI for Cognito Insights Solutions AI Private Limited. 
            The company provides IT & Non-IT Training, Corporate Upskilling, Hiring Solutions, and Digital Platforms.
            We are currently hiring for roles like AI / API Integrator, Junior AI Developer, Full Stack Developer (MERN), Data Science Intern, and Associate Software Engineer.
            Contact: info@cognitoinsights.ai, 8978246111, 8978247111. Website: www.cognitoinsights.ai
            Answer this user query professionally: ${userMessage}`
            }]
          }
        ],
        config: {
          systemInstruction: "You are a professional AI assistant for Cognito Insights Solutions AI. Be concise, helpful, and innovative in your tone. Mention our career opportunities if relevant."
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] dark-card rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-brand-dark/50 border-b border-white/5 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-brand-primary/30 rounded-xl flex items-center justify-center bg-white/5 overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Cognito Insights Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-black text-[10px] uppercase tracking-[3px] block leading-none mb-1 text-white">Neural Assistant</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-brand-primary opacity-60">Status: Optimal</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/5 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-[13px] ${msg.role === 'user'
                      ? 'bg-brand-primary text-brand-dark'
                      : 'bg-white/5 text-slate-300 border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-brand-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-brand-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-brand-primary text-brand-dark p-2 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-primary text-brand-dark rounded-full shadow-lg shadow-brand-primary/20 flex items-center justify-center"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

const TrainingPrograms = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const programs = [
    {
      title: "Core Java & DSA",
      duration: "10 Weeks",
      level: "Intermediate",
      desc: "Strong focus on object-oriented programming, data structures, and algorithm optimization."
    },
    {
      title: "Python Cyber Security",
      duration: "12 Weeks",
      level: "Advanced",
      desc: "Scripting for security automation, penetration testing, and ethical hacking protocols."
    },
    {
      title: "Full Stack Web Dev",
      duration: "14 Weeks",
      level: "Professional",
      desc: "Comprehensive MERN architecture training with modern AI and API integration."
    },
    {
      title: "Data Science & analytics",
      duration: "12 Weeks",
      level: "Advanced",
      desc: "Extracting insights using statistical modeling, data cleaning, and visualization tools."
    },
    {
      title: "AI Tools & Agents",
      duration: "6 Weeks",
      level: "Specialist",
      desc: "Harnessing the power of generative AI, prompt engineering, and autonomous agents."
    },
    {
      title: "Machine Learning Ops",
      duration: "16 Weeks",
      level: "Advanced",
      desc: "Building, deploying and managing scalable machine learning systems in production."
    },
    {
      title: "VLSI & Embedded Systems",
      duration: "14 Weeks",
      level: "Technical",
      desc: "Deep dive into hardware architecture, circuit design, and microcontroller programming."
    },
    {
      title: "Cloud Computing Mastery",
      duration: "10 Weeks",
      level: "Professional",
      desc: "Architecting serverless solutions and application deployment on AWS/GCP ecosystems."
    },
    {
      title: "AI Power BI & Tableau",
      duration: "8 Weeks",
      level: "Business",
      desc: "Transforming data into interactive stories and executive dashboards for smart decisions."
    }
  ];

  return (
    <section id="training" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ViewportReveal>
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl md:text-[60px] font-display font-light mb-6 text-black drop-shadow-sm uppercase tracking-tighter leading-tight">Neural <b className="font-black text-brand-primary text-glow">Training</b> Archives</h2>
            <p className="text-brand-text-dim max-w-2xl mx-auto uppercase text-[11px] tracking-[4px] font-bold opacity-60">
              Empowering the next generation of AI engineers through industry-aligned curriculum.
            </p>
          </div>
        </ViewportReveal>

        <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide snap-x px-4 -mx-4">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0 w-[350px] snap-center"
            >
              <TiltCard>
                <div className="h-full p-10 dark-card rounded-3xl border-white/5 bg-gradient-to-br from-[#0a0f1a] to-brand-bubble group hover:border-brand-primary/40 transition-all duration-700 relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all" />

                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] px-3 py-1 bg-brand-primary/5 rounded-sm border border-brand-primary/20">{program.level}</span>
                    <span className="text-[10px] text-slate-300 uppercase font-black tracking-[2px] opacity-60">{program.duration}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-tight group-hover:text-brand-primary transition-colors leading-none">{program.title}</h3>
                  <div className="w-12 h-[1px] bg-brand-primary/20 mb-6" />
                  <p className="text-slate-300 text-sm leading-relaxed font-light mb-10 opacity-80">
                    {program.desc}
                  </p>
                  <button
                    onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[10px] font-black text-white uppercase tracking-[3px] flex items-center gap-3 group-hover:gap-6 transition-all group-hover:text-brand-primary"
                  >
                    Initialize Enrollment <ArrowRight size={14} className="text-brand-primary" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Enhanced scroll indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ScrollSegment key={i} index={i} total={6} progress={scrollXProgress} />
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-[9px] font-black text-brand-primary uppercase tracking-[2px]">Neural Flux Protocol</span>
        </div>
      </div>
    </section>
  );
};

const ScrollSegment = ({ index, total, progress }: { index: number, total: number, progress: any }) => {
  const opacity = useTransform(progress, [index / total, (index + 0.5) / total, (index + 1) / total], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [index / total, (index + 0.5) / total, (index + 1) / total], [1, 1.2, 1]);

  return (
    <motion.div
      className="w-12 h-1 bg-brand-primary rounded-full"
      style={{ opacity, scale }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
    />
  );
};

const RegistrationForm = () => {
  const [formType, setFormType] = useState<'internship' | 'placement' | 'job-mela'>('internship');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    aadhaar: '',
    college: '',
    highestQualification: '',
    specialization: '',
    passingYear: '',
    scoreRange: '',
    applicationSector: '',
    experienceLevel: '',
    primarySkill: '',
    location: '',
    melaCity: '',
    course: '',
    role: '',
    resumeUrl: '',
    termsAccepted: false
  });
  const [file, setFile] = useState<File | null>(null);

  const isStep1Complete = formData.fullName && formData.fatherName && formData.dob && formData.gender && formData.email && formData.phone && formData.aadhaar;
  const isStep2Complete = isStep1Complete && formData.college && formData.highestQualification && formData.specialization && formData.passingYear && formData.scoreRange;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Auto-advance if section is filled
    if (activeStep === 1 && isStep1Complete) setActiveStep(2);
    if (activeStep === 2 && isStep2Complete) setActiveStep(3);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: '',
      fatherName: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      aadhaar: '',
      college: '',
      highestQualification: '',
      specialization: '',
      passingYear: '',
      scoreRange: '',
      applicationSector: '',
      experienceLevel: '',
      primarySkill: '',
      location: '',
      melaCity: '',
      course: '',
      role: '',
      resumeUrl: '',
      termsAccepted: false
    });
    setFile(null);
  };

  const calculateProgress = () => {
    const fields = [
      formData.fullName,
      formData.fatherName,
      formData.dob,
      formData.gender,
      formData.email,
      formData.phone,
      formData.aadhaar,
      formData.college,
      formData.highestQualification,
      formData.specialization,
      formData.passingYear,
      formData.scoreRange,
      formData.applicationSector,
      formData.experienceLevel,
      formData.primarySkill,
      formData.location,
      formData.melaCity,
      formData.course,
      formData.role,
      (formData.resumeUrl || file) ? 'filled' : '',
      formData.termsAccepted ? 'true' : ''
    ];
    const filled = fields.filter(f => f && f !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the Terms & Conditions.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      clearForm();
    }, 5000);
  };

  const progress = calculateProgress();

  return (
    <section id="registration" className="py-20 relative overflow-hidden">
      <div className="atmosphere pointer-events-none opacity-10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ViewportReveal>
          <div className="text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-[11px] font-black uppercase tracking-[8px]">Growth Engine</span>
              <div className="h-[2px] w-12 bg-brand-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-[60px] font-display font-light mb-6 text-black drop-shadow-sm uppercase tracking-tighter leading-tight">
              Cognito <b className="font-black text-brand-primary text-glow">Internships, Training</b> <br /> & Placement Support
            </h2>
            <p className="text-brand-text-dim uppercase text-[12px] tracking-[6px] font-bold opacity-60">Enable your potential using Cognito Insights</p>
          </div>
        </ViewportReveal>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-black text-brand-primary uppercase tracking-[2px] mb-8">Opening Positions</h3>
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 group hover:border-brand-primary/40 transition-all cursor-pointer relative overflow-hidden shadow-lg"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black text-black">0{i + 1}</div>
                <div className="relative z-10">
                  <div className="text-brand-primary text-[10px] font-black mb-2 uppercase tracking-[3px]">{role.type}</div>
                  <h4 className="text-xl font-bold text-black mb-3 font-display group-hover:text-brand-primary transition-colors">{role.title}</h4>
                  <p className="text-slate-600 text-xs font-light opacity-70 mb-4">{role.desc}</p>
                  <div
                    onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[2px] group-hover:translate-x-2 transition-transform"
                  >
                    Apply Now <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Form Progress Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/5 overflow-hidden rounded-t-[3rem]">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.8)]"
              />
            </div>
            <div className="absolute top-4 right-10 text-[10px] font-black text-brand-primary uppercase tracking-[2px]">
              Onboarding Progress: {progress}%
            </div>

            <div className="mb-14 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mt-4 text-center md:text-left">
              <div>
                <h3 className="text-5xl font-display font-black text-slate-800 mb-2 uppercase tracking-tighter">Onboarding</h3>
                <p className="text-slate-400 text-[11px] uppercase tracking-[4px] font-black opacity-80">Awaiting candidate credentials</p>
              </div>
              <div className="flex p-1.5 bg-brand-dark/60 rounded-3xl md:rounded-full border border-brand-border flex-wrap justify-center gap-2 md:gap-0">
                {['internship', 'placement', 'job-mela'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormType(type as any)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 ${formType === type ? 'bg-brand-primary text-brand-dark shadow-[0_0_20px_rgba(0,242,255,0.4)]' : 'text-brand-text-dim hover:text-white'}`}
                  >
                    {type === 'internship' && <GraduationCap size={14} />}
                    {type === 'placement' && <Briefcase size={14} />}
                    {type === 'job-mela' && <Layers size={14} />}
                    {type === 'job-mela' ? 'Job Mela' : type}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-24 glass-panel rounded-[2rem] border-brand-primary/20 bg-brand-primary/[0.02]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    className="w-24 h-24 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(0,242,255,0.4)]"
                  >
                    <ShieldCheck size={48} />
                  </motion.div>
                  <h3 className="text-5xl font-display font-black mb-6 text-white uppercase tracking-tighter">System Access Activated</h3>
                  <p className="text-slate-400 text-lg font-light max-w-lg mx-auto mb-10">Candidate profiles are being synchronized with our Neural Matching Engine.</p>
                  <button onClick={() => setIsSubmitted(false)} className="px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-[4px] rounded-full">
                    Initialize New Intake
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={formType}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-12"
                >
                  {/* Step 1: Personal Details */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${activeStep >= 1 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                      <div className="text-brand-primary text-[11px] font-black uppercase tracking-[4px]">Personal Details</div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: activeStep >= 1 ? 'auto' : 0, opacity: activeStep >= 1 ? 1 : 0 }}
                      className="overflow-hidden grid grid-cols-2 gap-10 px-2"
                    >
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Father's Name</label>
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Father's Name" required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Date of Birth</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Mobile Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 89782 XXXXX" required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane@cognito.ai" required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Aadhaar Number</label>
                        <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} placeholder="XXXX XXXX XXXX" required maxLength={14} className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl" />
                      </div>
                      <div className="col-span-2 flex justify-end mt-4">
                        <button type="button" onClick={() => setActiveStep(2)} className="px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-[4px] rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">Next Section</button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step 2: Educational Details */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${activeStep >= 2 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                      <div className="text-brand-primary text-[11px] font-black uppercase tracking-[4px]">Educational Details</div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: activeStep >= 2 ? 'auto' : 0, opacity: activeStep >= 2 ? 1 : 0 }}
                      className="overflow-hidden grid grid-cols-2 gap-10 px-2"
                    >
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Highest Qualification</label>
                        <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Qualification</option>
                          <option value="B.Tech">B.Tech / B.E</option>
                          <option value="M.Tech">M.Tech / M.E</option>
                          <option value="MCA">MCA</option>
                          <option value="MBA">MBA</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Specialization</label>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Specialization</option>
                          <option value="CSE">CSE</option>
                          <option value="IT">IT</option>
                          <option value="ECE">ECE</option>
                          <option value="EEE">EEE</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Year of Passing</label>
                        <select name="passingYear" value={formData.passingYear} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Year</option>
                          {[2025, 2024, 2023, 2022].map(yr => <option key={yr} value={yr}>{yr}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Percentage / CGPA</label>
                        <select name="scoreRange" value={formData.scoreRange} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Range</option>
                          <option value="90+">90%+ / 9.0+</option>
                          <option value="80-90">80%-90% / 8.0-9.0</option>
                          <option value="70-80">70%-80% / 7.0-8.0</option>
                        </select>
                      </div>
                      <div className="col-span-2 flex justify-between mt-4">
                        <button type="button" onClick={() => setActiveStep(1)} className="px-10 py-4 border border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-[4px] rounded-xl hover:bg-slate-50 transition-all">Back</button>
                        <button type="button" onClick={() => setActiveStep(3)} className="px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-[4px] rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">Next Section</button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step 3: Job Preferences */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${activeStep >= 3 ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
                      <div className="text-brand-primary text-[11px] font-black uppercase tracking-[4px]">Job Preferences</div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: activeStep >= 3 ? 'auto' : 0, opacity: activeStep >= 3 ? 1 : 0 }}
                      className="overflow-hidden grid grid-cols-2 gap-10 px-2"
                    >
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Applying For</label>
                        <select name="applicationSector" value={formData.applicationSector} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Sector</option>
                          <option value="IT">IT</option>
                          <option value="Non-IT">Non-IT</option>
                          <option value="Semi-Technical">Semi-Technical</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Experience Level</label>
                        <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Preferred Location</label>
                        <select name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-transparent border-b border-brand-border focus:border-brand-primary px-4 py-4 text-slate-800 focus:outline-none transition-all font-display text-xl appearance-none [&>option]:text-black">
                          <option value="">Select Location</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] ml-2">Upload Resume (PDF/DOCX, max 5MB)</label>
                        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer" />
                      </div>
                      <div className="col-span-2 flex justify-start mt-4">
                        <button type="button" onClick={() => setActiveStep(2)} className="px-10 py-4 border border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-[4px] rounded-xl hover:bg-slate-50 transition-all">Back</button>
                      </div>
                    </motion.div>
                  </div>

                  {activeStep === 3 && (
                    <div className="col-span-2 flex flex-col items-center gap-8 mt-10">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} className="w-6 h-6 rounded border-2 border-brand-primary/30 text-brand-primary focus:ring-brand-primary" />
                        <span className="text-[10px] font-black text-brand-text-dim uppercase tracking-[2px]">I accept the terms and conditions</span>
                      </label>
                      <div className="flex w-full justify-between items-center gap-4">
                        <button type="button" onClick={clearForm} className="text-[10px] font-black text-brand-text-dim uppercase tracking-[2px] flex items-center gap-2 hover:text-black transition-colors"><RefreshCcw size={14} /> Clear Form</button>
                        <HighTechButton className="!px-16">Initialize Onboarding</HighTechButton>
                      </div>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: 'translateZ(50px)' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const rotateHero = useTransform(scrollYProgress, [0, 1], [0, 25]);

  const { isOnline, pflops, pingColor } = useNetworkMonitor();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 500]), rotate: rotateHero }}
        className="absolute inset-0 bg-mesh opacity-20 pointer-events-none"
      />
      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute top-1/4 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity }}
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-black text-brand-primary mb-10 uppercase tracking-[5px] shadow-[0_0_20px_rgba(26,54,93,0.1)]">
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-brand-primary animate-ping' : 'bg-red-500'}`} />
            <span>{isOnline ? 'You are connected to Cognito Insights' : 'Cognito Insights Offline'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[110px] font-display font-light leading-[0.9] mb-10 text-black drop-shadow-lg tracking-tighter">
            Architecting <br />
            <b className="font-black text-brand-primary drop-shadow-[0_0_15px_rgba(37,99,235,0.4)] block mt-4 border-l-4 border-brand-primary pl-6 hover:pl-10 transition-all duration-700 uppercase">Cognitive Minds</b>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-2xl text-brand-text-dim max-w-xl mb-14 leading-relaxed font-light italic opacity-90 mx-auto lg:mx-0">
            "Enable your potential using Cognito Insights."
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <HighTechButton onClick={() => window.location.href = '#registration'}>
              Unlock Potential <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </HighTechButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="hidden lg:block relative perspective-1000"
        >
          <div className="visual-stack relative h-[650px] flex items-center justify-center transform preserve-3d">
            {/* Pulsing Core Gradients */}
            <div className="absolute w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[100px] animate-pulse delay-700" />

            <div className={`absolute w-[500px] h-[500px] border-2 border-brand-primary/10 rounded-full ${isOnline ? 'animate-[spin_30s_linear_infinite]' : ''}`} />
            <div className={`absolute w-[600px] h-[600px] border border-dashed border-brand-secondary/20 rounded-full ${isOnline ? 'animate-[spin_50s_linear_infinite_reverse]' : ''}`} />

            <motion.div
              animate={isOnline ? { rotateY: [0, 360] } : { rotateY: 0 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-[380px] h-[380px] bg-white border-2 border-brand-primary/40 rounded-full shadow-[0_0_150px_rgba(37,64,235,0.4)] flex items-center justify-center relative preserve-3d backdrop-blur-md overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-transparent to-brand-primary/20 rounded-full animate-pulse" />
              {/* Spinning Ring */}
              <div className={`absolute inset-0 border-[10px] border-brand-primary/5 rounded-full ${isOnline ? 'animate-[spin_10s_linear_infinite]' : ''}`} />
              <div className={`absolute inset-4 border-[1px] border-dashed border-brand-primary/20 rounded-full ${isOnline ? 'animate-[spin_20s_linear_infinite_reverse]' : ''}`} />

              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative p-8 group">
                <div className="absolute inset-0 bg-white/20 shadow-inner rounded-full pointer-events-none" />
                <img
                  src="/logo.png"
                  alt="Cognito Core"
                  className={`w-full h-full object-contain object-center mix-blend-multiply filter contrast-125 drop-shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-1000 relative z-10 ${isOnline ? 'group-hover:scale-110 group-hover:drop-shadow-[0_0_50px_rgba(37,99,235,0.9)]' : 'grayscale opacity-70'}`}
                  onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                />
              </div>

              {/* Lens Flare Effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_60%)] pointer-events-none opacity-50 mix-blend-overlay" />
            </motion.div>

            {/* Floating neural nodes */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 ${isOnline ? 'bg-brand-primary' : 'bg-red-500'} rounded-full`}
                style={{
                  transform: `rotate(${i * 22.5}deg) translate(190px)`,
                  boxShadow: isOnline ? '0 0 15px #00f2ff' : '0 0 15px #ef4444'
                }}
              >
                <div className={`absolute inset-0 rounded-full opacity-40 ${isOnline ? 'animate-ping bg-brand-primary' : 'bg-red-500'}`} />
              </div>
            ))}

            {/* Orbital stats */}
            <motion.div
              animate={isOnline ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel p-4 rounded-xl border-brand-primary/30">
                <span className={`text-[10px] block mb-1 uppercase font-bold tracking-widest ${pingColor}`}>PFLOPS</span>
                <span className={`text-xl font-bold font-mono ${pingColor}`}>{pflops}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[4px] font-black opacity-40 group-hover:opacity-100 transition-opacity">Scroll Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const ServiceModal = ({ service, onClose }: { service: any, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full p-12 dark-card rounded-[3rem] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden bg-brand-surface/90"
      >
        <div className="absolute top-0 right-0 p-8">
          <button onClick={onClose} className="text-white opacity-50 hover:opacity-100 transition-opacity">
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-10 shadow-[0_0_40px_rgba(0,242,255,0.2)]">
            {service.icon}
          </div>
          <span className="text-[11px] font-black font-mono text-brand-primary uppercase tracking-[6px] mb-4 opacity-70">{service.tag}</span>
          <h3 className="text-5xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none">{service.title}</h3>
          <div className="w-20 h-[1px] bg-brand-primary/30 mb-8" />
          <p className="text-slate-300 text-xl font-light leading-relaxed mb-12 opacity-90 max-w-lg italic">
            "{service.desc} Our advanced neural infrastructure ensures that every {service.title.toLowerCase()} protocol is optimized for your candidate's technical peak."
          </p>
          <HighTechButton onClick={onClose}>Acknowledge Protocol</HighTechButton>
        </div>

        {/* Decorative glass bubbles */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-secondary/10 rounded-full blur-[80px] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "IT Training",
      desc: "Advanced technical training in AI, Cloud Computing, and Full-Stack Development for the digital age.",
      tag: "CORE_SKILLS"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Non-IT Training",
      desc: "Soft skills, management, and operational excellence training for non-technical professionals.",
      tag: "MGMT_TECH"
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: "Corporate Upskilling",
      desc: "Tailored enterprise programs to transform your workforce into an AI-ready powerhouse.",
      tag: "ENT_TRANS"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Hiring Solutions",
      desc: "Connecting top-tier technical talent with industry leaders through our neural matching engine.",
      tag: "TALENT_SYNC"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Platforms",
      desc: "Building scalable, AI-integrated digital ecosystems for modern business transformation.",
      tag: "SYS_ARCH"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Predictive Analytics",
      desc: "Turn historical data into future certainty with our advanced statistical forecasting engines.",
      tag: "DATA_CORE"
    }
  ];

  return (
    <section id="solutions" className="py-20 relative bg-brand-dark/20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-brand-primary/5 rounded-full -mr-64 -mt-64 animate-[spin_60s_linear_infinite]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border border-brand-secondary/5 rounded-full -ml-40 -mb-40 animate-[spin_40s_linear_infinite_reverse]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ViewportReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <div className="h-[2px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-[10px] font-black uppercase tracking-[8px]">Our Protocols</span>
              <div className="h-[2px] w-12 bg-brand-primary" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display font-light mb-8 text-black drop-shadow-sm uppercase tracking-tighter leading-none">
              Strategic <b className="font-black text-brand-primary text-glow drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">Solutions</b>
            </h2>
            <p className="text-brand-text-dim max-w-2xl mx-auto uppercase text-[11px] tracking-[4px] font-bold opacity-70">
              Comprehensive systems designed to bridge the gap between human potential and machine intelligence.
            </p>
          </div>
        </ViewportReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <ViewportReveal key={i} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="h-full p-10 dark-card rounded-3xl group hover:border-brand-primary/40 transition-all duration-700 overflow-hidden relative group translate-z-10 bg-brand-bubble">
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="text-8xl font-black text-white">{i + 1}</span>
                  </div>

                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all duration-500 text-brand-primary relative">
                      <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl blur-lg group-hover:blur-xl opacity-50 transition-all" />
                      <div className="relative z-10">{service.icon}</div>
                    </div>
                    <span className="text-[9px] font-black font-mono text-brand-primary/60 border border-brand-primary/20 px-3 py-1 rounded-full uppercase tracking-widest">{service.tag}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight font-display group-hover:text-brand-primary transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed font-light mb-10 opacity-80">
                    {service.desc}
                  </p>

                  <div
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-3 text-brand-primary text-[11px] font-black uppercase tracking-[3px] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all cursor-pointer"
                  >
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </TiltCard>
            </ViewportReveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0.3, 0.7], [0, -100]);
  const scaleImage = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.1]);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative perspective-1000">
          <ViewportReveal>
            <motion.div
              style={{ y: yImage, scale: scaleImage }}
              className="relative group"
            >
              <div className="absolute -inset-8 bg-brand-primary/10 rounded-[40px] blur-[80px] group-hover:bg-brand-secondary/20 transition-all duration-1000" />
              <div className="relative z-10 rounded-[2rem] overflow-hidden glass-panel border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <img
                  src="/team.jpeg"
                  alt="Team collaboration"
                  className="w-full h-auto grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                  <div className="flex flex-col gap-2">
                    <div className="text-6xl font-display font-black text-brand-primary leading-none">30+</div>
                    <div className="text-[11px] font-black text-white uppercase tracking-[4px] opacity-60">Years of Innovation</div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl bg-white/5"
                  >
                    <div className="w-3 h-3 bg-brand-primary rounded-full animate-ping" />
                  </motion.div>
                </div>
              </div>

              {/* Floating mechanical elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-24 h-24 dark-card rounded-2xl flex items-center justify-center border border-brand-primary/30 hidden lg:flex"
              >
                <Cpu className="text-brand-primary w-10 h-10" />
              </motion.div>
            </motion.div>
          </ViewportReveal>
        </div>

        <div className="order-1 lg:order-2">
          <ViewportReveal>
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-[11px] font-black uppercase tracking-[6px]">Our Legacy</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-light mb-10 text-black drop-shadow-sm uppercase tracking-tight leading-[0.9]">
              Pioneering <br />
              <b className="font-black text-brand-primary text-glow drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">Cognitive Era</b>
            </h2>
            <div className="space-y-8 text-xl text-brand-text-dim font-light leading-relaxed opacity-80">
              <p>
                Founded in 2025, Cognito Insights Solutions AI is driven by innovators with over 30+ years of collective experience at the vanguard of the artificial intelligence movement. We don't just engineer software; we architect cognitive frameworks that evolve with your enterprise.
              </p>
              <p className="border-l-2 border-brand-primary/30 pl-8 italic">
                Our ecosystem synergizes world-class data scientists, neural engineers, and ethicists to deploy AI that is transparent, purposeful, and infinitely scalable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 mt-16 p-10 dark-card rounded-3xl border-transparent">
              <div>
                <div className="text-5xl font-display font-black text-white mb-2 tracking-tighter group hover:text-brand-primary transition-colors">500+</div>
                <div className="text-[10px] text-brand-primary uppercase font-black tracking-[4px]">Systems Deployed</div>
              </div>
              <div>
                <div className="text-5xl font-display font-black text-white mb-2 tracking-tighter group hover:text-brand-primary transition-colors">99.9%</div>
                <div className="text-[10px] text-brand-primary uppercase font-black tracking-[4px]">Neural Accuracy</div>
              </div>
            </div>
          </ViewportReveal>
        </div>
      </div>
    </section>
  );
};

const JobMelaSection = () => {
  return (
    <section id="job-mela" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative dark-card rounded-[3rem] p-12 overflow-hidden bg-gradient-to-br from-brand-secondary/20 to-brand-dark border-brand-secondary/30 text-center"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <Layers size={64} className="text-brand-primary" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 text-white drop-shadow-sm uppercase tracking-tighter">
              Cognito <br />
              <b className="text-brand-primary text-glow drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">Job Mela 2026</b>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed">
              India's Largest Intelligence-Led Recruitment Fest. We are onboarding 10,000+ cognitive minds into global neural networks.
              Freshers & Experienced Experts are invited to sync with the future.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {[
                { label: "10K+ Slots", desc: "Global Positions" },
                { label: "On-Spot", desc: "Technical Sync" },
                { label: "Hybrid Mode", desc: "Metaverse Presence" },
              ].map((stat, i) => (
                <div key={i} className="p-6 dark-card rounded-2xl border-white/5">
                  <div className="text-2xl font-black text-brand-primary mb-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-[2px] font-bold">{stat.desc}</div>
                </div>
              ))}
            </div>

            <HighTechButton
              className="px-16"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register for Job Mela <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </HighTechButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact section removed as requested
const Footer = () => {
  return (
    <footer id="contact" className="py-8 border-t border-brand-border bg-black overflow-hidden relative text-white">
      <FireParticles />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <VisualLogo darkTheme={true} />
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Cognito Insights Solutions AI is at the forefront of digital transformation, bridging the gap between human ingenuity and artificial intelligence.
            </p>
            <div className="flex gap-4 relative z-10">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all shadow-sm">
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[4px] mb-8">About Us</h4>
            <ul className="space-y-4">
              {['Innovation Lab', 'Our Mission', 'Research Units', 'Global Reach v7'].map(item => (
                <li key={item}><a href="#" className="text-slate-300 hover:text-brand-primary text-xs uppercase tracking-widest font-bold transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[4px] mb-8">Careers</h4>
            <ul className="space-y-4">
              {['Open Slots', 'Candidate Portal', 'Internship Sync', 'Recruitment FAQ'].map(item => (
                <li key={item}><a href="#" className="text-slate-300 hover:text-brand-primary text-xs uppercase tracking-widest font-bold transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[4px] mb-8">More Info</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all min-w-[40px]"><Mail size={18} /></div>
                <span className="text-sm md:text-base text-slate-300">info@cognitoinsights.ai</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all min-w-[40px]"><Phone size={18} /></div>
                <span className="text-sm md:text-base text-slate-300">+91 89782 46111 / 47111</span>
              </div>
              <div className="flex items-start gap-4 group mt-6">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all min-w-[40px]"><MapPin size={18} /></div>
                <div className="flex flex-col gap-3 w-full">
                  <span className="text-sm md:text-base text-slate-300 leading-relaxed">
                    Above Arrow Showroom, Danvai Peta, Rajahmundry, 533103, A.P, india
                  </span>
                  <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 mt-1 shadow-inner relative group-hover:border-brand-primary/30 transition-colors">
                    <iframe 
                      src="https://maps.google.com/maps?q=17.0067264,81.7848142&hl=en&z=16&output=embed" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/10 gap-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Neural Engine: Optimal</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            © 2025 Cognito Insights Solutions AI Private Limited
          </div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
            www.cognitoinsights.ai
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/logo.png";
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-primary/20 selection:text-brand-primary bg-white text-black">
      <CustomCursor />
      <div className="atmosphere" />
      <div className="scanline" />
      <Navbar />
      <main>
        <Hero />
        <BubbleGallery />
        <Services />
        <TrainingPrograms />
        <About />
        <JobMelaSection />
        {/* RegistrationForm and Footer updates will follow in sequential turns to manage file size and complexity */}
        <RegistrationForm />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
