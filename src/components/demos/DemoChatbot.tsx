import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'

type Message = { role: 'bot' | 'user'; text: string }
type Step = { question: string; options: { label: string; next: string }[] }

const flow: Record<string, Step> = {
    start: {
        question: "Hi! 👋 I'm your AA Digital sales assistant. What are you looking to improve in your business?",
        options: [
            { label: '📊 My data & reporting', next: 'data' },
            { label: '⚙️ Manual processes', next: 'automation' },
            { label: '🌐 My online presence', next: 'web' },
            { label: '🤖 Customer engagement', next: 'ai' },
        ],
    },
    data: {
        question: 'Great choice! Are you looking for real-time dashboards, automated reports, or both?',
        options: [{ label: 'Real-time dashboards', next: 'size' }, { label: 'Automated reports', next: 'size' }, { label: 'Both, please!', next: 'size' }],
    },
    automation: {
        question: 'Which area is slowing you down the most?',
        options: [{ label: 'Invoice & billing', next: 'size' }, { label: 'HR & onboarding', next: 'size' }, { label: 'Operations & logistics', next: 'size' }],
    },
    web: {
        question: 'What type of web platform do you need?',
        options: [{ label: 'Internal management tool', next: 'size' }, { label: 'Customer-facing portal', next: 'size' }, { label: 'E-commerce or catalog', next: 'size' }],
    },
    ai: {
        question: 'What should the AI help with?',
        options: [{ label: 'Capturing leads 24/7', next: 'size' }, { label: 'Answering FAQs', next: 'size' }, { label: 'Qualifying sales prospects', next: 'size' }],
    },
    size: {
        question: 'How large is your company?',
        options: [{ label: '1–10 employees', next: 'timeline' }, { label: '11–50 employees', next: 'timeline' }, { label: '50+ employees', next: 'timeline' }],
    },
    timeline: {
        question: 'When would you like to have the solution live?',
        options: [{ label: 'ASAP (1–4 weeks)', next: 'conversion' }, { label: 'This quarter', next: 'conversion' }, { label: 'Just exploring', next: 'conversion' }],
    },
    conversion: {
        question: "Perfect! Based on your answers, we can build a tailored solution that fits your needs.\n\n✅ You've been qualified for a **free 30-minute strategy call** with our team.\n\nShall I connect you?",
        options: [{ label: '🗓️ Book my free call', next: 'booked' }, { label: '📧 Send me info first', next: 'info' }],
    },
    booked: {
        question: "🎉 Amazing! Your strategy call is confirmed.\n\nOur team will contact you at **alonsohazed@gmail.com** within 24 hours. We're excited to help you grow! 🚀",
        options: [],
    },
    info: {
        question: '📬 No problem! Check your inbox — we\'ll send you a full capabilities deck and case studies.\n\nExpect it within a few hours. Questions? WhatsApp us at +52 656 256 6838.',
        options: [],
    },
}

export default function DemoChatbot() {
    const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: flow.start.question }])
    const [step, setStep] = useState<string>('start')
    const [isTyping, setIsTyping] = useState(false)
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

    const handleOption = (label: string, next: string) => {
        const userMsg: Message = { role: 'user', text: label }
        setMessages(prev => [...prev, userMsg])
        setIsTyping(true)
        setStep(next)
        setTimeout(() => {
            const nextStep = flow[next]
            if (nextStep) {
                setMessages(prev => [...prev, { role: 'bot', text: nextStep.question }])
            }
            setIsTyping(false)
        }, 1000)
    }

    const handleInput = () => {
        if (!input.trim()) return
        setMessages(prev => [...prev, { role: 'user', text: input }])
        setIsTyping(true)
        setInput('')
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: "Thanks for sharing that! Our team will review your message and get back to you shortly. You can also reach us on WhatsApp for a faster response! 🚀" }])
            setIsTyping(false)
        }, 1200)
    }

    const currentOptions = flow[step]?.options || []
    const isDone = step === 'booked' || step === 'info'

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', height: 420 }}>
            {/* Bot header */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: '12px 12px 0 0',
                marginBottom: 0,
            }}>
                <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Bot size={18} color="#fff" />
                </div>
                <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9' }}>AA Sales Assistant</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                        <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>Online · Typically replies instantly</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1, overflowY: 'auto', padding: '16px',
                background: 'rgba(10,15,30,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: 'none', borderBottom: 'none',
                display: 'flex', flexDirection: 'column', gap: 12,
            }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                        <div style={{
                            width: 28, height: 28, flexShrink: 0, borderRadius: '50%',
                            background: msg.role === 'bot' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(99,102,241,0.2)',
                            border: msg.role === 'user' ? '1px solid rgba(99,102,241,0.3)' : 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {msg.role === 'bot' ? <Bot size={14} color="#fff" /> : <User size={14} color="#a5b4fc" />}
                        </div>
                        <div style={{
                            maxWidth: '75%', padding: '10px 14px',
                            background: msg.role === 'bot' ? 'rgba(34,197,94,0.08)' : 'rgba(99,102,241,0.12)',
                            border: `1px solid ${msg.role === 'bot' ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.2)'}`,
                            borderRadius: msg.role === 'bot' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                            fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bot size={14} color="#fff" />
                        </div>
                        <div style={{ padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '4px 14px 14px 14px', display: 'flex', gap: 5 }}>
                            {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />)}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Options / Input */}
            <div style={{
                padding: '12px 16px',
                background: 'rgba(15,23,42,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '0 0 12px 12px',
            }}>
                {!isTyping && currentOptions.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {currentOptions.map(opt => (
                            <button
                                key={opt.label}
                                onClick={() => handleOption(opt.label, opt.next)}
                                style={{
                                    padding: '8px 14px',
                                    background: 'rgba(34,197,94,0.08)',
                                    border: '1px solid rgba(34,197,94,0.25)',
                                    borderRadius: 100, cursor: 'pointer',
                                    color: '#22c55e', fontSize: '0.8rem', fontWeight: 600,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.18)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.08)' }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
                {isDone && (
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input
                            style={{
                                flex: 1, padding: '10px 14px',
                                background: 'rgba(15,23,42,0.6)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8, color: '#f1f5f9', fontSize: '0.85rem', outline: 'none',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            placeholder="Type a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleInput()}
                        />
                        <button
                            onClick={handleInput}
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                border: 'none', borderRadius: 8, cursor: 'pointer',
                                display: 'flex', alignItems: 'center',
                            }}
                        >
                            <Send size={16} color="#fff" />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
        </div>
    )
}
