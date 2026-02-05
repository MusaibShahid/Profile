import React, { useState, useEffect } from 'react';
import './index.css';

// Theme Context
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${mobileMenu ? 'mobile-active' : ''}`}>
      <div className="nav-content">
        <div className="logo" onClick={() => { window.scrollTo(0, 0); setMobileMenu(false); }}>
          &gt; SEC_RECON<span>_</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle glass"
            style={{
              padding: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              marginRight: mobileMenu ? '0' : '1rem'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <ul className={`nav-links ${mobileMenu ? 'active' : ''}`}>
          <li><a href="#about" onClick={() => setMobileMenu(false)}>About</a></li>
          <li><a href="#services" onClick={() => setMobileMenu(false)}>Services</a></li>
          <li><a href="#skills" onClick={() => setMobileMenu(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setMobileMenu(false)}>Projects</a></li>
          <li><a href="#contact" className="btn btn-outline nav-btn" onClick={() => setMobileMenu(false)}>Hire Me</a></li>
        </ul>
      </div>
    </nav>
  );
};

const TerminalIntro = () => {
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const lines = [
    "$ whoami",
    "Musaib Shahid",
    "$ status",
    "SYSTEM_ONLINE - ACCESS_GRANTED",
    "$ skills --security",
    "[Pentesting] [Forensics] [AD]",
    "$ certs --view",
    "CEH | CHFI | CCNA",
    "$ ready_for_deployment",
    "TRUE_"
  ];

  useEffect(() => {
    if (lineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + (prev ? "\n" : "") + lines[lineIndex]);
        setLineIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex]);

  return (
    <div className="terminal glass">
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
        <span className="terminal-title">bash — 80x24</span>
      </div>
      <div className="terminal-body">
        <pre>{text}</pre>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text animate">
          <h1 className="hero-title">
            SECURE YOUR <span>INFRASTRUCTURE</span>
          </h1>
          <h2 className="hero-subtitle">Certified Penetration Testing & Network Security</h2>
          <p className="hero-desc">
            I help businesses identify vulnerabilities before hackers do.
            Expert in Web Application Security, Network Hardening, and Compliance Audits.
          </p>
          <br />
          <div className="hero-btns">
            <a href="https://wa.me/+923133236723?text=Hi,%20I%20need%20a%20security%20audit%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Get Your Security Audit
            </a>
            <a href="#services" className="btn btn-outline">View Solutions</a>
          </div>
          <p className="hero-availability">
            <span className="status-dot"></span> Available for new projects • <strong>NDA Available</strong>
          </p>
        </div>
        <div className="hero-visual animate" style={{ animationDelay: '0.2s' }}>
          <TerminalIntro />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", icon: "🔐", image: "/ceh_certificate.jpg" },
    { name: "Computer Hacking Forensic Investigator (CHFI)", issuer: "EC-Council", icon: "🔍", image: "/chfi_certificate.jpg" },
    { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", icon: "🌐" },
    { name: "Fortinet Certified Associate", issuer: "Fortinet", icon: "🛡️" },
    { name: "ISO/IEC 27001 Associate", issuer: "ISO", icon: "📋" },
  ];

  return (
    <section id="about" className="about">
      <h2 className="section-title">Professional <span>Summary</span></h2>
      <div className="about-grid">
        <div className="about-text animate">
          <p>
            I am a <strong>CEH & CHFI-certified</strong> cybersecurity professional with a strong foundation in ethical hacking methodologies, OWASP Top 10, reconnaissance, and exploitation techniques.
          </p>
          <br />
          <p>
            Experienced in securing ISP and enterprise networks, performing root cause analysis, and supporting incident response. I bridge the gap between networking and offensive security roles.
          </p>
          <br />
          <p>
            <strong>Education:</strong><br />
            - MS in Information Security (NED University)<br />
            - BS in Telecommunication (University of Sindh)
          </p>
        </div>
        <div className="about-stats animate" style={{ animationDelay: '0.2s' }}>
          <div className="glass certifications-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎖️</span> Verified Certifications
            </h3>
            <div className="cert-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {certifications.map((cert, index) => (
                <div key={index}
                  onClick={() => cert.image && setSelectedCert(cert)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    cursor: cert.image ? 'pointer' : 'default',
                    transition: 'all 0.3s ease'
                  }}
                  className={cert.image ? "cert-item-clickable" : ""}
                >
                  <div style={{ fontSize: '1.5rem' }}>{cert.icon}</div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>{cert.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', color: 'var(--primary-color)' }}>
                    {cert.image ? "👁️" : "✓"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-content glass" style={{ maxWidth: '900px', padding: '1rem' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>&times;</button>
            <img src={selectedCert.image} alt={selectedCert.name} style={{ width: '100%', borderRadius: '12px' }} />
            <h3 style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--primary-color)' }}>{selectedCert.name}</h3>
          </div>
        </div>
      )}
    </section>
  );
};

const TrustStats = () => {
  const stats = [
    { value: "5+", label: "Years Experience", icon: "⏱️" },
    { value: "50+", label: "Projects Completed", icon: "✅" },
    { value: "30+", label: "Happy Clients", icon: "🤝" },
    { value: "98%", label: "Success Rate", icon: "🎯" }
  ];

  return (
    <section className="trust-stats">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ClientShowcase = () => {
  const clients = [
    { name: "Silicon.St", type: "Enterprise Security" },
    { name: "Transworld Associates", type: "ISP Network Security" },
    { name: "Cybernet", type: "Technical Support" },
    { name: "International Clients", type: "Freelance Projects" }
  ];

  return (
    <section className="clients">
      <h2 className="section-title">Trusted <span>By</span></h2>
      <div className="clients-grid">
        {clients.map((client, i) => (
          <div key={i} className="client-card glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <h3 className="client-name">{client.name}</h3>
            <p className="client-type">{client.type}</p>
          </div>
        ))}
      </div>
    </section>
  );
};



const Services = () => {
  const services = [
    {
      title: "Offensive Security",
      icon: "⚔️",
      description: "Ethical Hacking, Vulnerability Research, OWASP Top 10, Active Directory Attacks, and Exploit Development.",
      features: ["Penetration Testing", "Vulnerability Assessment", "Red Teaming", "Exploit Development"],
      link: "https://wa.me/+923133236723"
    },
    {
      title: "Defense & Networking",
      icon: "🛡️",
      description: "Firewall Policy Management, IDS/IPS Tuning, BGP/OSPF Routing, Network Automation (Python), and VPN Architecture.",
      features: ["Network Hardening", "Infrastructure Security", "Secure Architecture", "Automated Defense"],
      link: "https://wa.me/+923133236723"
    },
    {
      title: "Tools of the Trade",
      icon: "🧰",
      description: "Expert utilization of Nmap, Burp Suite Pro, Metasploit, Kali Linux, Wireshark, FTK Imager, and Splunk.",
      features: ["Tool-based Auditing", "Forensic Analysis", "Traffic Analysis", "Security Monitoring"],
      link: "https://wa.me/+923133236723"
    },
    {
      title: "Cloud & Systems",
      icon: "☁️",
      description: "AWS Security, Linux Hardening, Docker Security, SQL Administration, and Scripting (Python/Bash).",
      features: ["Cloud Security", "Container Security", "OS Hardening", "Database Security"],
      link: "https://wa.me/+923133236723"
    }
  ];

  return (
    <section id="services" className="services">
      <h2 className="section-title">My <span>Services</span></h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Professional Security Services • Contact for Custom Solutions
      </p>
      <div className="services-grid">
        {services.map((service, i) => (
          <div key={i} className="service-card glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <a href={service.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline service-cta">
                Contact Us
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


const Specializations = () => {
  const specs = [
    {
      title: "Penetration Testing",
      desc: "Comprehensive VAPT for web, network, and cloud infrastructure following OWASP and PTES standards.",
      icon: "🛡️"
    },
    {
      title: "Network Security",
      desc: "Hardening enterprise networks, firewall orchestration, and implementing zero-trust architectures.",
      icon: "🌐"
    },
    {
      title: "Digital Forensics",
      desc: "Post-incident analysis, root cause discovery, and building robust incident response playbooks.",
      icon: "🔍"
    }
  ];

  return (
    <section id="specializations" className="specs">
      <h2 className="section-title">Core <span>Specializations</span></h2>
      <div className="skills-grid">
        {specs.map((spec, i) => (
          <div key={i} className="skill-card glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{spec.icon}</div>
            <h3 style={{ color: 'var(--primary-color)' }}>{spec.title}</h3>
            <p className="project-desc">{spec.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Offensive Security",
      skills: ["Ethical Hacking", "Vulnerability Research", "OWASP Top 10", "Active Directory Attacks", "Exploit Development (Basic)"]
    },
    {
      title: "Defense & Networking",
      skills: ["Firewall Policy Management", "IDS/IPS Tuning", "BGP/OSPF Routing", "Network Automation (Python)", "VPN Architecture"]
    },
    {
      title: "Tools of the Trade",
      skills: ["Nmap", "Burp Suite Pro", "Metasploit", "Kali Linux", "Wireshark", "FTK Imager", "Splunk"]
    },
    {
      title: "Cloud & Systems",
      skills: ["AWS Security", "Linux Hardening", "Docker Security", "SQL Administration", "Scripting (Python/Bash)"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Technical <span>Expertise</span></h2>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <div key={index} className="skill-card glass animate" style={{ animationDelay: `${index * 0.1}s` }}>
            <h3 style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>{group.title}</h3>
            <div className="skill-list" style={{ marginTop: 'auto' }}>
              {group.skills.map((skill, sIndex) => (
                <span key={sIndex} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "CEH-Aligned Pentest Lab",
      desc: "Performed end-to-end penetration testing workflows in lab environments, covering reconnaissance, scanning, and exploitation.",
      details: "This project focused on simulating a real-world enterprise breach. I used Nmap for reconnaissance, found a vulnerable SMB service, and exploited it via Metasploit. Post-exploitation involved privilege escalation and local hash dumping.",
      tags: ["Nmap", "Metasploit", "Social Engineering"],
      category: "Offensive Lab",
      image: "/pentest_lab_visual_1769698522913.png",
      result: "Demonstrated 100% exploit rate on target vulnerabilities"
    },
    {
      title: "Web App Vulnerability Analysis",
      desc: "Practiced exploitation techniques including SQL Injection, Authentication & password attacks, and security misconfigurations.",
      details: "Conducted deep-dive manual analysis on OWASP Juice Shop. Identified critical SQLi entry points and successfully bypassed admin login using boolean-based injection techniques.",
      tags: ["Burp Suite", "SQLmap", "OWASP"],
      category: "Web Security",
      image: "/security_audit_visual_1769698709263.png",
      result: "Identified 5+ critical OWASP Top 10 vulnerabilities"
    },
    {
      title: "Network Hardening Research",
      desc: "Designed and implemented secure network solutions, hardening routers and switches with least-privilege access and segmentation.",
      details: "Hardened a Cisco-based infrastructure by disabling insecure protocols (Telnet, HTTP), implementing SSH v2, and configuring Port Security to mitigate MAC flooding attacks.",
      tags: ["Cisco", "Hardening", "VLANs"],
      category: "Infrastructure",
      image: "/network_security_visual_1769698623293.png",
      result: "Improved network security posture by 80%"
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Case Studies & <span>Success Stories</span></h2>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <div key={index} className="project-card glass animate" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="project-img-container">
              <img
                src={proj.image}
                alt={proj.title}
                className="project-img"
                loading="lazy"
                width="100%"
                height="220"
              />
              <div className="project-category-overlay">{proj.category}</div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>
              <div style={{ margin: '1rem 0', padding: '0.8rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Business Impact:</span> {proj.result}
                </p>
              </div>
              <div className="project-tags">
                {proj.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="skill-tag">{tag}</span>
                ))}
              </div>
              <a href="https://wa.me/+923133236723" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem', marginTop: '1rem', display: 'inline-block' }}>Contact Me</a>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
            <h3 className="project-title" style={{ color: 'var(--primary-color)' }}>{selectedProject.title}</h3>
            <p className="exp-company" style={{ marginBottom: '1rem' }}>{selectedProject.category}</p>
            <p className="project-desc" style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>{selectedProject.details}</p>
            <div className="skill-list" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
              {selectedProject.tags.map((tag, i) => (
                <span key={i} className="skill-tag" style={{ margin: '0 4px 4px 0' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const HowIWork = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Scoping",
      description: "Defining the scope, rules of engagement, and signing NDAs.",
      icon: "📋"
    },
    {
      number: "02",
      title: "Vulnerability Assessment",
      description: "Automated scanning and manual reconnaissance to identify weak points.",
      icon: "🔍"
    },
    {
      number: "03",
      title: "Exploitation & Validation",
      description: "Simulating real-world attacks to validate security holes (Safe PoC).",
      icon: "⚔️"
    },
    {
      number: "04",
      title: "Reporting & Remediation",
      description: "Detailed technical report with step-by-step patch instructions.",
      icon: "📝"
    },
    {
      number: "05",
      title: "Post-Fix Verification",
      description: "Re-testing to ensure all vulnerabilities are successfully closed.",
      icon: "✅"
    }
  ];

  return (
    <section className="how-i-work">
      <h2 className="section-title">How I <span>Work</span></h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        My proven 5-step process ensures quality delivery and client satisfaction
      </p>
      <div className="process-grid">
        {steps.map((step, i) => (
          <div key={i} className="process-step glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="process-number">{step.number}</div>
            <div className="process-icon">{step.icon}</div>
            <h3 className="process-title">{step.title}</h3>
            <p className="process-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Do you sign NDAs (Non-Disclosure Agreements)?",
      answer: "Yes, absolutely. I strictly adhere to confidentiality protocols and am happy to sign an NDA before any project details are shared."
    },
    {
      question: "What security methodologies do you follow?",
      answer: "I follow industry-standard frameworks including OWASP Top 10, PTES (Penetration Testing Execution Standard), and OSSTMM."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! I've worked with clients from USA, Germany, Canada, Oman, Saudi Arabia, and many other countries."
    },
    {
      question: "What is your reporting format?",
      answer: "You receive a comprehensive report containing an Executive Summary for management and a Technical Guide for your developers."
    },
    {
      question: "Can you handle urgent/rush orders?",
      answer: "Yes! I offer fast-track delivery for urgent security incidents. Contact me via WhatsApp for immediate response."
    },
    {
      question: "What if problems persist after the audit?",
      answer: "My service includes Post-Fix Verification. I re-test your systems after you apply patches to ensure the vulnerabilities are gone."
    }
  ];

  return (
    <section className="faq">
      <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
      <div className="faq-grid">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <h3 className="faq-question">❓ {faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "I needed something done ASAP and he did it as fast as humanly possible and made it look great. I 100% recommend anyone to use his services. He is quick and effective. Good price as well, didn't overcharge me or anything. I appreciate him to the max!",
      author: "mattaqube",
      role: "Germany 🇩🇪 • Client",
      rating: 5
    },
    {
      text: "Second time purchasing from him. It was just as quick and effective as the first time. I recommend anyone in a rush to use him as he is super fast and effective. I appreciate it very much! 100% recommend.",
      author: "mattaqube",
      role: "Germany 🇩🇪 • Client",
      rating: 5
    },
    {
      text: "As usual, the work is perfect, the seller did an awesome job and delivered the work in no time. This is my second time working with him and not the last. I highly recommend working with him for perfect work.",
      author: "hasannoha",
      role: "Oman 🇴🇲 • Client",
      rating: 5
    },
    {
      text: "Really good to communicate with, and gets the job done on time.",
      author: "ahmedsheikh03",
      role: "Canada 🇨🇦 • Client",
      rating: 5
    },
    {
      text: "Great work and very fast!",
      author: "revnrepair",
      role: "United States 🇺🇸 • Client",
      rating: 5
    },
    {
      text: "Professional and On time delivery",
      author: "olawaleolagunju",
      role: "United States 🇺🇸 • Client",
      rating: 5
    },
    {
      text: "The seller know what he do, he is a fast worker and his work has the quality needed to fulfill the requirement. Thank you.",
      author: "hasannoha",
      role: "Oman 🇴🇲 • Client",
      rating: 5
    },
    {
      text: "He is super and actually surprised me about fast delivery",
      author: "maryamahmed147",
      role: "Saudi Arabia 🇸🇦 • Client",
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <h2 className="section-title">Client <span>Reviews</span></h2>

      {/* Fiverr Badge Removed */}

      <div className="skills-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="skill-card glass animate" style={{ padding: '2rem', animationDelay: `${i * 0.1}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.2rem', color: '#FFD700' }}>
                {'⭐'.repeat(t.rating)}
              </div>
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>"{t.text}"</p>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.2rem' }}>{t.author}</h4>
            <span className="exp-company" style={{ fontSize: '0.8rem' }}>{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experience = [
    {
      role: "Network Security Engineer",
      company: "Silicon.St",
      date: "Jan 2025 - Present",
      desc: "Conduct vulnerability assessments on enterprise and banking infrastructure. Implement security hardening and least-privilege access."
    },
    {
      role: "NOC Engineer – Level 2",
      company: "Transworld Associates (Pvt.) Ltd.",
      date: "Feb 2024 - Jan 2025",
      desc: "Monitor and troubleshoot large-scale IP and GPON networks. Perform advanced fault isolation and handle escalated incidents."
    },
    {
      role: "TAC Engineer",
      company: "Cybernet",
      date: "Jun 2023 - Jan 2024",
      desc: "Tier-2 technical support for enterprise WAN/LAN. Investigated routing, connectivity, and access control issues."
    },
    {
      role: "Freelance Network & Security Engineer",
      company: "Remote",
      date: "Feb 2022 - Present",
      desc: "Designed secure network solutions for international clients. Delivered VPN, routing, firewall, and segmentation configurations."
    }
  ];

  return (
    <section id="experience" className="experience">
      <h2 className="section-title">Professional <span>Timeline</span></h2>
      <div className="experience-list">
        {experience.map((exp, index) => (
          <div key={index} className="experience-item animate" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="exp-header">
              <div>
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-company">{exp.company}</span>
              </div>
              <span className="exp-date">{exp.date}</span>
            </div>
            <p className="project-desc">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">Contact <span>Me</span></h2>
        <div className="contact-grid">
          <div className="contact-info-card glass animate">
            <h3>Let's Connect</h3>
            <p className="project-desc">Available for networking and offensive security opportunities.</p>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span className="exp-company">Email: musaibshahid7@gmail.com</span>
              <span className="exp-company">Location: Karachi, Pakistan</span>
              <span className="exp-company">LinkedIn: linkedin.com/in/musaib-shahid</span>
              <a href="https://wa.me/+923133236723" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+923133236723"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float animate"
    >
      💬
    </a>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    // Honeypot check
    if (form.bot_field.value) {
      return; // Silently fail for bots
    }

    setLoading(true);
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mrekplqd", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form glass animate" style={{ animationDelay: '0.2s' }}>
      <input type="hidden" name="_subject" value="New Portfolio Message from Web" />
      {/* Honeypot field (hidden from users) */}
      <input type="text" name="bot_field" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" placeholder="email@example.com" required />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" placeholder="Your Message..." required></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? "Sending Signal..." : "Send Signal"}
      </button>

      {status === "SUCCESS" && (
        <p style={{ color: "var(--primary-color)", marginTop: "1rem", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
          &gt; MESSAGE_SENT_SUCCESSFULLY
        </p>
      )}
      {status === "ERROR" && (
        <p style={{ color: "#ff5f56", marginTop: "1rem", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
          &gt; ERROR:_SIGNAL_NOT_RECEIVED. PLEASE_TRY_AGAIN.
        </p>
      )}
    </form>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <div className="container">
          <Hero />
          <TrustStats />
          <About />
          <ClientShowcase />
          <Services />
          <Skills />
          <Projects />
          <Testimonials />
          <Experience />
          <HowIWork />
          <FAQ />
          <Contact />
        </div>
        <WhatsAppButton />
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Musaib Shahid</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
