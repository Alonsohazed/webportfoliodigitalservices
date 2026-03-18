import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react'

const tracks = [
    { title: 'Business Growth Podcast', artist: 'AA Digital · Episode 12', duration: 284, genre: 'Podcast' },
    { title: 'Tech Insights Weekly', artist: 'AA Digital · Episode 7', duration: 1842, genre: 'Live Stream' },
    { title: 'Automation Masterclass', artist: 'AA Digital · Course 3', duration: 3600, genre: 'Course' },
]

export default function DemoStreaming() {
    const [trackIdx, setTrackIdx] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(75)
    const [listeners, setListeners] = useState(142)
    const intervalRef = useRef<number | null>(null)
    const track = tracks[trackIdx]

    useEffect(() => {
        if (playing) {
            intervalRef.current = window.setInterval(() => {
                setProgress(p => {
                    if (p >= track.duration) { setPlaying(false); return 0 }
                    return p + 1
                })
                setListeners(l => l + Math.floor(Math.random() * 3) - 1)
            }, 500)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [playing, track.duration])

    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
    const pct = (progress / track.duration) * 100

    const isLive = track.genre === 'Live Stream'

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Track list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {tracks.map((t, i) => (
                    <div
                        key={t.title}
                        onClick={() => { setTrackIdx(i); setProgress(0); setPlaying(false) }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '12px 16px',
                            background: i === trackIdx ? 'rgba(34,197,94,0.08)' : 'rgba(15,23,42,0.4)',
                            border: `1px solid ${i === trackIdx ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.05)'}`,
                            borderRadius: 12, cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{
                            width: 40, height: 40, borderRadius: 10,
                            background: i === trackIdx ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                            {i === trackIdx && playing
                                ? <span style={{ fontSize: '1.1rem' }}>🎵</span>
                                : <Radio size={18} style={{ color: i === trackIdx ? '#fff' : '#64748b' }} />
                            }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: i === trackIdx ? '#f1f5f9' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {t.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#475569' }}>{t.artist}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                            <span style={{
                                fontSize: '0.65rem', fontWeight: 700,
                                padding: '2px 8px', borderRadius: 100,
                                background: t.genre === 'Live Stream' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.1)',
                                color: t.genre === 'Live Stream' ? '#f87171' : '#22c55e',
                                border: `1px solid ${t.genre === 'Live Stream' ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.2)'}`,
                            }}>
                                {t.genre === 'Live Stream' ? '● LIVE' : t.genre}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#475569' }}>{fmt(t.duration)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Player */}
            <div style={{
                padding: '24px',
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: 20,
            }}>
                {/* Now playing */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                        background: 'linear-gradient(135deg, #22c55e22, #16a34a44)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.8rem',
                        animation: playing ? 'spin 4s linear infinite' : 'none',
                    }}>
                        🎧
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {track.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{track.artist}</div>
                    </div>
                    {/* Live indicators */}
                    {isLive && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 100 }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171', animation: 'pulseRed 1.5s infinite' }} />
                            <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 700 }}>{listeners} listening</span>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                {!isLive && (
                    <div style={{ marginBottom: 16 }}>
                        <div
                            onClick={(e) => {
                                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                                const ratio = (e.clientX - rect.left) / rect.width
                                setProgress(Math.floor(ratio * track.duration))
                            }}
                            style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, cursor: 'pointer', position: 'relative' }}
                        >
                            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: 3, transition: 'width 0.5s linear', position: 'relative' }}>
                                <span style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: '#22c55e', border: '2px solid #fff' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                            <span style={{ fontSize: '0.7rem', color: '#475569' }}>{fmt(progress)}</span>
                            <span style={{ fontSize: '0.7rem', color: '#475569' }}>{fmt(track.duration)}</span>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button onClick={() => setMuted(!muted)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}>
                            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input
                            type="range" min={0} max={100} value={muted ? 0 : volume}
                            onChange={e => { setVolume(+e.target.value); setMuted(false) }}
                            style={{ width: 80, accentColor: '#22c55e', cursor: 'pointer' }}
                        />
                    </div>

                    <button
                        onClick={() => setPlaying(!playing)}
                        style={{
                            width: 52, height: 52, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', boxShadow: playing ? '0 0 24px rgba(34,197,94,0.5)' : 'none',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                    >
                        {playing ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" style={{ marginLeft: 2 }} />}
                    </button>

                    <div style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'right' }}>
                        {playing ? <span style={{ color: '#22c55e' }}>● Streaming</span> : 'Ready'}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseRed { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
        </div>
    )
}
