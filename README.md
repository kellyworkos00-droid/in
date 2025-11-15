# Inventory Tracking System

A modern, easy-to-use inventory management system built with Next.js and Supabase. Perfect for companies that need reliable stock tracking and movement history.

## Features

- ✅ **Product Management**: Add, edit, and delete products with SKU, category, and stock levels
- ✅ **Bulk Import**: Import multiple products at once from Excel/CSV files
- ✅ **Stock Tracking**: Real-time stock levels with low stock alerts
- ✅ **Quick Adjustments**: Add or remove stock with +/- buttons directly from the product list
- ✅ **Movement Records**: Track all stock movements (in/out) with reasons and dates
- ✅ **Search & Filter**: Quickly find products by name, SKU, or category
- ✅ **Export Reports**: Download inventory data as Excel/CSV files
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **No Authentication Required**: Simple access for single company use

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Export**: XLSX library for Excel/CSV exports
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)

### 1. Clone/Download the Project

If you haven't already, you should have this project on your computer.

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be ready (takes ~2 minutes)
4. Go to **Project Settings** → **API**
5. Copy your **Project URL** and **anon public** key

### 3. Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Open the `DATABASE_SCHEMA.md` file in this project
3. Copy and paste the SQL commands from that file
4. Click **Run** to create the tables

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Importing Products (Bulk Upload)

If you have many products to add initially:

1. Click the **"📤 Import Products"** button
2. Download the sample template by clicking **"📥 Download Sample Template"**
3. Fill in your products in the Excel file:
   - **Product Name**: Name of the product
   - **SKU**: Unique product code
   - **Category**: Product category
   - **Current Stock**: Initial stock quantity
   - **Minimum Stock**: Low stock alert threshold
4. Save the Excel file
5. Click **"Select File"** and choose your file
6. Click **"Import Products"**

The system will show you how many products were successfully imported and any errors.

### Adding Products

1. Click the **"+ Add Product"** button
2. Fill in the product details:
   - **Name**: Product name
   - **SKU**: Unique product code
   - **Category**: Product category
   - **Current Stock**: Initial stock quantity
   - **Minimum Stock**: Alert threshold for low stock
3. Click **Save**

### Recording Stock Movements

1. Go to the **Movements** page
2. Click **"+ Record Movement"**
3. Select a product
4. Choose movement type:
   - **Stock In**: Adding inventory (purchases, returns, etc.)
   - **Stock Out**: Removing inventory (sales, damaged goods, etc.)
5. Enter quantity and reason
6. Select the date
7. Click **Record Movement**

### Quick Stock Adjustments

For simple stock changes (add or remove 1 item):

1. Find the product in the list
2. Look for the **Quick Adjust** column
3. Click **"-"** to remove 1 from stock
4. Click **"+"** to add 1 to stock
5. The change is recorded automatically in movements

This is perfect for quick adjustments without opening the movements form.

### Searching Products

Use the search bar on the Products page to filter by:
- Product name
- SKU
- Category

### Exporting Data

Click the **"📥 Export to Excel"** button to download a complete report with:
- All products with current stock levels
- All movement history

The file will include two sheets: Products and Movements.

## Deploying to Vercel

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

### After Deployment

You'll get a URL like: `https://your-app.vercel.app`

Share this URL with your team - no domain needed!

## Project Structure

```
inventory/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Products page (home)
│   ├── movements/         # Movements page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ProductForm.tsx    # Add/edit product form
│   ├── ProductList.tsx    # Products table
│   ├── MovementForm.tsx   # Record movement form
│   └── MovementList.tsx   # Movements table
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client & types
│   └── export.ts         # Excel/CSV export functions
├── DATABASE_SCHEMA.md     # SQL schema for Supabase
└── README.md             # This file
```

## Troubleshooting

### "Failed to fetch" errors

- Check that your Supabase credentials in `.env.local` are correct
- Make sure you've run the SQL schema in Supabase
- Verify your Supabase project is active

### Products not showing

- Open browser console (F12) to see error messages
- Check Supabase dashboard → Table Editor to verify data exists

### Export not working

- Make sure you're running the app (not just viewing files)
- Check browser console for errors
- Ensure the `xlsx` package is installed

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify Supabase connection in the Supabase dashboard
3. Review the `DATABASE_SCHEMA.md` to ensure tables are created correctly

## License

This project is open source and available for your company's use.
