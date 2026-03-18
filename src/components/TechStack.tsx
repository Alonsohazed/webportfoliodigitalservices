import { useEffect, useRef, useState } from 'react'

const technologies = [
    { name: 'Python', icon: '🐍', desc: 'Data, automation & backend', color: '#3776AB' },
    { name: 'SQL', icon: '🗄️', desc: 'Databases & queries', color: '#f59e0b' },
    { name: 'Power BI', icon: '📊', desc: 'Business intelligence', color: '#F2C811' },
    { name: 'Tableau', icon: '📈', desc: 'Data visualization', color: '#E97627' },
    { name: 'JavaScript', icon: '⚡', desc: 'Web interactivity', color: '#F7DF1E' },
    { name: 'React', icon: '⚛️', desc: 'Modern UI & frontends', color: '#61DAFB' },
    { name: 'REST APIs', icon: '🔌', desc: 'System integrations', color: '#22c55e' },
    { name: 'Cloud', icon: '☁️', desc: 'Scalable deployment', color: '#6366f1' },
]

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setInView(true)
        }, { threshold })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, inView }
}

export default function TechStack() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)
    const { ref: gridRef, inView: gridVisible } = useInView(0.1)

    return (
        <section id="tech-stack" style={{
            padding: '120px 24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,30,0.8) 50%, transparent 100%)',
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div
                    ref={titleRef}
                    style={{
                        textAlign: 'center', marginBottom: 64,
                        opacity: titleVisible ? 1 : 0,
                        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.7s ease',
                    }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '5px 14px',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 100,
                        color: '#22c55e',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 16,
                    }}>
                        Our Toolkit
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 800, color: '#f1f5f9',
                        letterSpacing: '-0.03em', marginBottom: 16,
                    }}>
                        Powered by <span className="gradient-text">industry-leading tech</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                        We use the right tool for the right job — battle-tested technologies trusted by the world's top companies.
                    </p>
                </div>

                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 16,
                    }}
                    className="tech-grid"
                >
                    {technologies.map((tech, index) => (
                        <TechCard key={tech.name} tech={tech} index={index} visible={gridVisible} />
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
        </section>
    )
}

function TechCard({ tech, index, visible }: {
    tech: typeof technologies[0]
    index: number
    visible: boolean
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '28px 24px',
                background: hovered ? 'rgba(15,23,42,0.9)' : 'rgba(15,23,42,0.4)',
                border: `1px solid ${hovered ? tech.color + '40' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 18,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0)'
                    : 'translateY(30px)',
                transitionDelay: `${index * 0.06}s`,
                boxShadow: hovered ? `0 12px 40px ${tech.color}20` : 'none',
            }}
        >
            <div style={{
                fontSize: '2rem',
                marginBottom: 12,
                display: 'block',
                filter: hovered ? 'none' : 'grayscale(30%)',
                transition: 'filter 0.3s ease',
            }}>
                {tech.icon}
            </div>
            <div style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: hovered ? tech.color : '#e2e8f0',
                marginBottom: 6,
                transition: 'color 0.3s ease',
                letterSpacing: '-0.01em',
            }}>
                {tech.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                {tech.desc}
            </div>

            {/* Bottom accent line */}
            <div style={{
                height: 2,
                background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`,
                borderRadius: 2,
                marginTop: 16,
                opacity: hovered ? 0.8 : 0,
                transition: 'opacity 0.3s ease',
            }} />
        </div>
    )
}
