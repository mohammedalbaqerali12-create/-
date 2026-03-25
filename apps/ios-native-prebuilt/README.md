# NEURAL BOOST X - iOS Build Documentation

This project is a premium SwiftUI application. Follow these instructions to compile and run it on your iPhone.

## 🛠️ Project Setup Instructions

1. **Prerequisites**:
   - A Mac running **macOS 14+**.
   - **Xcode 15+** (latest stable version recommended).
   - An iPhone or Simulator (iOS 17+).

2. **How to Run on a Mac**:
   - Since we are currently in a cross-platform environment, I have provided the **Core SwiftUI Files**.
   - Simply create a new **App Target** in Xcode (e.g., `File > New > Project > iOS App`).
   - Choose **SwiftUI** as the Interface and **Swift** as the Language.
   - Name the project: `NEURAL_BOOST_X`.
   - Copy the folder structure from this directory into your Xcode project's folder.
   
3. **Architecture Overview (MVVM)**:
   - **`App/`**: Contains the main application entry point (`NeuralBoostXApp.swift`).
   - **`Core/`**: Contains the main tab navigation (`ContentView.swift`).
   - **`Styles/`**: Contains the `AppTheme` with custom colors and glassmorphic designs.
   - **`Services/`**: Contains the `SimulationService` that manages real-time system metrics.
   - **`ViewModels/`**: Bridges the data and views.
   - **`Views/`**: Contains all UI components (Dashboard, AI Assistant, Network, Battery, etc.).

## 🏗️ Automated Build (GitHub Actions)
I have provided a `.github/workflows/build.yml` file. If you push this project to a GitHub repository, it will automatically attempt to:
- Checkout the code.
- Build the project using the latest Xcode version on GitHub's macOS runners.
- Verify compilation and project integrity.

## 🔒 Code Signing Note
To generate a final **IPA** for physical device installation:
- You will need to configure **Signing & Capabilities** in Xcode with your Apple Developer Team ID.
- For GitHub Actions deployment, you must add `BUILD_CERTIFICATE_BASE64` and `P12_PASSWORD` as GitHub Secrets.
