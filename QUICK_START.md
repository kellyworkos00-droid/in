# Quick Start Guide

## 🎉 Your Inventory System is Ready!

All the code is set up. Follow these steps to get it running:

## Step 1: Set Up Supabase (5 minutes)

1. Go to **[https://supabase.com](https://supabase.com)** and sign up (it's free!)
2. Click **"New Project"**
3. Fill in:
   - **Name**: inventory-tracker (or any name you like)
   - **Database Password**: Choose a strong password (save it somewhere safe)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait ~2 minutes

## Step 2: Get Your Supabase Credentials

1. Once your project is ready, click **Settings** (gear icon) in the left sidebar
2. Click **API** section
3. You'll see:
   - **Project URL** (starts with https://)
   - **anon public** key (long string of characters)
4. **Keep this page open** - you'll need these in the next step

## Step 3: Create Database Tables

1. In Supabase, click **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Open the `DATABASE_SCHEMA.md` file in this project
4. Copy ALL the SQL code from that file
5. Paste it into the SQL Editor in Supabase
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 4: Add Your Credentials

1. Open the file `.env.local` in this project (it's in the root folder)
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
   ```
3. Save the file

## Step 5: Run the App

In VS Code terminal, run:

```bash
npm run dev
```

Then open: **[http://localhost:3000](http://localhost:3000)**

## Step 6: Test It Out

### Add Your First Products

**Option 1: Import Many Products at Once (Recommended for initial setup)**
1. Click **"📤 Import Products"**
2. Click **"📥 Download Sample Template"** to see the format
3. Fill in your products in Excel
4. Upload the file
5. Products are added instantly!

**Option 2: Add One Product Manually**
1. Click **"+ Add Product"** to add a single product
2. Fill in the form and save

### Quick Stock Adjustments
- Use the **+** and **-** buttons next to each product
- Perfect for quick corrections or daily adjustments
- Automatically records the change in movement history

### Record Detailed Movements
1. Go to **Movements** page for detailed stock tracking
2. Record purchases, sales, damaged goods, etc. with reasons

### Export Reports
1. Click **"📥 Export to Excel"** to download reports

## Next Steps: Deploy to Vercel (Optional)

When you're ready to make it accessible to your team:

1. Push your code to GitHub (but DON'T include the .env.local file)
2. Go to **[vercel.com](https://vercel.com)** and sign up
3. Click **"New Project"** and import your GitHub repository
4. Add the same environment variables from Step 4
5. Click **Deploy**
6. Share the Vercel URL with your team!

## Troubleshooting

**"Failed to fetch" errors?**
- Double-check your credentials in `.env.local`
- Make sure you ran the SQL schema in Supabase

**Products not showing?**
- Check browser console (F12) for error messages
- Verify tables exist in Supabase → Table Editor

**Need help?**
- Check the `README.md` file for detailed documentation
- Look at `DATABASE_SCHEMA.md` for database structure

---

## Project Structure Overview

- **`app/page.tsx`** - Products listing page
- **`app/movements/page.tsx`** - Stock movements page
- **`components/`** - All UI components (forms, lists, etc.)
- **`lib/supabase.ts`** - Database connection
- **`lib/export.ts`** - Excel export functionality

Enjoy your new inventory system! 🚀
