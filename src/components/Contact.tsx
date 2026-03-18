import { useEffect, useRef, useState } from 'react'
import { Send, MessageCircle, Mail, User, FileText, CheckCircle } from 'lucide-react'

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

export default function Contact() {
    const { ref, inView } = useInView(0.1)
    const [form, setForm] = useState({ name: '', email: '', project: '' })
    const [submitted, setSubmitted] = useState(false)
    const [focused, setFocused] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (form.name && form.email && form.project) {
            setSubmitted(true)
        }
    }

    const inputStyle = (field: string) => ({
        width: '100%',
        padding: '14px 16px 14px 48px',
        background: focused === field ? 'rgba(34,197,94,0.04)' : 'rgba(15,23,42,0.5)',
        border: `1px solid ${focused === field ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 12,
        color: '#f1f5f9',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box' as const,
        boxShadow: focused === field ? '0 0 0 3px rgba(34,197,94,0.08)' : 'none',
    })

    return (
        <section id="contact" style={{
            padding: '120px 24px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(34,197,94,0.07) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
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
                        Get In Touch
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 800, color: '#f1f5f9',
                        letterSpacing: '-0.03em', marginBottom: 16,
                    }}>
                        Let's build your next <span className="gradient-text">digital solution</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                        Tell us about your project and we'll get back to you within 24 hours with a clear plan and honest quote.
                    </p>
                </div>

                <div
                    ref={ref}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.4fr',
                        gap: 40,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease',
                    }}
                    className="contact-grid"
                >
                    {/* Left: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Info card */}
                        <div style={{
                            padding: '32px',
                            background: 'rgba(15,23,42,0.5)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 20,
                        }}>
                            <div style={{ marginBottom: 24 }}>
                                <div style={{
                                    width: 52, height: 52,
                                    background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))',
                                    border: '1px solid rgba(34,197,94,0.3)',
                                    borderRadius: 14,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 16,
                                }}>
                                    <Mail size={22} style={{ color: '#22c55e' }} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                                    Email Us
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                                    alonsohazed@gmail.com
                                </p>
                            </div>

                            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '20px 0' }} />

                            {/* Process steps */}
                            {[
                                { step: '01', label: 'Submit your project brief' },
                                { step: '02', label: 'We analyze your needs' },
                                { step: '03', label: 'Receive a tailored proposal' },
                                { step: '04', label: 'We start building' },
                            ].map(item => (
                                <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                                    <span style={{
                                        fontSize: '0.72rem', fontWeight: 700, color: '#22c55e',
                                        background: 'rgba(34,197,94,0.1)',
                                        border: '1px solid rgba(34,197,94,0.2)',
                                        padding: '2px 8px', borderRadius: 100,
                                        flexShrink: 0, marginTop: 1,
                                    }}>
                                        {item.step}
                                    </span>
                                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp button */}
                        <a
                            href="https://wa.me/526562566838?text=Hola!%20Me%20gustar%C3%ADa%20platicar%20sobre%20un%20proyecto%20con%20AA%20Digital%20Services."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '20px 24px',
                                background: 'rgba(37,211,102,0.08)',
                                border: '1px solid rgba(37,211,102,0.2)',
                                borderRadius: 16,
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.15)'
                                    ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.4)'
                                    ; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.08)'
                                    ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.2)'
                                    ; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                            }}
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: '#25D366',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <MessageCircle size={22} color="#fff" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#25D366' }}>
                                    Chat on WhatsApp
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
                                    Quick response · Usually within 1 hour
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Right: Form */}
                    <div style={{
                        padding: '40px',
                        background: 'rgba(15,23,42,0.6)',
                        border: '1px solid rgba(34,197,94,0.1)',
                        borderRadius: 24,
                        backdropFilter: 'blur(20px)',
                    }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{
                                    width: 72, height: 72,
                                    background: 'rgba(34,197,94,0.15)',
                                    border: '1px solid rgba(34,197,94,0.3)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 20px',
                                }}>
                                    <CheckCircle size={32} style={{ color: '#22c55e' }} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
                                    Message Received!
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                                    Thank you, {form.name}! We'll review your project and get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>
                                    Tell us about your project
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 28 }}>
                                    Free consultation · No commitment required
                                </p>

                                {/* Name field */}
                                <div style={{ marginBottom: 18, position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1,
                                    }}>
                                        <User size={16} style={{ color: focused === 'name' ? '#22c55e' : '#475569' }} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        style={inputStyle('name')}
                                        id="contact-name"
                                    />
                                </div>

                                {/* Email field */}
                                <div style={{ marginBottom: 18, position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1,
                                    }}>
                                        <Mail size={16} style={{ color: focused === 'email' ? '#22c55e' : '#475569' }} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        style={inputStyle('email')}
                                        id="contact-email"
                                    />
                                </div>

                                {/* Project description */}
                                <div style={{ marginBottom: 24, position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: 16, top: 18, zIndex: 1,
                                    }}>
                                        <FileText size={16} style={{ color: focused === 'project' ? '#22c55e' : '#475569' }} />
                                    </div>
                                    <textarea
                                        placeholder="Describe your project, challenge, or goal. What problem are you trying to solve?"
                                        value={form.project}
                                        onChange={e => setForm({ ...form, project: e.target.value })}
                                        onFocus={() => setFocused('project')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        rows={5}
                                        style={{
                                            ...inputStyle('project'),
                                            paddingLeft: 48,
                                            resize: 'none',
                                            lineHeight: 1.6,
                                        }}
                                        id="contact-project"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px' }}
                                >
                                    <Send size={18} />
                                    Send My Project Brief
                                </button>

                                <p style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'center', marginTop: 12 }}>
                                    🔒 Your information is 100% secure and never shared.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: #475569; }
        textarea { font-family: 'Inter', sans-serif; }
      `}</style>
        </section>
    )
}
