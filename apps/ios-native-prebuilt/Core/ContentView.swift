import SwiftUI

struct ParticleEmitterView: View {
    @State private var particles: [Particle] = (0..<40).map { _ in Particle.random() }
    
    struct Particle: Identifiable {
        let id = UUID()
        var position: CGPoint
        var velocity: CGPoint
        var size: CGFloat
        var opacity: Double
        
        static func random() -> Particle {
            Particle(
                position: CGPoint(x: CGFloat.random(in: 0...UIScreen.main.bounds.width),
                                 y: CGFloat.random(in: 0...UIScreen.main.bounds.height)),
                velocity: CGPoint(x: CGFloat.random(in: -0.2...0.2),
                                  y: CGFloat.random(in: -0.2...0.2)),
                size: CGFloat.random(in: 1...3),
                opacity: Double.random(in: 0.1...0.3)
            )
        }
    }
    
    private let timer = Timer.publish(every: 0.05, on: .main, in: .common).autoconnect()
    
    var body: some View {
        Canvas { context, size in
            for particle in particles {
                let rect = CGRect(origin: particle.position, size: CGSize(width: particle.size, height: particle.size))
                context.opacity = particle.opacity
                context.fill(Path(ellipseIn: rect), with: .color(AppTheme.neonBlue))
            }
        }
        .onReceive(timer) { _ in
            for i in particles.indices {
                particles[i].position.x += particles[i].velocity.x
                particles[i].position.y += particles[i].velocity.y
                
                if particles[i].position.x < 0 || particles[i].position.x > UIScreen.main.bounds.width {
                    particles[i].velocity.x *= -1
                }
                if particles[i].position.y < 0 || particles[i].position.y > UIScreen.main.bounds.height {
                    particles[i].velocity.y *= -1
                }
            }
        }
        .edgesIgnoringSafeArea(.all)
    }
}

struct ContentView: View {
    @StateObject private var dashboardVM = DashboardViewModel(simulation: SimulationService())
    @StateObject private var assistantVM = AIAssistantViewModel()
    @State private var selectedTab = 0
    
    var body: some View {
        ZStack(alignment: .bottom) {
            AppTheme.deepDeepOnyx.edgesIgnoringSafeArea(.all)
            ParticleEmitterView()
            
            // Content
            VStack(spacing: 0) {
                if selectedTab == 0 {
                    DashboardView(viewModel: dashboardVM)
                        .transition(.opacity)
                } else if selectedTab == 1 {
                    ChatView(viewModel: assistantVM)
                        .transition(.move(edge: .trailing))
                } else if selectedTab == 2 {
                    ToolsView()
                        .transition(.move(edge: .bottom))
                } else if selectedTab == 3 {
                    RanksAndMissionsView()
                        .transition(.opacity)
                }
                
                Spacer()
            }
            .padding(.bottom, 90) // Space for tab bar
            
            // Custom Futuristic Tab Bar
            customTabBar
        }
    }
    
    var customTabBar: some View {
        HStack {
            Spacer()
            tabIcon(index: 0, icon: "cpu.fill", label: "BOOST")
            Spacer()
            tabIcon(index: 1, icon: "brain.head.profile", label: "AI")
            Spacer()
            tabIcon(index: 2, icon: "wrench.and.screwdriver.fill", label: "TOOLS")
            Spacer()
            tabIcon(index: 3, icon: "crown.fill", label: "RANK")
            Spacer()
        }
        .frame(height: 80)
        .background(
            ZStack {
                BlurView(style: .systemThinMaterialDark)
                    .clipShape(Capsule())
                Capsule()
                    .stroke(AppTheme.borderGradient, lineWidth: 1)
            }
        )
        .padding(.horizontal, 20)
        .padding(.bottom, 10)
    }
    
    func tabIcon(index: Int, icon: String, label: String) -> some View {
        Button(action: {
            withAnimation(.spring()) {
                selectedTab = index
            }
        }) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 22, weight: selectedTab == index ? .bold : .medium))
                    .foregroundColor(selectedTab == index ? AppTheme.neonBlue : .white.opacity(0.4))
                    .shadow(color: selectedTab == index ? AppTheme.neonBlue : .clear, radius: 10)
                
                Text(label)
                    .font(.system(size: 8, weight: .black, design: .monospaced))
                    .foregroundColor(selectedTab == index ? .white : .white.opacity(0.4))
            }
        }
    }
}

struct DashboardView: View {
    @ObservedObject var viewModel: DashboardViewModel
    
    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("NEURAL BOOST X")
                            .font(.system(size: 24, weight: .black, design: .monospaced))
                            .foregroundColor(.white)
                            .shadow(color: AppTheme.neonBlue.opacity(0.8), radius: 5)
                        
                        Text("STATUS: SAFE MODE ACTIVE")
                            .font(.system(size: 10, weight: .semibold, design: .monospaced))
                            .foregroundColor(AppTheme.neonBlue)
                            .opacity(0.8)
                    }
                    
                    Spacer()
                    
                    Circle()
                        .fill(Color.green.opacity(0.2))
                        .frame(width: 40, height: 40)
                        .overlay(
                            Image(systemName: "checkmark.shield.fill")
                                .foregroundColor(.green)
                        )
                }
                .padding(.horizontal, 24)
                .padding(.top, 20)
                
                HealthGauge(
                    score: viewModel.healthScore,
                    isBoosting: viewModel.isBoosting,
                    progress: viewModel.loadingProgress
                )
                
                VStack(spacing: 20) {
                    HStack(spacing: 20) {
                        MetricCard(
                            title: "ENERGY",
                            value: "\(viewModel.batteryLevel)%",
                            subtitle: "\(String(format: "%.1f", viewModel.batteryTemp))°C / OPTIMAL",
                            icon: "bolt.fill",
                            color: .orange
                        )
                        
                        MetricCard(
                            title: "NETWORK",
                            value: "\(viewModel.ping)ms",
                            subtitle: "PING REDUCTION ACTIVE",
                            icon: "wifi",
                            color: AppTheme.neonBlue
                        )
                    }
                    
                    HStack(spacing: 20) {
                        MetricCard(
                            title: "APPS",
                            value: "\(viewModel.backgroundApps)",
                            subtitle: "IDLE BACKGROUND TASKS",
                            icon: "square.stack.3d.up.fill",
                            color: AppTheme.cyberPurple
                        )
                        
                        MetricCard(
                            title: "CLEANUP",
                            value: "0.8 GB",
                            subtitle: "POTENTIAL UNLOCK SPACE",
                            icon: "trash.fill",
                            color: .pink
                        )
                    }
                }
                .padding(.horizontal, 24)
                
                Button(action: { viewModel.startBoost() }) {
                    AppTheme.glassmorphicPanel()
                        .frame(height: 70)
                        .overlay(
                            HStack {
                                Image(systemName: "bolt.ring.closed")
                                    .font(.system(size: 24, weight: .bold))
                                Text(viewModel.boostStatus)
                                    .font(.system(size: 16, weight: .bold, design: .monospaced))
                            }
                            .foregroundColor(.white)
                            .shadow(color: AppTheme.cyberPurple.opacity(0.8), radius: 10)
                        )
                }
                .padding(.horizontal, 24)
                .disabled(viewModel.isBoosting)
                
                // Privacy & Safety Disclaimer
                VStack(alignment: .leading, spacing: 5) {
                    HStack(spacing: 8) {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.white.opacity(0.5))
                            .font(.system(size: 12))
                        Text("NOTICE: PRIVACY & SYSTEM INTEGRITY")
                            .font(.system(size: 10, weight: .bold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.6))
                    }
                    Text("Neural Boost X provides simulated optimization based on real system metrics. No actual system modifications are performed. Your data remains fully encrypted and local.")
                        .font(.system(size: 9, weight: .medium))
                        .foregroundColor(.white.opacity(0.4))
                        .lineLimit(2)
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 20)
            }
        }
    }
}

// Helper view for the Tools Tab
struct ToolsView: View {
    @State private var selectedTool: Int = 0 // 0: cleaning, 1: network, 2: battery
    
    var body: some View {
        VStack(spacing: 0) {
            Picker("", selection: $selectedTool) {
                Text("CLEANING").tag(0)
                Text("NETWORK").tag(1)
                Text("BATTERY").tag(2)
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            if selectedTool == 0 {
                StorageManagerView()
            } else if selectedTool == 1 {
                NetworkOptimizerView()
            } else {
                BatteryAIDetailsView()
            }
            
            Spacer()
        }
    }
}

