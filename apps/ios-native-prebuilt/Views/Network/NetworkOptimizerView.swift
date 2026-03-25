import SwiftUI

struct NetworkOptimizerView: View {
    @State private var pingHistory: [Int] = (0..<30).map { _ in Int.random(in: 40...120) }
    @State private var dnsStatus: String = "AUTOMATIC"
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 520)
            .shadow(color: AppTheme.neonBlue.opacity(0.3), radius: 20)
            .overlay(
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("NETWORK OPTIMIZER")
                                .font(.system(size: 16, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            Text("TARGET: LATENCY REDUCTION")
                                .font(.system(size: 10, weight: .semibold, design: .monospaced))
                                .foregroundColor(AppTheme.neonBlue)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "antenna.radiowaves.left.and.right")
                            .foregroundColor(AppTheme.neonBlue)
                            .font(.system(size: 20))
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    
                    VStack(alignment: .leading, spacing: 15) {
                        Text("PING HISTORY (ms)")
                            .font(.system(size: 11, weight: .bold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.7))
                        
                        // Ping Graph
                        ZStack(alignment: .bottom) {
                            RoundedRectangle(cornerRadius: 15)
                                .fill(Color.white.opacity(0.05))
                                .frame(height: 180)
                            
                            HStack(alignment: .bottom, spacing: 2) {
                                ForEach(0..<pingHistory.count, id: \.self) { i in
                                    let height = CGFloat(pingHistory[i]) / 200 * 180
                                    
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(
                                            LinearGradient(
                                                colors: [
                                                    pingHistory[i] > 100 ? .red : AppTheme.neonBlue,
                                                    AppTheme.cyberPurple
                                                ],
                                                startPoint: .top,
                                                endPoint: .bottom
                                            )
                                        )
                                        .frame(width: 8, height: min(height, 180))
                                }
                            }
                            .padding(.horizontal, 10)
                            .padding(.bottom, 10)
                        }
                        .overlay(
                            RoundedRectangle(cornerRadius: 15)
                                .stroke(AppTheme.neonBlue.opacity(0.2), lineWidth: 1)
                        )
                        
                        VStack(spacing: 15) {
                            HStack {
                                Label("DNS RESOLVER:", systemImage: "bolt.fill")
                                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                                    .foregroundColor(.white.opacity(0.8))
                                
                                Spacer()
                                
                                Text(dnsStatus)
                                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                                    .foregroundColor(AppTheme.neonBlue)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 4)
                                    .background(AppTheme.neonBlue.opacity(0.1))
                                    .cornerRadius(6)
                            }
                            
                            Button(action: { optimizeDns() }) {
                                Text("SWITCH TO CLOUDFLARE 1.1.1.1")
                                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                                    .foregroundColor(.white)
                                    .padding(12)
                                    .frame(maxWidth: .infinity)
                                    .background(AppTheme.neonBlue.opacity(0.2))
                                    .cornerRadius(10)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 10)
                                            .stroke(AppTheme.neonBlue, lineWidth: 1)
                                    )
                            }
                            
                            VStack(alignment: .leading, spacing: 8) {
                                Text("QUICK TIPS:")
                                    .font(.system(size: 10, weight: .bold, design: .monospaced))
                                    .foregroundColor(.white.opacity(0.5))
                                
                                Text("• Disable Wi-Fi Assist to avoid cellular packet loss.")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.white)
                                
                                Text("• Set static IP for local gateway stability.")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.white)
                            }
                            .padding(.top, 5)
                        }
                        .padding(.top, 5)
                    }
                    .padding(20)
                }
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 20)
            .onAppear {
                startPingSimulation()
            }
    }
    
    private func optimizeDns() {
        withAnimation {
            dnsStatus = "CLOUDFLARE 1.1.1.1"
            // Simulate instant latency drop
            for i in pingHistory.indices {
                pingHistory[i] = Int(Double(pingHistory[i]) * 0.8)
            }
        }
    }
    
    private func startPingSimulation() {
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            withAnimation {
                pingHistory.removeFirst()
                let base = dnsStatus == "AUTOMATIC" ? 80 : 50
                pingHistory.append(Int.random(in: (base-10)...(base+30)))
            }
        }
    }
}
