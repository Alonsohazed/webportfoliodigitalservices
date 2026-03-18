import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag } from 'lucide-react'

type DataPoint = { label: string; value: number }

const datasets: Record<string, Record<string, DataPoint[]>> = {
    Sales: {
        'Jan–Jun': [
            { label: 'Jan', value: 42 }, { label: 'Feb', value: 58 }, { label: 'Mar', value: 51 },
            { label: 'Apr', value: 74 }, { label: 'May', value: 89 }, { label: 'Jun', value: 95 },
        ],
        'Jul–Dec': [
            { label: 'Jul', value: 78 }, { label: 'Aug', value: 88 }, { label: 'Sep', value: 102 },
            { label: 'Oct', value: 91 }, { label: 'Nov', value: 130 }, { label: 'Dec', value: 145 },
        ],
    },
    Users: {
        'Jan–Jun': [
            { label: 'Jan', value: 120 }, { label: 'Feb', value: 145 }, { label: 'Mar', value: 180 },
            { label: 'Apr', value: 200 }, { label: 'May', value: 240 }, { label: 'Jun', value: 280 },
        ],
        'Jul–Dec': [
            { label: 'Jul', value: 290 }, { label: 'Aug', value: 310 }, { label: 'Sep', value: 345 },
            { label: 'Oct', value: 360 }, { label: 'Nov', value: 400 }, { label: 'Dec', value: 480 },
        ],
    },
    Revenue: {
        'Jan–Jun': [
            { label: 'Jan', value: 18 }, { label: 'Feb', value: 24 }, { label: 'Mar', value: 21 },
            { label: 'Apr', value: 31 }, { label: 'May', value: 38 }, { label: 'Jun', value: 42 },
        ],
        'Jul–Dec': [
            { label: 'Jul', value: 35 }, { label: 'Aug', value: 40 }, { label: 'Sep', value: 47 },
            { label: 'Oct', value: 44 }, { label: 'Nov', value: 58 }, { label: 'Dec', value: 71 },
        ],
    },
}

const kpis = [
    { label: 'Total Revenue', value: '$462K', change: '+18%', up: true, icon: DollarSign, color: '#22c55e' },
    { label: 'Active Users', value: '3,048', change: '+31%', up: true, icon: Users, color: '#3b82f6' },
    { label: 'Orders', value: '1,204', change: '+12%', up: true, icon: ShoppingBag, color: '#8b5cf6' },
    { label: 'Churn Rate', value: '2.3%', change: '-0.8%', up: false, icon: TrendingDown, color: '#f59e0b' },
]

export default function DemoDashboard() {
    const [metric, setMetric] = useState('Sales')
    const [period, setPeriod] = useState('Jan–Jun')
    const data = datasets[metric][period] || []
    const maxVal = Math.max(...data.map(d => d.value))

    const tabs = ['Sales', 'Users', 'Revenue']
    const periods = ['Jan–Jun', 'Jul–Dec']
    const units: Record<string, string> = { Sales: 'k units', Users: 'users', Revenue: 'k USD' }

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }} className="kpi-row">
                {kpis.map(kpi => {
                    const Icon = kpi.icon
                    return (
                        <div key={kpi.label} style={{
                            padding: '14px 16px',
                            background: 'rgba(15,23,42,0.6)',
                            border: `1px solid ${kpi.color}20`,
                            borderRadius: 12,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <Icon size={16} style={{ color: kpi.color }} />
                                <span style={{
                                    fontSize: '0.68rem', fontWeight: 700,
                                    color: kpi.up ? '#22c55e' : '#f87171',
                                    background: kpi.up ? 'rgba(34,197,94,0.1)' : 'rgba(248,113,113,0.1)',
                                    padding: '2px 7px', borderRadius: 100,
                                    display: 'flex', alignItems: 'center', gap: 3,
                                }}>
                                    {kpi.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {kpi.change}
                                </span>
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
                            <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 2 }}>{kpi.label}</div>
                        </div>
                    )
                })}
            </div>

            {/* Chart panel */}
            <div style={{
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '20px',
            }}>
                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 2 }}>{metric} Overview</h4>
                        <p style={{ fontSize: '0.75rem', color: '#475569' }}>Showing data for {period}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {/* Metric tabs */}
                        <div style={{ display: 'flex', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                            {tabs.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setMetric(t)}
                                    style={{
                                        padding: '7px 14px',
                                        background: metric === t ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                                        border: 'none', cursor: 'pointer',
                                        color: metric === t ? '#fff' : '#64748b',
                                        fontSize: '0.78rem', fontWeight: 600,
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        {/* Period tabs */}
                        <div style={{ display: 'flex', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                            {periods.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    style={{
                                        padding: '7px 12px',
                                        background: period === p ? 'rgba(34,197,94,0.15)' : 'transparent',
                                        border: 'none', cursor: 'pointer',
                                        color: period === p ? '#22c55e' : '#64748b',
                                        fontSize: '0.75rem', fontWeight: 600,
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bar chart */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 180, padding: '0 4px' }}>
                    {data.map((d, i) => {
                        const pct = (d.value / maxVal) * 100
                        const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#0ea5e9']
                        const col = colors[i % colors.length]
                        return (
                            <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>
                                    {metric === 'Revenue' ? `$${d.value}k` : d.value}
                                </span>
                                <div
                                    style={{
                                        width: '100%', height: `${pct}%`,
                                        background: `linear-gradient(180deg, ${col}, ${col}88)`,
                                        borderRadius: '6px 6px 2px 2px',
                                        transition: 'height 0.5s ease',
                                        cursor: 'pointer',
                                        minHeight: 4,
                                        boxShadow: `0 0 12px ${col}40`,
                                    }}
                                    title={`${d.label}: ${d.value} ${units[metric]}`}
                                />
                                <span style={{ fontSize: '0.65rem', color: '#475569' }}>{d.label}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
                    {[{ label: 'Current Period', color: '#22c55e' }, { label: 'Previous Period', color: '#334155' }].map(l => (
                        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} />
                            <span style={{ fontSize: '0.72rem', color: '#475569' }}>{l.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 600px) { .kpi-row { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
        </div>
    )
}
