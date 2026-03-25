import SwiftUI

struct HealthGauge: View {
    var score: Int
    var isBoosting: Bool
    var progress: Double
    
    var body: some View {
        ZStack {
            // Background Circle
            Circle()
                .stroke(AppTheme.panelBackground, lineWidth: 20)
                .frame(width: 260, height: 260)
            
            // Neon Glow Shadow
            Circle()
                .stroke(AppTheme.neonBlue.opacity(0.3), lineWidth: 40)
                .blur(radius: 15)
                .frame(width: 260, height: 260)
            
            // Progress Ring
            Circle()
                .trim(from: 0, to: isBoosting ? progress : CGFloat(score) / 1000.0)
                .stroke(
                    AngularGradient(
                        colors: [AppTheme.neonBlue, AppTheme.cyberPurple, AppTheme.neonBlue],
                        center: .center
                    ),
                    style: StrokeStyle(lineWidth: 18, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 1.0), value: score)
                .frame(width: 260, height: 260)
            
            VStack(spacing: 4) {
                Text(isBoosting ? "\(Int(progress * 100))%" : "\(score)")
                    .font(.system(size: 64, weight: .bold, design: .monospaced))
                    .foregroundColor(.white)
                    .shadow(color: AppTheme.neonBlue.opacity(0.6), radius: 10, x: 0, y: 0)
                
                Text(isBoosting ? "BOOSTING..." : "SYSTEM HEALTH")
                    .font(.system(size: 14, weight: .semibold, design: .default))
                    .foregroundColor(AppTheme.neonBlue)
                    .tracking(2.0)
                    .opacity(0.8)
            }
        }
        .padding(40)
    }
}
