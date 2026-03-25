import SwiftUI

struct ChatView: View {
    @ObservedObject var viewModel: AIAssistantViewModel
    @State private var scrollProxy: ScrollViewProxy?
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 500)
            .overlay(
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading, spacing: 5) {
                            Text("AI ASSISTANT (Ω)")
                                .font(.system(size: 16, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            Text("NEURAL NETWORK LINKED")
                                .font(.system(size: 10, weight: .semibold, design: .monospaced))
                                .foregroundColor(AppTheme.neonBlue)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "cpu.fill")
                            .foregroundColor(AppTheme.neonBlue)
                            .font(.system(size: 20))
                            .shadow(color: AppTheme.neonBlue.opacity(0.8), radius: 5)
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    
                    ScrollView {
                        ScrollViewReader { proxy in
                            VStack(spacing: 15) {
                                ForEach(viewModel.messages) { message in
                                    HStack {
                                        if message.isUser { Spacer() }
                                        
                                        VStack(alignment: message.isUser ? .trailing : .leading, spacing: 4) {
                                            HStack(spacing: 4) {
                                                if !message.isUser {
                                                    Text("CONFIDENCE: 98.4%")
                                                        .font(.system(size: 7, weight: .bold, design: .monospaced))
                                                        .foregroundColor(AppTheme.neonBlue)
                                                        .padding(.horizontal, 4)
                                                        .padding(.vertical, 2)
                                                        .background(AppTheme.neonBlue.opacity(0.1))
                                                        .cornerRadius(4)
                                                }
                                                
                                                Text(message.timestamp, style: .time)
                                                    .font(.caption2)
                                                    .foregroundColor(.white.opacity(0.4))
                                            }
                                            
                                            Text(message.content)
                                                .font(.system(size: 14, weight: .medium, design: .monospaced))
                                                .padding(12)
                                                .background(
                                                    message.isUser ? 
                                                    AppTheme.cyberPurple.opacity(0.3) : 
                                                    AppTheme.neonBlue.opacity(0.2)
                                                )
                                                .cornerRadius(12)
                                                .foregroundColor(.white)
                                        }
                                        
                                        if !message.isUser { Spacer() }
                                    }
                                }
                                
                                if viewModel.isTyping {
                                    HStack {
                                        Text("Ω: PROCESSING...")
                                            .font(.system(size: 12, weight: .semibold, design: .monospaced))
                                            .foregroundColor(AppTheme.neonBlue)
                                            .italic()
                                        Spacer()
                                    }
                                }
                            }
                            .padding(20)
                            .onChange(of: viewModel.messages.count) { _ in
                                withAnimation {
                                    proxy.scrollTo(viewModel.messages.last?.id, anchor: .bottom)
                                }
                            }
                        }
                    }
                    
                    HStack(spacing: 10) {
                        TextField("QUERY SYSTEM...", text: $viewModel.inputText)
                            .font(.system(size: 14, weight: .medium, design: .monospaced))
                            .padding(12)
                            .background(Color.white.opacity(0.05))
                            .cornerRadius(10)
                            .foregroundColor(.white)
                        
                        Button(action: { viewModel.sendMessage() }) {
                            Image(systemName: "paperplane.fill")
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(.white)
                                .padding(12)
                                .background(AppTheme.cyberPurple)
                                .cornerRadius(10)
                        }
                    }
                    .padding(15)
                    .background(Color.white.opacity(0.05))
                }
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 20)
    }
}
#Preview {
    ChatView(viewModel: AIAssistantViewModel())
}
