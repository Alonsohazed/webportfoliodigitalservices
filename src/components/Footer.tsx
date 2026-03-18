import { Zap, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'

const footerLinks = {
    Services: [
        'Data & Analytics',
        'Process Automation',
        'Custom Web Platforms',
        'AI & Chatbots',
        'Digital Transformation',
    ],
    Company: [
        'About Us',
        'Case Studies',
        'Why Choose Us',
        'Tech Stack',
        'Contact',
    ],
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '64px 24px 32px',
            background: '#020817',
        }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: 48,
                    marginBottom: 48,
                }}
                    className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 36, height: 36,
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                borderRadius: 8,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 20px rgba(34,197,94,0.3)',
                            }}>
                                <Zap size={18} color="#fff" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                                AA <span style={{ color: '#22c55e' }}>Digital</span> Services
                            </span>
                        </div>

                        <p style={{
                            fontSize: '0.875rem', color: '#475569', lineHeight: 1.8,
                            maxWidth: 320, marginBottom: 24,
                        }}>
                            We build digital systems that grow your business. Automation, data, and scalable solutions
                            tailored for real-world impact.
                        </p>

                        {/* Social links */}
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[
                                { icon: Github, href: '#', label: 'GitHub' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    style={{
                                        width: 36, height: 36,
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#64748b',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.color = '#22c55e'
                                            ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.3)'
                                            ; (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.08)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.color = '#64748b'
                                            ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                                            ; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                                    }}
                                >
                                    <Icon size={16} strokeWidth={1.8} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{
                                fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8',
                                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16,
                            }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {links.map(link => (
                                    <li key={link} style={{ marginBottom: 10 }}>
                                        <a
                                            href="#"
                                            style={{
                                                fontSize: '0.875rem', color: '#475569',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s',
                                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                            }}
                                            onMouseEnter={e => (e.target as HTMLElement).style.color = '#22c55e'}
                                            onMouseLeave={e => (e.target as HTMLElement).style.color = '#475569'}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 28,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    flexWrap: 'wrap',
                    gap: 12,
                }}>
                    <p style={{ fontSize: '0.8rem', color: '#334155' }}>
                        © {currentYear} AA Digital Services. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Privacy Policy', 'Terms of Service'].map(item => (
                            <a
                                key={item}
                                href="#"
                                style={{
                                    fontSize: '0.8rem', color: '#334155',
                                    textDecoration: 'none',
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#334155'}
                            >
                                {item} <ArrowUpRight size={12} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    )
}
