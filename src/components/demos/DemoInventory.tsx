import { useState } from 'react'
import { Plus, AlertTriangle, Package, TrendingDown, Check } from 'lucide-react'

type Product = { id: number; name: string; stock: number; min: number; category: string }

const initialProducts: Product[] = [
    { id: 1, name: 'Laptop Pro 15"', stock: 12, min: 5, category: 'Electronics' },
    { id: 2, name: 'USB-C Hub', stock: 3, min: 5, category: 'Accessories' },
    { id: 3, name: 'Wireless Mouse', stock: 27, min: 10, category: 'Accessories' },
    { id: 4, name: 'Monitor 27"', stock: 4, min: 5, category: 'Electronics' },
    { id: 5, name: 'Mechanical Keyboard', stock: 8, min: 5, category: 'Accessories' },
]

export default function DemoInventory() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [newName, setNewName] = useState('')
    const [newStock, setNewStock] = useState('')
    const [toast, setToast] = useState<string | null>(null)

    const showToast = (msg: string) => {
        setToast(msg)
        setTimeout(() => setToast(null), 2500)
    }

    const updateStock = (id: number, delta: number) => {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)
        )
    }

    const addProduct = () => {
        if (!newName.trim() || !newStock) return
        const newP: Product = { id: Date.now(), name: newName.trim(), stock: parseInt(newStock), min: 5, category: 'New' }
        setProducts(prev => [...prev, newP])
        setNewName(''); setNewStock('')
        showToast(`✅ "${newP.name}" added to inventory`)
    }

    const lowStock = products.filter(p => p.stock <= p.min)

    const inputStyle = {
        flex: 1, padding: '10px 14px',
        background: 'rgba(15,23,42,0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, color: '#f1f5f9', fontSize: '0.85rem',
        outline: 'none', fontFamily: 'Inter, sans-serif',
    }

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: 32, right: 32,
                    padding: '12px 20px',
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.4)',
                    borderRadius: 10, color: '#22c55e',
                    fontSize: '0.875rem', fontWeight: 600,
                    zIndex: 99999,
                    animation: 'slideIn 0.3s ease',
                }}>
                    {toast}
                </div>
            )}

            {/* Alert bar */}
            {lowStock.length > 0 && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: 10, marginBottom: 20,
                }}>
                    <AlertTriangle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: 600 }}>
                        Low Stock Alert: <strong>{lowStock.map(p => p.name).join(', ')}</strong> need restock
                    </span>
                </div>
            )}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Products', value: products.length, icon: Package, color: '#22c55e' },
                    { label: 'Total Units', value: products.reduce((a, p) => a + p.stock, 0), icon: Check, color: '#3b82f6' },
                    { label: 'Low Stock', value: lowStock.length, icon: TrendingDown, color: '#f87171' },
                ].map(stat => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} style={{
                            padding: '14px 16px',
                            background: 'rgba(15,23,42,0.5)',
                            border: `1px solid ${stat.color}20`,
                            borderRadius: 12, textAlign: 'center',
                        }}>
                            <Icon size={18} style={{ color: stat.color, margin: '0 auto 6px' }} />
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: 2 }}>{stat.label}</div>
                        </div>
                    )
                })}
            </div>

            {/* Add product */}
            <div style={{
                display: 'flex', gap: 10, marginBottom: 20,
                padding: '16px', background: 'rgba(15,23,42,0.4)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
            }}>
                <input
                    style={inputStyle as React.CSSProperties}
                    placeholder="Product name..."
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addProduct()}
                />
                <input
                    style={{ ...inputStyle, width: 90, flex: 'unset' } as React.CSSProperties}
                    type="number" placeholder="Qty" min="0"
                    value={newStock}
                    onChange={e => setNewStock(e.target.value)}
                />
                <button
                    onClick={addProduct}
                    style={{
                        padding: '10px 18px',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        border: 'none', borderRadius: 8, cursor: 'pointer',
                        color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                        display: 'flex', alignItems: 'center', gap: 6,
                        transition: 'all 0.2s',
                    }}
                >
                    <Plus size={16} /> Add
                </button>
            </div>

            {/* Product table */}
            <div style={{
                background: 'rgba(15,23,42,0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, overflow: 'hidden',
            }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 80px 90px 100px',
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.7rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                    <span>Product</span><span>Category</span><span style={{ textAlign: 'center' }}>Stock</span><span style={{ textAlign: 'center' }}>Actions</span>
                </div>
                {products.map(p => {
                    const isLow = p.stock <= p.min
                    return (
                        <div key={p.id} style={{
                            display: 'grid', gridTemplateColumns: '1fr 80px 90px 100px',
                            padding: '12px 16px', alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            background: isLow ? 'rgba(239,68,68,0.04)' : 'transparent',
                            transition: 'background 0.2s',
                        }}>
                            <div>
                                <span style={{ fontSize: '0.875rem', color: '#f1f5f9', fontWeight: 500 }}>{p.name}</span>
                                {isLow && <span style={{ marginLeft: 8, fontSize: '0.68rem', color: '#f87171', background: 'rgba(239,68,68,0.15)', padding: '2px 7px', borderRadius: 100 }}>Low</span>}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.category}</span>
                            <span style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 700, color: isLow ? '#f87171' : '#22c55e' }}>{p.stock}</span>
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                {[-1, 1, 5].map(delta => (
                                    <button
                                        key={delta}
                                        onClick={() => { updateStock(p.id, delta); delta > 0 && showToast(`+${delta} added to ${p.name}`) }}
                                        style={{
                                            width: 28, height: 28,
                                            background: delta > 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                                            border: `1px solid ${delta > 0 ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                            borderRadius: 6, cursor: 'pointer',
                                            color: delta > 0 ? '#22c55e' : '#f87171',
                                            fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.15s',
                                        }}
                                        title={`${delta > 0 ? '+' : ''}${delta}`}
                                    >
                                        {delta > 0 ? `+${delta}` : delta}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
            <style>{`@keyframes slideIn { from { transform:translateY(10px); opacity:0 } to { transform:translateY(0); opacity:1 } }`}</style>
        </div>
    )
}
