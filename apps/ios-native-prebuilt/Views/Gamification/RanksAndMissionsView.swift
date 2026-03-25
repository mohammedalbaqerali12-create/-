import SwiftUI

struct DailyMission: Identifiable {
    let id = UUID()
    let title: String
    let points: Int
    var isCompleted: Bool
    let typeIcon: String
}

struct RanksAndMissionsView: View {
    @State private var healthScore: Int = 842
    @State private var currentRank: String = "ELITE"
    @State private var missions: [DailyMission] = [
        DailyMission(title: "PERFORM CORE BOOST", points: 50, isCompleted: true, typeIcon: "bolt.fill"),
        DailyMission(title: "OPTIMIZE BATTERY", points: 30, isCompleted: false, typeIcon: "battery.100.bolt"),
        DailyMission(title: "FLUSH APP CACHE", points: 40, isCompleted: false, typeIcon: "trash.fill"),
        DailyMission(title: "PING OPTIMIZATION", points: 20, isCompleted: true, typeIcon: "wifi")
    ]
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 580)
            .shadow(color: AppTheme.cyberPurple.opacity(0.3), radius: 20)
            .overlay(
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("USER PROGRESSION")
                                .font(.system(size: 16, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            Text("RANK: \(currentRank)")
                                .font(.system(size: 10, weight: .semibold, design: .monospaced))
                                .foregroundColor(AppTheme.cyberPurple)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "crown.fill")
                            .foregroundColor(AppTheme.cyberPurple)
                            .font(.system(size: 20))
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("OVERALL RANK PROGRESS")
                                .font(.system(size: 11, weight: .bold, design: .monospaced))
                                .foregroundColor(.white.opacity(0.7))
                            Spacer()
                            Text("\(healthScore)/1000")
                                .font(.system(size: 12, weight: .black, design: .monospaced))
                                .foregroundColor(AppTheme.cyberPurple)
                        }
                        
                        // Rank Progress Bar
                        GeometryReader { geometry in
                            ZStack(alignment: .leading) {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(Color.white.opacity(0.1))
                                    .frame(height: 12)
                                
                                AppTheme.cyberPurple
                                    .mask(
                                        RoundedRectangle(cornerRadius: 10)
                                            .frame(width: geometry.size.width * CGFloat(healthScore) / 1000.0, height: 12)
                                    )
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 10)
                                            .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                    )
                                    .shadow(color: AppTheme.cyberPurple, radius: 5)
                            }
                        }
                        .frame(height: 12)
                    }
                    .padding(20)
                    
                    VStack(alignment: .leading, spacing: 15) {
                        Text("DAILY MISSIONS")
                            .font(.system(size: 11, weight: .bold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.7))
                        
                        VStack(spacing: 12) {
                            ForEach(missions) { mission in
                                AppTheme.glassmorphicPanel()
                                    .frame(height: 70)
                                    .overlay(
                                        HStack(spacing: 15) {
                                            Image(systemName: mission.typeIcon)
                                                .foregroundColor(mission.isCompleted ? .green : AppTheme.cyberPurple)
                                                .font(.system(size: 18))
                                                .frame(width: 40, height: 40)
                                                .background(mission.isCompleted ? Color.green.opacity(0.1) : AppTheme.cyberPurple.opacity(0.1))
                                                .cornerRadius(8)
                                            
                                            VStack(alignment: .leading, spacing: 4) {
                                                Text(mission.title)
                                                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                                                    .foregroundColor(.white)
                                                    .strikethrough(mission.isCompleted)
                                                
                                                Text("\(mission.points) DATA POINTS AVAILABLE")
                                                    .font(.system(size: 9, weight: .semibold))
                                                    .foregroundColor(.white.opacity(0.4))
                                            }
                                            
                                            Spacer()
                                            
                                            if mission.isCompleted {
                                                Image(systemName: "checkmark.circle.fill")
                                                    .foregroundColor(.green)
                                                    .font(.system(size: 20))
                                            } else {
                                                Button(action: { missionCompleted(mission) }) {
                                                    Text("RUN")
                                                        .font(.system(size: 10, weight: .black, design: .monospaced))
                                                        .foregroundColor(.white)
                                                        .padding(.horizontal, 15)
                                                        .padding(.vertical, 8)
                                                        .background(AppTheme.cyberPurple.opacity(0.3))
                                                        .cornerRadius(6)
                                                        .overlay(
                                                            RoundedRectangle(cornerRadius: 6)
                                                                .stroke(AppTheme.cyberPurple, lineWidth: 1)
                                                        )
                                                }
                                            }
                                        }
                                        .padding(.horizontal, 15)
                                    )
                                    .opacity(mission.isCompleted ? 0.7 : 1.0)
                            }
                        }
                    }
                    .padding(20)
                }
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 20)
    }
    
    private func missionCompleted(_ mission: DailyMission) {
        if let idx = missions.firstIndex(where: { $0.id == mission.id }) {
            withAnimation {
                missions[idx].isCompleted = true
                healthScore = min(1000, healthScore + missions[idx].points)
                if healthScore > 900 {
                    currentRank = "OMEGA"
                }
            }
        }
    }
}
