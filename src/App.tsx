import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, 
  Cpu, 
  BrainCircuit, 
  Wrench, 
  Crown, 
  Bolt, 
  Wifi, 
  Layers, 
  Trash2, 
  Send, 
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Components ---

const GlassPanel = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("glass rounded-3xl overflow-hidden relative", className)}>
    {children}
  </div>
)

const MetricCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <GlassPanel className="p-5 flex flex-col gap-1 border-white/5">
    <div className="flex justify-between items-center mb-2">
      <Icon className={cn("w-5 h-5", color)} />
      <span className="text-[10px] font-mono opacity-50 tracking-widest">{title}</span>
    </div>
    <div className="text-2xl font-mono font-bold">{value}</div>
    <div className={cn("text-[9px] font-bold opacity-80", color)}>{subtitle}</div>
  </GlassPanel>
)

const HealthGauge = ({ score, isBoosting, progress }: { score: number, isBoosting: boolean, progress: number }) => {
  const displayScore = isBoosting ? Math.floor(progress * 100) : score
  
  return (
    <div className="relative flex items-center justify-center p-8">
      {/* Glow */}
      <div className="absolute w-64 h-64 bg-neonBlue/10 rounded-full blur-3xl" />
      
      <svg className="w-64 h-64 transform -rotate-90">
        <circle
          cx="128"
          cy="128"
          r="110"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx="128"
          cy="128"
          r="110"
          stroke="url(#gradient)"
          strokeWidth="12"
          strokeDasharray={2 * Math.PI * 110}
          initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
          animate={{ 
            strokeDashoffset: (2 * Math.PI * 110) * (1 - (isBoosting ? progress : score / 1000)) 
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f9cf5" />
            <stop offset="100%" stopColor="#9447f0" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute flex flex-col items-center">
        <motion.span 
          key={displayScore}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-mono font-black"
        >
          {displayScore}{isBoosting ? '%' : ''}
        </motion.span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-neonBlue opacity-80 mt-2 uppercase">
          {isBoosting ? 'Optimizing Architecture' : 'System Health Integrity'}
        </span>
      </div>
    </div>
  )
}

// --- Main App ---

export default function App() {
  const [tab, setTab] = useState(0)
  const [score, setScore] = useState(742)
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostProgress, setBoostProgress] = useState(0)
  const [boostStatus, setBoostStatus] = useState('SYSTEM IDLE')
  
  const [messages, setMessages] = useState([
    { text: "Ω: NEURAL LINK ESTABLISHED. READY TO OPTIMIZE.", isUser: false }
  ])
  const [input, setInput] = useState('')

  const handleBoost = () => {
    if (isBoosting) return
    setIsBoosting(true)
    let p = 0
    const interval = setInterval(() => {
      p += 0.02
      setBoostProgress(p)
      
      if (p < 0.3) setBoostStatus('SCANNING CORE...')
      else if (p < 0.6) setBoostStatus('FLUSHING CACHE...')
      else if (p < 0.9) setBoostStatus('TUNING NETWORK...')
      else setBoostStatus('VERIFYING...')
      
      if (p >= 1) {
        clearInterval(interval)
        setTimeout(() => {
          setIsBoosting(false)
          setScore(prev => Math.min(1000, prev + 45))
          setBoostStatus('OPTIMIZED')
        }, 1000)
      }
    }, 50)
  }

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { text: input, isUser: true }]
    setMessages(newMessages)
    setInput('')
    
    setTimeout(() => {
      const q = input.toLowerCase()
      let reply = "ADVISING PEAK PERFORMANCE PROTOCOLS. SYSTEM STABLE."
      if (q.includes('slow')) reply = "RECLAIMING 2.4GB MEMORY. RUN BOOST SCAN."
      if (q.includes('battery')) reply = "DRAIN AT 12%. DISABLE BACKGROUND REFRESH."
      
      setMessages(prev => [...prev, { text: `Ω: ${reply}`, isUser: false }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-deepOnyx text-white p-4 pb-24 font-sans select-none overflow-x-hidden">
      {/* Particle Background Placeholder */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-cyberPurple/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-neonBlue/20 blur-[120px]" />
      </div>

      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-black font-mono tracking-tight glow-text">NEURAL BOOST X</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-neonBlue tracking-wide opacity-80">SAFE MODE ACTIVE</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center border-green-500/20">
          <ShieldCheck className="w-6 h-6 text-green-500" />
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.section 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <HealthGauge score={score} isBoosting={isBoosting} progress={boostProgress} />
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="ENERGY" value="68%" subtitle="OPTIMAL / 34°C" icon={Bolt} color="text-orange-500" />
                <MetricCard title="STABILITY" value="98%" subtitle="SIGNAL PEAK" icon={Wifi} color="text-neonBlue" />
                <MetricCard title="ENGINE" value="12" subtitle="BG PROCESSES" icon={Layers} color="text-cyberPurple" />
                <MetricCard title="STORAGE" value="0.8GB" subtitle="TRASH RECLAIM" icon={Trash2} color="text-pink-500" />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBoost}
                disabled={isBoosting}
                className="w-full mt-2 h-16 glass rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden group border-white/10"
              >
                {isBoosting && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${boostProgress * 100}%` }}
                    className="absolute inset-0 bg-cyberPurple/20"
                  />
                )}
                <Zap className={cn("w-6 h-6 transition-all", isBoosting ? "text-cyberPurple animate-pulse" : "text-white")} />
                <span className="font-mono font-bold tracking-widest text-sm uppercase">
                  {isBoosting ? boostStatus : 'INITIALIZE NEURAL BOOST'}
                </span>
                {!isBoosting && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </motion.button>

              <div className="flex gap-2 p-3 glass rounded-xl border-white/5 opacity-50">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[9px] font-medium leading-relaxed">
                  NEURAL BOOST X PROVIDES SIMULATED OPTIMIZATION BASED ON SYSTEM ANALYTICS. NO ACTUAL HARDWARE MODIFICATIONS ARE PERFORMED.
                </p>
              </div>
            </motion.section>
          )}

          {tab === 1 && (
            <motion.section 
              key="ai"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-[65vh]"
            >
              <GlassPanel className="flex-1 flex flex-col h-full border-neonBlue/10">
                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                  <BrainCircuit className="text-neonBlue w-5 h-5" />
                  <span className="font-mono text-sm font-bold tracking-widest">Ω ASSISTANT</span>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm scrollbar-hide">
                  {messages.map((m, i) => (
                    <div key={i} className={cn("flex", m.isUser ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[80%] p-3 rounded-2xl",
                        m.isUser ? "bg-cyberPurple/20 text-white" : "bg-neonBlue/10 text-neonBlue"
                      )}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-black/20 flex gap-2 items-center">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Query System..."
                    className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 outline-none focus:bg-white/10 transition-all font-mono text-sm border border-white/5"
                  />
                  <button onClick={sendMessage} className="p-2.5 bg-cyberPurple rounded-xl">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </GlassPanel>
            </motion.section>
          )}

          {tab === 3 && (
            <motion.section 
              key="rank"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col gap-6"
            >
              <GlassPanel className="p-6 border-cyberPurple/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyberPurple/20 rounded-2xl">
                    <Crown className="w-8 h-8 text-cyberPurple" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black font-mono">RANK: ELITE</h2>
                    <p className="text-[10px] font-bold text-cyberPurple opacity-80 tracking-widest uppercase">Integrity Score Peak</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold font-mono opacity-50">
                    <span>OVERALL PROGRESS</span>
                    <span>{score}/1000</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(score/1000)*100}%` }}
                      className="h-full bg-cyberPurple shadow-[0_0_15px_rgba(148,71,240,0.5)]"
                    />
                  </div>
                </div>
              </GlassPanel>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono opacity-50 px-2 tracking-widest">DAILY MISSIONS</h3>
                {[
                  { title: "Perform Core Boost", points: 50, done: true, icon: Zap },
                  { title: "Optimize Battery", points: 30, done: false, icon: Bolt },
                  { title: "Flush App Cache", points: 40, done: false, icon: Trash2 },
                ].map((m, i) => (
                  <GlassPanel key={i} className={cn("p-4 border-white/5 transition-opacity", m.done && "opacity-50")}>
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2 rounded-lg", m.done ? "bg-green-500/10" : "bg-cyberPurple/10")}>
                        <m.icon className={cn("w-5 h-5", m.done ? "text-green-500" : "text-cyberPurple")} />
                      </div>
                      <div className="flex-1">
                        <div className={cn("text-xs font-bold font-mono", m.done && "line-through")}>{m.title}</div>
                        <div className="text-[9px] font-bold opacity-40">{m.points} DATA POINTS</div>
                      </div>
                      {m.done ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <button className="text-[9px] font-black font-mono border border-cyberPurple/50 px-3 py-1.5 rounded-lg text-cyberPurple uppercase">Run</button>
                      )}
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </motion.section>
          )}

          {tab === 2 && (
             <motion.section 
              key="tools"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
               <GlassPanel className="p-6 h-[50vh] flex flex-col items-center justify-center gap-6 border-white/5">
                 <Wrench className="w-16 h-16 text-neonBlue opacity-20" />
                 <div className="text-center">
                   <h2 className="text-lg font-black font-mono">TOOLS OFFLINE</h2>
                   <p className="text-xs font-bold opacity-40 mt-2">REQUIRES DEVICE ROOT ACCESS TO PROCEED</p>
                 </div>
                 <button className="mt-4 px-8 py-3 bg-neonBlue/10 border border-neonBlue/30 rounded-2xl text-[10px] font-black font-mono tracking-widest uppercase">
                   Simulate Root Request
                 </button>
               </GlassPanel>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass rounded-3xl h-18 p-2 flex items-center justify-around border-white/10 shadow-2xl z-50">
        {[
          { icon: Cpu, label: "BOOST", index: 0 },
          { icon: BrainCircuit, label: "AI", index: 1 },
          { icon: Wrench, label: "TOOLS", index: 2 },
          { icon: Crown, label: "RANK", index: 3 }
        ].map((t) => (
          <button 
            key={t.index}
            onClick={() => setTab(t.index)}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-1 transition-all",
              tab === t.index ? "text-neonBlue" : "text-white/40"
            )}
          >
            <t.icon className={cn("w-6 h-6", tab === t.index && "drop-shadow-[0_0_8px_rgba(31,156,245,0.6)]")} />
            <span className="text-[7px] font-black font-mono tracking-tighter">{t.label}</span>
            {tab === t.index && (
              <motion.div layoutId="nav" className="absolute -top-1 w-1 h-1 bg-neonBlue rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
