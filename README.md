# AI-Powered Financial Research Report Generator

A production-grade web application that takes a company's financial context document (**PDF**, **CSV**, or **TXT**) and auto-generates a downloadable, highly styled 4-page equity research report mirroring the **Geojit-style** report layout.

---

## 🚀 Tech Stack

### Backend
- **Runtime**: Bun / Node.js
- **Framework**: Express & TypeScript
- **AI Engine**: Groq SDK (`llama-3.3-70b-versatile`) with structured JSON mode
- **Validation**: Zod schema validation
- **PDF Parsing**: `pdf-parse`
- **CSV Parsing**: `csv-parser`
- **Chart Generation**: `chartjs-node-canvas` & `chart.js` (renders 4 PNG charts)
- **Template Engine**: Handlebars (`report.hbs` + `report.css`)
- **PDF Engine**: Headless Puppeteer (A4 print layout)

### Frontend
- **Framework**: React + Vite + TypeScript
- **Styling**: TailwindCSS v4 + Glassmorphism design system
- **Form & Validation**: React Hook Form + Zod (`@hookform/resolvers`)
- **HTTP Client**: Axios
- **Icons**: Lucide React

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
│   │   ├── services/        # Pipeline orchestrator, Chart engine & Puppeteer PDF
│   │   ├── llm/             # Groq client, prompt templates & structured extractor
│   │   ├── builders/        # ReportBuilder (normalization) & TemplateMapper
│   │   ├── parsers/         # PDF, CSV, and TXT document extractors
│   │   ├── templates/       # Geojit report Handlebars HTML & CSS template
│   │   ├── validators/      # Zod validation schemas
│   │   └── types/           # TypeScript interfaces
│   ├── uploads/             # Temporary uploads & test samples
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
3. **Handlebars Layout & Fields**: [`backend/src/templates/report.hbs`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/templates/report.hbs)
4. **Geojit Print CSS**: [`backend/src/templates/report.css`](file:///Users/pushkarmondal/100xdevs/bull_ai_assignment/backend/src/templates/report.css)

---

## 🛠️ Quick Start Guide

### 1. Backend Setup

```bash
cd backend
npm install   # or bun install
```

Set up environment variables in `backend/.env`:

```env
PORT=5001
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
```

*(Note: If `GROQ_API_KEY` is not provided, the application will automatically fall back to the built-in financial template generator, allowing seamless testing without an API key.)*

Start the backend server:

```bash
bun run index.ts
# or node index.js
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

- **Page 1**: Geojit teal header, Stock Metadata table, Shareholding matrix, Price Performance table, Forecast summary, Business Summary narrative, Outlook & Valuation, Quarterly Financials table.
- **Page 2**: Key Highlights bullets, 2x2 Chart Grid (Revenue, EBITDA, PAT, Margins), Change in Estimates table.
- **Page 3**: Consolidated Profit & Loss, Balance Sheet, Cash Flow, and Financial Ratio analysis tables.
- **Page 4**: 3-Year Recommendation History, SEBI Investment Rating Criteria matrix, Symbols definition, SEBI Regulatory Disclaimer & Disclosures.
