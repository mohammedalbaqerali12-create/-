import SwiftUI

struct AppTheme {
    static let neonBlue = Color(red: 0.12, green: 0.61, blue: 0.96)
    static let cyberPurple = Color(red: 0.58, green: 0.28, blue: 0.94)
    static let deepDeepOnyx = Color(red: 0.05, green: 0.05, blue: 0.07)
    static let panelBackground = Color.white.opacity(0.1)
    static let borderGradient = LinearGradient(
        colors: [neonBlue.opacity(0.6), cyberPurple.opacity(0.6)],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static func glassmorphicPanel() -> AnyView {
        AnyView(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.white.opacity(0.05))
                .background(
                    BlurView(style: .systemThinMaterialDark)
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(borderGradient, lineWidth: 1)
                )
        )
    }
}

struct BlurView: UIViewRepresentable {
    var style: UIBlurEffect.Style
    
    func makeUIView(context: Context) -> UIVisualEffectView {
        let view = UIVisualEffectView(effect: UIBlurEffect(style: style))
        return view
    }
    
    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {}
}
