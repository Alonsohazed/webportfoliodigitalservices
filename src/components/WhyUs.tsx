import { useEffect, useRef, useState } from 'react'
import { Target, TrendingUp, Cpu, RefreshCw, Rocket } from 'lucide-react'

const reasons = [
    {
        icon: Target,
        title: 'Real-World Solutions',
        description: 'We don\'t sell theory or templates. Every system we build is designed around your specific operational challenges and goals.',
        color: '#22c55e',
    },
    {
        icon: TrendingUp,
        title: 'Focus on Business Impact',
        description: 'We measure success in outcomes — reduced costs, saved time, increased revenue — not just code delivered.',
        color: '#3b82f6',
    },
    {
        icon: Cpu,
        title: 'Custom-Built Systems',
        description: 'No off-the-shelf solutions. Everything is architected from scratch to fit precisely what your business needs today and tomorrow.',
        color: '#8b5cf6',
    },
    {
        icon: RefreshCw,
        title: 'Scalable & Future-Proof',
        description: 'Our systems are designed to grow with you. Add features, scale users, expand markets — without rebuilding from scratch.',
        color: '#f59e0b',
    },
    {
        icon: Rocket,
        title: 'Fast & Efficient Delivery',
        description: 'We work in focused sprints with clear milestones. You see progress quickly and get to market faster than traditional development.',
        color: '#ec4899',
    },
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

export default function WhyUs() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)
    const { ref: gridRef, inView: gridVisible } = useInView(0.1)

    return (
        <section id="why-us" style={{ padding: '120px 24px', position: 'relative' }}>
            {/* Background accent */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34,197,94,0.05) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="why-grid">
                    {/* Left: Title */}
                    <div
                        ref={titleRef}
                        style={{
                            opacity: titleVisible ? 1 : 0,
                            transform: titleVisible ? 'translateX(0)' : 'translateX(-40px)',
                            transition: 'all 0.8s ease',
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
                            marginBottom: 20,
                        }}>
                            Why AA Digital
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                            fontWeight: 800, color: '#f1f5f9',
                            letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20,
                        }}>
                            We're not just developers.
                            <br />
                            <span className="gradient-text">We're your digital growth partners.</span>
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>
                            Most agencies hand you a product and disappear. We partner with you from strategy to launch and beyond — because your success is our portfolio.
                        </p>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="btn-primary"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                        >
                            Start a Conversation
                        </a>
                    </div>

                    {/* Right: Cards */}
                    <div
                        ref={gridRef}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                    >
                        {reasons.map((reason, index) => {
                            const Icon = reason.icon
                            return (
                                <ReasonItem
                                    key={reason.title}
                                    reason={reason}
                                    index={index}
                                    visible={gridVisible}
                                    Icon={Icon}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
        </section>
    )
}

function ReasonItem({
    reason,
    index,
    visible,
    Icon,
}: {
    reason: typeof reasons[0]
    index: number
    visible: boolean
    Icon: typeof Target
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                gap: 16,
                padding: '20px 24px',
                background: hovered ? 'rgba(15,23,42,0.8)' : 'rgba(15,23,42,0.3)',
                border: `1px solid ${hovered ? reason.color + '30' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(40px)',
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <div style={{
                width: 40, height: 40, flexShrink: 0,
                borderRadius: 10,
                background: `${reason.color}12`,
                border: `1px solid ${reason.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}>
                <Icon size={18} style={{ color: reason.color }} strokeWidth={1.8} />
            </div>
            <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                    {reason.title}
                </h4>
                <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.6 }}>
                    {reason.description}
                </p>
            </div>
        </div>
    )
}
