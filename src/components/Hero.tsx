import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Star } from 'lucide-react'

const stats = [
    { value: '30+', label: 'Projects Delivered' },
    { value: '6+', label: 'Years Exp.' },
    { value: '800+', label: 'Hours of Digital' },
    { value: '3x', label: 'Average ROI' },
]

export default function Hero() {
    const [visible, setVisible] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section
            ref={heroRef}
            id="hero"
            style={{
                position: 'relative',
                background: '#020617',
                paddingTop: '104px', // Space for fixed navbar
                paddingBottom: '80px',
            }}
        >
            {/* The Huge White Curved Container */}
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderBottomLeftRadius: 'clamp(60px, 10vw, 120px)',
                    borderBottomRightRadius: 'clamp(60px, 10vw, 120px)',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '80px 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Decorative Left Starburst */}
                <div style={{
                    position: 'absolute', top: '15%', left: '8%',
                    color: '#84cc16',
                    animation: 'spin 20s linear infinite',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.5)',
                    transition: 'all 0.8s ease 0.3s',
                }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5" />
                    </svg>
                </div>

                {/* Decorative Right Element */}
                <div style={{
                    position: 'absolute', top: '35%', right: '12%',
                    color: '#84cc16',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0)',
                    transition: 'all 0.8s ease 0.5s',
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Main Content inside White Box */}
                <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>

                    {/* Top Headline */}
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                letterSpacing: '-0.03em',
                                color: '#000000', // Jet black for contrast
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                                margin: 0
                            }}
                        >
                            Empowering Brands <br />
                            Through Digital Solutions <span style={{ color: '#84cc16', display: 'inline-block', position: 'relative', top: '-10px', transform: 'rotate(-15deg)' }}>~</span>
                        </h1>
                    </div>

                    {/* Three-Column Layout for Image & Details */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '24px',
                        position: 'relative',
                    }} className="hero-columns">

                        {/* Left Column: Subtext & CTA */}
                        <div style={{ flex: '1 1 300px', maxWidth: '350px', zIndex: 10, alignSelf: 'center' }} className="hero-left">
                            <p style={{
                                color: '#475569', fontSize: '1.125rem', lineHeight: 1.6, fontWeight: 500, marginBottom: '32px',
                                opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-20px)', transition: 'all 0.8s ease 0.3s'
                            }}>
                                From advanced data pipelines to robust operational platforms, we build bespoke systems that solve your toughest bottlenecks and multiply your bottom line.
                            </p>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: '#84cc16', color: '#000', fontSize: '1rem', fontWeight: 800, padding: '16px 32px',
                                    borderRadius: '100px', textDecoration: 'none', border: '1px solid #65a30d',
                                    opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease 0.4s',
                                    boxShadow: '0 10px 30px -10px rgba(132,204,22,0.5)'
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05) translateY(-2px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)' }}
                            >
                                Start Your Project <ArrowRight size={18} strokeWidth={3} />
                            </a>
                        </div>

                        {/* Center Column: Huge Generated Photo */}
                        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }} className="hero-center">
                            {/* Decorative squiggles behind photo */}
                            <svg style={{ position: 'absolute', top: '10%', left: '0', zIndex: 0, opacity: 0.3 }} width="60" height="150" viewBox="0 0 60 150" fill="none">
                                <path d="M30 0 Q60 30 30 60 T30 120" stroke="#000" strokeWidth="3" fill="none" />
                            </svg>

                            <img
                                src="/hero-dashboards.png"
                                alt="3D floating dashboard interfaces"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    maxHeight: '600px',
                                    objectFit: 'contain',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(40px)',
                                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                                    position: 'relative',
                                    zIndex: 2,
                                    // 'darken' plus slight brightness/contrast ensures the AI-generated slightly off-white bg 
                                    // gets completely blown out to pure #ffffff, making the image look like an isolated PNG cutout.
                                    mixBlendMode: 'darken',
                                    filter: 'contrast(1.08) brightness(1.03)'
                                }}
                            />
                        </div>

                        {/* Right Column: Mini Rating Box */}
                        <div style={{ flex: '1 1 200px', display: 'flex', justifyContent: 'flex-end', zIndex: 10, alignSelf: 'center' }} className="hero-right">
                            <div style={{
                                textAlign: 'right',
                                opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(20px)', transition: 'all 0.8s ease 0.4s'
                            }}>
                                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', color: '#84cc16', marginBottom: '8px' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" stroke="none" />)}
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000', lineHeight: 1 }}>
                                    6 Years
                                </div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Experience
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* The Dark Area With Stats */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '48px 24px 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s ease 0.6s',
                }}
                className="stats-grid"
            >
                {stats.map((stat, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '2px'
                        }}>
                            {/* The number */}
                            {stat.value.replace('+', '')}
                            {/* The colored plus symbol */}
                            <span style={{ color: '#84cc16' }}>+</span>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Embedded styles for responsive breaks and animations */}
            <style>{`
                @keyframes spin {
                    100% { transform: scale(1) rotate(360deg); }
                }
                @media (max-width: 1024px) {
                    .hero-columns { justify-content: center !important; text-align: center; }
                    .hero-left { text-align: center; order: 2; align-items: center; max-width: 100% !important; margin-top: 24px; }
                    .hero-right { text-align: center !important; order: 3; justify-content: center !important; margin-top: 24px; }
                    .hero-right > div { text-align: center !important; }
                    .hero-right > div > div:first-child { justify-content: center !important; }
                    .hero-center { order: 1; }
                }
                @media (max-width: 768px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
                }
            `}</style>
        </section>
    )
}
