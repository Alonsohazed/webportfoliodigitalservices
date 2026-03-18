import { useEffect, useRef, useState } from 'react'
import {
    Package, MessageSquare, TrendingUp, Tv, Building2,
    ArrowUpRight, Shield, Brain, Globe, Database, Cpu,
    BarChart2, Zap, FileText, Users, ShoppingCart, Map,
    Clock, Phone, BookOpen, Truck, HeartPulse, Lock,
    Wifi, PieChart, Layers, Server, Cog, X,
} from 'lucide-react'
import DemoInventory from './demos/DemoInventory'
import DemoChatbot from './demos/DemoChatbot'
import DemoDashboard from './demos/DemoDashboard'
import DemoStreaming from './demos/DemoStreaming'
import DemoTransformation from './demos/DemoTransformation'

const demoMap: Record<string, React.ComponentType> = {
    DemoInventory,
    DemoChatbot,
    DemoDashboard,
    DemoStreaming,
    DemoTransformation,
}

const projects = [
    { icon: Package, number: '01', title: 'Smart Inventory System', category: 'Web Platform', problem: 'Manual tracking across spreadsheets caused errors, delays, and zero visibility into stock levels.', solution: 'Custom digital inventory platform with real-time tracking, alerts, and reporting.', impact: 'Reduced errors by 80% and cut stock reconciliation time in half.', color: '#22c55e', metrics: [{ label: 'Error Reduction', value: '80%' }, { label: 'Time Saved', value: '50%' }], demo: 'DemoInventory' },
    { icon: MessageSquare, number: '02', title: 'AI Chatbot Lead Funnel', category: 'AI & Automation', problem: 'Website traffic was generating zero qualified leads.', solution: 'Decision-based AI chatbot that qualifies leads, collects details, and routes them automatically.', impact: 'Boosted lead capture rate 3x and automated follow-ups.', color: '#3b82f6', metrics: [{ label: 'Lead Conversion', value: '+3x' }, { label: 'Response Time', value: '0s' }], demo: 'DemoChatbot' },
    { icon: TrendingUp, number: '03', title: 'Business Intelligence Suite', category: 'Data & Analytics', problem: 'Hundreds of thousands of raw data rows with no meaningful insights.', solution: 'End-to-end data pipeline with Power BI dashboards and KPI tracking.', impact: 'Strategy meetings cut from 3 hours to 30 minutes.', color: '#f59e0b', metrics: [{ label: 'Reporting Speed', value: '10x' }, { label: 'Decision Accuracy', value: '+65%' }], demo: 'DemoDashboard' },
    { icon: Tv, number: '04', title: 'Secure Streaming Platform', category: 'Web Platform', problem: 'Existing setup had compatibility issues, poor UX, and constant drop-offs.', solution: 'Custom-built secure streaming platform with adaptive quality.', impact: 'Zero compatibility complaints, 40% higher session duration.', color: '#8b5cf6', metrics: [{ label: 'Uptime', value: '99.9%' }, { label: 'Session Duration', value: '+40%' }], demo: 'DemoStreaming' },
    { icon: Building2, number: '05', title: 'Business Digitalization', category: 'Digital Transformation', problem: 'Entire operation ran on paper forms and WhatsApp messages.', solution: 'Unified digital system replacing all manual workflows.', impact: 'Reduced operational time by 60%, eliminated data duplicates.', color: '#ec4899', metrics: [{ label: 'Time Saved', value: '60%' }, { label: 'Error Rate', value: '−90%' }], demo: 'DemoTransformation' },
    { icon: Shield, number: '06', title: 'FRAP Medical Platform', category: 'Web Platform', problem: 'Medical staff used paper records and lacked a unified digital system for patient data.', solution: 'Full-stack medical platform (FRAP) with patient records, drug tracking, and PDF report generation.', impact: 'Allowed clinics to go fully paperless with real-time patient management.', color: '#10b981', metrics: [{ label: 'Paperless Rate', value: '100%' }, { label: 'Data Speed', value: '20x' }], demo: '' },
    { icon: Brain, number: '07', title: 'NLP Sentiment Analyzer', category: 'AI & Automation', problem: 'Brand had no way to monitor customer sentiment across social channels.', solution: 'Python NLP pipeline that scrapes, classifies, and scores sentiment in real time.', impact: 'Marketing team identified and resolved 3 PR crises before they escalated.', color: '#6366f1', metrics: [{ label: 'Channels Covered', value: '5+' }, { label: 'Accuracy', value: '91%' }], demo: '' },
    { icon: Globe, number: '08', title: 'Multi-Language Web App', category: 'Custom Web Platform', problem: 'Company served 4 countries but only had content in one language.', solution: 'React web app with i18n system and auto locale detection.', impact: 'Expanded market reach with 40% more organic engagement.', color: '#0ea5e9', metrics: [{ label: 'Languages', value: '4' }, { label: 'Engagement', value: '+40%' }], demo: '' },
    { icon: Database, number: '09', title: 'ETL Data Pipeline', category: 'Data & Analytics', problem: 'Data lived in 7 different formats across 12 departments.', solution: 'Automated ETL pipeline unifying all sources into a central data warehouse.', impact: 'Saved 40 man-hours per week in manual data wrangling.', color: '#f59e0b', metrics: [{ label: 'Hours Saved/wk', value: '40h' }, { label: 'Data Sources', value: '12' }], demo: '' },
    { icon: Cpu, number: '10', title: 'IoT Monitoring Dashboard', category: 'Data & Analytics', problem: 'Industrial machines had no remote monitoring capability.', solution: 'IoT sensor integration with live dashboard and anomaly alerts.', impact: 'Prevented 4 machine failures in first month, saving est. $80k.', color: '#22c55e', metrics: [{ label: 'Downtime Prevented', value: '4x' }, { label: 'Alert Latency', value: '<1s' }], demo: '' },
    { icon: BarChart2, number: '11', title: 'Sales KPI Tracker', category: 'Data & Analytics', problem: 'Sales teams used separate spreadsheets giving leadership no real-time view.', solution: 'Unified Power BI dashboard pulling live CRM data.', impact: 'Sales director report time dropped from 2 days to 10 minutes.', color: '#ec4899', metrics: [{ label: 'Report Time', value: '−97%' }, { label: 'Teams Unified', value: '6' }], demo: '' },
    { icon: Zap, number: '12', title: 'Automated Invoice System', category: 'Process Automation', problem: 'Finance team spent 20h/week manually generating and sending invoices.', solution: 'Python automation that generates, validates, and emails invoices on trigger.', impact: 'Finance team reclaimed 20 hours per week for strategic work.', color: '#fbbf24', metrics: [{ label: 'Hours Reclaimed/wk', value: '20h' }, { label: 'Error Rate', value: '0%' }], demo: '' },
    { icon: FileText, number: '13', title: 'Contract Workflow System', category: 'Process Automation', problem: 'Contract approvals took 2-3 weeks due to email chains and lost documents.', solution: 'Digital workflow platform with role-based approvals and audit trail.', impact: 'Average contract approval time down from 18 days to 2 days.', color: '#8b5cf6', metrics: [{ label: 'Approval Time', value: '−89%' }, { label: 'Lost Docs', value: '0' }], demo: '' },
    { icon: Users, number: '14', title: 'HR Onboarding Portal', category: 'Custom Web Platform', problem: 'New hire onboarding took 2 weeks involving multiple departments manually.', solution: 'Self-service HR portal with checklists, document uploads, and task tracking.', impact: 'Onboarding time cut to 3 days; HR workload reduced by 70%.', color: '#10b981', metrics: [{ label: 'Onboarding Time', value: '−78%' }, { label: 'HR Workload', value: '−70%' }], demo: '' },
    { icon: ShoppingCart, number: '15', title: 'E-Commerce Analytics Engine', category: 'Data & Analytics', problem: 'Online store had no visibility into which products, campaigns or channels drove revenue.', solution: 'Custom analytics engine integrating Shopify, Meta Ads, and Google Analytics.', impact: 'ROAS improved 2.4x within 60 days of implementation.', color: '#f43f5e', metrics: [{ label: 'ROAS Improvement', value: '2.4x' }, { label: 'Channels Tracked', value: '8' }], demo: '' },
    { icon: Map, number: '16', title: 'Route Optimization System', category: 'Process Automation', problem: 'Logistics company was manually planning delivery routes, wasting fuel and time.', solution: 'Algorithm-based route optimizer with driver app and live tracking.', impact: 'Fuel costs reduced by 34%, deliveries completed 2h faster on average.', color: '#0ea5e9', metrics: [{ label: 'Fuel Savings', value: '34%' }, { label: 'Delivery Speed', value: '+2h' }], demo: '' },
    { icon: Clock, number: '17', title: 'Shift Scheduling App', category: 'Custom Web Platform', problem: 'Restaurant managers spent 8h/week manually building employee schedules.', solution: 'Smart scheduling app with availability rules, conflicts detection, and SMS alerts.', impact: 'Scheduling time dropped to 20 minutes; zero missed shifts in 3 months.', color: '#22c55e', metrics: [{ label: 'Scheduling Time', value: '−96%' }, { label: 'Missed Shifts', value: '0' }], demo: '' },
    { icon: Phone, number: '18', title: 'WhatsApp CRM Integration', category: 'AI & Automation', problem: 'Sales team lost leads that came through WhatsApp with no tracking system.', solution: 'WhatsApp Business API integration with CRM, tagging, and auto-responses.', impact: '100% of WhatsApp leads now captured and followed up within 5 minutes.', color: '#25D366', metrics: [{ label: 'Lead Capture', value: '100%' }, { label: 'Follow-up Time', value: '<5min' }], demo: '' },
    { icon: BookOpen, number: '19', title: 'Student Progress Platform', category: 'Custom Web Platform', problem: 'Tutoring center tracked student progress on paper, losing data and missing interventions.', solution: 'Web platform with student profiles, session notes, progress charts, and parent reports.', impact: 'Teachers now identify at-risk students 3 weeks earlier than before.', color: '#a78bfa', metrics: [{ label: 'Early Detection', value: '+3wks' }, { label: 'Data Loss', value: '0%' }], demo: '' },
    { icon: Truck, number: '20', title: 'Supplier Portal', category: 'Custom Web Platform', problem: 'Purchasing team communicated with 50+ suppliers via fragmented email threads.', solution: 'Dedicated supplier portal with order management, invoicing, and status tracking.', impact: 'Purchase cycle time reduced by 45%, disputes down by 80%.', color: '#fb923c', metrics: [{ label: 'Cycle Time', value: '−45%' }, { label: 'Disputes', value: '−80%' }], demo: '' },
    { icon: HeartPulse, number: '21', title: 'Health Metrics Tracker', category: 'Data & Analytics', problem: 'Clinic had no way to track aggregated patient health trends over time.', solution: 'HIPAA-aware data aggregation tool with trend dashboards.', impact: 'Enabled proactive care for 200+ patients showing early risk signals.', color: '#f43f5e', metrics: [{ label: 'Patients Monitored', value: '200+' }, { label: 'Early Interventions', value: '+60%' }], demo: '' },
    { icon: Lock, number: '22', title: 'Data Security Audit Tool', category: 'Process Automation', problem: 'Company had no systematic way to audit who accessed sensitive files.', solution: 'Automated log analysis tool with anomaly detection and weekly reports.', impact: 'Identified 3 unauthorized access events in the first 30 days.', color: '#6366f1', metrics: [{ label: 'Events Detected', value: '3' }, { label: 'Audit Coverage', value: '100%' }], demo: '' },
    { icon: Wifi, number: '23', title: 'Real-Time Notification Engine', category: 'Process Automation', problem: 'Operations team used email for urgent alerts — slow and unreliable for time-sensitive events.', solution: 'WebSocket-based push notification system with priority queuing.', impact: 'Average alert response time dropped from 45 minutes to under 30 seconds.', color: '#0ea5e9', metrics: [{ label: 'Alert Latency', value: '<30s' }, { label: 'vs. Email', value: '−98%' }], demo: '' },
    { icon: PieChart, number: '24', title: 'Marketing Attribution Model', category: 'Data & Analytics', problem: 'Marketing spend was guesswork — no model to attribute revenue to specific campaigns.', solution: 'Multi-touch attribution model using SQL + Python + Tableau.', impact: 'Reallocated 30% of budget to highest-performing channels, 2x ROI.', color: '#ec4899', metrics: [{ label: 'ROI Improvement', value: '2x' }, { label: 'Budget Optimized', value: '30%' }], demo: '' },
    { icon: Layers, number: '25', title: 'Product Configurator Tool', category: 'Custom Web Platform', problem: 'Sales reps built custom quotes manually in Excel, taking hours per client.', solution: 'Interactive web configurator with live pricing rules and one-click PDF export.', impact: 'Quote generation time reduced from 4 hours to 8 minutes.', color: '#22c55e', metrics: [{ label: 'Quote Time', value: '−97%' }, { label: 'Error Rate', value: '−100%' }], demo: '' },
    { icon: Server, number: '26', title: 'Cloud Migration Strategy', category: 'Digital Transformation', problem: 'Legacy on-premise infrastructure was expensive, slow, and impossible to scale.', solution: 'Full cloud migration to AWS with cost-optimized architecture and CI/CD pipelines.', impact: 'Infrastructure costs reduced by 52%; deployment speed increased 8x.', color: '#f59e0b', metrics: [{ label: 'Cost Reduction', value: '52%' }, { label: 'Deploy Speed', value: '8x' }], demo: '' },
    { icon: Cog, number: '27', title: 'Report Generation Bot', category: 'Process Automation', problem: 'Analysts spent 15 hours/week pulling data from multiple sources and formatting reports.', solution: 'Python bot that auto-collects, processes, formats, and emails reports on schedule.', impact: '15 hours reclaimed weekly; zero formatting errors since launch.', color: '#8b5cf6', metrics: [{ label: 'Hours Saved', value: '15/wk' }, { label: 'Errors', value: '0' }], demo: '' },
    { icon: Globe, number: '28', title: 'Franchise Management Platform', category: 'Custom Web Platform', problem: 'Franchise owner had 8 locations with no unified performance visibility.', solution: 'Multi-location dashboard with location-level KPIs, staff management, and alerts.', impact: 'Identified underperforming location in week 1, turnaround in 30 days.', color: '#10b981', metrics: [{ label: 'Locations Managed', value: '8' }, { label: 'Visibility', value: '100%' }], demo: '' },
    { icon: Database, number: '29', title: 'Customer Data Platform', category: 'Data & Analytics', problem: 'Customer data scattered across CRM, email tool, support desk, and billing.', solution: 'Unified customer data platform with single customer view and segmentation engine.', impact: 'Personalized email campaigns led to 45% higher open rates.', color: '#3b82f6', metrics: [{ label: 'Open Rate', value: '+45%' }, { label: 'Data Sources', value: '6' }], demo: '' },
    { icon: Brain, number: '30', title: 'Demand Forecasting Model', category: 'AI & Automation', problem: 'Retailer constantly over/under-stocked, causing lost sales or excess inventory.', solution: 'ML-based demand forecasting model trained on 3 years of sales history.', impact: 'Inventory waste reduced by 38%, stockouts eliminated for top 100 SKUs.', color: '#f43f5e', metrics: [{ label: 'Waste Reduction', value: '38%' }, { label: 'Stockouts', value: '0' }], demo: '' },
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

function DemoModal({ demoKey, title, onClose }: { demoKey: string; title: string; onClose: () => void }) {
    const DemoComponent = demoMap[demoKey]
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(2,8,23,0.88)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24,
                animation: 'fadeIn 0.25s ease',
            }}
        >
            <div style={{
                width: '100%', maxWidth: 860,
                background: '#0a0f1e',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 24,
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                animation: 'slideUp 0.3s ease',
            }}>
                {/* Modal header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 28px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(15,23,42,0.6)',
                    flexShrink: 0,
                }}>
                    <div>
                        <span style={{
                            fontSize: '0.7rem', color: '#22c55e', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                        }}>
                            ⚡ Interactive Demo
                        </span>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginTop: 2 }}>
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8',
                            display: 'flex', alignItems: 'center', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,59,59,0.15)'; (e.currentTarget as HTMLElement).style.color = '#f87171' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                        aria-label="Close demo"
                    >
                        <X size={18} />
                    </button>
                </div>
                {/* Modal body */}
                <div style={{ overflowY: 'auto', flex: 1, padding: '24px 28px' }}>
                    {DemoComponent ? <DemoComponent /> : <p style={{ color: '#64748b' }}>Demo not found.</p>}
                </div>
            </div>
            <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(24px); opacity:0 } to { transform:translateY(0); opacity:1 } }
      `}</style>
        </div>
    )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const { ref, inView } = useInView(0.05)
    const [hovered, setHovered] = useState(false)
    const [demoOpen, setDemoOpen] = useState(false)
    const Icon = project.icon

    return (
        <>
            {demoOpen && project.demo && (
                <DemoModal demoKey={project.demo} title={project.title} onClose={() => setDemoOpen(false)} />
            )}
            <div
                ref={ref}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                    background: 'rgba(15,23,42,0.5)',
                    border: `1px solid ${hovered ? project.color + '30' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 20, overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${Math.min(index * 0.05, 0.4)}s`,
                    boxShadow: hovered ? `0 20px 60px ${project.color}15` : 'none',
                }}
                className="project-card"
            >
                {/* Left */}
                <div style={{ padding: '32px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: `${project.color}15`, border: `1px solid ${project.color}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Icon size={18} style={{ color: project.color }} strokeWidth={1.8} />
                        </div>
                        <span style={{
                            padding: '3px 10px', background: `${project.color}10`,
                            border: `1px solid ${project.color}20`, borderRadius: 100,
                            fontSize: '0.72rem', color: project.color, fontWeight: 600,
                        }}>
                            {project.category}
                        </span>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>
                        PROJECT {project.number}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        {project.title}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                            <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Problem</span>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, marginTop: 3 }}>{project.problem}</p>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.65rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Solution</span>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, marginTop: 3 }}>{project.solution}</p>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div style={{
                    padding: '32px 28px', background: `${project.color}06`,
                    borderLeft: `1px solid ${project.color}15`,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                    <div>
                        <span style={{ fontSize: '0.65rem', color: project.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                            ✦ Impact
                        </span>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>
                            {project.impact}
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                        {project.metrics.map(m => (
                            <div key={m.label} style={{
                                background: 'rgba(15,23,42,0.5)', border: `1px solid ${project.color}20`,
                                borderRadius: 10, padding: '10px 12px', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: project.color }}>{m.value}</div>
                                <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: 2 }}>{m.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                        {project.demo && (
                            <button
                                onClick={() => setDemoOpen(true)}
                                style={{
                                    flex: 1, padding: '10px 0',
                                    background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                                    border: 'none', borderRadius: 10, cursor: 'pointer',
                                    color: '#fff', fontSize: '0.78rem', fontWeight: 700,
                                    letterSpacing: '0.02em', transition: 'all 0.25s ease',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${project.color}40` }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                            >
                                ⚡ Try Demo
                            </button>
                        )}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            color: project.color, fontSize: '0.75rem', fontWeight: 600,
                            opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s',
                            cursor: 'pointer', padding: '8px 0',
                        }}>
                            <ArrowUpRight size={14} /> Details
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Projects() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)
    const [showAll, setShowAll] = useState(false)

    const visibleProjects = showAll ? projects : projects.slice(0, 6)

    return (
        <section id="projects" style={{
            padding: '120px 24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.02) 50%, transparent 100%)',
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
                        display: 'inline-block', padding: '5px 14px',
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 100, color: '#22c55e',
                        fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
                    }}>
                        Case Studies
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 16 }}>
                        Real projects. <span className="gradient-text">Measurable results.</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                        30+ delivered projects — each solving a real problem. The first 5 include{' '}
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>interactive demos</span> you can try yourself.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {visibleProjects.map((project, index) => (
                        <ProjectCard key={project.number} project={project} index={index} />
                    ))}
                </div>

                {/* Show more / less */}
                {!showAll && (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <button
                            onClick={() => setShowAll(true)}
                            style={{
                                padding: '14px 36px',
                                background: 'rgba(15,23,42,0.7)',
                                border: '1px solid rgba(34,197,94,0.25)',
                                borderRadius: 12, cursor: 'pointer',
                                color: '#22c55e', fontSize: '0.9rem', fontWeight: 600,
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.7)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                        >
                            View All 30 Projects ↓
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .project-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}
