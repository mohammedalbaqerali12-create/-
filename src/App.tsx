import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, 
  BrainCircuit, 
  Bolt, 
  Wifi, 
  Layers, 
  Trash2, 
  Info,
  Zap,
  Activity,
  HardDrive,
  Rocket,
  ShieldCheck,
  Fingerprint,
  Bell,
  Settings
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Types ---
type TabType = 'boost' | 'battery' | 'files' | 'network' | 'shield' | 'ai'

// --- Shared Components ---

const GlassCard = ({ children, className, glowColor, isUltraMode }: { children: React.ReactNode, className?: string, glowColor?: string, isUltraMode?: boolean }) => (
  <div className={cn(
    "glass-card rounded-[2rem] p-5 relative overflow-hidden group transition-all duration-500",
    !isUltraMode && glowColor === 'blue' && "neon-border-blue",
    !isUltraMode && glowColor === 'green' && "neon-border-green",
    !isUltraMode && glowColor === 'purple' && "neon-border-purple",
    !isUltraMode && glowColor === 'gold' && "border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    isUltraMode && "border-neonGreen/30 bg-black/80",
    className
  )}>
    <div className={cn("absolute inset-0 pointer-events-none group-hover:bg-white/[0.05] transition-colors", isUltraMode ? "bg-neonGreen/[0.02]" : "bg-white/[0.02]")} />
    {children}
  </div>
)

const StatusBadge = ({ active, label, isUltraMode }: { active: boolean, label: string, isUltraMode?: boolean }) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold font-orbitron tracking-widest transition-all",
    active 
      ? (isUltraMode ? "bg-neonGreen/10 text-neonGreen border border-neonGreen/40" : "bg-neonGreen/10 text-neonGreen border border-neonGreen/20") 
      : "bg-red-500/10 text-red-500 border border-red-500/20"
  )}>
    <div className={cn("w-1.5 h-1.5 rounded-full", active ? (isUltraMode ? "bg-neonGreen shadow-[0_0_8px_#39ff14]" : "bg-neonGreen shadow-[0_0_8px_#39ff14] animate-pulse") : "bg-red-500")} />
    {label}
  </div>
)

const MetricDisk = ({ progress, label, value, color, isUltraMode }: { progress: number, label: string, value: string, color: string, isUltraMode?: boolean }) => {
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className={isUltraMode ? "text-neonGreen/5" : "text-white/5"} />
          <motion.circle 
            cx="40" cy="40" r={radius} stroke={isUltraMode ? "#39ff14" : color} strokeWidth="4" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className={cn("absolute font-orbitron text-xs font-bold", isUltraMode && "text-neonGreen")}>{value}</span>
      </div>
      <span className={cn("text-[10px] font-bold opacity-50 font-cairo text-center", isUltraMode && "text-neonGreen/50")}>{label}</span>
    </div>
  )
}

// --- UI Sections ---

const OptimizationSection = ({ onBoost, isBoosting, progress, status, metrics, isUltraMode }: any) => (
  <div className="flex flex-col gap-6">
    <div className="relative h-64 flex items-center justify-center">
      <div className={cn("absolute w-[200px] h-[200px] rounded-full border flex items-center justify-center", isUltraMode ? "border-neonGreen/10" : "border-white/5")}>
         <div className={cn("absolute w-[180px] h-[180px] rounded-full border", isUltraMode ? "border-neonGreen/20" : "border-white/10")} />
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className={cn("absolute inset-0 rounded-full border-t-2 opacity-30", isUltraMode ? "border-neonGreen" : "border-neonBlue")} 
         />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <motion.div
           animate={isBoosting ? { scale: [1, 1.05, 1] } : {}}
           transition={{ duration: 2, repeat: Infinity }}
           className="relative"
        >
          <span className={cn("text-7xl font-orbitron font-black block tracking-tighter", isUltraMode && "text-neonGreen")}>
            {Math.floor(isBoosting ? (progress * 100) : metrics.health)}
            <span className={cn("text-2xl ml-1", isUltraMode ? "text-neonGreen" : "text-neonBlue")}>%</span>
          </span>
          <div className={cn("h-1 w-24 mx-auto mt-2", isUltraMode ? "bg-gradient-to-r from-transparent via-neonGreen to-transparent" : "bg-gradient-to-r from-transparent via-neonBlue to-transparent")} />
        </motion.div>
        
        <div className="mt-4">
          <span className={cn("text-[10px] font-bold tracking-[0.3em] font-orbitron block", isUltraMode ? "text-neonGreen" : "text-neonBlue")}>
            {isBoosting ? "AI CORE OPTIMIZING..." : (isUltraMode ? "ULTRA POWER STATE" : "SYSTEM HEALTH CORE")}
          </span>
          <span className={cn("text-[12px] font-cairo font-bold opacity-60 mt-1 block", isUltraMode && "text-neonGreen/60")}>
             حالة النظام: {isBoosting ? "جاري المعالجة النبضية" : (isUltraMode ? "توفير فائق" : "مستقر ومؤمن")}
          </span>
        </div>
      </div>
      
      {isBoosting && <div className={cn("scan-line", isUltraMode && "bg-neonGreen/30 shadow-[0_0_15px_#39ff14]")} />}
    </div>

    <div className="grid grid-cols-3 gap-2">
      <MetricDisk progress={metrics.cpu} label="المعالج" value={`${Math.round(metrics.cpu)}%`} color="#00d2ff" isUltraMode={isUltraMode} />
      <MetricDisk progress={metrics.ram} label="الذاكرة" value={`${Math.round(metrics.ram)}%`} color="#9d50bb" isUltraMode={isUltraMode} />
      <MetricDisk progress={metrics.temp} label="الحرارة" value={`${Math.round(metrics.temp)}°`} color={metrics.temp > 45 ? "#ff3131" : "#39ff14"} isUltraMode={isUltraMode} />
    </div>

    <button 
      onClick={onBoost}
      disabled={isBoosting}
      className={cn(
        "relative h-20 rounded-3xl overflow-hidden group transition-all duration-500",
        isBoosting 
          ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/30" : "bg-neonBlue/10 border border-neonBlue/30") 
          : (isUltraMode ? "bg-neonGreen shadow-[0_0_30px_#39ff14]/40" : "bg-neonBlue shadow-[0_0_30px_rgba(0,210,255,0.4)]")
      )}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      {isBoosting && (
        <motion.div 
          className={cn("absolute inset-0", isUltraMode ? "bg-neonGreen/20" : "bg-neonBlue/20")}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
        />
      )}
      <div className="relative flex flex-col items-center justify-center">
        <span className={cn(
          "font-orbitron font-black text-lg tracking-[0.2em] uppercase",
          isBoosting ? (isUltraMode ? "text-neonGreen" : "text-neonBlue") : "text-black"
        )}>
          {isBoosting ? status : "INITIALIZE BOOST"}
        </span>
        <span className={cn(
          "font-cairo text-[10px] font-bold mt-0.5",
          isBoosting ? (isUltraMode ? "text-neonGreen/60" : "text-neonBlue/60") : "text-black/60"
        )}>
           {isBoosting ? "يتم الآن تسريح الموارد العالقة" : "بدء تسريع الجهاز والنت فوراً"}
        </span>
      </div>
    </button>
  </div>
)

const BatterySection = ({ onOptimize, isOptimizing, metrics, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
    <div className="relative h-64 flex items-center justify-center">
      <div className={cn("absolute w-[220px] h-[220px] rounded-full border flex items-center justify-center", isUltraMode ? "border-neonGreen/10" : "border-yellow-500/10")}>
         <motion.div 
           animate={isOptimizing ? { rotate: 360 } : { rotate: 0 }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           className={cn("absolute inset-2 rounded-full border-2 border-dashed", isUltraMode ? "border-neonGreen/20" : "border-yellow-500/20")} 
         />
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div 
          animate={isOptimizing ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className={cn("p-6 rounded-full border shadow-xl", isUltraMode ? "bg-neonGreen/10 border-neonGreen/30 shadow-neonGreen/10" : "bg-yellow-500/10 border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.1)]")}
        >
          <Bolt className={cn("w-12 h-12", isUltraMode ? "text-neonGreen" : "text-yellow-500")} />
        </motion.div>
        <div className="mt-6 text-center">
          <span className={cn("text-4xl font-orbitron font-black", isUltraMode ? "text-neonGreen" : "text-white")}>{isUltraMode ? "99+" : metrics.batteryHealth}%</span>
          <span className={cn("block text-[10px] font-bold uppercase tracking-[0.2em] mt-1", isUltraMode ? "text-neonGreen/60" : "text-yellow-500")}>
            {isUltraMode ? "ULTRA LONG LIFE" : "Battery Condition: Peak"}
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <GlassCard className={cn("p-4", isUltraMode ? "border-neonGreen/20" : "border-yellow-500/10")} isUltraMode={isUltraMode}>
        <span className="text-[10px] opacity-40 uppercase block mb-1">دورات الشحن</span>
        <div className="flex items-center justify-between">
          <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>142</span>
          <Activity className={cn("w-4 h-4 opacity-50", isUltraMode ? "text-neonGreen" : "text-yellow-500")} />
        </div>
      </GlassCard>
      <GlassCard className={cn("p-4", isUltraMode ? "border-neonGreen/20" : "border-yellow-500/10")} isUltraMode={isUltraMode}>
        <span className="text-[10px] opacity-40 uppercase block mb-1">درجة الحرارة</span>
        <div className="flex items-center justify-between">
          <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>{Math.round(metrics.temp)}°C</span>
          <Activity className={cn("w-4 h-4 opacity-50", isUltraMode ? "text-neonGreen" : "text-neonGreen")} />
        </div>
      </GlassCard>
    </div>

    {!isUltraMode && (
      <GlassCard className="p-5 space-y-4" isUltraMode={isUltraMode}>
        <h4 className="text-xs font-bold opacity-60 uppercase tracking-widest text-right">تحليل استهلاك الطاقة</h4>
        {[
          { name: "تطبيقات الخلفية", usage: "32%", color: "bg-red-500" },
          { name: "إرسال البيانات", usage: "12%", color: "bg-yellow-500" },
          { name: "سطوع الشاشة", usage: "45%", color: "bg-neonBlue" },
        ].map((item, i) => (
          <div key={i} className="space-y-1.5 text-right">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="opacity-40">{item.usage}</span>
              <span>{item.name}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: item.usage }}
                className={cn("h-full", item.color)} 
              />
            </div>
          </div>
        ))}
      </GlassCard>
    )}

    <button 
      onClick={onOptimize}
      disabled={isOptimizing}
      className={cn(
        "h-16 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all",
        isOptimizing 
          ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/40 text-neonGreen" : "bg-yellow-500/10 border border-yellow-500/40 text-yellow-500") 
          : (isUltraMode ? "bg-neonGreen text-black" : "bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]")
      )}
    >
      <Zap className={cn("w-5 h-5", isOptimizing && "animate-pulse")} />
      <span>{isOptimizing ? "جاري معالجة خلايا البطارية..." : (isUltraMode ? "تحسين وضع التوفير" : "تحسين صحة البطارية الآن")}</span>
    </button>
  </div>
)

const FilesSection = ({ onClean, isCleaning, isUltraMode }: any) => {
  const [junkFound, setJunkFound] = useState(0)
  
  useEffect(() => {
    if (isCleaning) {
      const timer = setInterval(() => {
        setJunkFound(prev => prev + Math.random() * 50)
      }, 100)
      return () => clearInterval(timer)
    }
  }, [isCleaning])

  return (
    <div className="flex flex-col gap-6 font-cairo">
       <GlassCard className={cn("p-6 text-center", isUltraMode ? "border-neonGreen/20" : "border-neonPurple/20")} isUltraMode={isUltraMode}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <HardDrive className={cn("w-16 h-16 opacity-30", isUltraMode ? "text-neonGreen" : "text-neonPurple")} />
              <motion.div 
                animate={isCleaning ? { opacity: [1, 0.5, 1], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Trash2 className={cn("w-8 h-8", isUltraMode ? "text-neonGreen" : "text-neonPurple")} />
              </motion.div>
            </div>
          </div>
          
          <h3 className={cn("text-xl font-bold mb-1", isUltraMode && "text-neonGreen")}>منظف الملفات الذكي</h3>
          <p className="text-xs opacity-50 mb-6 font-cairo text-center">جارٍ فحص الذاكرة المؤقتة، الملفات المتبقية، وسجلات النظام</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <span className="text-[10px] block opacity-40 mb-1">تم اكتشافه</span>
              <span className={cn("text-lg font-orbitron font-bold", isUltraMode ? "text-neonGreen" : "text-neonPurple")}>
                {isCleaning ? (junkFound / 1024).toFixed(2) : "1.42"} GB
              </span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <span className="text-[10px] block opacity-40 mb-1">توفير متوقع</span>
              <span className="text-lg font-orbitron font-bold text-neonGreen">
                {isCleaning ? "Calculating..." : "2.8 GB"}
              </span>
            </div>
          </div>

          <button 
            onClick={onClean}
            disabled={isCleaning}
            className={cn("w-full h-14 border rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all", isUltraMode ? "bg-neonGreen/20 border-neonGreen/40 text-neonGreen" : "bg-neonPurple/20 border-neonPurple/40")}
          >
            {isCleaning ? (
              <div className="flex items-center gap-3">
                <div className={cn("w-4 h-4 border-2 rounded-full animate-spin", isUltraMode ? "border-neonGreen border-t-transparent" : "border-neonPurple border-t-transparent")} />
                <span>جاري التنظيف العميق...</span>
              </div>
            ) : (
              <>
                <Zap className={cn("w-4 h-4", isUltraMode ? "text-neonGreen" : "text-neonPurple")} />
                <span>تنظيف الجهاز وتوفير مساحة</span>
              </>
            )}
          </button>
       </GlassCard>

       {!isUltraMode && (
         <div className="space-y-3">
            <h4 className="text-xs font-bold opacity-40 px-2 uppercase tracking-widest text-right">المناطق الممسوحة</h4>
            {[
              { name: "ذاكرة التطبيقات", size: "840 MB", icon: Layers },
              { name: "ملفات النظام المؤقتة", size: "420 MB", icon: Cpu },
              { name: "سجلات الإنترنت", size: "160 MB", icon: Wifi },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-neonBlue" />
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                <span className="text-xs font-mono opacity-50">{item.size}</span>
              </div>
            ))}
         </div>
       )}
    </div>
  )
}

const NetworkSection = ({ onBoost, isBoosting, speed, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
     <GlassCard className={cn("p-8 overflow-hidden", isUltraMode ? "border-neonGreen/20 bg-black" : "border-neonBlue/20")} isUltraMode={isUltraMode}>
        <div className="absolute top-0 right-0 p-4">
           <StatusBadge active={true} label="DNS: SECURE" isUltraMode={isUltraMode} />
        </div>
        
        <div className="flex flex-col items-center mt-4">
           <div className="relative w-40 h-40 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={cn("absolute inset-0 border-2 border-dashed rounded-full", isUltraMode ? "border-neonGreen/20" : "border-neonBlue/20")} 
              />
              <motion.div 
                animate={{ scale: isBoosting ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="relative z-10"
              >
                <Wifi className={cn("w-16 h-16 drop-shadow-lg", isUltraMode ? "text-neonGreen shadow-neonGreen/40" : "text-neonBlue shadow-neonBlue/60")} />
              </motion.div>
           </div>
           
           <div className="text-center mt-6">
              <h3 className={cn("text-2xl font-orbitron font-black", isUltraMode && "text-neonGreen")}>{isUltraMode ? "LOCKED" : speed} <span className="text-sm opacity-50">{isUltraMode ? "" : "Mbps"}</span></h3>
              <p className={cn("text-xs font-bold opacity-60 mt-1 uppercase tracking-widest", isUltraMode ? "text-neonGreen" : "text-neonBlue")}>
                {isUltraMode ? "POWERSAVE MODE ACTIVE" : "Current Signal Peak"}
              </p>
           </div>
        </div>

        {!isUltraMode && (
          <div className="grid grid-cols-2 gap-4 mt-8">
             <div className="glass p-3 rounded-xl border-white/5">
                <span className="text-[9px] block opacity-40 uppercase mb-1 text-right">Ping Latency</span>
                <span className="text-sm font-bold text-neonGreen">12ms</span>
             </div>
             <div className="glass p-3 rounded-xl border-white/5 text-right">
                <span className="text-[9px] block opacity-40 uppercase mb-1">Network Type</span>
                <span className="text-sm font-bold">5G / Fiber</span>
             </div>
          </div>
        )}
     </GlassCard>

     <button 
       onClick={onBoost}
       disabled={isBoosting}
       className={cn("h-16 border rounded-2xl font-bold flex items-center justify-center gap-3 transition-all", isUltraMode ? "bg-neonGreen/5 border-neonGreen/30 text-neonGreen" : "bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 border border-neonBlue/30")}
     >
       <Rocket className={cn("w-5 h-5", isBoosting && "animate-bounce", isUltraMode ? "text-neonGreen" : "text-neonBlue")} />
       <span>{isBoosting ? "جاري تحسين استجابة الشبكة..." : "تسريع النت وتقليل البنق"}</span>
     </button>

     {isUltraMode && (
        <div className="p-4 border border-neonGreen/20 bg-neonGreen/5 rounded-2xl text-[10px] text-center text-neonGreen/60">
          وضع التوفير الفائق يحد من سرعة النت لتقليل استهلاك البطارية
        </div>
     )}
  </div>
)

const ShieldSection = ({ isActive, toggle, count, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
     <GlassCard className={cn("p-8 text-center", isUltraMode ? "border-neonGreen/20" : "border-yellow-500/20")} glowColor={isActive ? 'gold' : ''} isUltraMode={isUltraMode}>
        <div className="relative flex justify-center mb-6">
           <motion.div 
             animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
             transition={{ duration: 4, repeat: Infinity }}
             className={cn("p-6 rounded-3xl border shadow-2xl", isActive ? (isUltraMode ? "bg-neonGreen/10 border-neonGreen/40 text-neonGreen shadow-neonGreen/20" : "bg-yellow-500/10 border-yellow-500/30 text-yellow-500 shadow-yellow-500/10") : "bg-white/5 border-white/10 opacity-30")}
           >
              <ShieldCheck className="w-16 h-16" />
           </motion.div>
           {isActive && (
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="absolute -top-2 -right-2 bg-neonGreen text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
             >
               SECURE
             </motion.div>
           )}
        </div>

        <h3 className={cn("text-xl font-bold mb-1", isUltraMode && "text-neonGreen")}>درع الحماية الشامل</h3>
        <p className="text-[11px] opacity-50 mb-6 mx-auto max-w-[200px]">حجب إعلانات يوتيوب، المواقع المشبوهة، ومنع التتبع الرقمي.</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className={cn("p-3 rounded-2xl border transition-all", isActive ? (isUltraMode ? "border-neonGreen/20 bg-neonGreen/5" : "border-yellow-500/20 bg-yellow-500/5") : "border-white/5 bg-white/5 opacity-50")}>
              <span className="text-[9px] block opacity-40 uppercase mb-1">إعلانات محجوبة</span>
              <span className={cn("text-lg font-orbitron font-bold", isActive && (isUltraMode ? "text-neonGreen" : "text-yellow-500"))}>
                {count}
              </span>
           </div>
           <div className={cn("p-3 rounded-2xl border transition-all", isActive ? (isUltraMode ? "border-neonGreen/20 bg-neonGreen/5" : "border-yellow-500/20 bg-yellow-500/5") : "border-white/5 bg-white/5 opacity-50")}>
              <span className="text-[9px] block opacity-40 uppercase mb-1">فلتر يوتيوب</span>
              <span className={cn("text-lg font-bold", isActive && (isUltraMode ? "text-neonGreen" : "text-yellow-500"))}>
                {isActive ? "نشط" : "متوقف"}
              </span>
           </div>
        </div>

        <button 
          onClick={toggle}
          className={cn(
            "w-full h-16 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden",
            isActive 
              ? (isUltraMode ? "bg-neonGreen text-black" : "bg-yellow-500 text-black shadow-lg") 
              : "bg-white/5 border border-white/10 hover:bg-white/10"
          )}
        >
          {isActive && <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-white/20 skew-x-12" />}
          <Zap className={cn("w-5 h-5", isActive && "animate-pulse")} />
          <span>{isActive ? "إيقاف الدرع" : "تفعيل حاجب الإعلانات"}</span>
        </button>
     </GlassCard>

     <div className="space-y-3">
        <h4 className="text-xs font-bold opacity-40 px-2 uppercase tracking-widest text-right">المميزات المفعلة</h4>
        {[
          { name: "حجب إعلانات يوتيوب", desc: "نظام منع ملفات التتبع (Tracker Zero)", icon: Rocket },
          { name: "تشفير بيانات التصفح", desc: "إخفاء هويتك الرقمية (Simulated VPN)", icon: Fingerprint },
          { name: "جدار حماية قوي", desc: "منع النوافذ المنبثقة المزعجة", icon: ShieldCheck },
        ].map((item, i) => (
          <div key={i} className={cn("glass rounded-2xl p-4 flex items-center justify-between border-white/5", !isActive && "opacity-30")}>
            <div className="text-right flex-1 pr-4">
              <span className={cn("text-sm font-bold block", isActive && "text-neonGreen")}>{item.name}</span>
              <span className="text-[10px] opacity-40">{item.desc}</span>
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isActive ? "bg-neonGreen/10 text-neonGreen" : "bg-white/5 opacity-50")}>
              <item.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
     </div>
  </div>
)

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('boost')
  const [isBoosting, setIsBoosting] = useState(false)
  const [boostProgress, setBoostProgress] = useState(0)
  const [boostStatus, setBoostStatus] = useState('')
  
  const [isCleaning, setIsCleaning] = useState(false)
  const [isNetBoosting, setIsNetBoosting] = useState(false)
  const [isOptimizingBattery, setIsOptimizingBattery] = useState(false)
  const [isUltraMode, setIsUltraMode] = useState(false)
  const [isAdBlockActive, setIsAdBlockActive] = useState(false)
  const [adsBlockedCount, setAdsBlockedCount] = useState(247)
  
  const [metrics, setMetrics] = useState({
    health: 68,
    cpu: 45,
    ram: 72,
    temp: 34,
    netSpeed: 124,
    batteryHealth: 91
  })

  // Simulated metrics update
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: isUltraMode ? 5 : Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: isUltraMode ? 15 : Math.max(30, Math.min(90, prev.ram + (Math.random() - 0.5) * 5)),
        temp: isUltraMode ? 28 : Math.max(30, Math.min(55, prev.temp + (Math.random() - 0.5) * 2))
      }))

      if (isAdBlockActive) {
        setAdsBlockedCount(prev => prev + Math.floor(Math.random() * 2))
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [isUltraMode, isAdBlockActive])

  const startBoost = () => {
    if (isBoosting) return
    setIsBoosting(true)
    let p = 0
    const statuses = ['MAPPING CORE', 'FLUSHING L2 CACHE', 'ALGORITHMIC TUNING', 'DATA DEBOTTLE', 'FINALIZING']
    
    const interval = setInterval(() => {
      p += 0.01
      setBoostProgress(p)
      const statusIdx = Math.floor(p * statuses.length)
      setBoostStatus(statuses[statusIdx] || statuses[statuses.length - 1])

      if (p >= 1) {
        clearInterval(interval)
        setTimeout(() => {
          setIsBoosting(false)
          setMetrics(prev => ({ 
            ...prev, 
            health: Math.min(99, prev.health + 12),
            cpu: prev.cpu - 15,
            ram: prev.ram - 20
          }))
          setBoostProgress(0)
        }, 1000)
      }
    }, 40)
  }

  const startCleaning = () => {
    setIsCleaning(true)
    setTimeout(() => {
      setIsCleaning(false)
      setMetrics(prev => ({ ...prev, health: Math.min(99, prev.health + 5) }))
    }, 4000)
  }

  const startNetBoost = () => {
    setIsNetBoosting(true)
    setTimeout(() => {
      setIsNetBoosting(false)
      setMetrics(prev => ({ ...prev, netSpeed: prev.netSpeed + 80 }))
    }, 3000)
  }

  const startBatteryOptimize = () => {
    setIsOptimizingBattery(true)
    setTimeout(() => {
      setIsOptimizingBattery(false)
      setMetrics(prev => ({ ...prev, batteryHealth: Math.min(100, prev.batteryHealth + 4) }))
    }, 4000)
  }

  const toggleUltraMode = () => {
    setIsUltraMode(!isUltraMode)
  }

  return (
    <div className={cn(
      "min-h-screen text-white font-sans selection:bg-neonBlue/30 overflow-x-hidden pb-24 transition-colors duration-700",
      isUltraMode ? "bg-black" : "bg-deep-black bg-mesh"
    )}>
      {/* Background Decor - Only show in normal mode */}
      {!isUltraMode && (
        <div className="fixed inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonBlue/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neonPurple/10 blur-[150px] rounded-full" />
        </div>
      )}

      {isUltraMode && (
         <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      )}

      <header className={cn(
        "sticky top-0 z-30 px-6 py-6 flex items-center justify-between glass border-none transition-all",
        isUltraMode && "bg-black border-b border-neonGreen/10"
      )}>
         <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center p-[1px] shadow-lg transition-all",
              isUltraMode ? "bg-neonGreen shadow-[0_0_20px_#39ff14]/30" : "bg-gradient-to-br from-neonBlue to-neonPurple shadow-neonBlue/30"
            )}>
               <div className="w-full h-full rounded-[15px] bg-black flex items-center justify-center">
                  <Zap className={cn("w-5 h-5", isUltraMode ? "text-neonGreen" : "text-neonBlue")} fill="currentColor" />
               </div>
            </div>
            <div>
               <h1 className={cn("text-lg font-orbitron font-black tracking-tighter leading-none transition-colors", isUltraMode && "text-neonGreen")}>
                 NEURAL BOOST X
               </h1>
               <div className="flex items-center gap-1.5 mt-1">
                  <span className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    isUltraMode ? "bg-neonGreen shadow-[0_0_8px_#39ff14]" : "bg-neonGreen shadow-[0_0_8px_#39ff14]"
                  )} />
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-widest font-orbitron",
                    isUltraMode ? "text-neonGreen" : "text-neonBlue"
                  )}>
                    {isUltraMode ? "ULTRA ENERGY MODE: TRUE" : "Neural link: Active"}
                  </span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            {!isUltraMode && (
              <>
                 <button className="relative w-10 h-10 glass rounded-full flex items-center justify-center group overflow-hidden">
                    <Bell className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-neonRed rounded-full border border-black" />
                 </button>
                 <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                 </button>
              </>
            )}
            {isUltraMode && (
               <button 
                 onClick={toggleUltraMode}
                 className="px-4 py-2 border border-neonGreen text-neonGreen font-orbitron text-[10px] font-bold rounded-lg hover:bg-neonGreen hover:text-black transition-all"
               >
                 EXIT ULTRA
               </button>
            )}
         </div>
      </header>

      <main className="px-6 py-4 max-w-xl mx-auto">
         {/* Welcome Card */}
         {activeTab === 'boost' && !isBoosting && !isUltraMode && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8 font-cairo"
           >
              <h2 className="text-2xl font-black">أهلاً بك في الجيل القادم</h2>
              <p className="text-xs opacity-50 mt-1">أداة واحدة لجهاز أسرع، نت أقوى، ومساحة أكبر.</p>
           </motion.div>
         )}

         {isUltraMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-neonGreen/5 border border-neonGreen/20 rounded-3xl p-6 mb-8 text-center font-cairo"
            >
               <h2 className="text-neonGreen text-xl font-black uppercase font-orbitron tracking-widest">Ultra Power Mode</h2>
               <div className="text-neonGreen text-4xl font-black my-4 font-orbitron">99+ HOURS</div>
               <p className="text-neonGreen/70 text-xs">تم إغلاق كافة الأنظمة غير الضرورية وتجميد العمليات الخلفية للحفاظ على الطاقة.</p>
            </motion.div>
         )}

         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
               {activeTab === 'boost' && (
                 <OptimizationSection 
                    onBoost={startBoost}
                    isBoosting={isBoosting}
                    progress={boostProgress}
                    status={boostStatus}
                    metrics={metrics}
                    isUltraMode={isUltraMode}
                 />
               )}

               {activeTab === 'battery' && (
                  <div className="flex flex-col gap-6">
                    <BatterySection 
                      onOptimize={startBatteryOptimize}
                      isOptimizing={isOptimizingBattery}
                      metrics={metrics}
                      isUltraMode={isUltraMode}
                    />
                    
                    <GlassCard className={cn(
                      "p-6 flex flex-col gap-4 transition-all duration-500",
                      isUltraMode ? "border-neonGreen/40 bg-neonGreen/5" : "border-neonPurple/20"
                    )} isUltraMode={isUltraMode}>
                       <div className="flex items-center justify-between font-cairo">
                          <div className="text-right flex-1">
                             <h4 className={cn("text-lg font-bold", isUltraMode ? "text-neonGreen" : "text-white")}>
                               وضع توفير الطاقة الفائق
                             </h4>
                             <p className="text-[10px] opacity-50">تفعيل أقصى حماية للبطارية باللون الأخضر المميت</p>
                          </div>
                          <div 
                             onClick={toggleUltraMode}
                             className={cn(
                               "w-14 h-7 rounded-full relative cursor-pointer transition-all duration-300 ml-4",
                               isUltraMode ? "bg-neonGreen" : "bg-white/10"
                             )}
                          >
                             <motion.div 
                               animate={{ x: isUltraMode ? 28 : 4 }}
                               className="absolute top-1 w-5 h-5 rounded-full bg-black shadow-lg" 
                             />
                          </div>
                       </div>
                    </GlassCard>
                  </div>
               )}

               {activeTab === 'files' && (
                  <FilesSection 
                    onClean={startCleaning}
                    isCleaning={isCleaning}
                    isUltraMode={isUltraMode}
                  />
               )}

               {activeTab === 'network' && (
                  <NetworkSection 
                    onBoost={startNetBoost}
                    isBoosting={isNetBoosting}
                    speed={metrics.netSpeed}
                    isUltraMode={isUltraMode}
                  />
               )}

               {activeTab === 'shield' && (
                  <ShieldSection 
                    isActive={isAdBlockActive}
                    toggle={() => setIsAdBlockActive(!isAdBlockActive)}
                    count={adsBlockedCount}
                    isUltraMode={isUltraMode}
                  />
               )}

               {activeTab === 'ai' && (
                  <div className={cn("flex flex-col gap-6 font-cairo text-right", isUltraMode && "text-neonGreen")}>
                     <GlassCard className={cn("p-8 text-center min-h-[400px] flex flex-col items-center justify-center gap-6", isUltraMode && "border-neonGreen/20 bg-black")} isUltraMode={isUltraMode}>
                        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center border relative", isUltraMode ? "bg-neonGreen/10 border-neonGreen/40" : "bg-neonBlue/10 border-neonBlue/30")}>
                           <BrainCircuit className={cn("w-10 h-10", isUltraMode ? "text-neonGreen" : "text-neonBlue")} />
                           <motion.div 
                             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className={cn("absolute inset-0 rounded-full", isUltraMode ? "bg-neonGreen" : "bg-neonBlue")} 
                           />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold">مستشار الذكاء الاصطناعي</h3>
                           <p className="text-sm opacity-50 mt-2 px-10">الذكاء الاصطناعي يحلل هاتفك الآن لتقديم نصائح تخص البطارية والأداء.</p>
                        </div>
                        <div className={cn("w-full p-4 rounded-2xl border flex gap-3", isUltraMode ? "bg-neonGreen/5 border-neonGreen/10" : "bg-white/5 border-white/5")}>
                           <p className="text-xs leading-relaxed flex-1">
                              {isUltraMode ? "النظام في وضع التوفير الأقصى. تم تقليص ذكاء النظام لتقليل استهلاك الطاقة." : "تم ملاحظة أن تطبيق Games يستهلك 30% من طاقة المعالج في الخلفية. هل تريد إيقافه؟"}
                           </p>
                           <Info className={cn("w-5 h-5 shrink-0", isUltraMode ? "text-neonGreen" : "text-neonBlue")} />
                        </div>
                        {!isUltraMode && (
                           <button className="px-8 py-3 bg-neonBlue text-black font-black rounded-2xl text-xs uppercase tracking-widest">
                              بدء التحليل الشامل
                           </button>
                        )}
                     </GlassCard>
                  </div>
               )}
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-8 left-6 right-6 z-50">
         <div className={cn(
           "max-w-lg mx-auto rounded-[2.5rem] h-20 px-4 flex items-center justify-around border shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all",
           isUltraMode ? "bg-black border-neonGreen/20" : "glass border-white/10"
         )}>
            {[
              { id: 'boost', icon: Cpu, label: 'تسريع' },
              { id: 'battery', icon: Bolt, label: 'بطارية' },
              { id: 'files', icon: HardDrive, label: 'ملفات' },
              { id: 'network', icon: Wifi, label: 'إنترنت' },
              { id: 'shield', icon: ShieldCheck, label: 'درع' },
              { id: 'ai', icon: BrainCircuit, label: 'ذكاء' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={cn(
                  "flex flex-col items-center gap-1.5 py-2 transition-all relative",
                  activeTab === item.id 
                    ? (isUltraMode ? "text-neonGreen" : "text-neonBlue") 
                    : "text-white/30"
                )}
              >
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className={cn(
                      "absolute -top-1 w-12 h-12 blur-xl rounded-full",
                      isUltraMode ? "bg-neonGreen/20" : "bg-neonBlue/10"
                    )} 
                  />
                )}
                <item.icon className={cn(
                  "w-6 h-6 z-10 transition-all", 
                  activeTab === item.id && (isUltraMode ? "drop-shadow-[0_0_10px_#39ff14]" : "drop-shadow-[0_0_10px_rgba(0,210,255,1)]")
                )} />
                <span className="text-[10px] font-bold font-cairo z-10">{item.label}</span>
              </button>
            ))}
         </div>
      </nav>
    </div>
  )
}
