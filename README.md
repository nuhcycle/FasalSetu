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

### 2. Tiered Subscription & Monetization System
FasalSetu features a transparent, farmer-first subscription system designed for Indian agricultural realities without aggressive lock-ins or forced payments.

| Feature / Tier | Free Kisan (₹0) | Kisan Plus (₹29/mo or ₹299/yr) | FPO / Group (₹999/mo or ₹9,999/yr) |
| :--- | :---: | :---: | :---: |
| **Target Audience** | Individual smallholders | Progressive farmers | Cooperatives, FPOs & SHGs |
| **Daily Mandi Comparisons** | 5 comparisons / day | **Unlimited** | **Unlimited (Bulk)** |
| **Net Earnings Calculator** | Included | Included | Included |
| **Advertising Experience** | Labelled Partner Ads | **100% Ad-Free** | **100% Ad-Free** |
| **Saved Mandis Watchlist** | Max 2 mandis | **Unlimited** | **Unlimited** |
| **30-Day Historical Trends** | Preview mode | **Full Access + Advisory** | **Full Access + Advisory** |
| **Price Surge Alerts** | Community FAQ | **App Alerts Active** | **App & WhatsApp Alerts** |
| **Data Export** | — | — | **CSV & PDF Report Export** |
| **Simultaneous Multi-Crop** | — | — | **Supported** |
| **Dedicated Support** | Helpdesk | Standard Support | **Dedicated Agronomist Desk** |

- **Subscription Onboarding Flow**: Presented gracefully after language selection during initial setup. "Continue with Free Plan" is clearly visible, ensuring farmers can access all essential calculations without ever being forced to pay.
- **Plan Management Screen**: Displays active tier, daily comparisons usage counter (e.g., 2/5 used today), renewal dates, auto-renewal cancellation, and plan upgrade/downgrade options.
- **Payment Gateway Architecture (Razorpay Standard & Test Mode)**:
  - Supports Razorpay for Indian payments (UPI, RuPay, NetBanking, Debit cards).
  - Secure verification: client never stores card details; payment events are cryptographically verified.
  - **Sandbox Test Mode**: When live keys are not configured, test mode allows simulating both successful checkout and bank decline/network failure to verify error-handling flows.
  - **Hackathon QA State Triggers**: Built-in test toolbar allows evaluators to simulate Free Tier, Quota Limit Exhausted, Kisan Plus Active, FPO Active, and Expired Subscription with one click.

### 3. Ethical Advertising System
- **Exclusivity**: Ads are displayed **only** to Free Kisan tier users. Paid subscribers (Plus & FPO) have all ads completely hidden.
- **Safe Placements**: Reserved dashboard banner and secondary sponsored cards placed strictly away from critical mandi prices, net proceeds calculations, safety notices, and primary navigation.
- **No Pop-Ups / Intrusive Ads**: No deceptive popups or misleading clickbait.
- **Strict Algorithmic Independence**: Sponsored partners and advertisers **never** influence mandi rankings, displayed modal prices, or AI recommendations.
- **Vetted Agricultural Services**: Features high-utility farmer services such as the *PM-KUSUM Solar Water Pump Subsidy Helpdesk*, *Certified Soil Testing Labs*, and *Custom Hiring Centre (CHC) Tractor Rentals*.

### 4. Bilingual Support (English & हिंदी)
- One-click instant language toggle in the header.
- Fully translated screens, calculation steps, advisory tips, and buttons.
- Designed with high-contrast text, clear iconography, and accessible tap targets for low-end Android phones and small screens.

### 5. Government Market-Price Data Service
- **Multi-Source Layer**: Cleanly separates data retrieval from presentation.
- **3 Modes**:
  1. **Verified Sample Data (Demo Mode)**: Realistic Agmarknet benchmarks for onion, tomato, potato, wheat, soybean, cotton, mustard, paddy, chana, maize, garlic, and turmeric.
  2. **Custom CSV Import**: Dropzone to upload official Agmarknet/data.gov.in CSV exports with automated schema normalization.
  3. **Live data.gov.in API Connector**: Directly fetch real-time market arrivals using the Government of India Open Data platform API key (`resource/9ef84268-d588-465a-a308-a864a43d0070`).
- **Data Freshness Indicators**: Color-coded badges for fresh ($\le 48$h), moderate ($3-6$ days), and stale data.

### 6. Interactive Route & Price Map (Leaflet & OSM)
- Visualizes the farmer's origin, nearby mandis, and travel radius circles.
- Color-coded pins (Emerald Star for top recommended mandi).
- Clickable popups detailing modal price, road distance, and net proceeds.

### 7. 30-Day Price Trends & AI Advisory
- Interactive SVG trend chart showing 30-day modal price curve and min-max spread.
- Market sentiment indicators (📈 Rising, ➡️ Stable, 📉 Falling).
- Practical selling recommendations (e.g., moisture discount warnings, shelf-life advisories).

### 8. Farmer Profile & Privacy First
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

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Razorpay Payment Gateway (Optional - Sandbox Test Mode used if omitted)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here

# Open Government Data Platform (data.gov.in API)
VITE_DATAGOV_API_KEY=your_datagov_api_key_here
```

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

### Production Build & Preview
```bash
npm run build
npm run preview
```

The application will be served locally at `http://localhost:5173/`.
