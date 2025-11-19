import {
  ArrowRight,
  Code,
  Feather,
  GitBranch,
  Github,
  Globe,
  Linkedin,
  Menu,
  Send,
  Smartphone,
  Type,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import clubLogo from "./assets/club-logo.webp";
import logo from "./assets/logo.svg";
import yassirLogo from "./assets/yassir-light.svg";

// --- STYLES DEFINITION (REPLACING TAILWIND) ---
const Colors = {
  bgDark: "#0f172a", // Gray-900 equivalent
  bgDarker: "#020617", // Gray-950 equivalent
  cardBg: "#1e293b", // Gray-800 equivalent
  accentPrimary: "#38bdf8", // Sky-400 equivalent
  accentSecondary: "#06b6d4", // Cyan-600 equivalent
  textLight: "#f1f5f9", // White equivalent
  textMuted: "#94a3b8", // Gray-400 equivalent
  textFaint: "#64748b", // Gray-500 equivalent
};

const Styles = {
  // Global Container
  appContainer: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    backgroundColor: Colors.bgDark,
  },

  // Navigation
  navContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: Colors.bgDark,
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    transition: "background-color 0.3s",
  },
  navLink: {
    color: Colors.textMuted,
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.2s",
    textDecoration: "none",
  },

  // Hero Section
  heroSection: {
    width: "100vw",
    minWidth: "100vw",
    minHeight: "100vh",
    paddingTop: "6rem",
    paddingBottom: "3rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.bgDark,
    color: Colors.textLight,
    textAlign: "center",
    marginLeft: "calc(50% - 50vw)", // ensures bg stretches edge-to-edge
    marginRight: "calc(50% - 50vw)",
  },
  heroHeadline: {
    fontSize: "3.75rem",
    lineHeight: 1,
    fontWeight: 800,
    color: Colors.accentPrimary,
    marginBottom: "1rem",
  }, // Simplified: removed gradient, using solid accent color

  // Buttons
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 24px",
    border: "none",
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(6, 182, 212, 0.4)",
    color: Colors.textLight,
    backgroundColor: Colors.accentSecondary,
    transition: "all 0.3s",
    cursor: "pointer",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 24px",
    border: `1px solid ${Colors.accentPrimary}`,
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    color: Colors.accentPrimary,
    backgroundColor: Colors.cardBg,
    transition: "all 0.3s",
    cursor: "pointer",
  },

  // Card & Hover Effects
  card: {
    backgroundColor: Colors.cardBg,
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    transition: "all 0.5s",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: `0 8px 25px ${Colors.accentPrimary}50`,
  }, // Simplified hover effect

  // Form Input
  inputField: {
    width: "100%",
    padding: "10px 16px",
    border: `1px solid ${Colors.textFaint}`,
    borderRadius: "8px",
    backgroundColor: Colors.bgDark,
    color: Colors.textLight,
  },

  // Footer
  footerContainer: {
    backgroundColor: Colors.bgDarker,
    padding: "32px 0",
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  },
};

// --- MOCK DATA ---
const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Globe,
    title: "Enterprise Web Solution",
    client: "Yassir",
    description:
      "As a Core Team Member in the early stages, I contributed to the foundational development and strategic vision of the app as it scaled its operations.",
    tech: [
      "React.js / Next.js",
      "Node.js / Express",
      "TypeScript",
      "Material UI",
      "React Native",
      "MongoDB",
      "GCP",
      "Docker",
      "K8s",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    client: "Club",
    description:
      "As frontend lead, I was responsible for the development of the mobile app. I was also responsible for the integration of the backend.",
    tech: [
      "React Native",
      "ReactJS",
      "Flutter",
      "Dart",
      "Firebase",
      "GCP",
      "Docker",
      "K8s",
    ],
  },
  {
    icon: Smartphone,
    title: "Frontend Development",
    client: "Maystro Delivery",
    description:
      "As frontend lead, I was responsible for the development of the mobile app. I was also responsible for the integration of the backend.",
    tech: ["React Native", "ReactJS", "TypeScript", "Material UI"],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Yassir: The All-in-One Super App 🚀",
    description: `Yassir is a pioneering "All In One Super App" operating across multiple key markets, primarily focused on simplifying everyday life through technology. The platform integrates essential on-demand services, establishing itself as a comprehensive ecosystem for users. As a Core Team Member in the early stages, I contributed to the foundational development and strategic vision of the app as it scaled its operations.`,
    tags: [
      "Web",
      "Data Visualization",
      "React",
      "Node.js",
      "TypeScript",
      "React Native",
      "PostgreSQL",
      "MongoDB",
      "GCP",
      "Docker",
      "K8s",
    ],
    link: "https://yassir.com/",
    color: "#08031a",
    name: "Yassir",
    image: yassirLogo,
  },
  {
    id: 2,
    title: "Club App: Influencer and Content Creator Platform 🔗",
    description: `Club is a dynamic mobile platform (developed by Brandbassador) designed to connect content creators, influencers, and brand ambassadors directly with leading brands. It functions as a centralized hub where brands publish Missions—tasks requiring social media engagement or User-Generated Content (UGC)—which creators complete to earn income, free products, and gift cards.`,
    tags: [
      "Mobile",
      "Flutter",
      "ReactJS",
      "NestJS",
      "Firebase",
      "GCP",
      "Docker",
      "K8s",
    ],
    link: "https://club.co/",
    color: "#08031a",
    name: "Club",
    image: clubLogo,
  },
  {
    id: 3,
    title: "Maystro Delivery: E-commerce Logistics & Fulfillment Platform 📦",
    description:
      "Maystro Delivery is a specialized, end-to-end logistics platform designed to empower e-commerce store owners by handling all aspects of their delivery and fulfillment operations across Algeria and Tunisia. This mission-critical system directly addresses key logistical challenges in emerging markets, allowing merchants to focus on sales and growth.",
    tags: ["Mobile", "React Native", "Node.js", "PostgreSQL", "MongoDB", "GCP"],
    link: "https://mocklink.com/opsflow",
    color: "#fff",
    name: "Maystro Delivery",
    image: logo,
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Material UI", "TypeScript", "Redux"],
  },
  {
    category: "Backend & DevOps",
    items: ["Node.js", "REST/GraphQL", "GCP", "Docker/K8s"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Flutter", "iOS/Android Native"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase Firestore"],
  },
];

// --- COMPONENTS ---

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={Styles.navContainer}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <a
            href="#home"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: 700,
              color: Colors.accentPrimary,
              textDecoration: "none",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Code
              style={{
                width: "24px",
                height: "24px",
                marginRight: "8px",
                color: Colors.accentPrimary,
              }}
            />
            {isMobile ? "FS Engineer" : "Freelance | Solutions"}
          </a>
          {isMobile ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: Colors.textLight,
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{
                    ...Styles.navLink,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = Colors.cardBg;
                    e.target.style.color = Colors.textLight;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = Colors.textMuted;
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
        {isMobile && isMobileMenuOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              paddingBottom: "1rem",
              borderTop: `1px solid ${Colors.textFaint}`,
              marginTop: "0.5rem",
              paddingTop: "1rem",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  ...Styles.navLink,
                  display: "block",
                  padding: "12px",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="home" style={Styles.heroSection}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h1
          style={{
            ...Styles.heroHeadline,
            fontSize: isMobile ? "2rem" : "3.75rem",
            padding: isMobile ? "0 1rem" : "0",
          }}
        >
          Full-Stack Software Solutions
        </h1>
        <p
          style={{
            marginTop: "1rem",
            maxWidth: "800px",
            margin: "1rem auto",
            fontSize: isMobile ? "1rem" : "1.25rem",
            color: Colors.textMuted,
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          I build custom **Web and Mobile Applications** that transform business
          challenges into scalable, production-ready systems.
        </p>
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            gap: "1rem",
            padding: isMobile ? "0 1rem" : "0",
          }}
        >
          <button
            style={{
              ...Styles.primaryButton,
              width: isMobile ? "100%" : "auto",
            }}
            onClick={() => (window.location.href = "#portfolio")}
          >
            View My Work
            <ArrowRight
              style={{ marginLeft: "8px", width: "16px", height: "16px" }}
            />
          </button>
          <button
            style={{
              ...Styles.secondaryButton,
              width: isMobile ? "100%" : "auto",
            }}
            onClick={() => (window.location.href = "#contact")}
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyle = isHovered
    ? { ...Styles.card, ...Styles.cardHover }
    : Styles.card;

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <service.icon
        style={{
          width: isMobile ? "32px" : "40px",
          height: isMobile ? "32px" : "40px",
          color: Colors.accentPrimary,
          marginBottom: "16px",
        }}
      />
      <h3
        style={{
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          fontWeight: 600,
          color: Colors.textLight,
          marginBottom: "4px",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontSize: isMobile ? "0.875rem" : "1rem",
          fontWeight: 400,
          color: Colors.accentPrimary,
          marginBottom: "12px",
        }}
      >
        Client: {service.client}
      </p>
      <p
        style={{
          color: Colors.textMuted,
          marginBottom: "16px",
          fontSize: isMobile ? "0.875rem" : "1rem",
        }}
      >
        {service.description}
      </p>
      <div style={{ marginTop: "1rem" }}>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: Colors.textFaint,
            display: "block",
            marginBottom: "8px",
          }}
        >
          Key Tech:
        </span>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, gap: "4px" }}>
          {service.tech.map((t, i) => (
            <li
              key={i}
              style={{
                fontSize: "0.875rem",
                color: Colors.accentPrimary,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Type
                style={{
                  width: "12px",
                  height: "12px",
                  marginRight: "8px",
                  opacity: 0.75,
                }}
              />{" "}
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="services"
      style={{
        padding: isMobile ? "60px 0" : "80px 0",
        backgroundColor: Colors.cardBg,
        color: Colors.textLight,
        width: "100vw",
        position: "relative",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.75rem" : "2.25rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: isMobile ? "32px" : "48px",
            color: Colors.accentPrimary,
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          My Expertise: Solving Modern Problems
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: isMobile ? "1.5rem" : "2rem",
          }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyle = isHovered
    ? {
        ...Styles.card,
        ...Styles.cardHover,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }
    : {
        ...Styles.card,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      };

  return (
    <div
      key={project.id}
      style={{
        display: "flex",
        flexDirection: isMobile
          ? "column"
          : index % 2 === 0
          ? "row"
          : "row-reverse",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        overflow: "hidden",
        backgroundColor: Colors.cardBg,
        padding: isMobile ? "24px" : "40px",
        transition: "all 0.5s",
        marginBottom: isMobile ? "2rem" : "4rem",
        gap: isMobile ? "1.5rem" : "0",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1200px",
        ...cardStyle,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingRight: !isMobile && index % 2 === 0 ? "40px" : 0,
          paddingLeft: !isMobile && index % 2 !== 0 ? "40px" : 0,
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: Colors.accentPrimary,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {project.tags[0]} Solution
        </span>
        <h3
          style={{
            fontSize: isMobile ? "1.5rem" : "1.875rem",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: Colors.textMuted,
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                padding: "4px 12px",
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: "9999px",
                backgroundColor: "#0c4a6e",
                color: Colors.accentPrimary,
                border: `1px solid ${Colors.accentPrimary}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: Colors.accentPrimary,
            textDecoration: "none",
            fontWeight: 600,
            transition: "color 0.2s",
          }}
        >
          View Live Project
          <ArrowRight
            style={{ marginLeft: "8px", width: "16px", height: "16px" }}
          />
        </a>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          marginTop: isMobile ? "0" : "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: project.color,
            height: isMobile ? "200px" : "256px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `4px solid ${Colors.textFaint}`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              color: Colors.textMuted,
              fontSize: "1.125rem",
              opacity: 0.7,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "148px", height: "148px" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="portfolio"
      style={{
        padding: isMobile ? "60px 0" : "80px 0",
        backgroundColor: Colors.bgDark,
        color: Colors.textLight,
        width: "100vw",
        position: "relative",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.75rem" : "2.25rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: isMobile ? "32px" : "48px",
            color: Colors.accentPrimary,
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          Recent Projects & Case Studies
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "2rem" : "4rem",
            alignItems: "center",
          }}
        >
          {PROJECTS.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillPill = ({ item }) => (
  <li
    style={{ color: Colors.textMuted, display: "flex", alignItems: "center" }}
  >
    <GitBranch
      style={{
        width: "16px",
        height: "16px",
        marginRight: "8px",
        color: Colors.accentPrimary,
        opacity: 0.7,
      }}
    />
    {item}
  </li>
);

const SkillsSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="skills"
      style={{
        padding: isMobile ? "60px 0" : "80px 0",
        backgroundColor: Colors.cardBg,
        color: Colors.textLight,
        width: "100vw",
        position: "relative",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.75rem" : "2.25rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: isMobile ? "32px" : "48px",
            color: Colors.accentPrimary,
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          Core Technical Skills
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(200px, 1fr))",
            gap: isMobile ? "1.5rem" : "2rem",
          }}
        >
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              style={{
                ...Styles.card,
                borderTop: `4px solid ${Colors.accentPrimary}`,
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.125rem" : "1.25rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  color: Colors.textLight,
                }}
              >
                <Feather
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                    color: Colors.accentPrimary,
                  }}
                />{" "}
                {skill.category}
              </h3>
              <ul
                style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px" }}
              >
                {skill.items.map((item, i) => (
                  <SkillPill key={i} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending message...");

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all fields before submitting.");
      return;
    }

    try {
      // Determine API URL based on environment
      const apiUrl =
        import.meta.env.MODE === "production"
          ? "https://your-backend-domain.com/api/send-email" // Replace with your production backend URL
          : "/api/send-email"; // Uses Vite proxy in development

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("Thank you! I will get back to you within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(
          data.error || "Failed to send message. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus(
        "Failed to send message. Please check your connection and try again."
      );
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "60px 0" : "80px 0",
        backgroundColor: Colors.bgDark,
        color: Colors.textLight,
        width: "100vw",
        position: "relative",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontSize: isMobile ? "1.75rem" : "2.25rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "16px",
            color: Colors.accentPrimary,
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          Ready to Build Something Great?
        </h2>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.25rem",
            textAlign: "center",
            color: Colors.textMuted,
            marginBottom: isMobile ? "32px" : "64px",
            padding: isMobile ? "0 0.5rem" : "0",
          }}
        >
          Let's discuss your next Web or Mobile project.
        </p>

        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            backgroundColor: Colors.cardBg,
            padding: isMobile ? "24px" : "48px",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: Colors.textLight,
                  marginBottom: "4px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={Styles.inputField}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: Colors.textLight,
                  marginBottom: "4px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={Styles.inputField}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: Colors.textLight,
                  marginBottom: "4px",
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ ...Styles.inputField, resize: "vertical" }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                ...Styles.primaryButton,
                width: "100%",
                backgroundColor: Colors.accentSecondary,
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.4)",
              }}
            >
              <Send
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Send Message
            </button>
            {status && (
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: status.includes("Thank you") ? "#4ade80" : "#f87171",
                }}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        ...Styles.footerContainer,
        padding: isMobile ? "24px 0" : "32px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          color: Colors.textFaint,
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? "12px" : "16px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
            &copy; {new Date().getFullYear()} LOUIFI DEV. All rights reserved.
          </p>
          <p
            style={{
              fontSize: isMobile ? "0.625rem" : "0.75rem",
              marginTop: "4px",
            }}
          >
            Built with React and Inline Styles.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a
            href="https://github.com/moumene"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: Colors.textMuted, transition: "color 0.2s" }}
            aria-label="GitHub Profile"
          >
            <Github style={{ width: "24px", height: "24px" }} />
          </a>
          <a
            href="https://linkedin.com/in/moumene"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: Colors.textMuted, transition: "color 0.2s" }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin style={{ width: "24px", height: "24px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

const App = () => {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
        @media (min-width: 1920px) {
          body {
            font-size: 18px;
          }
        }
      `}</style>
      <div style={Styles.appContainer}>
        <Nav />
        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
