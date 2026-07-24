# AI-Powered Financial Research Report Generator

A production-grade web application that takes a company's financial context document (**PDF**, **CSV**, or **TXT**) and auto-generates a downloadable, highly styled 4-page equity research report mirroring authentic **Geojit-style** institutional equity research reports.

---

## 🚀 Tech Stack

### Backend
- **Runtime**: Bun / Node.js
- **Framework**: Express & TypeScript
- **AI Engine**: Groq SDK (`llama-3.3-70b-versatile`) with structured JSON mode
- **Validation**: Zod schema validation
- **PDF Parsing**: `pdf-parse`
- **CSV Parsing**: `csv-parser`
- **Chart Generation**: Native SVG vector chart generator (dual-axis bar + line graphs for Revenue, GOV, EBITDA, and PAT margins)
- **Template Engine**: Handlebars (`report.hbs` + `report.css`)
- **PDF Engine**: Headless Puppeteer with auto-detection for system Chrome

### Frontend
- **Framework**: React + Vite + TypeScript
- **Styling**: Vanilla CSS + Glassmorphism design system & frosted backdrop blur
- **Form & Validation**: React Hook Form + Zod (`@hookform/resolvers`)
- **HTTP Client**: Axios
- **Icons**: Lucide React

---

## 📋 Project Requirements & Acceptance Criteria Matrix

| Requirement / Criterion | Status | Implementation Details |
| :--- | :---: | :--- |
| **Geojit-Style 4-Page PDF Template** | ✅ Complete | Recreated exact layout, section order, tables, key metrics, financial statements, recommendation history, and regulatory disclosures in `report.hbs` and `report.css`. |
| **Structured Data & Narrative Extraction** | ✅ Complete | Extracts structured tables (P&L, Balance Sheet, Cash Flow, Ratios, Shareholding) and narrative content (Business Summary, Outlook, Headlines, Bullet Highlights) via Groq LLM and Zod schema. |
| **Visual Charts** | ✅ Complete | Renders 4 high-definition vector SVG charts (Revenue + Growth, GOV + Growth, EBITDA + Margin, PAT + Margin) embedded directly into Page 2. |
| **Multi-Format Input Support** | ✅ Complete | Supports **PDF** (`.pdf`), **CSV** (`.csv`), and **TXT** (`.txt`) input documents. |
| **Handling Missing Fields & Empty Inputs** | ✅ Complete | Missing fields format as `N/A`. Empty or unreadable files fail gracefully with clean HTTP 400 validation error (zero hallucinated reports). |
| **Graceful Error Handling** | ✅ Complete | Exposes user-friendly messages for rate limits (429), authentication (401), or overload (503) while logging raw API traces to server logs. |
| **Simple Web UI & 1-Click PDF Download** | ✅ Complete | Interactive web app with dynamic company name derivation, live PDF preview modal with frosted glass backdrop blur, and 1-click download. |

---

## 📁 Project Structure & Template Fields Definition

```text
.
├── backend/
│   ├── src/
│   │   ├── config/          # Environment variables & constants
│   │   ├── controllers/     # Report generation & download controllers
│   │   ├── routes/          # Express router
│   │   ├── middlewares/     # Multer file upload & error handlers
│   │   ├── services/        # Pipeline orchestrator, SVG Chart engine & Puppeteer PDF
│   │   ├── llm/             # Groq client, prompt templates & structured extractor
│   │   ├── builders/        # ReportBuilder (normalization/sector inference) & TemplateMapper
│   │   ├── parsers/         # PDF, CSV, and TXT document extractors
│   │   ├── templates/       # Geojit report Handlebars HTML & CSS template
│   │   ├── validators/      # Zod validation schemas
│   │   └── types/           # TypeScript interfaces
│   ├── uploads/             # Temporary uploads & test samples (Reliance, TCS, L&T, Zomato, Apple)
│   └── reports/             # Generated downloadable PDF reports
│
└── frontend/
    └── src/
        ├── components/
        │   ├── layout/      # Navbar Header
        │   ├── common/      # Button, Card, Spinner, Badge
        │   └── features/    # UploadZone, ProgressStepper, ReportForm, PreviewModal
        ├── services/        # Axios API client
        └── types/           # Shared TypeScript interfaces
```

### Where Template Fields Are Defined

1. **AI Output Schema & Validation**: [`backend/src/validators/report.schema.ts`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/validators/report.schema.ts)
2. **Template View Model Mapper**: [`backend/src/builders/templateMapper.ts`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/builders/templateMapper.ts)
3. **Data Normalization & Sector Inference**: [`backend/src/builders/reportBuilder.ts`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/builders/reportBuilder.ts)
4. **Handlebars Layout & Fields**: [`backend/src/templates/report.hbs`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/templates/report.hbs)
5. **Geojit Print CSS**: [`backend/src/templates/report.css`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/templates/report.css)

---

## 🛠️ Quick Start Guide

### 1. Backend Setup

```bash
cd backend
bun install   # or npm install
```

Set up environment variables in `backend/.env`:

```env
PORT=5001
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend server:

```bash
bun run dev
# or bun index.ts / npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📑 Report Features & Page Breakdown

- **Page 1**: Geojit teal header, Stock Metadata table (with `N/A` for missing values), Shareholding matrix, Price Performance table, Forecast summary, Business Summary narrative, Outlook & Valuation, Quarterly Financials table.
- **Page 2**: Executive Bullet Highlights, 2x2 Vector SVG Chart Grid (Revenue, GOV, EBITDA, PAT Margins), Change in Estimates table.
- **Page 3**: Consolidated Profit & Loss, Balance Sheet, Cash Flow, and Financial Ratio analysis tables.
- **Page 4**: 3-Year Recommendation History, SEBI Investment Rating Criteria matrix, Symbols definition, SEBI Regulatory Disclaimer & Disclosures.
