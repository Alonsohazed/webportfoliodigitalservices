import { useEffect, useRef, useState } from 'react'

const techs = [
    {
        name: 'Python',
        level: 95,
        desc: 'Data pipelines, automation & ML',
        color: '#3b82f6',
        svg: (
            <svg viewBox="0 0 128 128" width="32" height="32">
                <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                    <stop offset="0" stopColor="#5A9FD4" />
                    <stop offset="1" stopColor="#306998" />
                </linearGradient>
                <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                    <stop offset="0" stopColor="#FFD43B" />
                    <stop offset="1" stopColor="#FFE873" />
                </linearGradient>
                <path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
                <path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
            </svg>
        ),
    },
    {
        name: 'SQL / PostgreSQL',
        level: 90,
        desc: 'Databases, queries & optimization',
        color: '#f59e0b',
        svg: (
            <svg viewBox="0 0 128 128" width="32" height="32">
                <path fill="#336791" d="M119.074 70.077c-3.168-.507-6.164-.182-8.583.6.001 0-1.17.476-1.243.512a23.7 23.7 0 01-1.18-2.821c-1.653-4.659-1.626-9.027-.5-13.717l.256-.856c.753-2.474 1.684-5.54.754-8.437-.006-.031-.019-.07-.025-.107-1.009-5.11-4.428-8.037-9.992-8.694-3.019-.363-5.832.143-8.244.819a33.64 33.64 0 00-2.139.707l-.3.1c-.682.234-1.387.35-2.057.349-1.016 0-1.7-.286-2.152-.535-.538-.298-1.068-.755-1.555-1.319a16.35 16.35 0 01-1.35-2.1c-.178-.325-.357-.65-.546-.968v-.001C76.17 27.12 69.02 23 61.03 23a25.85 25.85 0 00-5.13.514c-3.67.745-7.103 2.513-10.013 5.136-2.11 1.89-3.862 4.15-5.213 6.72-1.359 2.587-2.292 5.43-2.773 8.452-.002.014-.004.025-.01.037-.22 1.28-.31 2.53-.27 3.72.044 1.292.228 2.5.576 3.622.52 1.677 1.446 3.16 2.754 4.4.406.38.84.73 1.296 1.048-.278 3.128-.478 6.284-.582 9.42-.125 3.84-.012 7.556.36 11.063.398 3.77 1.085 7.197 2.088 10.224.993 3.004 2.311 5.537 3.917 7.53a15.93 15.93 0 005.117 4.163c1.98 1.03 4.177 1.608 6.515 1.694.11.003.198.002.297.003.25.005.503.007.753.007 3.45 0 6.797-.67 9.808-1.991a31.88 31.88 0 003.286-1.748c3.072 2.37 6.36 3.74 9.706 4.056l.46.042c.248.018.497.029.748.029 2.96 0 5.83-.937 8.531-2.787 4.06-2.754 7.286-7.446 9.334-13.538.253-.756.48-1.511.68-2.263C108.87 83.41 111.56 81.47 115.1 80c.524-.22 1.165-.43 1.887-.61 1.78-.436 3.817-.664 6.06-.678l.024-9.35a19.017 19.017 0 00-3.997.715z" />
                <path fill="#fff" d="M80.28 70.81a6.4 6.4 0 01-3.32.91 6.5 6.5 0 01-4.62-1.854l-.008-.008a6.48 6.48 0 01-1.867-4.593 6.5 6.5 0 016.5-6.5c1.795 0 3.42.73 4.597 1.904a6.46 6.46 0 011.902 4.597 6.47 6.47 0 01-3.182 5.544z" />
            </svg>
        ),
    },
    {
        name: 'React',
        level: 88,
        desc: 'Modern web apps & dashboards',
        color: '#60a5fa',
        svg: (
            <svg viewBox="-11.5 -10.232 23 20.463" width="32" height="32">
                <circle r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        ),
    },
    {
        name: 'Power BI',
        level: 85,
        desc: 'Interactive business dashboards',
        color: '#f59e0b',
        svg: (
            <svg viewBox="0 0 32 32" width="32" height="32">
                <rect x="2" y="18" width="6" height="12" rx="1" fill="#F2C811" />
                <rect x="10" y="12" width="6" height="18" rx="1" fill="#F2C811" opacity="0.8" />
                <rect x="18" y="6" width="6" height="24" rx="1" fill="#F2C811" opacity="0.9" />
                <rect x="26" y="2" width="4" height="28" rx="1" fill="#F2C811" />
            </svg>
        ),
    },
    {
        name: 'Node.js',
        level: 82,
        desc: 'APIs, backends & automation',
        color: '#22c55e',
        svg: (
            <svg viewBox="0 0 32 32" width="32" height="32">
                <path fill="#339933" d="M16 3L3 10v14l13 7 13-7V10zm0 2.236L26.764 11 16 16.764 5.236 11zM5 12.618l10 5.382v10.764l-10-5.382zm12 16.146V18l10-5.382v10.764z" />
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        level: 85,
        desc: 'Typed, scalable front & backend',
        color: '#3b82f6',
        svg: (
            <svg viewBox="0 0 32 32" width="32" height="32">
                <rect width="32" height="32" rx="3" fill="#007ACC" />
                <path fill="#fff" d="M18.245 23.759v2.866c.465.238.974.419 1.53.542.555.123 1.145.184 1.77.184.61 0 1.186-.065 1.73-.196.545-.13 1.02-.34 1.426-.629.406-.288.726-.665.96-1.129.235-.464.352-1.023.352-1.676 0-.49-.072-.924-.215-1.302a3.257 3.257 0 00-.606-1.008 4.01 4.01 0 00-.94-.748 9.196 9.196 0 00-1.208-.592 6.655 6.655 0 01-.8-.4 2.7 2.7 0 01-.552-.457 1.697 1.697 0 01-.319-.513 1.701 1.701 0 01-.105-.607c0-.206.033-.393.098-.56a1.245 1.245 0 01.29-.44c.127-.125.28-.221.457-.287.18-.067.38-.1.603-.1.16 0 .324.018.49.053.168.035.33.09.488.163.16.074.312.167.46.277.148.11.284.24.41.387V16.8a5.928 5.928 0 00-1.307-.376 8.064 8.064 0 00-1.55-.14c-.595 0-1.158.07-1.692.21-.534.14-1.004.358-1.41.652-.406.294-.727.675-.963 1.14-.236.466-.354 1.022-.354 1.663 0 .786.202 1.456.606 2.01.404.553 1.023 1.01 1.86 1.37.313.13.605.258.878.388.273.13.51.268.712.415.202.146.362.31.48.49.119.18.178.386.178.618 0 .21-.036.404-.107.583-.072.178-.179.333-.323.463-.144.13-.319.232-.526.306-.206.073-.442.11-.707.11-.46 0-.915-.09-1.366-.27-.45-.178-.86-.454-1.228-.826z" />
                <path fill="#fff" d="M14.25 17.756H17.5V15.5H8.5v2.256h3.244v9.244h2.506z" />
            </svg>
        ),
    },
    {
        name: 'Cloudflare',
        level: 78,
        desc: 'Edge deployment & CDN',
        color: '#f97316',
        svg: (
            <svg viewBox="0 0 32 32" width="32" height="32">
                <path fill="#F48120" d="M21.5 19.3l.5-1.7c0 0-0.5-0.3-1-.3s-1.2.3-1.2.3-.5-1.7-1.5-2.5c-0.8-.7-1.9-1-3-1-2.4 0-4.3 1.5-4.8 3.5l-.1.4h-.2c-1.3 0-2.2 1-2.2 2.2v.2h13.1l.4-1.1z" />
                <path fill="#FBAD41" d="M24 16.7c-.2 0-.5 0-.7.1l-.2.1-.1-.2c-.5-1.2-1.7-2-3-2-.4 0-.8.1-1.2.2.5-2 2.3-3.4 4.4-3.4 1.9 0 3.5 1.1 4.3 2.7-.5-.3-1-.5-1.5-.5-1 0-1.8.5-2 1z" />
            </svg>
        ),
    },
    {
        name: 'OpenAI API',
        level: 80,
        desc: 'GPT integrations & AI agents',
        color: '#10b981',
        svg: (
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle cx="16" cy="16" r="13" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1.5" />
                <path fill="#10b981" d="M22.5 11.5A6.5 6.5 0 0016 8a6.5 6.5 0 00-5.5 9.95L9 22.5l4.55-1.5A6.5 6.5 0 0016 21.5a6.5 6.5 0 006.5-6.5 6.5 6.5 0 00-.5-2.5z" opacity="0.7" />
                <circle cx="16" cy="15" r="2.5" fill="#10b981" />
            </svg>
        ),
    },
]

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, inView }
}

export default function TechStack() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)
    const { ref: gridRef, inView: gridVisible } = useInView(0.1)

    return (
        <section
            id="tech-stack"
            style={{
                padding: '120px 24px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,30,0.5) 50%, transparent 100%)',
                position: 'relative', overflow: 'hidden',
            }}
        >
            {/* Subtle bg glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)' }} />

            <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
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
                        display: 'inline-block', padding: '5px 14px',
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 100, color: '#22c55e',
                        fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
                    }}>
                        Tech Stack
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 16 }}>
                        Built with <span className="gradient-text">best-in-class tools</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                        We choose the right tool for each problem. Every technology below has been battle-tested in real client projects.
                    </p>
                </div>

                {/* Tech grid */}
                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 16,
                    }}
                    className="tech-grid"
                >
                    {techs.map((tech, i) => (
                        <div
                            key={tech.name}
                            style={{
                                padding: '20px 24px',
                                background: 'rgba(15,23,42,0.5)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 16,
                                opacity: gridVisible ? 1 : 0,
                                transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.5s ease ${i * 0.06}s`,
                                backdropFilter: 'blur(10px)',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.borderColor = tech.color + '40'
                                el.style.background = tech.color + '08'
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.borderColor = 'rgba(255,255,255,0.06)'
                                el.style.background = 'rgba(15,23,42,0.5)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                {/* Icon container */}
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12,
                                    background: tech.color + '12',
                                    border: `1px solid ${tech.color}25`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {tech.svg}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9' }}>{tech.name}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: tech.color }}>{tech.level}%</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#475569' }}>{tech.desc}</span>
                                </div>
                            </div>

                            {/* Skill bar */}
                            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    width: gridVisible ? `${tech.level}%` : '0%',
                                    background: `linear-gradient(90deg, ${tech.color}, ${tech.color}99)`,
                                    borderRadius: 3,
                                    transition: `width 1s ease ${i * 0.1 + 0.3}s`,
                                    boxShadow: `0 0 8px ${tech.color}60`,
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom badge row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
                    {['FastAPI', 'Pandas', 'Scikit-Learn', 'Vite', 'Tailwind CSS', 'D3.js', 'Cloudflare D1', 'n8n', 'WhatsApp API'].map(tag => (
                        <span
                            key={tag}
                            style={{
                                padding: '5px 14px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: 100,
                                fontSize: '0.78rem', color: '#475569', fontWeight: 500,
                                transition: 'all 0.2s',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#475569'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 600px) { .tech-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    )
}
