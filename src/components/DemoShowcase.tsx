import { useState, useEffect } from 'react'
import { Package, MessageSquare, TrendingUp, Shield, Building2, ChevronRight } from 'lucide-react'
import DemoInventory from './demos/DemoInventory'
import DemoChatbot from './demos/DemoChatbot'
import DemoDashboard from './demos/DemoDashboard'
import DemoFRAP from './demos/DemoFRAP'
import DemoTransformation from './demos/DemoTransformation'

export const demos = [
    {
        key: 'inventory',
        icon: Package,
        label: 'Inventory System',
        tag: 'Web Platform',
        headline: 'Smart Inventory Management',
        description: 'Add products, adjust stock levels, and trigger low-stock alerts in real time — just like the real system delivered to our client.',
        color: '#22c55e',
        component: DemoInventory,
    },
    {
        key: 'chatbot',
        icon: MessageSquare,
        label: 'AI Chatbot Funnel',
        tag: 'AI & Automation',
        headline: 'Sales Chatbot with Decision Tree',
        description: 'Walk through the full lead qualification flow — from first question to booking a call. This is the exact flow structure used in production.',
        color: '#3b82f6',
        component: DemoChatbot,
    },
    {
        key: 'dashboard',
        icon: TrendingUp,
        label: 'BI Dashboard',
        tag: 'Data & Analytics',
        headline: 'Business Intelligence Dashboard',
        description: 'Filter metrics by period and category. See how sales, users, and revenue KPIs update dynamically — same architecture as our Power BI deployments.',
        color: '#f59e0b',
        component: DemoDashboard,
    },
    {
        key: 'frap',
        icon: Shield,
        label: 'FRAP Medical Platform',
        tag: 'Enterprise Platform',
        headline: 'Prehospital Emergency Management',
        description: 'Explore the dispatch module, open patient records, review vital signs, and generate reports — a simulation of our FRAP medical system deployed for a real emergency response organization.',
        color: '#10b981',
        component: DemoFRAP,
    },
    {
        key: 'transformation',
        icon: Building2,
        label: 'Digital Transformation',
        tag: 'Before vs. After',
        headline: 'Process Digitalization Comparison',
        description: 'Toggle between the manual and automated version of 3 real business processes. Compare time, error rate, and cost savings side by side.',
        color: '#ec4899',
        component: DemoTransformation,
    },
]

let scrollToDemoFn: ((key: string) => void) | null = null

export function scrollToDemo(key: string) {
    if (scrollToDemoFn) scrollToDemoFn(key)
}

export default function DemoShowcase() {
    const [active, setActive] = useState('inventory')

    useEffect(() => {
        scrollToDemoFn = (key: string) => {
            setActive(key)
            setTimeout(() => {
                document.getElementById('demo-showcase')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 60)
        }
        return () => { scrollToDemoFn = null }
    }, [])

    const activeDemo = demos.find(d => d.key === active)!
    const ActiveComponent = activeDemo.component

    return (
        <section
            id="demo-showcase"
            style={{
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,30,0.6) 40%, rgba(10,15,30,0.6) 60%, transparent 100%)',
            }}
        >
            {/* Grid back */}
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <span style={{
                        display: 'inline-block', padding: '5px 14px',
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 100, color: '#22c55e',
                        fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
                    }}>
                        ⚡ Live Demos
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 16 }}>
                        Try our systems <span className="gradient-text">yourself</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                        These are working simulations of real systems we've built. Interact with them — not just read about them.
                    </p>
                </div>

                {/* Demo switcher tabs */}
                <div style={{
                    display: 'flex', gap: 8, marginBottom: 32,
                    overflowX: 'auto', paddingBottom: 4,
                    scrollbarWidth: 'none',
                }}>
                    {demos.map(d => {
                        const Icon = d.icon
                        const isActive = active === d.key
                        return (
                            <button
                                key={d.key}
                                onClick={() => setActive(d.key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 18px', flexShrink: 0,
                                    background: isActive ? d.color + '18' : 'rgba(15,23,42,0.5)',
                                    border: `1px solid ${isActive ? d.color + '50' : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: 10, cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    boxShadow: isActive ? `0 0 20px ${d.color}18` : 'none',
                                }}
                            >
                                <Icon size={15} style={{ color: isActive ? d.color : '#64748b' }} strokeWidth={2} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isActive ? d.color : '#64748b', whiteSpace: 'nowrap' }}>
                                    {d.label}
                                </span>
                                {isActive && (
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: d.color, flexShrink: 0, animation: 'pulseG 2s infinite' }} />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Main demo panel */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24,
                }} className="demo-panel-grid">
                    {/* Left: Description */}
                    <div style={{
                        padding: '28px 24px',
                        background: 'rgba(15,23,42,0.6)',
                        border: `1px solid ${activeDemo.color}20`,
                        borderRadius: 20,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-between',
                        backdropFilter: 'blur(20px)',
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: activeDemo.color + '18',
                                    border: `1px solid ${activeDemo.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <activeDemo.icon size={22} style={{ color: activeDemo.color }} strokeWidth={1.8} />
                                </div>
                                <span style={{
                                    fontSize: '0.72rem', padding: '3px 10px',
                                    background: activeDemo.color + '12',
                                    border: `1px solid ${activeDemo.color}25`,
                                    borderRadius: 100, color: activeDemo.color, fontWeight: 700,
                                }}>
                                    {activeDemo.tag}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 14 }}>
                                {activeDemo.headline}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.7 }}>
                                {activeDemo.description}
                            </p>
                        </div>

                        <div style={{ marginTop: 24 }}>
                            {/* Separator */}
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 18 }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: activeDemo.color, animation: 'pulseG 2s infinite', display: 'inline-block' }} />
                                <span style={{ fontSize: '0.75rem', color: activeDemo.color, fontWeight: 600 }}>Interactive — try it yourself</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.5 }}>
                                This is a frontend simulation with mock data. Real deployments connect to live databases and APIs.
                            </p>

                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                style={{
                                    marginTop: 16,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    padding: '12px 0', width: '100%',
                                    background: `linear-gradient(135deg, ${activeDemo.color}, ${activeDemo.color}cc)`,
                                    border: 'none', borderRadius: 10, cursor: 'pointer',
                                    color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                                    textDecoration: 'none', transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${activeDemo.color}40` }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                            >
                                Build this for me <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Demo component */}
                    <div style={{
                        background: 'rgba(10,15,30,0.7)',
                        border: `1px solid ${activeDemo.color}18`,
                        borderRadius: 20,
                        padding: '24px',
                        backdropFilter: 'blur(16px)',
                        overflow: 'auto',
                        maxHeight: 600,
                    }}>
                        {/* Demo header bar */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            marginBottom: 20, paddingBottom: 16,
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                        }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                                    <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'inline-block' }} />
                                ))}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#334155', fontFamily: 'monospace' }}>
                                aa-digital · demo · {activeDemo.key}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: activeDemo.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: activeDemo.color, display: 'inline-block', animation: 'pulseG 2s infinite' }} />
                                Live
                            </span>
                        </div>

                        <ActiveComponent key={active} />
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 860px) { .demo-panel-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulseG { 0%,100%{opacity:1} 50%{opacity:0.35} }
        ::-webkit-scrollbar { width: 0px; height: 0px; }
      `}</style>
        </section>
    )
}
