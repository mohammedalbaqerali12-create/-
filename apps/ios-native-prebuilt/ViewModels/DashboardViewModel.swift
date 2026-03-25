import SwiftUI
import Combine

class DashboardViewModel: ObservableObject {
    @Published var healthScore: Int = 0
    @Published var batteryLevel: Int = 0
    @Published var batteryTemp: Double = 0.0
    @Published var backgroundApps: Int = 0
    @Published var ping: Int = 0
    @Published var loadingProgress: Double = 0.0
    @Published var isBoosting: Bool = false
    @Published var boostStatus: String = "IDLE"
    @Published var healthHistory: [Int] = (0..<20).map { _ in Int.random(in: 600...800) }
    
    private var simulation: SimulationService
    private var cancellables = Set<AnyCancellable>()
    
    init(simulation: SimulationService) {
        self.simulation = simulation
        
        simulation.$metrics
            .sink { [weak self] metrics in
                self?.healthScore = metrics.healthScore
                self?.batteryLevel = metrics.batteryLevel
                self?.batteryTemp = metrics.batteryTemp
                self?.backgroundApps = metrics.backgroundApps
                self?.ping = metrics.ping
            }
            .store(in: &cancellables)
    }
    
    func startBoost() {
        guard !isBoosting else { return }
        isBoosting = true
        loadingProgress = 0.0
        boostStatus = "SCANNING SYSTEM CORE..."
        
        Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { timer in
            self.loadingProgress += 0.02
            
            if self.loadingProgress < 0.3 { self.boostStatus = "ANALYZING RECENT APP USAGE..." }
            else if self.loadingProgress < 0.6 { self.boostStatus = "PURGING INACTIVE MEMORY BLOCKS..." }
            else if self.loadingProgress < 0.9 { self.boostStatus = "OPTIMIZING NETWORK INTERFACE..." }
            else { self.boostStatus = "INTEGRITY CHECK COMPLETE." }
            
            if self.loadingProgress >= 1.0 {
                timer.invalidate()
                self.simulation.performBoost {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                        self.isBoosting = false
                        self.loadingProgress = 0.0
                        self.boostStatus = "SYSTEM OPTIMIZED"
                    }
                }
            }
        }
    }
}
