import { useEffect, useRef, useState } from 'react'
import {
    Package, MessageSquare, TrendingUp, Tv, Building2,
    ArrowUpRight, Shield, Brain, Globe, Database, Cpu,
    BarChart2, Zap, FileText, Users, ShoppingCart, Map,
    Clock, Phone, BookOpen, Truck, HeartPulse, Lock,
    Wifi, PieChart, Layers, Server, Cog,
} from 'lucide-react'
import { scrollToDemo } from './DemoShowcase'

const projects = [
    { icon: Package, number: '01', title: 'Smart Inventory System', category: 'Web Platform', image: '/projects/inventory.png', problem: 'Manual tracking across spreadsheets caused errors, delays, and zero visibility into stock levels.', solution: 'Custom digital inventory platform with real-time tracking, alerts, and reporting.', impact: 'Reduced errors by 80% and cut stock reconciliation time in half.', color: '#22c55e', metrics: [{ label: 'Error Reduction', value: '80%' }, { label: 'Time Saved', value: '50%' }], demo: 'inventory' },
    { icon: MessageSquare, number: '02', title: 'AI Chatbot Lead Funnel', category: 'AI & Automation', image: '/projects/chatbot.png', problem: 'Website traffic was generating zero qualified leads.', solution: 'Decision-based AI chatbot that qualifies leads, collects details, and routes them automatically.', impact: 'Boosted lead capture rate 3x and automated follow-ups.', color: '#3b82f6', metrics: [{ label: 'Lead Conversion', value: '+3x' }, { label: 'Response Time', value: '0s' }], demo: 'chatbot' },
    { icon: TrendingUp, number: '03', title: 'Business Intelligence Suite', category: 'Data & Analytics', image: '/projects/dashboard.png', problem: 'Hundreds of thousands of raw data rows with no meaningful insights.', solution: 'End-to-end data pipeline with Power BI dashboards and KPI tracking.', impact: 'Strategy meetings cut from 3 hours to 30 minutes.', color: '#f59e0b', metrics: [{ label: 'Reporting Speed', value: '10x' }, { label: 'Decision Accuracy', value: '+65%' }], demo: 'dashboard' },
    { icon: Shield, number: '04', title: 'FRAP Medical Platform', category: 'Enterprise Platform', image: '/projects/frap.png', problem: 'Emergency medical staff had no unified digital system — patient records were paper-based.', solution: 'Full-stack prehospital care platform with triage, vital signs, clinical records & digital PDF reports.', impact: 'Organization went fully paperless — records available in real time across all response units.', color: '#10b981', metrics: [{ label: 'Paperless Rate', value: '100%' }, { label: 'Report Time', value: '−95%' }], demo: 'frap' },
    { icon: Building2, number: '05', title: 'Business Digitalization', category: 'Digital Transformation', image: '/projects/transformation.png', problem: 'Entire operation ran on paper forms and WhatsApp messages.', solution: 'Unified digital system replacing all manual workflows.', impact: 'Reduced operational time by 60%, eliminated data duplicates.', color: '#ec4899', metrics: [{ label: 'Time Saved', value: '60%' }, { label: 'Error Rate', value: '−90%' }], demo: 'transformation' },
    { icon: Tv, number: '06', title: 'Secure Streaming Platform', category: 'Web Platform', image: '/projects/streaming.png', problem: 'Existing setup had compatibility issues, poor UX, and constant drop-offs.', solution: 'Custom-built secure streaming platform with adaptive quality.', impact: 'Zero compatibility complaints, 40% higher session duration.', color: '#8b5cf6', metrics: [{ label: 'Uptime', value: '99.9%' }, { label: 'Session Duration', value: '+40%' }], demo: '' },

    /* 24 More Projects without Demos */
    { icon: Brain, number: '07', title: 'NLP Sentiment Analyzer', category: 'AI & Automation', image: '', problem: 'Brand had no way to monitor customer sentiment across social channels.', solution: 'Python NLP pipeline that scrapes, classifies, and scores sentiment in real time.', impact: 'Marketing team identified and resolved 3 PR crises before they escalated.', color: '#6366f1', metrics: [{ label: 'Channels Covered', value: '5+' }, { label: 'Accuracy', value: '91%' }], demo: '' },
    { icon: Globe, number: '08', title: 'Multi-Language Web App', category: 'Custom Web Platform', image: '', problem: 'Company served 4 countries but only had content in one language.', solution: 'React web app with i18n system and auto locale detection.', impact: 'Expanded market reach with 40% more organic engagement.', color: '#0ea5e9', metrics: [{ label: 'Languages', value: '4' }, { label: 'Engagement', value: '+40%' }], demo: '' },
    { icon: Database, number: '09', title: 'ETL Data Pipeline', category: 'Data & Analytics', image: '', problem: 'Data lived in 7 different formats across 12 departments.', solution: 'Automated ETL pipeline unifying all sources into a central data warehouse.', impact: 'Saved 40 man-hours per week in manual data wrangling.', color: '#f59e0b', metrics: [{ label: 'Hours Saved/wk', value: '40h' }, { label: 'Data Sources', value: '12' }], demo: '' },
    { icon: Cpu, number: '10', title: 'IoT Monitoring Dashboard', category: 'Data & Analytics', image: '', problem: 'Industrial machines had no remote monitoring capability.', solution: 'IoT sensor integration with live dashboard and anomaly alerts.', impact: 'Prevented 4 machine failures in first month, saving est. $80k.', color: '#22c55e', metrics: [{ label: 'Downtime Prevented', value: '4x' }, { label: 'Alert Latency', value: '<1s' }], demo: '' },
    { icon: BarChart2, number: '11', title: 'Sales KPI Tracker', category: 'Data & Analytics', image: '', problem: 'Sales teams used separate spreadsheets giving leadership no real-time view.', solution: 'Unified Power BI dashboard pulling live CRM data.', impact: 'Sales director report time dropped from 2 days to 10 minutes.', color: '#ec4899', metrics: [{ label: 'Report Time', value: '−97%' }, { label: 'Teams Unified', value: '6' }], demo: '' },
    { icon: Zap, number: '12', title: 'Automated Invoice System', category: 'Process Automation', image: '', problem: 'Finance team spent 20h/week manually generating and sending invoices.', solution: 'Python automation that generates, validates, and emails invoices on trigger.', impact: 'Finance team reclaimed 20 hours per week for strategic work.', color: '#fbbf24', metrics: [{ label: 'Hours Reclaimed/wk', value: '20h' }, { label: 'Error Rate', value: '0%' }], demo: '' },
    { icon: FileText, number: '13', title: 'Contract Workflow System', category: 'Process Automation', image: '', problem: 'Contract approvals took 2-3 weeks due to email chains and lost documents.', solution: 'Digital workflow platform with role-based approvals and audit trail.', impact: 'Average contract approval time down from 18 days to 2 days.', color: '#8b5cf6', metrics: [{ label: 'Approval Time', value: '−89%' }, { label: 'Lost Docs', value: '0' }], demo: '' },
    { icon: Users, number: '14', title: 'HR Onboarding Portal', category: 'Custom Web Platform', image: '', problem: 'New hire onboarding took 2 weeks involving multiple departments manually.', solution: 'Self-service HR portal with checklists, document uploads, and task tracking.', impact: 'Onboarding time cut to 3 days; HR workload reduced by 70%.', color: '#10b981', metrics: [{ label: 'Onboarding Time', value: '−78%' }, { label: 'HR Workload', value: '−70%' }], demo: '' },
    { icon: ShoppingCart, number: '15', title: 'E-Commerce Analytics Engine', category: 'Data & Analytics', image: '', problem: 'Online store had no visibility into which products, campaigns or channels drove revenue.', solution: 'Custom analytics engine integrating Shopify, Meta Ads, and Google Analytics.', impact: 'ROAS improved 2.4x within 60 days of implementation.', color: '#f43f5e', metrics: [{ label: 'ROAS Improvement', value: '2.4x' }, { label: 'Channels Tracked', value: '8' }], demo: '' },
    { icon: Map, number: '16', title: 'Route Optimization System', category: 'Process Automation', image: '', problem: 'Logistics company was manually planning delivery routes, wasting fuel and time.', solution: 'Algorithm-based route optimizer with driver app and live tracking.', impact: 'Fuel costs reduced by 34%, deliveries completed 2h faster on average.', color: '#0ea5e9', metrics: [{ label: 'Fuel Savings', value: '34%' }, { label: 'Delivery Speed', value: '+2h' }], demo: '' },
    { icon: Clock, number: '17', title: 'Shift Scheduling App', category: 'Custom Web Platform', image: '', problem: 'Restaurant managers spent 8h/week manually building employee schedules.', solution: 'Smart scheduling app with availability rules, conflicts detection, and SMS alerts.', impact: 'Scheduling time dropped to 20 minutes; zero missed shifts in 3 months.', color: '#22c55e', metrics: [{ label: 'Scheduling Time', value: '−96%' }, { label: 'Missed Shifts', value: '0' }], demo: '' },
    { icon: Phone, number: '18', title: 'WhatsApp CRM Integration', category: 'AI & Automation', image: '', problem: 'Sales team lost leads that came through WhatsApp with no tracking system.', solution: 'WhatsApp Business API integration with CRM, tagging, and auto-responses.', impact: '100% of WhatsApp leads now captured and followed up within 5 minutes.', color: '#25D366', metrics: [{ label: 'Lead Capture', value: '100%' }, { label: 'Follow-up Time', value: '<5min' }], demo: '' },
    { icon: BookOpen, number: '19', title: 'Student Progress Platform', category: 'Custom Web Platform', image: '', problem: 'Tutoring center tracked student progress on paper, losing data and missing interventions.', solution: 'Web platform with student profiles, session notes, progress charts, and parent reports.', impact: 'Teachers now identify at-risk students 3 weeks earlier than before.', color: '#a78bfa', metrics: [{ label: 'Early Detection', value: '+3wks' }, { label: 'Data Loss', value: '0%' }], demo: '' },
    { icon: Truck, number: '20', title: 'Supplier Portal', category: 'Custom Web Platform', image: '', problem: 'Purchasing team communicated with 50+ suppliers via fragmented email threads.', solution: 'Dedicated supplier portal with order management, invoicing, and status tracking.', impact: 'Purchase cycle time reduced by 45%, disputes down by 80%.', color: '#fb923c', metrics: [{ label: 'Cycle Time', value: '−45%' }, { label: 'Disputes', value: '−80%' }], demo: '' },
    { icon: HeartPulse, number: '21', title: 'Health Metrics Tracker', category: 'Data & Analytics', image: '', problem: 'Clinic had no way to track aggregated patient health trends over time.', solution: 'HIPAA-aware data aggregation tool with trend dashboards.', impact: 'Enabled proactive care for 200+ patients showing early risk signals.', color: '#f43f5e', metrics: [{ label: 'Patients Monitored', value: '200+' }, { label: 'Early Interventions', value: '+60%' }], demo: '' },
    { icon: Lock, number: '22', title: 'Data Security Audit Tool', category: 'Process Automation', image: '', problem: 'Company had no systematic way to audit who accessed sensitive files.', solution: 'Automated log analysis tool with anomaly detection and weekly reports.', impact: 'Identified 3 unauthorized access events in the first 30 days.', color: '#6366f1', metrics: [{ label: 'Events Detected', value: '3' }, { label: 'Audit Coverage', value: '100%' }], demo: '' },
    { icon: Wifi, number: '23', title: 'Real-Time Notification Engine', category: 'Process Automation', image: '', problem: 'Operations team used email for urgent alerts.', solution: 'WebSocket-based push notification system with priority queuing.', impact: 'Average alert response time dropped from 45 minutes to under 30 seconds.', color: '#0ea5e9', metrics: [{ label: 'Alert Latency', value: '<30s' }, { label: 'vs. Email', value: '−98%' }], demo: '' },
    { icon: PieChart, number: '24', title: 'Marketing Attribution Model', category: 'Data & Analytics', image: '', problem: 'Marketing spend was guesswork — no model to attribute revenue to campaigns.', solution: 'Multi-touch attribution model using SQL + Python + Tableau.', impact: 'Reallocated 30% of budget to highest-performing channels, 2x ROI.', color: '#ec4899', metrics: [{ label: 'ROI Improvement', value: '2x' }, { label: 'Budget Optimized', value: '30%' }], demo: '' },
    { icon: Layers, number: '25', title: 'Product Configurator Tool', category: 'Custom Web Platform', image: '', problem: 'Sales reps built custom quotes manually in Excel, taking hours per client.', solution: 'Interactive web configurator with live pricing rules and one-click PDF export.', impact: 'Quote generation time reduced from 4 hours to 8 minutes.', color: '#22c55e', metrics: [{ label: 'Quote Time', value: '−97%' }, { label: 'Error Rate', value: '−100%' }], demo: '' },
    { icon: Server, number: '26', title: 'Cloud Migration Strategy', category: 'Digital Transformation', image: '', problem: 'Legacy on-premise infrastructure was expensive, slow, and impossible to scale.', solution: 'Full cloud migration to AWS with cost-optimized architecture and CI/CD pipelines.', impact: 'Infrastructure costs reduced by 52%; deployment speed increased 8x.', color: '#f59e0b', metrics: [{ label: 'Cost Reduction', value: '52%' }, { label: 'Deploy Speed', value: '8x' }], demo: '' },
    { icon: Cog, number: '27', title: 'Report Generation Bot', category: 'Process Automation', image: '', problem: 'Analysts spent 15 hours/week pulling data from multiple sources and formatting reports.', solution: 'Python bot that auto-collects, processes, formats, and emails reports on schedule.', impact: '15 hours reclaimed weekly; zero formatting errors since launch.', color: '#8b5cf6', metrics: [{ label: 'Hours Saved', value: '15/wk' }, { label: 'Errors', value: '0' }], demo: '' },
    { icon: Globe, number: '28', title: 'Franchise Management Platform', category: 'Custom Web Platform', image: '', problem: 'Franchise owner had 8 locations with no unified performance visibility.', solution: 'Multi-location dashboard with location-level KPIs, staff management, and alerts.', impact: 'Identified underperforming location in week 1, turnaround in 30 days.', color: '#10b981', metrics: [{ label: 'Locations Managed', value: '8' }, { label: 'Visibility', value: '100%' }], demo: '' },
    { icon: Database, number: '29', title: 'Customer Data Platform', category: 'Data & Analytics', image: '', problem: 'Customer data scattered across CRM, email tool, support desk, and billing.', solution: 'Unified customer data platform with single customer view and segmentation engine.', impact: 'Personalized email campaigns led to 45% higher open rates.', color: '#3b82f6', metrics: [{ label: 'Open Rate', value: '+45%' }, { label: 'Data Sources', value: '6' }], demo: '' },
    { icon: Brain, number: '30', title: 'Demand Forecasting Model', category: 'AI & Automation', image: '', problem: 'Retailer constantly over/under-stocked, causing lost sales or excess inventory.', solution: 'ML-based demand forecasting model trained on 3 years of sales history.', impact: 'Inventory waste reduced by 38%, stockouts eliminated for top 100 SKUs.', color: '#f43f5e', metrics: [{ label: 'Waste Reduction', value: '38%' }, { label: 'Stockouts', value: '0' }], demo: '' },
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

function FeaturedBentoGrid() {
    const topProjects = projects.slice(0, 6)

    // Custom classes mapping to CSS Grid
    const gridClasses = [
        'masonry-span-8',
        'masonry-span-4',
        'masonry-span-4',
        'masonry-span-4',
        'masonry-span-4',
        'masonry-span-8',
    ]

    return (
        <div className="masonry-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginBottom: '64px'
        }}>
            {topProjects.map((p, i) => {
                const spanClass = gridClasses[i]
                const [hovered, setHovered] = useState(false)
                const { ref, inView } = useInView(0.1)

                return (
                    <div
                        key={p.number}
                        ref={ref}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className={spanClass}
                        style={{
                            position: 'relative', overflow: 'hidden', borderRadius: '24px',
                            backgroundColor: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.05)',
                            cursor: 'pointer',
                            minHeight: i === 0 || i === 5 ? '460px' : '400px',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(40px)',
                            transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                        }}
                    >
                        {/* Background Image */}
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                width: '100%', height: '100%', objectFit: 'cover',
                                transition: 'transform 0.7s ease-out',
                                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                        />

                        {/* Dark Gradient Overlay */}
                        <div
                            style={{
                                position: 'absolute', inset: 0,
                                transition: 'background 0.5s',
                                background: hovered
                                    ? `linear-gradient(180deg, rgba(5,13,26,0.2) 0%, rgba(5,13,26,0.85) 60%, rgba(5,13,26,0.98) 100%)`
                                    : `linear-gradient(180deg, rgba(5,13,26,0) 0%, rgba(5,13,26,0.4) 50%, rgba(5,13,26,0.85) 100%)`
                            }}
                        />

                        {/* Top Badge */}
                        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
                            <span
                                style={{
                                    padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                                    letterSpacing: '0.05em', backdropFilter: 'blur(12px)',
                                    background: 'rgba(5, 13, 26, 0.6)', color: p.color, border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {p.category}
                            </span>
                        </div>

                        {/* Bottom Content Area */}
                        <div
                            style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', zIndex: 10,
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                transition: 'transform 0.5s ease-out',
                                transform: hovered ? 'translateY(0)' : 'translateY(15px)',
                            }}
                        >
                            <h3 style={{
                                fontSize: 'clamp(1.5rem, 2vw, 1.875rem)', fontWeight: 800, color: '#fff',
                                marginBottom: '12px', letterSpacing: '-0.025em'
                            }}>
                                {p.title}
                            </h3>

                            <p style={{
                                color: '#cbd5e1', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.6, maxWidth: '90%',
                                opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease 0.1s'
                            }}>
                                {p.solution}
                            </p>

                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease 0.15s'
                            }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    {p.metrics.map(m => (
                                        <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: p.color }}>{m.value}</span>
                                            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 600 }}>{m.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {p.demo && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); scrollToDemo(p.demo); }}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.1)', cursor: 'pointer',
                                            border: '1px solid rgba(255,255,255,0.1)', color: p.color,
                                            backdropFilter: 'blur(12px)', transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                                    >
                                        <ArrowUpRight size={20} strokeWidth={2.5} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function StandardProjectList({ projectsList }: { projectsList: typeof projects }) {
    return (
        <div className="regular-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'
        }}>
            {projectsList.map((p, i) => {
                const { ref, inView } = useInView(0.05)
                const Icon = p.icon
                const [h, setH] = useState(false)
                return (
                    <div
                        key={p.number}
                        ref={ref}
                        onMouseEnter={() => setH(true)}
                        onMouseLeave={() => setH(false)}
                        style={{
                            backgroundColor: 'rgba(15,23,42,0.4)', borderRadius: '24px', padding: '32px',
                            border: `1px solid ${h ? 'rgba(51,65,85,1)' : 'rgba(30,41,59,1)'}`,
                            transition: 'all 0.3s',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(30px)',
                            transitionDelay: `${(i % 3) * 0.1}s`,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `${p.color}15`, color: p.color, transition: 'background 0.3s'
                            }}>
                                <Icon size={22} strokeWidth={2} />
                            </div>
                            <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}>{p.number}</span>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.025em' }}>{p.title}</h4>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', color: p.color }}>{p.category}</div>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px', height: '80px', overflow: 'hidden' }}>
                            {p.problem}
                        </p>
                        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(30,41,59,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '4px' }}>Impact</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' }}>{p.metrics[0].value} {p.metrics[0].label}</span>
                            </div>
                            <ArrowUpRight size={18} style={{ color: h ? '#cbd5e1' : '#475569', transition: 'color 0.3s' }} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default function Projects() {
    const { ref: titleRef, inView: titleVisible } = useInView(0.2)
    const [showAll, setShowAll] = useState(false)
    const regularProjects = projects.slice(6)

    return (
        <section id="projects" style={{
            paddingTop: '128px', paddingBottom: '128px', position: 'relative', backgroundColor: '#020617', overflow: 'hidden'
        }}>
            {/* Dynamic Background Glows */}
            <div style={{ position: 'absolute', top: 0, left: '25%', width: '600px', height: '600px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '800px', height: '800px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <div
                    ref={titleRef}
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '80px',
                        opacity: titleVisible ? 1 : 0,
                        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="title-row"
                >
                    <div style={{ maxWidth: '672px' }}>
                        <span style={{
                            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: '#34d399', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px'
                        }}>
                            Case Studies
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.1, margin: 0
                        }}>
                            Turning Ideas Into <br />
                            <span className="gradient-text" style={{ backgroundClip: 'text', background: 'linear-gradient(to right, #34d399, #99f6e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Masterpieces.
                            </span>
                        </h2>
                    </div>
                    <p style={{
                        color: '#94a3b8', maxWidth: '400px', fontSize: '1.125rem', lineHeight: 1.6, fontWeight: 500, margin: 0,
                        alignSelf: 'flex-end', paddingBottom: '10px'
                    }}>
                        We deliver innovative strategies that elevate your brand and drive growth. See how our bespoke systems create measurable impact.
                    </p>
                </div>

                {/* Featured CSS Grid / Masonry Layout */}
                <FeaturedBentoGrid />

                {/* Show All / Toggle */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    {!showAll ? (
                        <button
                            onClick={() => setShowAll(true)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '100px', color: '#fff', fontWeight: 700, letterSpacing: '0.025em', cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = 'rgba(255,255,255,0.1)';
                                el.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = 'rgba(255,255,255,0.05)';
                                el.style.transform = 'scale(1)';
                            }}
                        >
                            Explore 24 More Projects <ArrowUpRight size={18} />
                        </button>
                    ) : (
                        <>
                            <div style={{ marginBottom: '48px', marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: 0 }}>System Archive</h3>
                                <div style={{ height: '1px', background: '#1e293b', flex: 1, margin: '0 24px' }} />
                                <span style={{ color: '#64748b', fontWeight: 700 }}>{regularProjects.length} Projects</span>
                            </div>
                            <StandardProjectList projectsList={regularProjects} />

                            <div style={{ marginTop: '64px' }}>
                                <button
                                    onClick={() => setShowAll(false)}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '100px', color: '#fff', fontWeight: 700, letterSpacing: '0.025em', cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}
                                >
                                    Show Less
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
        .masonry-span-8 { grid-column: span 8 / span 8; }
        .masonry-span-4 { grid-column: span 4 / span 4; }
        
        @media (min-width: 768px) {
          .title-row { flex-direction: row !important; justify-content: space-between; align-items: flex-end; }
        }
        @media (max-width: 1024px) {
          .masonry-span-8, .masonry-span-4 { grid-column: span 6 / span 6; }
          .regular-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .masonry-span-8, .masonry-span-4 { grid-column: span 12 / span 12 !important; }
          .regular-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}
