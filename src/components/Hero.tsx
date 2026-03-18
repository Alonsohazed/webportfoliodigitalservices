import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Play } from 'lucide-react'

const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '3x', label: 'Average ROI' },
    { value: '24h', label: 'Response Time' },
]

export default function Hero() {
    const [visible, setVisible] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const scrollToServices = () => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={heroRef}
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '120px 24px 80px',
                overflow: 'hidden',
            }}
        >
            {/* Grid background */}
            <div
                className="grid-bg"
                style={{
                    position: 'absolute', inset: 0, opacity: 0.6,
                }}
            />

            {/* Green radial glow */}
            <div
                className="radial-glow"
                style={{ position: 'absolute', inset: 0 }}
            />

            {/* Floating orbs */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%',
                width: 300, height: 300,
                background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: 'float 8s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', right: '10%',
                width: 250, height: 250,
                background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: 'float 10s ease-in-out infinite reverse',
            }} />

            <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                {/* Badge */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 16px',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 100,
                        marginBottom: 32,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.7s ease',
                    }}
                >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Digital Solutions Agency
                    </span>
                </div>

                {/* Headline */}
                <h1
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        color: '#f1f5f9',
                        marginBottom: 24,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease 0.1s',
                    }}
                >
                    We build digital systems
                    <br />
                    <span className="gradient-text">that grow your business</span>
                </h1>

                {/* Subheadline */}
                <p
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#94a3b8',
                        lineHeight: 1.7,
                        maxWidth: 620,
                        margin: '0 auto 48px',
                        fontWeight: 400,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease 0.2s',
                    }}
                >
                    Automation, data, and scalable solutions tailored for real-world impact.
                    We turn your biggest operational challenges into digital advantages.
                </p>

                {/* CTA buttons */}
                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 80,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease 0.3s',
                    }}
                >
                    <a
                        href="#contact"
                        className="btn-primary"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                        style={{ fontSize: '1rem', padding: '16px 32px' }}
                    >
                        Get a Quote <ArrowRight size={18} />
                    </a>
                    <a
                        href="#projects"
                        className="btn-secondary"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                        style={{ fontSize: '1rem', padding: '16px 32px' }}
                    >
                        <Play size={18} />
                        View Our Work
                    </a>
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 24,
                        padding: '32px',
                        background: 'rgba(15,23,42,0.5)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(34,197,94,0.1)',
                        borderRadius: 20,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.9s ease 0.4s',
                    }}
                    className="stats-grid"
                >
                    {stats.map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                fontWeight: 800,
                                color: '#22c55e',
                                letterSpacing: '-0.02em',
                                marginBottom: 4,
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.02em' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={scrollToServices}
                style={{
                    position: 'absolute',
                    bottom: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#475569',
                    animation: 'bounce 2s ease-in-out infinite',
                    zIndex: 1,
                }}
                aria-label="Scroll down"
            >
                <ChevronDown size={28} />
            </button>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
        </section>
    )
}
