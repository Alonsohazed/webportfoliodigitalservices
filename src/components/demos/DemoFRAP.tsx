import { useState } from 'react'
import { User, Phone, MapPin, AlertTriangle, Heart, Activity, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react'

type Patient = { id: string; name: string; age: number; gender: string; location: string; chiefComplaint: string; priority: 'Critical' | 'High' | 'Moderate' | 'Low'; status: 'En traslado' | 'En escena' | 'Entregado'; hr: number; spo2: number; bp: string; rr: number }

const mockPatients: Patient[] = [
    { id: 'F-2401', name: 'Carlos Ramírez', age: 54, gender: 'M', location: 'Av. Tecnológico 234', chiefComplaint: 'Dolor torácico opresivo, irradiación al brazo', priority: 'Critical', status: 'En traslado', hr: 112, spo2: 91, bp: '160/100', rr: 24 },
    { id: 'F-2402', name: 'María González', age: 32, gender: 'F', location: 'Calle Juárez 18', chiefComplaint: 'TCE por accidente vehicular, pérdida de conciencia', priority: 'High', status: 'En escena', hr: 88, spo2: 96, bp: '130/85', rr: 18 },
    { id: 'F-2403', name: 'José Herrera', age: 67, gender: 'M', location: 'Col. Centro 412', chiefComplaint: 'Dificultad respiratoria, antecedente EPOC', priority: 'Moderate', status: 'Entregado', hr: 76, spo2: 93, bp: '145/90', rr: 20 },
]

const priorityConfig = {
    Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', label: '🔴 Crítico' },
    High: { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.25)', label: '🟠 Alto' },
    Moderate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', label: '🟡 Moderado' },
    Low: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', label: '🟢 Leve' },
}

const statusConfig = {
    'En traslado': { color: '#f97316' },
    'En escena': { color: '#ef4444' },
    'Entregado': { color: '#22c55e' },
}

export default function DemoFRAP() {
    const [selected, setSelected] = useState<Patient | null>(mockPatients[0])
    const [view, setView] = useState<'list' | 'record'>('list')
    const [reported, setReported] = useState(false)

    const pc = selected ? priorityConfig[selected.priority] : null

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: view === 'list' ? 14 : '14px 14px 0 0',
                marginBottom: view === 'list' ? 12 : 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #ef4444, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={16} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f1f5f9' }}>FRAP Digital · Despacho</div>
                        <div style={{ fontSize: '0.68rem', color: '#475569' }}>Sistema de Atención Prehospitalaria</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {['list', 'record'].map(v => (
                        <button key={v} onClick={() => setView(v as 'list' | 'record')} style={{
                            padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                            background: view === v ? 'rgba(34,197,94,0.15)' : 'transparent',
                            color: view === v ? '#22c55e' : '#475569', fontSize: '0.75rem', fontWeight: 600,
                            border: `1px solid ${view === v ? 'rgba(34,197,94,0.3)' : 'transparent'}`,
                            transition: 'all 0.2s',
                        }}>
                            {v === 'list' ? '📋 Despacho' : '📝 Ficha'}
                        </button>
                    ))}
                </div>
            </div>

            {/* DESPACHO VIEW */}
            {view === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Active shift badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 10 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulseR 1.5s infinite' }} />
                        <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600 }}>Turno activo · 3 pacientes en atención · {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    {mockPatients.map(p => {
                        const cfg = priorityConfig[p.priority]
                        const sc = statusConfig[p.status]
                        return (
                            <div key={p.id}
                                onClick={() => { setSelected(p); setView('record'); setReported(false) }}
                                style={{
                                    display: 'grid', gridTemplateColumns: '1fr auto',
                                    gap: 12, padding: '14px 16px',
                                    background: selected?.id === p.id ? 'rgba(34,197,94,0.05)' : 'rgba(15,23,42,0.4)',
                                    border: `1px solid ${selected?.id === p.id ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}`,
                                    borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { if (selected?.id !== p.id) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
                                onMouseLeave={e => { if (selected?.id !== p.id) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)' }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569' }}>{p.id}</span>
                                        <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 100, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontWeight: 700 }}>{cfg.label}</span>
                                        <span style={{ fontSize: '0.68rem', color: sc.color, fontWeight: 600 }}>· {p.status}</span>
                                    </div>
                                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{p.name} · {p.age}a · {p.gender}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                                        <MapPin size={11} style={{ color: '#475569' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.location}</span>
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>{p.chiefComplaint}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '6px 10px' }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: p.hr > 100 ? '#f87171' : '#22c55e' }}>{p.hr}</div>
                                        <div style={{ fontSize: '0.58rem', color: '#475569' }}>FC bpm</div>
                                    </div>
                                    <div style={{ textAlign: 'center', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '6px 10px' }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: p.spo2 < 94 ? '#f87171' : '#3b82f6' }}>{p.spo2}%</div>
                                        <div style={{ fontSize: '0.58rem', color: '#475569' }}>SpO₂</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* FICHA VIEW */}
            {view === 'record' && selected && pc && (
                <div style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0 0 14px 14px' }}>
                    {/* Patient header */}
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569' }}>FOLIO {selected.id}</span>
                                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 100, background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, fontWeight: 700 }}>{pc.label}</span>
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 2 }}>{selected.name}</h4>
                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{selected.age} años · Sexo: {selected.gender === 'M' ? 'Masculino' : 'Femenino'}</div>
                        </div>
                        <button
                            onClick={() => setView('list')}
                            style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, cursor: 'pointer', color: '#64748b', fontSize: '0.78rem' }}
                        >
                            ← Volver
                        </button>
                    </div>

                    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Chief complaint */}
                        <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10 }}>
                            <div style={{ fontSize: '0.65rem', color: '#f87171', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Motivo de llamada</div>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>{selected.chiefComplaint}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
                                <MapPin size={12} style={{ color: '#475569' }} />
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{selected.location}</span>
                            </div>
                        </div>

                        {/* Vital signs */}
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Activity size={12} /> Signos Vitales
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                                {[
                                    { label: 'F.C.', value: `${selected.hr}`, unit: 'bpm', warn: selected.hr > 100 || selected.hr < 60 },
                                    { label: 'SpO₂', value: `${selected.spo2}`, unit: '%', warn: selected.spo2 < 94 },
                                    { label: 'T.A.', value: selected.bp, unit: 'mmHg', warn: false },
                                    { label: 'F.R.', value: `${selected.rr}`, unit: 'rpm', warn: selected.rr > 20 },
                                ].map(vs => (
                                    <div key={vs.label} style={{ padding: '10px', background: vs.warn ? 'rgba(239,68,68,0.08)' : 'rgba(15,23,42,0.5)', border: `1px solid ${vs.warn ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: vs.warn ? '#f87171' : '#22c55e' }}>{vs.value}</div>
                                        <div style={{ fontSize: '0.6rem', color: '#475569', marginTop: 1 }}>{vs.unit}</div>
                                        <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: 2, fontWeight: 600 }}>{vs.label}</div>
                                        {vs.warn && <AlertTriangle size={10} style={{ color: '#f87171', marginTop: 3 }} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Procedure checklist */}
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <CheckCircle size={12} /> Procedimientos Realizados
                            </div>
                            {['Valoración primaria (ABCDE)', 'Acceso IV catéter 18G ant. cubital', 'O₂ suplementario 4 L/min mascarilla', 'Monitorización continua (SpO₂, ECG)'].map(proc => (
                                <div key={proc} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 6, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 8 }}>
                                    <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{proc}</span>
                                </div>
                            ))}
                        </div>

                        {/* Generate report button */}
                        {!reported ? (
                            <button
                                onClick={() => setReported(true)}
                                style={{
                                    width: '100%', padding: '13px',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    border: 'none', borderRadius: 10, cursor: 'pointer',
                                    color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(34,197,94,0.35)'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                            >
                                <FileText size={16} /> Generar Reporte PDF de Traslado
                            </button>
                        ) : (
                            <div style={{ padding: '14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <CheckCircle size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#22c55e' }}>Reporte generado exitosamente</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>Ficha_Traslado_{selected.id}.pdf · Firmado digitalmente · {new Date().toLocaleString('es-MX')}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`@keyframes pulseR { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>
    )
}
