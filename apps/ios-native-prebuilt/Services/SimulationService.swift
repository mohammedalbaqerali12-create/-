import SwiftUI
import Combine

struct DeviceMetrics {
    var healthScore: Int // 0-1000
    var batteryLevel: Int // 0-100
    var batteryTemp: Double // C
    var backgroundApps: Int
    var storageUsedGB: Double
    var storageTotalGB: Double
    var ping: Int // ms
    var signalStability: Double // 0-1
}

class SimulationService: ObservableObject {
    @Published var metrics: DeviceMetrics
    private var timer: AnyCancellable?
    
    init() {
        self.metrics = DeviceMetrics(
            healthScore: 742,
            batteryLevel: 65,
            batteryTemp: 34.2,
            backgroundApps: 12,
            storageUsedGB: 110.5,
            storageTotalGB: 256.0,
            ping: 45,
            signalStability: 0.88
        )
        
        startSimulation()
    }
    
    private func startSimulation() {
        timer = Timer.publish(every: 3.0, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in
                self?.updateMetrics()
            }
    }
    
    private func updateMetrics() {
        // Subtle variations
        metrics.healthScore += Int.random(in: -2...2)
        metrics.batteryLevel = max(0, min(100, metrics.batteryLevel + Int.random(in: -1...0)))
        metrics.batteryTemp += Double.random(in: -0.2...0.2)
        metrics.ping = max(10, min(200, metrics.ping + Int.random(in: -5...5)))
        metrics.signalStability = max(0, min(1, metrics.signalStability + Double.random(in: -0.05...0.05)))
    }
    
    func performBoost(onComplete: @escaping () -> Void) {
        // Boost simulation steps
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.metrics.healthScore = min(1000, self.metrics.healthScore + 50)
            self.metrics.backgroundApps = max(3, self.metrics.backgroundApps - 8)
            self.metrics.ping = max(15, self.metrics.ping - 10)
            onComplete()
        }
    }
}
