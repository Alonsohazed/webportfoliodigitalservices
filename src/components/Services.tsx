import { useEffect, useRef, useState } from 'react'
import { BarChart3, Cog, Globe, Bot, Layers, ArrowRight } from 'lucide-react'

const services = [
    {
        icon: BarChart3,
        title: 'Data & Analytics Solutions',
        description: 'Custom dashboards, automated reports, and business intelligence pipelines that transform raw data into actionable insights.',
        benefit: 'Make faster, smarter decisions backed by real data — not guesswork.',
        color: '#22c55e',
        tags: ['Dashboards', 'BI Reports', 'Pipelines'],
    },
    {
        icon: Cog,
        title: 'Process Automation',
        description: 'We identify repetitive manual workflows and replace them with smart automated systems — saving you hours every week.',
        benefit: 'Eliminate bottlenecks and free your team to focus on high-value work.',
        color: '#3b82f6',
        tags: ['Workflow Automation', 'RPA', 'Integrations'],
    },
    {
        icon: Globe,
        title: 'Custom Web Platforms',
        description: 'Internal tools, admin systems, client portals, and custom dashboards built specifically for your operational needs.',
        benefit: 'Replace scattered spreadsheets with a unified, efficient platform.',
        color: '#8b5cf6',
        tags: ['Web Apps', 'Portals', 'Admin Systems'],
    },
    {
        icon: Bot,
        title: 'AI & Chatbots',
        description: 'Intelligent chatbots and AI-powered tools that capture leads, answer queries, and automate customer interactions 24/7.',
        benefit: 'Never miss a lead — convert visitors into clients automatically.',
        color: '#f59e0b',
        tags: ['Lead Gen', 'NLP', 'Decision Flows'],
    },
    {
        icon: Layers,
        title: 'Digital Transformation',
        description: 'Full-scale modernization of your business operations — from strategy and architecture to implementation and support.',
        benefit: 'Transition smoothly from manual chaos to scalable digital systems.',
        color: '#ec4899',
        tags: ['Strategy', 'Implementation', 'Support'],
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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const { ref, inView } = useInView(0.1)
    const [hovered, setHovered] = useState(false)
    const Icon = service.icon

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered
                    ? 'rgba(15,23,42,0.9)'
                    : 'rgba(15,23,42,0.5)',
                border: `1px solid ${hovered ? service.color + '40' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20,
                padding: '32px 28px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                transform: inView
                    ? hovered ? 'translateY(-6px)' : 'translateY(0)'
                    : 'translateY(40px)',
                opacity: inView ? 1 : 0,
                transitionDelay: `${index * 0.1}s`,
                backdropFilter: 'blur(16px)',
                boxShadow: hovered
                    ? `0 20px 60px ${service.color}20, 0 0 0 1px ${service.color}20`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Top glow */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: hovered
                    ? `linear-gradient(90deg, transparent, ${service.color}80, transparent)`
                    : 'transparent',
                transition: 'all 0.4s ease',
            }} />

            {/* Icon */}
            <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: `${service.color}15`,
                border: `1px solid ${service.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
                transition: 'all 0.3s ease',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}>
                <Icon size={24} style={{ color: service.color }} strokeWidth={1.8} />
            </div>

            <h3 style={{
                fontSize: '1.1rem', fontWeight: 700,
                color: '#f1f5f9', marginBottom: 12, letterSpacing: '-0.01em',
            }}>
                {service.title}
            </h3>

            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>
                {service.description}
            </p>

            {/* Business benefit */}
            <div style={{
                padding: '12px 16px',
                background: `${service.color}08`,
                border: `1px solid ${service.color}20`,
                borderRadius: 10,
                marginBottom: 20,
            }}>
                <p style={{ fontSize: '0.82rem', color: service.color, fontWeight: 500, lineHeight: 1.5 }}>
                    ✦ {service.benefit}
                </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {service.tags.map(tag => (
                    <span key={tag} style={{
                        padding: '4px 10px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 100,
                        fontSize: '0.72rem',
                        color: '#64748b',
                        fontWeight: 500,
                    }}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Arrow on hover */}
            <div style={{
                position: 'absolute', bottom: 28, right: 28,
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 0.3s ease',
                color: service.color,
            }}>
                <ArrowRight size={18} />
            </div>
        </div>
    )
}

export default function Services() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)

    return (
        <section id="services" style={{ padding: '120px 24px', position: 'relative' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Header */}
                <div
                    ref={titleRef}
                    style={{
                        textAlign: 'center', marginBottom: 72,
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
                        What We Do
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 800, color: '#f1f5f9',
                        letterSpacing: '-0.03em', marginBottom: 16,
                    }}>
                        Services built for <span className="gradient-text">real business impact</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                        Every service we offer is engineered to solve real problems and deliver measurable results.
                    </p>
                </div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 24,
                }}>
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
