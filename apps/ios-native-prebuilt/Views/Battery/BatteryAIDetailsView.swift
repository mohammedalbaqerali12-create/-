import SwiftUI

struct BatteryAIDetailsView: View {
    @State private var batteryLevels: [Double] = (0..<24).map { _ in Double.random(in: 40...90) }
    @State private var drainRate: String = "12.5%"
    @State private var timeRemaining: String = "08:45"
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 540)
            .shadow(color: .orange.opacity(0.3), radius: 20)
            .overlay(
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("BATTERY AI ENGINE")
                                .font(.system(size: 16, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            Text("TARGET: ENERGY EFFICIENCY")
                                .font(.system(size: 10, weight: .semibold, design: .monospaced))
                                .foregroundColor(.orange)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "bolt.batteryblock.fill")
                            .foregroundColor(.orange)
                            .font(.system(size: 20))
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    
                    VStack(alignment: .leading, spacing: 20) {
                        HStack(spacing: 20) {
                            VStack(alignment: .leading, spacing: 5) {
                                Text("EST. REMAINING")
                                    .font(.system(size: 10, weight: .bold, design: .monospaced))
                                    .foregroundColor(.white.opacity(0.5))
                                
                                Text(timeRemaining)
                                    .font(.system(size: 24, weight: .black, design: .monospaced))
                                    .foregroundColor(.white)
                            }
                            
                            Divider()
                                .frame(height: 40)
                                .background(Color.white.opacity(0.2))
                            
                            VStack(alignment: .leading, spacing: 5) {
                                Text("DRAIN RATE")
                                    .font(.system(size: 10, weight: .bold, design: .monospaced))
                                    .foregroundColor(.white.opacity(0.5))
                                
                                Text(drainRate)
                                    .font(.system(size: 24, weight: .black, design: .monospaced))
                                    .foregroundColor(.orange)
                            }
                        }
                        
                        VStack(alignment: .leading, spacing: 10) {
                            Text("USAGE HEATMAP (24H)")
                                .font(.system(size: 11, weight: .bold, design: .monospaced))
                                .foregroundColor(.white.opacity(0.7))
                            
                            // Battery Levels Chart
                            ZStack(alignment: .bottom) {
                                RoundedRectangle(cornerRadius: 15)
                                    .fill(Color.white.opacity(0.05))
                                    .frame(height: 160)
                                
                                HStack(alignment: .bottom, spacing: 4) {
                                    ForEach(0..<batteryLevels.count, id: \.self) { i in
                                        let height = batteryLevels[i] / 100 * 160
                                        
                                        RoundedRectangle(cornerRadius: 3)
                                            .fill(
                                                LinearGradient(
                                                    colors: [
                                                        batteryLevels[i] < 30 ? .red : .orange,
                                                        AppTheme.cyberPurple.opacity(0.5)
                                                    ],
                                                    startPoint: .top,
                                                    endPoint: .bottom
                                                )
                                            )
                                            .frame(width: 8, height: min(height, 160))
                                    }
                                }
                                .padding(.horizontal, 10)
                                .padding(.bottom, 10)
                            }
                            .overlay(
                                RoundedRectangle(cornerRadius: 15)
                                    .stroke(Color.orange.opacity(0.2), lineWidth: 1)
                            )
                        }
                        
                        VStack(alignment: .leading, spacing: 10) {
                            Text("PREDICTIVE OPTIMIZATION:")
                                .font(.system(size: 10, weight: .bold, design: .monospaced))
                                .foregroundColor(.white.opacity(0.5))
                            
                            AppTheme.glassmorphicPanel()
                                .frame(height: 80)
                                .overlay(
                                    HStack(spacing: 15) {
                                        Image(systemName: "lightbulb.fill")
                                            .foregroundColor(.orange)
                                            .font(.system(size: 22))
                                        
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text("LOW POWER PROTOCOL")
                                                .font(.system(size: 12, weight: .bold, design: .monospaced))
                                                .foregroundColor(.white)
                                            
                                            Text("AI predicts 30% drain in next 2h. Activate adaptive peak power limiting?")
                                                .font(.system(size: 10, weight: .medium))
                                                .foregroundColor(.white.opacity(0.7))
                                        }
                                        
                                        Spacer()
                                        
                                        Toggle("", isOn: .constant(true))
                                            .toggleStyle(SwitchToggleStyle(tint: .orange))
                                            .scaleEffect(0.8)
                                    }
                                    .padding(.horizontal, 15)
                                )
                        }
                    }
                    .padding(20)
                }
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 20)
    }
}
