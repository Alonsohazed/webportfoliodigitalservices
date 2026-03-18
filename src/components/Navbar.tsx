import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(2, 8, 23, 0.92)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(34,197,94,0.08)' : '1px solid transparent',
            }}
        >
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                    {/* Logo */}
                    <a
                        href="#"
                        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    >
                        <div style={{
                            width: 36, height: 36,
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            borderRadius: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(34,197,94,0.3)',
                        }}>
                            <Zap size={18} color="#fff" strokeWidth={2.5} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                            AA <span style={{ color: '#22c55e' }}>Digital</span>
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                                style={{
                                    padding: '8px 16px',
                                    color: '#94a3b8',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    borderRadius: 8,
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.target as HTMLElement).style.color = '#22c55e'
                                        ; (e.target as HTMLElement).style.background = 'rgba(34,197,94,0.06)'
                                }}
                                onMouseLeave={e => {
                                    (e.target as HTMLElement).style.color = '#94a3b8'
                                        ; (e.target as HTMLElement).style.background = 'transparent'
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                            className="btn-primary"
                            style={{ padding: '10px 22px', fontSize: '0.875rem', marginLeft: 8 }}
                        >
                            Get a Quote
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#f1f5f9', padding: 8, display: 'none',
                        }}
                        className="mobile-menu-btn"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div style={{
                        background: 'rgba(10, 15, 30, 0.98)',
                        borderTop: '1px solid rgba(34,197,94,0.1)',
                        padding: '16px 0 24px',
                    }}>
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                                style={{
                                    display: 'block',
                                    padding: '12px 24px',
                                    color: '#94a3b8',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div style={{ padding: '12px 24px 0' }}>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Get a Quote
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    )
}
