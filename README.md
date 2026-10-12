# FasalSetu (फसलसेतु) — AI-Powered Mandi Comparison Platform for Indian Farmers

> **"Know the Market. Calculate Your Costs. Sell Smarter."**  
> *मंडी को जानें। लागत घटाएं। मुनाफा बढ़ाएं।*

FasalSetu is a modern, responsive agri-tech web platform designed for small & medium Indian farmers, Farmer Producer Organisations (FPOs), and agricultural cooperatives. It eliminates guesswork in crop-selling decisions by comparing nearby APMC mandis, deducting transparent transport and labor costs, and calculating real **Estimated Net In-Pocket Earnings**.

---

## 🌾 Core Features & Capabilities

### 1. Transparent Net-Earnings Engine
- **Standard Unit Normalization**: Automatically converts all quantities (`kg`, `quintal`, `tonne`) into kilograms before calculating proceeds ($1\text{ Quintal} = 100\text{ kg}$, $1\text{ Tonne} = 1,000\text{ kg}$).
- **Rigorous Math**:
  $$\text{Gross Proceeds} = \text{Harvest Quantity (kg)} \times \text{Modal Price per kg}$$
  $$\text{Net Proceeds} = \text{Gross Proceeds} - \text{Transport Cost} - \text{Loading/Unloading} - \text{APMC Mandi Cess} - \text{Other Expenses}$$
- **Interactive Breakdown Modal**: Farmers can click *"See why this mandi is recommended"* or *"View Cost Breakdown"* to inspect exact line-item math.
- **Fair Pricing Disclaimers**: Clarifies that reported modal prices are historical auction benchmarks rather than guaranteed future realization.

### 2. Bilingual Support (English & हिंदी)
- One-click instant language toggle in the header.
- Fully translated screens, calculation steps, advisory tips, and buttons.
- Designed with high-contrast text, clear iconography, and accessible tap targets for first-time smartphone users.

### 3. Government Market-Price Data Service
- **Multi-Source Layer**: Cleanly separates data retrieval from presentation.
- **3 Modes**:
  1. **Verified Sample Data (Demo Mode)**: Realistic Agmarknet benchmarks for onion, tomato, potato, wheat, soybean, cotton, mustard, paddy, chana, maize, garlic, and turmeric.
  2. **Custom CSV Import**: Dropzone to upload official Agmarknet/data.gov.in CSV exports with automated schema normalization.
  3. **Live data.gov.in API Connector**: Directly fetch real-time market arrivals using the Government of India Open Data platform API key (`resource/9ef84268-d588-465a-a308-a864a43d0070`).
- **Data Freshness Indicators**: Color-coded badges for fresh ($\le 48$h), moderate ($3-6$ days), and stale data.

### 4. Interactive Route & Price Map (Leaflet & OSM)
- Visualizes the farmer's origin, nearby mandis, and travel radius circles.
- Color-coded pins (Emerald Star for top recommended mandi).
- Clickable popups detailing modal price, road distance, and net proceeds.

### 5. 30-Day Price Trends & AI Advisory
- Interactive SVG trend chart showing 30-day modal price curve and min-max spread.
- Market sentiment indicators (📈 Rising, ➡️ Stable, 📉 Falling).
- Practical selling recommendations (e.g., moisture discount warnings, shelf-life advisories).

### 6. Farmer Profile & Privacy First
- Never requires GPS permissions; manual selection of State, District, and Village.
- Saves vehicle type, mileage rates, preferred units, and bookmarks in local storage.

---

## 🎨 Visual Identity & Palette

- **Primary Forest Green**: `#2F6B3F`
- **Fresh Leaf Green**: `#79A95A`
- **Soft Mint Background**: `#F3F8EF`
- **Warm Cream**: `#FFFDF5`
- **Harvest Yellow**: `#E9B949`
- **Earth Brown**: `#8B6848`
- **Card Background**: `#FFFFFF`
- **Borders**: `#E1E9DC`
- **Typography**: `Inter` and `Noto Sans Devanagari` via Google Fonts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/fasalsetu.git
cd fasalsetu

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

The application will be served locally at `http://localhost:5173/`.
