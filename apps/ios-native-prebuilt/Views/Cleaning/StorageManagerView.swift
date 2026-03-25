import SwiftUI

struct StorageItem: Identifiable {
    let id = UUID()
    let name: String
    let size: Double // MB
    let typeIcon: String
    let category: String
}

struct StorageManagerView: View {
    @State private var storageItems: [StorageItem] = [
        StorageItem(name: "DUPLICATE PHOTO (IMG_0023)", size: 45.2, typeIcon: "photo", category: "MEDIA"),
        StorageItem(name: "APP CACHE (SOCIAL_LOGS)", size: 75.8, typeIcon: "doc.fill", category: "SYSTEM"),
        StorageItem(name: "OLD CACHE (TEMP_CACHE)", size: 120.5, typeIcon: "archivebox.fill", category: "SYSTEM"),
        StorageItem(name: "LARGE VIDEO (TRIP_4K)", size: 450.2, typeIcon: "video.fill", category: "MEDIA")
    ]
    
    var body: some View {
        AppTheme.glassmorphicPanel()
            .frame(height: 480)
            .shadow(color: .pink.opacity(0.3), radius: 20)
            .overlay(
                VStack(spacing: 0) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("STORAGE MANAGER")
                                .font(.system(size: 16, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            Text("TARGET: OPTIMIZE CAPACITY")
                                .font(.system(size: 10, weight: .semibold, design: .monospaced))
                                .foregroundColor(.pink)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "trash.fill")
                            .foregroundColor(.pink)
                            .font(.system(size: 20))
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    
                    VStack(alignment: .leading, spacing: 10) {
                        Text("TOTAL DUPLICATES DETECTED: \(storageItems.count)")
                            .font(.system(size: 11, weight: .bold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.7))
                        
                        // Storage Visualization Bar
                        GeometryReader { geometry in
                            ZStack(alignment: .leading) {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(Color.white.opacity(0.1))
                                    .frame(height: 12)
                                
                                LinearGradient(colors: [.pink, AppTheme.cyberPurple], startPoint: .leading, endPoint: .trailing)
                                    .mask(
                                        RoundedRectangle(cornerRadius: 10)
                                            .frame(width: geometry.size.width * 0.75, height: 12)
                                    )
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 10)
                                            .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                    )
                            }
                        }
                        .frame(height: 12)
                    }
                    .padding(20)
                    
                    List {
                        ForEach(storageItems) { item in
                            HStack(spacing: 15) {
                                Image(systemName: item.typeIcon)
                                    .foregroundColor(.pink)
                                    .font(.system(size: 20))
                                    .frame(width: 40, height: 40)
                                    .background(Color.pink.opacity(0.1))
                                    .cornerRadius(8)
                                
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(item.name)
                                        .font(.system(size: 12, weight: .bold, design: .monospaced))
                                        .foregroundColor(.white)
                                    
                                    Text("\(String(format: "%.1f", item.size)) MB | \(item.category)")
                                        .font(.system(size: 10, weight: .semibold))
                                        .foregroundColor(.white.opacity(0.5))
                                }
                                
                                Spacer()
                                
                                Button(action: { deleteItem(item) }) {
                                    Circle()
                                        .fill(Color.pink.opacity(0.2))
                                        .frame(width: 30, height: 30)
                                        .overlay(
                                            Image(systemName: "xmark")
                                                .foregroundColor(.pink)
                                                .font(.system(size: 12, weight: .bold))
                                        )
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                            .padding(.vertical, 8)
                            .listRowBackground(Color.clear)
                            .listRowSeparatorTint(Color.white.opacity(0.1))
                        }
                        .onDelete(perform: deleteItems)
                    }
                    .listStyle(PlainListStyle())
                    .scrollContentBackground(.hidden)
                }
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 20)
    }
    
    private func deleteItem(_ item: StorageItem) {
        withAnimation {
            storageItems.removeAll { $0.id == item.id }
        }
    }
    
    private func deleteItems(at offsets: IndexSet) {
        withAnimation {
            storageItems.remove(atOffsets: offsets)
        }
    }
}
