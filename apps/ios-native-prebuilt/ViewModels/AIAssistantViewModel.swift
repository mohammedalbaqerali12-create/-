import SwiftUI
import Combine

struct ChatMessage: Identifiable {
    let id = UUID()
    let content: String
    let isUser: Bool
    let timestamp = Date()
}

class AIAssistantViewModel: ObservableObject {
    @Published var messages: [ChatMessage] = []
    @Published var isTyping: Bool = false
    @Published var inputText: String = ""
    
    init() {
        self.messages = [
            ChatMessage(content: "Ω: NEURAL LINK ESTABLISHED. HOW CAN I OPTIMIZE YOUR EXPERIENCE?", isUser: false)
        ]
    }
    
    func sendMessage() {
        guard !inputText.isEmpty else { return }
        
        let userMessage = ChatMessage(content: inputText, isUser: true)
        messages.append(userMessage)
        let query = inputText
        inputText = ""
        
        isTyping = true
        
        // Simulate AI response based on context
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            let response = self.generateAIResponse(for: query)
            self.messages.append(ChatMessage(content: "Ω: \(response)", isUser: false))
            self.isTyping = false
        }
    }
    
    private func generateAIResponse(for query: String) -> String {
        let q = query.lowercased()
        if q.contains("slow") {
            return "DETECTING 14 INACTIVE BACKGROUND PROCESSES. RUN A BOOST SCAN TO RECLAIM 2.4GB MEMORY ADDRESS SPACE."
        } else if q.contains("battery") {
            return "ENERGY DRAIN AT 15.4% PER HOUR. ADVISE DISABLING BACKGROUND REFRESH FOR SOCIAL APPS AND REDUCING BRIGHTNESS TO 40%."
        } else if q.contains("space") || q.contains("storage") {
            return "STORAGE ANALYZED. 1.2GB OF DUPLICATE MEDIA DETECTED. VISIT THE CLEANING MODULE TO FLUSH DATA."
        } else {
            return "COMMAND LOGGED. SYSTEM ANALYTICS INDICATE STABILITY AT 98%. MAINTAINING PEAK PERFORMANCE PROTOCOLS."
        }
    }
}
