import SwiftUI

struct MetricCard: View {
    var title: String
    var value: String
    var subtitle: String
    var icon: String
    var color: Color
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 140)
            .overlay(
                VStack(alignment: .leading, spacing: 5) {
                    HStack {
                        Image(systemName: icon)
                            .foregroundColor(color)
                            .font(.system(size: 20, weight: .bold))
                        
                        Spacer()
                        
                        Text(title)
                            .font(.system(size: 13, weight: .semibold, design: .default))
                            .foregroundColor(.white.opacity(0.6))
                            .tracking(1.2)
                    }
                    .padding(.bottom, 5)
                    
                    Text(value)
                        .font(.system(size: 28, weight: .bold, design: .monospaced))
                        .foregroundColor(.white)
                        .shadow(color: color.opacity(0.3), radius: 5)
                    
                    Text(subtitle)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(color.opacity(0.8))
                        .padding(.top, 2)
                    
                    Spacer()
                }
                .padding(18)
            )
    }
}
