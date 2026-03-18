import { useState } from 'react'
import { ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react'

const processes = [
    {
        area: 'Invoice Processing',
        before: { label: 'Manual entry', steps: ['Receive paper invoice', 'Type into spreadsheet', 'Email to manager', 'Wait for approval (days)', 'File physical copy'], time: '3–5 days', errorRate: '12%', cost: '$45/invoice' },
        after: { label: 'Automated', steps: ['Invoice scanned / uploaded', 'AI extracts data automatically', 'Auto-routed by amount', 'One-click digital approval', 'Auto-filed and archived'], time: '2 hours', errorRate: '0.3%', cost: '$2/invoice' },
    },
    {
        area: 'Customer Onboarding',
        before: { label: 'Manual', steps: ['Paper forms mailed or printed', 'Data entered by hand', 'ID copy via email/WhatsApp', 'Manually create account', 'Send welcome email manually'], time: '5–7 days', errorRate: '18%', cost: '$120/client' },
        after: { label: 'Digital', steps: ['Online form with validation', 'Auto data extraction (OCR)', 'ID verified instantly online', 'Account created automatically', 'Automated welcome sequence'], time: '15 minutes', errorRate: '0.5%', cost: '$8/client' },
    },
    {
        area: 'Inventory Reorder',
        before: { label: 'Manual', steps: ['Count stock by hand weekly', 'Compare to spreadsheet', 'Decide reorder threshold', 'Email supplier manually', 'Track response via inbox'], time: '1 week cycle', errorRate: '22%', cost: '$300/cycle' },
        after: { label: 'Automated', steps: ['Real-time stock monitoring', 'Auto low-stock detection', 'Threshold rules pre-set once', 'Auto-send PO to supplier', 'Status tracked in dashboard'], time: 'Real-time', errorRate: '0%', cost: '$15/cycle' },
    },
]

export default function DemoTransformation() {
    const [processIdx, setProcessIdx] = useState(0)
    const [mode, setMode] = useState<'before' | 'after'>('before')
    const proc = processes[processIdx]
    const data = mode === 'before' ? proc.before : proc.after

    const savings = {
        time: [{ before: proc.before.time, after: proc.after.time }],
        error: [{ before: proc.before.errorRate, after: proc.after.errorRate }],
        cost: [{ before: proc.before.cost, after: proc.after.cost }],
    }

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Process selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {processes.map((p, i) => (
                    <button
                        key={p.area}
                        onClick={() => { setProcessIdx(i); setMode('before') }}
                        style={{
                            padding: '8px 16px',
                            background: i === processIdx ? 'rgba(34,197,94,0.12)' : 'rgba(15,23,42,0.5)',
                            border: `1px solid ${i === processIdx ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.08)'}`,
                            borderRadius: 100, cursor: 'pointer',
                            color: i === processIdx ? '#22c55e' : '#64748b',
                            fontSize: '0.8rem', fontWeight: 600,
                            transition: 'all 0.2s',
                        }}
                    >
                        {p.area}
                    </button>
                ))}
            </div>

            {/* Toggle */}
            <div style={{ display: 'flex', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, marginBottom: 20, width: 'fit-content' }}>
                {(['before', 'after'] as const).map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{
                            padding: '10px 28px',
                            background: mode === m ? (m === 'before' ? 'rgba(239,68,68,0.15)' : 'linear-gradient(135deg, #22c55e, #16a34a)') : 'transparent',
                            border: 'none', borderRadius: 8, cursor: 'pointer',
                            color: mode === m ? (m === 'before' ? '#f87171' : '#fff') : '#475569',
                            fontSize: '0.85rem', fontWeight: 700,
                            transition: 'all 0.3s',
                        }}
                    >
                        {m === 'before' ? '❌ Before (Manual)' : '✅ After (Digital)'}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="transform-grid">
                {/* Steps */}
                <div style={{
                    padding: '20px',
                    background: mode === 'before' ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.05)',
                    border: `1px solid ${mode === 'before' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
                    borderRadius: 14, transition: 'all 0.4s ease',
                }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 16 }}>
                        {proc.area} — {data.label}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {data.steps.map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                                    background: mode === 'after' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.12)',
                                    border: `1px solid ${mode === 'after' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.25)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.65rem', fontWeight: 800,
                                    color: mode === 'after' ? '#22c55e' : '#f87171',
                                }}>
                                    {i + 1}
                                </div>
                                <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, paddingTop: 2 }}>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics comparison */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { label: 'Processing Time', before: proc.before.time, after: proc.after.time, icon: Clock, goodColor: '#3b82f6' },
                        { label: 'Error Rate', before: proc.before.errorRate, after: proc.after.errorRate, icon: XCircle, goodColor: '#22c55e' },
                        { label: 'Cost per Op.', before: proc.before.cost, after: proc.after.cost, icon: CheckCircle, goodColor: '#22c55e' },
                    ].map(metric => {
                        const Icon = metric.icon
                        return (
                            <div key={metric.label} style={{
                                padding: '16px',
                                background: 'rgba(15,23,42,0.5)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 12,
                            }}>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                                    <Icon size={14} style={{ color: '#64748b' }} />
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{metric.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8 }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f87171' }}>{metric.before}</div>
                                        <div style={{ fontSize: '0.62rem', color: '#475569', marginTop: 2 }}>Before</div>
                                    </div>
                                    <ArrowRight size={16} style={{ color: '#334155', flexShrink: 0 }} />
                                    <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 8 }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: metric.goodColor }}>{metric.after}</div>
                                        <div style={{ fontSize: '0.62rem', color: '#475569', marginTop: 2 }}>After</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style>{`
        @media (max-width: 600px) { .transform-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    )
}
