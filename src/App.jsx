import {
  ArrowRight,
  Code,
  Database,
  Feather,
  GitBranch,
  Github,
  Globe,
  Linkedin,
  Monitor,
  Send,
  Smartphone,
  Type,
} from "lucide-react";
import React, { useState } from "react";

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
    minHeight: "100vh",
    paddingTop: "6rem",
    paddingBottom: "3rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.bgDark,
    color: Colors.textLight,
    textAlign: "center",
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
  footerContainer: { backgroundColor: Colors.bgDarker, padding: "32px 0" },
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
    client: "Acme Corp.",
    description:
      "Developing robust, scalable, and SEO-optimized web applications and SaaS platforms using modern JavaScript frameworks. Focused on clean architecture and high performance.",
    tech: ["React.js / Next.js", "Node.js / Express", "Tailwind CSS"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    client: "Global Logistics Inc.",
    description:
      "Building native-quality mobile applications for iOS and Android simultaneously. Perfect for rapid deployment and reaching a wider audience.",
    tech: ["React Native", "Flutter / Dart", "Native Module Integration"],
  },
  {
    icon: Database,
    title: "API & Backend Engineering",
    client: "FinTech Innovations",
    description:
      "Designing and implementing secure, highly-available RESTful and GraphQL APIs. Ensuring data integrity and seamless communication between frontend and database layers.",
    tech: ["Python / Django", "GoLang / Fiber", "PostgreSQL / MongoDB"],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "EcoTrack: Carbon Footprint PWA",
    description:
      "A progressive web application (PWA) designed for tracking and visualizing personal or corporate carbon emissions. Features real-time charts and dynamic goal setting.",
    tags: ["Web", "Data Visualization", "React", "Node.js", "D3.js"],
    link: "https://mocklink.com/ecotrack",
  },
  {
    id: 2,
    title: "Venture: Startup Idea Validator (Mobile)",
    description:
      "A cross-platform mobile app that uses AI prompts to validate business ideas, providing immediate market feedback analysis and competitor research summaries.",
    tags: ["Mobile", "AI Integration", "Flutter", "Firebase", "Gemini API"],
    link: "https://mocklink.com/venture",
  },
  {
    id: 3,
    title: "OpsFlow: DevOps Automation Dashboard",
    description:
      "A tailored web dashboard providing a single pane of glass for monitoring CI/CD pipelines, container health (Docker/K8s), and cloud resource usage (AWS/GCP).",
    tags: ["Web", "DevOps", "Monitoring", "Next.js", "TypeScript"],
    link: "https://mocklink.com/opsflow",
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Redux"],
  },
  {
    category: "Backend & DevOps",
    items: [
      "Node.js",
      "Python (Django/Flask)",
      "REST/GraphQL",
      "AWS/GCP",
      "Docker/K8s",
    ],
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

const Nav = () => (
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
            fontSize: "1.5rem",
            fontWeight: 700,
            color: Colors.accentPrimary,
            textDecoration: "none",
          }}
        >
          <Code
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
              color: Colors.accentPrimary,
            }}
          />
          <span className="hidden sm:inline">Freelance | Solutions</span>
          <span className="sm:hidden">FS Engineer</span>
        </a>
        <div style={{ display: "flex", gap: "1rem" }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                ...Styles.navLink,
                ":hover": {
                  backgroundColor: Colors.cardBg,
                  color: Colors.textLight,
                },
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section id="home" style={Styles.heroSection}>
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <h1 style={Styles.heroHeadline}>Full-Stack Software Solutions</h1>
      <p
        style={{
          marginTop: "1rem",
          maxWidth: "800px",
          margin: "1rem auto",
          fontSize: "1.25rem",
          color: Colors.textMuted,
        }}
      >
        I build custom **Web and Mobile Applications** that transform business
        challenges into scalable, production-ready systems.
      </p>
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={Styles.primaryButton}
          onClick={() => (window.location.href = "#portfolio")}
        >
          View My Work
          <ArrowRight
            style={{ marginLeft: "8px", width: "16px", height: "16px" }}
          />
        </button>
        <button
          style={Styles.secondaryButton}
          onClick={() => (window.location.href = "#contact")}
        >
          Start a Project
        </button>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
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
          width: "40px",
          height: "40px",
          color: Colors.accentPrimary,
          marginBottom: "16px",
        }}
      />
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: Colors.textLight,
          marginBottom: "4px",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontSize: "1rem",
          fontWeight: 400,
          color: Colors.accentPrimary,
          marginBottom: "12px",
        }}
      >
        Client: {service.client}
      </p>
      <p style={{ color: Colors.textMuted, marginBottom: "16px" }}>
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

const ServicesSection = () => (
  <section
    id="services"
    style={{
      padding: "80px 0",
      backgroundColor: Colors.cardBg,
      color: Colors.textLight,
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "48px",
          color: Colors.accentPrimary,
        }}
      >
        My Expertise: Solving Modern Problems
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  </section>
);

const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardStyle = isHovered
    ? {
        ...Styles.card,
        ...Styles.cardHover,
        display: "flex",
        flexDirection: "column",
      }
    : { ...Styles.card, display: "flex", flexDirection: "column" };

  return (
    <div
      key={project.id}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        overflow: "hidden",
        backgroundColor: Colors.cardBg,
        padding: "40px",
        transition: "all 0.5s",
        marginBottom: "4rem",
        ...cardStyle, // Apply card styles
        ...(index % 2 !== 0 && { flexDirection: "column-reverse" }), // Simple direction swap for odd index (on mobile)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          flex: 1,
          paddingRight: index % 2 === 0 ? "40px" : 0,
          paddingLeft: index % 2 !== 0 ? "40px" : 0,
          order: index % 2 === 0 ? 1 : 2,
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
            fontSize: "1.875rem",
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
          View Live Project (Mock)
          <ArrowRight
            style={{ marginLeft: "8px", width: "16px", height: "16px" }}
          />
        </a>
      </div>
      <div
        style={{ flex: 1, marginTop: "2rem", order: index % 2 === 0 ? 2 : 1 }}
      >
        <div
          style={{
            backgroundColor: Colors.textFaint,
            height: "256px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `4px solid ${Colors.textFaint}`,
          }}
        >
          <Monitor
            style={{ width: "64px", height: "64px", color: Colors.textMuted }}
          />
          <span
            style={{
              position: "absolute",
              color: Colors.textMuted,
              fontSize: "1.125rem",
              opacity: 0.7,
            }}
          >
            Mock Screenshot Placeholder
          </span>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = () => (
  <section
    id="portfolio"
    style={{
      padding: "80px 0",
      backgroundColor: Colors.bgDark,
      color: Colors.textLight,
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "48px",
          color: Colors.accentPrimary,
        }}
      >
        Recent Projects & Case Studies
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {PROJECTS.map((project, index) => (
          <PortfolioCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

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

const SkillsSection = () => (
  <section
    id="skills"
    style={{
      padding: "80px 0",
      backgroundColor: Colors.cardBg,
      color: Colors.textLight,
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "48px",
          color: Colors.accentPrimary,
        }}
      >
        Core Technical Skills
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
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
                fontSize: "1.25rem",
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

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending message...");
    console.log("Form Submitted:", formData);

    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        setStatus("Thank you! I will get back to you within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Please fill out all fields before submitting.");
      }
    }, 1500);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "80px 0",
        backgroundColor: Colors.bgDark,
        color: Colors.textLight,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "16px",
            color: Colors.accentPrimary,
          }}
        >
          Ready to Build Something Great?
        </h2>
        <p
          style={{
            fontSize: "1.25rem",
            textAlign: "center",
            color: Colors.textMuted,
            marginBottom: "64px",
          }}
        >
          Let's discuss your next Web or Mobile project.
        </p>

        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            backgroundColor: Colors.cardBg,
            padding: "48px",
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

const Footer = () => (
  <footer style={Styles.footerContainer}>
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
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} Freelance Software Solutions. All
          rights reserved.
        </p>
        <p style={{ fontSize: "0.75rem", marginTop: "4px" }}>
          Built with React and Inline Styles.
        </p>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: Colors.textMuted, transition: "color 0.2s" }}
          aria-label="GitHub Profile"
        >
          <Github style={{ width: "24px", height: "24px" }} />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
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

// --- MAIN APP ---

const App = () => {
  return (
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
  );
};

export default App;
