import { useEffect, useRef, useState } from 'react'
import { Package, MessageSquare, TrendingUp, Tv, Building2, ArrowUpRight } from 'lucide-react'

const projects = [
    {
        icon: Package,
        number: '01',
        title: 'Smart Inventory System',
        category: 'Web Platform',
        problem: 'Manual tracking across spreadsheets caused errors, delays, and zero visibility into stock levels.',
        solution: 'Custom digital inventory platform with real-time tracking, alerts, and reporting.',
        impact: 'Improved operational control, reduced errors by 80%, and cut stock reconciliation time in half.',
        color: '#22c55e',
        metrics: [{ label: 'Error Reduction', value: '80%' }, { label: 'Time Saved', value: '50%' }],
    },
    {
        icon: MessageSquare,
        number: '02',
        title: 'AI Chatbot Lead Funnel',
        category: 'AI & Automation',
        problem: 'Website traffic was generating zero qualified leads — potential clients left without engaging.',
        solution: 'Decision-based AI chatbot that qualifies leads, collects details, and routes them automatically.',
        impact: 'Boosted lead capture rate significantly and reduced sales team workload by automating follow-ups.',
        color: '#3b82f6',
        metrics: [{ label: 'Lead Conversion', value: '+3x' }, { label: 'Response Time', value: '0s' }],
    },
    {
        icon: TrendingUp,
        number: '03',
        title: 'Business Intelligence Suite',
        category: 'Data & Analytics',
        problem: 'Hundreds of thousands of raw data rows with no way to extract meaningful business insights.',
        solution: 'End-to-end data pipeline with Power BI dashboards, automated reports, and KPI tracking.',
        impact: 'Leadership now makes decisions based on live data — strategy meetings cut from 3 hours to 30 minutes.',
        color: '#f59e0b',
        metrics: [{ label: 'Reporting Speed', value: '10x' }, { label: 'Decision Accuracy', value: '+65%' }],
    },
    {
        icon: Tv,
        number: '04',
        title: 'Secure Streaming Platform',
        category: 'Web Platform',
        problem: 'Existing streaming setup had compatibility issues, poor UX, and constant drop-offs.',
        solution: 'Custom-built secure streaming platform with adaptive quality and content protection.',
        impact: 'Zero compatibility complaints post-launch, reliable uptime, and 40% higher session duration.',
        color: '#8b5cf6',
        metrics: [{ label: 'Uptime', value: '99.9%' }, { label: 'Session Duration', value: '+40%' }],
    },
    {
        icon: Building2,
        number: '05',
        title: 'Business Digitalization',
        category: 'Digital Transformation',
        problem: 'Entire operation ran on paper forms, WhatsApp messages, and disconnected Excel files.',
        solution: 'Unified digital system replacing all manual workflows — from intake to reporting.',
        impact: 'Reduced operational time by 60%, eliminated data duplicates, and enabled remote management.',
        color: '#ec4899',
        metrics: [{ label: 'Time Saved', value: '60%' }, { label: 'Error Rate', value: '−90%' }],
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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const { ref, inView } = useInView(0.1)
    const [hovered, setHovered] = useState(false)
    const Icon = project.icon
    const isEven = index % 2 === 0

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'grid',
                gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
                gap: 0,
                background: 'rgba(15,23,42,0.5)',
                border: `1px solid ${hovered ? project.color + '30' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 24,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${index * 0.08}s`,
                boxShadow: hovered ? `0 20px 60px ${project.color}15` : 'none',
            }}
            className="project-card"
        >
            {/* Left: Content */}
            <div style={{ padding: '40px 36px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                        width: 40, height: 40,
                        borderRadius: 10,
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Icon size={20} style={{ color: project.color }} strokeWidth={1.8} />
                    </div>
                    <span style={{
                        padding: '4px 12px',
                        background: `${project.color}10`,
                        border: `1px solid ${project.color}20`,
                        borderRadius: 100,
                        fontSize: '0.75rem',
                        color: project.color,
                        fontWeight: 600,
                    }}>
                        {project.category}
                    </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>
                    PROJECT {project.number}
                </div>
                <h3 style={{
                    fontSize: '1.35rem', fontWeight: 800,
                    color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 24,
                }}>
                    {project.title}
                </h3>

                {/* Problem / Solution */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                        <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Problem
                        </span>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginTop: 4 }}>
                            {project.problem}
                        </p>
                    </div>
                    <div>
                        <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Solution
                        </span>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginTop: 4 }}>
                            {project.solution}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Impact */}
            <div style={{
                padding: '40px 36px',
                background: `${project.color}06`,
                borderLeft: `1px solid ${project.color}15`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <div>
                    <span style={{
                        fontSize: '0.72rem', color: project.color, fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12,
                    }}>
                        ✦ Business Impact
                    </span>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 28 }}>
                        {project.impact}
                    </p>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {project.metrics.map(metric => (
                        <div key={metric.label} style={{
                            background: 'rgba(15,23,42,0.5)',
                            border: `1px solid ${project.color}20`,
                            borderRadius: 12,
                            padding: '14px 16px',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: project.color, letterSpacing: '-0.02em' }}>
                                {metric.value}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 500, marginTop: 2 }}>
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrow */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 20,
                    color: project.color,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    opacity: hovered ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                }}>
                    <ArrowUpRight size={16} />
                    View Case Study
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)

    return (
        <section id="projects" style={{
            padding: '120px 24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.02) 50%, transparent 100%)',
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
                        Case Studies
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 800, color: '#f1f5f9',
                        letterSpacing: '-0.03em', marginBottom: 16,
                    }}>
                        Real projects. <span className="gradient-text">Measurable results.</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                        Every project tells a story — a real problem, a tailored solution, and a business that grew because of it.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.number} project={project} index={index} />
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .project-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}
