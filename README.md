# Dr. B. R. Ambedkar Digital Heritage Archive (SIH Prototype)

Welcome to the **Dr. B. R. Ambedkar Digital Heritage Archive** museum kiosk prototype. This project is a high-fidelity, touch-optimized frontend web application designed to offer an immersive and interactive exploration of the life, works, and contributions of Dr. B. R. Ambedkar.

## Overview

Designed for a large-format touch kiosk, this application features a dignified, archival visual design using a deep blue, gold, and off-white color palette. It integrates advanced modern technologies to provide an engaging educational experience, adhering to strict data integrity standards for archival evidence.

### Key Features

- **Interactive Knowledge Graph:** A fully interactive, force-directed graph (using React Flow) to visualize relationships within Dr. Ambedkar's life and works, complete with search, filtering, and progressive loading.
- **Then & Now — Constitution Explore:** A dual-pane interface comparing historical Constituent Assembly debates with current constitutional provisions, featuring an interactive timeline.
- **AI Research Assistant:** Powered by the Google Gemini API, this source-grounded assistant provides accurate, real-time answers based on archival research data. Includes an image-based text extraction feature for scanning historical documents.
- **Multi-language Support:** Built with global accessibility in mind, supporting English, Hindi, Marathi, Tamil, Telugu, and Kannada.
- **Touch-Optimized UI:** Responsive, full-screen layouts designed specifically for large museum kiosk displays, utilizing modern React practices and Tailwind CSS.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Vanilla CSS for core styling)
- **Data Visualization:** React Flow (Knowledge Graph)
- **AI Integration:** Google Generative AI SDK (Gemini API)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/royprince12-code/SIH_prototype.git
   cd SIH_prototype/dr.b.r.ambedkar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the Development Server:
   ```bash
   npm run dev
   ```

## Development & Build

- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`

---

*This prototype was built as part of the Smart India Hackathon (SIH).*
