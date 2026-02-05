const Services = () => {
    const services = [
        {
            title: "CCNA Labs in Cisco Packet Tracer",
            icon: "🔧",
            description: "Professional CCNA lab setup and configuration in Cisco Packet Tracer",
            features: ["Network Design", "VLAN Configuration", "Routing Protocols", "Network Troubleshooting"],
            rating: "5.0 (13 reviews)",
            price: "From PKR 4,406",
            delivery: "1-2 days",
            link: "https://wa.me/+923133236723"
        },
        {
            title: "Cisco Packet Tracer & Networking Tasks",
            icon: "🌐",
            description: "Expert support for CCNA, CCNP, GNS3 and all networking related tasks",
            features: ["Packet Tracer Projects", "GNS3 Configuration", "Network Simulation", "CCNP Support"],
            rating: "4.8 (3 reviews)",
            price: "From PKR 4,406",
            delivery: "2-3 days",
            link: "https://wa.me/+923133236723"
        },
        {
            title: "Network Security & Support",
            icon: "🛡️",
            description: "Comprehensive network security audits and technical support services",
            features: ["Security Audits", "Vulnerability Assessment", "Network Hardening", "Technical Support"],
            rating: "4.5 (2 reviews)",
            price: "From PKR 4,406",
            delivery: "3-5 days",
            link: "https://wa.me/+923133236723"
        }
    ];

    return (
        <section id="services" className="services">
            <h2 className="section-title">My <span>Services</span></h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                Fast Delivery • 100% Satisfaction Guaranteed
            </p>
            <div className="services-grid">
                {services.map((service, i) => (
                    <div key={i} className="service-card glass animate" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
                            <span style={{ color: '#FFD700', fontSize: '0.9rem' }}>⭐ {service.rating}</span>
                        </div>
                        <p className="service-desc">{service.description}</p>
                        <ul className="service-features">
                            {service.features.map((feature, idx) => (
                                <li key={idx}>✓ {feature}</li>
                            ))}
                        </ul>
                        <div style={{ marginTop: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                                    {service.price}
                                </p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    ⏱️ {service.delivery}
                                </p>
                            </div>
                            <a href={service.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline service-cta">
                                Order on WhatsApp
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
