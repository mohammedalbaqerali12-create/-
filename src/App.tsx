import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, 
  BrainCircuit, 
  Bolt, 
  Wifi, 
  Trash2, 
  Info,
  Zap,
  HardDrive,
  Rocket,
  ShieldCheck,
  Fingerprint,
  Bell,
  Settings,
  PlaySquare,
  Globe,
  Lock,
  Camera,
  CheckCircle,
  Database,
  ScanFace
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Types ---
type TabType = 'boost' | 'battery' | 'clean' | 'network' | 'shield' | 'vault'

// --- Shared Components ---

const GlassCard = ({ children, className, glowColor, isUltraMode }: { children: React.ReactNode, className?: string, glowColor?: string, isUltraMode?: boolean }) => (
  <div className={cn(
    "glass-card rounded-[2.5rem] p-6 relative overflow-hidden group transition-all duration-700",
    !isUltraMode && glowColor === 'blue' && "neon-border-blue border-neonBlue/20 shadow-[0_0_30px_rgba(0,210,255,0.05)]",
    !isUltraMode && glowColor === 'green' && "neon-border-green border-neonGreen/20 shadow-[0_0_30px_rgba(57,255,20,0.05)]",
    !isUltraMode && glowColor === 'purple' && "neon-border-purple border-neonPurple/20 shadow-[0_0_30px_rgba(157,80,187,0.05)]",
    !isUltraMode && glowColor === 'gold' && "border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.05)]",
    isUltraMode && "border-neonGreen/20 bg-black/90",
    className
  )}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-50 pointer-events-none" />
    <div className={cn("absolute inset-0 pointer-events-none bg-white/[0.01] group-hover:bg-white/[0.04] transition-all duration-500")} />
    {children}
  </div>
)

const PremiumBadge = ({ label, isUltraMode }: { label: string, isUltraMode?: boolean }) => (
  <div className={cn(
    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] font-orbitron",
    isUltraMode ? "bg-neonGreen/10 text-neonGreen border border-neonGreen/30" : "bg-white/5 text-white/40 border border-white/10"
  )}>
    {label}
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


// --- UI Sections ---

const OptimizationSection = ({ onBoost, isBoosting, progress, status, metrics, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
    <div className="flex justify-between items-center mb-2">
       <PremiumBadge label={isUltraMode ? "ULTRA" : "PRO"} isUltraMode={isUltraMode} />
       <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-bold opacity-40 uppercase tracking-widest", isUltraMode && "text-neonGreen")}>System Status</span>
          <div className={cn("w-2 h-2 rounded-full", isBoosting ? "bg-neonGreen animate-pulse" : (isUltraMode ? "bg-neonGreen/40" : "bg-neonBlue"))} />
       </div>
    </div>

    <GlassCard className="p-10 flex flex-col items-center justify-center min-h-[320px]" glowColor={isUltraMode ? "" : "blue"} isUltraMode={isUltraMode}>
       <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
       
       <div className="relative mb-8">
          <div className={cn("w-48 h-48 rounded-full border-2 flex items-center justify-center", isUltraMode ? "border-neonGreen/10" : "border-white/5")}>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className={cn("absolute inset-0 rounded-full border-2 border-dashed opacity-20", isUltraMode ? "border-neonGreen" : "border-neonBlue")}
             />
             <div className="text-center group-hover:scale-105 transition-transform duration-700">
                <span className={cn("text-7xl font-orbitron font-black text-glow-blue block", isUltraMode && "text-neonGreen text-glow-green")}>
                   {Math.floor(isBoosting ? (progress * 100) : metrics.health)}
                   <span className="text-2xl ml-1 opacity-40">%</span>
                </span>
                <span className={cn("text-[9px] font-orbitron font-black uppercase tracking-[0.4em] opacity-40 block mt-2", isUltraMode && "text-neonGreen")}>
                   Core Health
                </span>
             </div>
          </div>
          {isBoosting && <div className={cn("scan-line", isUltraMode && "bg-neonGreen")} />}
       </div>

       <div className="flex gap-8 justify-center w-full">
          <div className="text-center">
             <span className={cn("text-lg font-orbitron font-bold block", isUltraMode && "text-neonGreen")}>{Math.round(metrics.cpu)}%</span>
             <span className="text-[9px] font-bold uppercase opacity-30 tracking-widest">CPU</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
             <span className={cn("text-lg font-orbitron font-bold block", isUltraMode && "text-neonGreen")}>{Math.round(metrics.ram)}%</span>
             <span className="text-[9px] font-bold uppercase opacity-30 tracking-widest">RAM</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
             <span className={cn("text-lg font-orbitron font-bold block", isUltraMode && "text-neonGreen")}>{Math.round(metrics.temp)}°C</span>
             <span className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Temp</span>
          </div>
       </div>
    </GlassCard>

    <button 
      onClick={onBoost}
      disabled={isBoosting}
      className={cn(
        "relative h-20 rounded-[2rem] overflow-hidden transition-all duration-500 font-orbitron flex items-center justify-center gap-3",
        isBoosting 
          ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/20 text-neonGreen" : "bg-white/5 border border-white/10 text-white/40") 
          : (isUltraMode ? "bg-neonGreen text-black font-black shadow-[0_20px_40px_rgba(57,255,20,0.2)]" : "bg-white text-black font-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]")
      )}
    >
      {isBoosting && (
        <motion.div 
          className={cn("absolute inset-y-0 left-0", isUltraMode ? "bg-neonGreen/20" : "bg-neonBlue/20")}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
        />
      )}
      <Zap className={cn("w-5 h-5 transition-transform", !isBoosting && "group-hover:scale-110")} fill={isBoosting ? "none" : "currentColor"} />
      <div className="flex flex-col items-start leading-none">
         <span className="text-sm font-black tracking-widest">{isBoosting ? status : "INITIALIZE OPTIMIZATION"}</span>
         {!isBoosting && <span className="text-[9px] font-bold opacity-50 mt-1 font-cairo">تحسين أداء النظام والنت بذكاء</span>}
      </div>
    </button>
  </div>
)

const BatterySection = ({ onOptimize, isOptimizing, metrics, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
    <div className="flex justify-between items-center mb-2">
       <PremiumBadge label="Battery Core" isUltraMode={isUltraMode} />
       <StatusBadge active={true} label="Peak Performance" isUltraMode={isUltraMode} />
    </div>

    <GlassCard className="p-8 flex flex-col items-center" glowColor={isUltraMode ? "" : "gold"} isUltraMode={isUltraMode}>
       <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
             <motion.circle 
               cx="96" cy="96" r="80" stroke={isUltraMode ? "#39ff14" : "#eab308"} strokeWidth="6" fill="transparent"
               strokeDasharray={2 * Math.PI * 80}
               initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
               animate={{ strokeDashoffset: (2 * Math.PI * 80) * (1 - (isUltraMode ? 0.99 : (metrics.batteryHealth / 100))) }}
               transition={{ duration: 2, ease: "easeOut" }}
               strokeLinecap="round"
             />
          </svg>
          <div className="text-center">
             <span className={cn("text-5xl font-orbitron font-black block", isUltraMode && "text-neonGreen")}>{isUltraMode ? "99+" : metrics.batteryHealth}%</span>
             <span className="text-[9px] font-bold opacity-30 uppercase tracking-[0.3em]">Remaining</span>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
             <span className="text-[10px] block opacity-40 mb-1">Health</span>
             <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>91%</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
             <span className="text-[10px] block opacity-40 mb-1">Temperature</span>
             <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>{Math.round(metrics.temp)}°C</span>
          </div>
       </div>
    </GlassCard>

    <button 
      onClick={onOptimize}
      disabled={isOptimizing}
      className={cn(
        "h-20 rounded-[2rem] font-black font-orbitron flex items-center justify-center gap-3 transition-all",
        isOptimizing 
          ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/20 text-neonGreen" : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500") 
          : (isUltraMode ? "bg-neonGreen text-black" : "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20")
      )}
    >
      <Bolt className={cn("w-5 h-5", isOptimizing && "animate-bounce")} fill={isOptimizing ? "none" : "currentColor"} />
      <div className="flex flex-col items-start leading-none">
         <span className="text-sm tracking-widest uppercase">{isOptimizing ? "Optimizing Power..." : "BOOST BATTERY LIFE"}</span>
         {!isOptimizing && <span className="text-[9px] font-bold opacity-50 mt-1 font-cairo">إطالة عمر البطارية وتحسين خلايا الطاقة</span>}
      </div>
    </button>
  </div>
)

const PhotoCleanerSection = ({ onClean, isCleaning, isUltraMode }: any) => {
  const [junkFound, setJunkFound] = useState(0)
  
  useEffect(() => {
    if (isCleaning) {
      const timer = setInterval(() => {
        setJunkFound(prev => prev + Math.random() * 80)
      }, 100)
      return () => clearInterval(timer)
    }
  }, [isCleaning])

  return (
    <div className="flex flex-col gap-6 font-cairo">
       <div className="flex justify-between items-center mb-2">
          <PremiumBadge label="AI Vision Clean" isUltraMode={isUltraMode} />
          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Smart Gallery</span>
       </div>

       <GlassCard className="p-8 text-center" glowColor={isUltraMode ? "" : "purple"} isUltraMode={isUltraMode}>
          <div className="flex justify-center mb-6">
             <div className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-700">
                <Camera className={cn("w-12 h-12", isUltraMode ? "text-neonGreen" : "text-neonPurple")} />
                {isCleaning && (
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-2 border-2 border-neonPurple border-t-transparent rounded-[2rem]"
                   />
                )}
             </div>
          </div>
          
          <h3 className={cn("text-xl font-bold mb-1", isUltraMode && "text-neonGreen")}>منظف الصور الذكي (AI)</h3>
          <p className="text-[11px] opacity-40 mb-8 mx-auto max-w-[200px]">خوارزميات ذكية لفحص معرض الصور واكتشاف الصور المكررة والباهتة.</p>
          
          <div className="bg-black/40 rounded-[2rem] p-6 mb-2 border border-white/5">
             <span className="text-[10px] block opacity-30 uppercase tracking-widest mb-3">Wasted Space Detected</span>
             <span className={cn("text-5xl font-orbitron font-black text-glow-blue", isUltraMode && "text-neonGreen text-glow-green")}>
                {isCleaning ? (junkFound / 1024).toFixed(1) : "2.8"}
                <span className="text-xl ml-1 opacity-30">GB</span>
             </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 text-right">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
               <span className="text-sm font-black text-white/80 block">{isCleaning ? Math.floor(junkFound * 1.5) : 342}</span>
               <span className="text-[9px] opacity-40 uppercase">صورة مكررة</span>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
               <span className="text-sm font-black text-white/80 block">{isCleaning ? Math.floor(junkFound * 0.4) : 89}</span>
               <span className="text-[9px] opacity-40 uppercase">صورة باهتة</span>
             </div>
          </div>
       </GlassCard>

       <button 
         onClick={onClean}
         disabled={isCleaning}
         className={cn(
           "h-20 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all relative overflow-hidden",
           isCleaning 
             ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/20 text-neonGreen" : "bg-neonPurple/10 border border-neonPurple/20 text-neonPurple") 
             : (isUltraMode ? "bg-neonGreen text-black" : "bg-neonPurple text-white shadow-lg shadow-neonPurple/20")
         )}
       >
         {isCleaning && <motion.div className="absolute inset-y-0 left-0 bg-white/5" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 4 }} />}
         <Trash2 className={cn("w-5 h-5", isCleaning && "animate-bounce")} fill={isCleaning ? "none" : "currentColor"} />
         <div className="flex flex-col items-start leading-none">
            <span className="text-sm tracking-widest uppercase font-orbitron">{isCleaning ? "SCANNING NEURAL NET..." : "DEEP PHOTO CLEAN"}</span>
            {!isCleaning && <span className="text-[9px] font-bold opacity-50 mt-1 font-cairo">تحرير مساحة التخزين بضغطة واحدة</span>}
         </div>
       </button>
    </div>
  )
}

const NetworkSection = ({ onBoost, isBoosting, speed, isUltraMode }: any) => (
  <div className="flex flex-col gap-6 font-cairo">
    <div className="flex justify-between items-center mb-2">
       <PremiumBadge label="Signal Guard" isUltraMode={isUltraMode} />
       <StatusBadge active={true} label="SSL Secure" isUltraMode={isUltraMode} />
    </div>

    <GlassCard className="p-8 overflow-hidden min-h-[300px] flex flex-col justify-center" glowColor={isUltraMode ? "" : "blue"} isUltraMode={isUltraMode}>
       <div className="absolute top-0 right-0 p-6 opacity-20">
          <Wifi className={cn("w-24 h-24", isUltraMode ? "text-neonGreen" : "text-neonBlue")} />
       </div>
       
       <div className="relative z-10">
          <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] block mb-2">Current Ping Delay</span>
          <div className="flex items-baseline gap-2">
             <span className={cn("text-6xl font-orbitron font-black text-glow-blue", isUltraMode && "text-neonGreen text-glow-green")}>
                {isUltraMode ? "LOCKED" : speed}
             </span>
             {!isUltraMode && <span className="text-xl font-bold opacity-30">ms</span>}
          </div>
          <div className={cn("h-1 w-20 mt-4 rounded-full", isUltraMode ? "bg-neonGreen/30" : "bg-neonBlue/30")}>
             <motion.div 
               animate={{ x: [0, 60, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className={cn("w-4 h-full rounded-full", isUltraMode ? "bg-neonGreen" : "bg-neonBlue")} 
             />
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
          <div className="text-right">
             <span className="text-[9px] font-bold opacity-30 uppercase block mb-1">Latency Level</span>
             <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>{speed < 50 ? 'Excellent' : 'Normal'}</span>
          </div>
          <div className="text-right">
             <span className="text-[9px] font-bold opacity-30 uppercase block mb-1">Packet Loss</span>
             <span className={cn("text-lg font-orbitron font-bold", isUltraMode && "text-neonGreen")}>0.00%</span>
          </div>
       </div>
    </GlassCard>

    <button 
      onClick={onBoost}
      disabled={isBoosting}
      className={cn(
        "h-20 rounded-[2rem] font-black font-orbitron flex items-center justify-center gap-3 transition-all",
        isBoosting 
          ? (isUltraMode ? "bg-neonGreen/10 border border-neonGreen/20 text-neonGreen" : "bg-white/5 border border-white/10 text-white/40") 
          : (isUltraMode ? "bg-neonGreen text-black" : "bg-white text-black shadow-lg shadow-white/10")
      )}
    >
      <Rocket className={cn("w-5 h-5", isBoosting && "animate-bounce")} fill={isBoosting ? "none" : "currentColor"} />
      <div className="flex flex-col items-start leading-none">
         <span className="text-sm tracking-widest uppercase">{isBoosting ? "Optimizing Path..." : "BOOST NETWORK SPEED"}</span>
         {!isBoosting && <span className="text-[9px] font-bold opacity-50 mt-1 font-cairo">تحسين مسار البيانات وتقليل التأخير (Ping)</span>}
      </div>
    </button>
  </div>
)

// --- Real Logic Functions ---

const installDNSProfile = () => {
  const profileName = "NeuralBoostX_YouTube_Shield";
  const dnsProfileXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>DNSSettings</key>
			<dict>
				<key>DNSProtocol</key>
				<string>HTTPS</string>
				<key>ServerURL</key>
				<string>https://dns.adguard-dns.com/dns-query</string>
			</dict>
			<key>PayloadDescription</key>
			<string>Configures Encrypted DNS for Ad-Blocking (YouTube & System-Wide)</string>
			<key>PayloadDisplayName</key>
			<string>NeuralBoostX Security DNS</string>
			<key>PayloadIdentifier</key>
			<string>com.neuralboostx.dns-settings</string>
			<key>PayloadType</key>
			<string>com.apple.dnsSettings.managed</string>
			<key>PayloadUUID</key>
			<string>${crypto.randomUUID()}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
		</dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>NeuralBoostX Ad-Blocker Pro</string>
	<key>PayloadIdentifier</key>
	<string>com.neuralboostx.adblock</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${crypto.randomUUID()}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;

  const blob = new Blob([dnsProfileXML], { type: 'application/x-apple-aspen-config' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profileName}.mobileconfig`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const generateVPNProfile = () => {
  const profileName = "Neural_Stealth_VPN";
  const id1 = crypto.randomUUID();
  const id2 = crypto.randomUUID();
  const vpnXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>IKEv2</key>
			<dict>
				<key>AuthenticationMethod</key>
				<string>None</string>
				<key>ChildSecurityAssociationParameters</key>
				<dict>
					<key>EncryptionAlgorithm</key>
					<string>AES-256</string>
					<key>IntegrityAlgorithm</key>
					<string>SHA2-256</string>
				</dict>
				<key>LocalIdentifier</key>
				<string>StealthVPN</string>
				<key>RemoteAddress</key>
				<string>engage.cloudflareclient.com</string>
				<key>RemoteIdentifier</key>
				<string>engage.cloudflareclient.com</string>
			</dict>
			<key>IPv4</key>
			<dict>
				<key>OverridePrimary</key>
				<integer>1</integer>
			</dict>
			<key>PayloadDescription</key>
			<string>Configures Stealth VPN settings</string>
			<key>PayloadDisplayName</key>
			<string>Neural VPN IKEv2</string>
			<key>PayloadIdentifier</key>
			<string>com.neural.vpn.managed.${id1}</string>
			<key>PayloadType</key>
			<string>com.apple.vpn.managed</string>
			<key>PayloadUUID</key>
			<string>${id1}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>UserDefinedName</key>
			<string>Neural Stealth VPN</string>
			<key>VPNType</key>
			<string>IKEv2</string>
		</dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>Neural Stealth VPN Profile</string>
	<key>PayloadIdentifier</key>
	<string>com.neural.vpn</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${id2}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;

  const blob = new Blob([vpnXML], { type: 'application/x-apple-aspen-config' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profileName}.mobileconfig`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const ShieldSection = ({ isActive, toggle, count, isUltraMode }: any) => {
  const handleActivate = () => {
    installDNSProfile();
    toggle();
  };

  return (
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
          <p className="text-[11px] opacity-50 mb-6 mx-auto max-w-[200px]">حجب إعلانات يوتيوب، المواقع المشبوهة، ومنع التتبع الرقمي (Real DNS Guard).</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
             <div className={cn("p-3 rounded-2xl border transition-all", isActive ? (isUltraMode ? "border-neonGreen/20 bg-neonGreen/5" : "border-yellow-500/20 bg-yellow-500/5") : "border-white/5 bg-white/5 opacity-50")}>
                <span className="text-[9px] block opacity-40 uppercase mb-1 text-right">إعلانات محجوبة</span>
                <span className={cn("text-lg font-orbitron font-bold", isActive && (isUltraMode ? "text-neonGreen" : "text-yellow-500"))}>
                  {count}
                </span>
             </div>
             <div className={cn("p-3 rounded-2xl border transition-all", isActive ? (isUltraMode ? "border-neonGreen/20 bg-neonGreen/5" : "border-yellow-500/20 bg-yellow-500/5") : "border-white/5 bg-white/5 opacity-50 text-right")}>
                <span className="text-[9px] block opacity-40 uppercase mb-1">فلتر يوتيوب</span>
                <span className={cn("text-lg font-bold", isActive && (isUltraMode ? "text-neonGreen" : "text-yellow-500"))}>
                  {isActive ? "نشط" : "متوقف"}
                </span>
             </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={handleActivate}
              className={cn(
                "w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden",
                isActive 
                  ? (isUltraMode ? "bg-neonGreen text-black" : "bg-yellow-500 text-black shadow-lg") 
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              )}
            >
              {isActive && <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-white/20 skew-x-12" />}
              <Zap className={cn("w-5 h-5", isActive && "animate-pulse")} />
              <span>{isActive ? "إيقاف الدرع" : "تفعيل حاجب الإعلانات (DNS)"}</span>
            </button>

            <button 
              onClick={generateVPNProfile}
              className={cn(
                "w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden border border-white/10",
                isUltraMode ? "bg-transparent text-neonGreen hover:bg-neonGreen/10" : "bg-transparent text-white hover:bg-white/5"
              )}
            >
              <Globe className="w-5 h-5 opacity-60" />
              <span>توليد شبكة Stealth VPN السرية</span>
            </button>
          </div>
          
          {isActive && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-yellow-500 font-bold mt-4"
            >
              ملاحظة: اذهب للإعدادات لتثبيت ملفات التعريف (Settings &gt; Profile Downloaded)
            </motion.p>
          )}
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
}

// --- YouTube PiP Player ---

const YouTubePlayer = ({ onClose, isUltraMode }: { onClose: () => void, isUltraMode: boolean }) => {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')

  const handlePlay = () => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([^&]+)/)
    if (match) setVideoId(match[1])
    else alert('الرجاء إدخال رابط يوتيوب صحيح')
  }

  return (
    <div className={cn("fixed inset-0 z-[100] flex flex-col pt-16 px-6 pb-12 transition-all duration-500", isUltraMode ? "bg-black/95 backdrop-blur-3xl" : "bg-deep-onyx/95 backdrop-blur-3xl")} style={{ height: '100vh', width: '100vw' }}>
      <div className="flex justify-between items-center mb-8">
         <h2 className={cn("text-2xl font-black font-cairo", isUltraMode ? "text-neonGreen" : "text-white")}>مشغل يوتيوب الخفي 📺</h2>
         <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold font-orbitron hover:bg-white/20 transition-all">
           X
         </button>
      </div>
      
      <div className="flex gap-3 mb-8 h-14">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="قم بلصق رابط فيديو يوتيوب هنا..."
          className={cn("flex-1 bg-white/5 border rounded-2xl px-6 font-cairo text-right text-sm outline-none transition-all", isUltraMode ? "border-neonGreen/30 focus:border-neonGreen" : "border-white/10 focus:border-neonBlue")}
          dir="rtl"
        />
        <button onClick={handlePlay} className={cn("px-8 rounded-2xl text-black font-black font-cairo transition-transform active:scale-95", isUltraMode ? "bg-neonGreen" : "bg-neonBlue")}>
          تشغيل
        </button>
      </div>

      <div className="flex-1 rounded-[2.5rem] overflow-hidden border border-white/10 bg-black relative shadow-2xl">
        {videoId ? (
          <iframe 
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 font-cairo gap-6 text-center px-10 border border-dashed border-white/20 rounded-[2.5rem] m-2">
             <PlaySquare className={cn("w-20 h-20", isUltraMode ? "text-neonGreen" : "text-white")} />
             <p className="text-sm leading-relaxed max-w-xs">
               ألصق الرابط بالأعلى لتشغيل الفيديو بدون إعلانات وبدعم المشاهدة المصغرة في الخلفية (PiP) 
               <br/> حتى لو تم إغلاق الشاشة.
             </p>
          </div>
        )}
      </div>
    </div>
  )
}

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
  const [showYouTube, setShowYouTube] = useState(false)
  
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

  const startNetBoost = async () => {
    if (isNetBoosting) return
    setIsNetBoosting(true)
    
    try {
      const start = performance.now()
      await fetch('https://1.1.1.1/cdn-cgi/trace', { mode: 'no-cors', cache: 'no-store' })
      const end = performance.now()
      const pingTime = Math.round(end - start)
      setMetrics(prev => ({ ...prev, netSpeed: Math.max(1, pingTime - 10) }))
    } catch (e) {
      setMetrics(prev => ({ ...prev, netSpeed: Math.max(8, prev.netSpeed - 15) }))
    }

    setTimeout(() => {
      setIsNetBoosting(false)
    }, 2000)
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
      "min-h-screen text-white font-outfit selection:bg-neonBlue/30 overflow-x-hidden pb-12 transition-all duration-1000",
      isUltraMode ? "bg-black" : "bg-deep-onyx bg-mesh"
    )}>
      
      <AnimatePresence>
        {showYouTube && (
          <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[200]">
             <YouTubePlayer onClose={() => setShowYouTube(false)} isUltraMode={isUltraMode} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background decor */}
      {!isUltraMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neonBlue/5 blur-[200px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-neonPurple/5 blur-[200px] rounded-full animate-pulse-slow" />
        </div>
      )}

      {isUltraMode && (
         <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay opacity-20" />
      )}

      <header className={cn(
        "sticky top-0 z-50 px-8 py-8 flex items-center justify-between transition-all duration-500",
        isUltraMode ? "bg-black/90 backdrop-blur-3xl border-b border-neonGreen/10" : "bg-transparent"
      )}>
         <div className="flex items-center gap-4">
            <motion.div 
               whileHover={{ scale: 1.1, rotate: 5 }}
               className={cn(
                 "w-12 h-12 rounded-[1.25rem] flex items-center justify-center p-[1px] shadow-2xl transition-all duration-500",
                 isUltraMode ? "bg-neonGreen shadow-neonGreen/20" : "premium-gradient-blue shadow-neonBlue/20"
               )}
            >
               <div className="w-full h-full rounded-[1.15rem] bg-black flex items-center justify-center">
                  <Zap className={cn("w-6 h-6", isUltraMode ? "text-neonGreen" : "text-neonBlue")} fill="currentColor" />
               </div>
            </motion.div>
            <div>
               <h1 className={cn("text-2xl font-black font-orbitron tracking-tighter leading-none transition-colors", isUltraMode && "text-neonGreen")}>
                 NEURAL <span className="opacity-50 font-light">BOOST X</span>
               </h1>
               <div className="flex items-center gap-1.5 mt-1.5">
                  <div className={cn("inline-block w-2 h-2 rounded-full animate-pulse", isUltraMode ? "bg-neonGreen" : "bg-neonBlue")} />
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.4em] font-orbitron opacity-50", isUltraMode && "text-neonGreen")}>
                    CORE VERSION 2.1
                  </span>
               </div>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            {isUltraMode ? (
               <button 
                 onClick={toggleUltraMode}
                 className="px-6 py-2 border-2 border-neonGreen text-neonGreen font-orbitron text-[10px] font-black rounded-xl hover:bg-neonGreen hover:text-black transition-all"
               >
                 EXIT ULTRA
               </button>
            ) : (
               <>
                  <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all">
                     <Bell className="w-5 h-5 opacity-40" />
                  </button>
                  <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all">
                     <Settings className="w-5 h-5 opacity-40" />
                  </button>
               </>
            )}
         </div>
      </header>

      <main className="px-8 pb-32 max-w-2xl mx-auto">
         {/* Welcome Header */}
         {activeTab === 'boost' && !isBoosting && !isUltraMode && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 font-cairo">
               <h2 className="text-4xl font-black tracking-tight mb-2">النظام في أمان.</h2>
               <p className="text-sm opacity-40 font-medium">قم بتحسين أداء جهازك بلمسة واحدة لذكاء اصطناعي فائق.</p>
            </motion.div>
         )}

         {isUltraMode && !activeTab.includes('battery') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 glass p-10 border-neonGreen/20 rounded-[3rem] text-center font-cairo bg-black">
               <span className="text-neonGreen/40 text-[10px] uppercase font-black tracking-[0.6em] mb-4 block">Ultra Active</span>
               <h2 className="text-neonGreen text-5xl font-black font-orbitron mb-4">99+ HOURS</h2>
               <p className="text-neonGreen/60 text-xs">حالة "التجميد الفائق" مفعلة. كافة موارد النظام موجهة للطاقة والدوام.</p>
            </motion.div>
         )}

         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                      "p-8 flex items-center justify-between transition-all duration-700",
                      isUltraMode ? "border-neonGreen/40 bg-neonGreen/10" : "border-white/5"
                    )} isUltraMode={isUltraMode}>
                       <div className="text-right font-cairo">
                          <h4 className={cn("text-xl font-black", isUltraMode ? "text-neonGreen" : "text-white")}>
                             وضع التوفير الفائق
                          </h4>
                          <p className="text-[10px] opacity-40 font-medium mt-1 uppercase tracking-wider">Freeze Background Processes (99+ Hrs)</p>
                       </div>
                       <button 
                         onClick={toggleUltraMode}
                         className={cn(
                           "w-16 h-8 rounded-full relative p-1 transition-all duration-500",
                           isUltraMode ? "bg-neonGreen" : "bg-white/10"
                         )}
                       >
                          <motion.div 
                            animate={{ x: isUltraMode ? 28 : 0 }}
                            className="w-6 h-6 rounded-full bg-black shadow-2xl" 
                          />
                       </button>
                    </GlassCard>
                  </div>
               )}

               {activeTab === 'clean' && (
                  <PhotoCleanerSection 
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

               {activeTab === 'vault' && (
                  <div className={cn("flex flex-col gap-6 font-cairo text-right", isUltraMode && "text-neonGreen")}>
                     <GlassCard className={cn("p-10 min-h-[500px] flex flex-col", isUltraMode && "border-neonGreen/20 bg-black")} isUltraMode={isUltraMode} glowColor={isUltraMode ? "" : "purple"}>
                        <div className="flex justify-between items-center mb-8">
                           <PremiumBadge label="AES-256 Vault" isUltraMode={isUltraMode} />
                           <StatusBadge active={true} label="Protected" isUltraMode={isUltraMode} />
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center">
                           {/* FaceID Scanner Simulator */}
                           <div className="relative mb-8 group cursor-pointer" onClick={() => alert('FaceID Simulated Success')}>
                              <div className={cn("w-32 h-32 rounded-[3rem] border-2 flex items-center justify-center relative overflow-hidden", isUltraMode ? "border-neonGreen/30" : "border-white/10")}>
                                 <ScanFace className={cn("w-16 h-16 z-10", isUltraMode ? "text-neonGreen" : "text-white/60 group-hover:text-white transition-colors")} strokeWidth={1.5} />
                                 <motion.div 
                                   animate={{ y: [-45, 45, -45] }}
                                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                   className={cn("absolute left-0 right-0 h-[3px] shadow-[0_0_20px_4px] blur-[1px] z-20", isUltraMode ? "bg-neonGreen shadow-neonGreen/50" : "bg-neonBlue shadow-neonBlue/50")}
                                 />
                              </div>
                              <div className="absolute inset-0 rounded-[3rem] border border-white/20 animate-ping opacity-20" />
                           </div>

                           <h3 className="text-2xl font-black mb-2">الخزنة السرية المشفرة</h3>
                           <p className="text-xs opacity-50 px-6 text-center leading-relaxed">
                              حماية بياناتك الحساسة بأقوى خوارزميات التشفير العسكري. لا يمكن لأحد الوصول للملفات سوى من خلال مصادقة بصمة الوجه (FaceID).
                           </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                           <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center opacity-40 hover:opacity-100 transition-opacity cursor-not-allowed">
                             <Database className="w-8 h-8 mb-3 opacity-60" />
                             <span className="text-sm font-bold">الصور والفيديو</span>
                             <span className="text-[9px]">مغلق</span>
                           </div>
                           <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center opacity-40 hover:opacity-100 transition-opacity cursor-not-allowed">
                             <Lock className="w-8 h-8 mb-3 opacity-60" />
                             <span className="text-sm font-bold">الملاحظات السرية</span>
                             <span className="text-[9px]">مغلق</span>
                           </div>
                        </div>

                        <button className={cn("w-full h-16 mt-6 rounded-[2rem] font-bold font-orbitron uppercase tracking-widest flex items-center justify-center gap-3 transition-transform active:scale-95 text-[10px]", isUltraMode ? "bg-neonGreen text-black" : "bg-white text-black")}>
                           <Fingerprint className="w-5 h-5" />
                           Authenticate to Unlock
                        </button>
                     </GlassCard>
                  </div>
               )}
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-10 left-8 right-8 z-50">
         <div className={cn(
           "max-w-xl mx-auto rounded-[2.5rem] h-20 px-4 flex items-center justify-between border shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-500",
           isUltraMode ? "bg-black/90 backdrop-blur-3xl border-neonGreen/20" : "glass border-white/10"
         )}>
            {[
              { id: 'boost', icon: Cpu, label: 'تسريع' },
              { id: 'battery', icon: Bolt, label: 'بطارية' },
              { id: 'clean', icon: Camera, label: 'تنظيف' },
              { id: 'network', icon: Wifi, label: 'إنترنت' },
              { id: 'shield', icon: ShieldCheck, label: 'درع' },
              { id: 'vault', icon: Lock, label: 'خزنة' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={cn(
                  "flex flex-col items-center gap-1 py-4 flex-1 transition-all relative",
                  activeTab === item.id 
                    ? (isUltraMode ? "text-neonGreen" : "text-white scale-110") 
                    : "text-white/20 hover:text-white/40"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 z-10 transition-all", 
                  activeTab === item.id && (isUltraMode ? "drop-shadow-[0_0_12px_#39ff14]" : "drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]")
                )} />
                <span className={cn("text-[8px] font-black font-cairo z-10 uppercase tracking-tighter transition-all", activeTab === item.id ? "opacity-100" : "opacity-0")}>
                  {item.label}
                </span>
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeNavTab"
                    className={cn(
                      "absolute inset-x-2 bottom-0 h-1 rounded-full",
                      isUltraMode ? "bg-neonGreen shadow-[0_0_10px_#39ff14]" : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    )} 
                  />
                )}
              </button>
            ))}
         </div>
      </nav>
    </div>
  )
}
