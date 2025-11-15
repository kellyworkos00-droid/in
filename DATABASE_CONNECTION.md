# 🔌 How to Connect Your Database

This guide will help you connect your Supabase database to the inventory system.

## Step 1: Create a Supabase Account

1. Go to **[https://supabase.com](https://supabase.com)**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub, Google, or Email (it's free!)

## Step 2: Create a New Project

1. After signing in, click **"New Project"**
2. Select your organization (or create a new one)
3. Fill in the project details:
   - **Name**: `inventory-tracker` (or any name you like)
   - **Database Password**: Create a strong password
     - **IMPORTANT**: Save this password somewhere safe!
     - You'll need it if you want to connect directly to the database
   - **Region**: Choose the region closest to your location (for better speed)
   - **Pricing Plan**: Select "Free" (plenty for small to medium businesses)
4. Click **"Create new project"**
5. Wait 2-3 minutes for your project to be set up

## Step 3: Get Your API Credentials

1. Once your project is ready, you'll see the project dashboard
2. On the left sidebar, click **Settings** (gear icon at the bottom)
3. Click **API** in the settings menu
4. You'll see two important values:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
This is your `NEXT_PUBLIC_SUPABASE_URL`

### API Keys
You'll see several keys. Look for:
- **anon** / **public** key (this is what you need)

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZi...
```
This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Keep this tab open** - you'll need to copy these values!

## Step 4: Create the Database Tables

1. In Supabase, click **SQL Editor** in the left sidebar
2. Click the **"+"** button or **"New query"**
3. Open the file `DATABASE_SCHEMA.md` from this project
4. Copy **ALL** the SQL code from that file (scroll down, there are multiple sections)
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Ctrl + Enter / Cmd + Enter)
7. You should see: **"Success. No rows returned"**

### What this does:
- Creates `products` table (stores your products)
- Creates `movements` table (stores stock in/out history)
- Sets up indexes for faster searches
- Optionally adds sample data (if you want test data)

## Step 5: Add Credentials to Your App

### Option A: If you haven't created .env.local yet

1. In VS Code, look for the file `.env.example` in your project
2. Right-click it and select "Copy"
3. Right-click in the file explorer and "Paste"
4. Rename the copy to `.env.local`
5. Open `.env.local` and replace the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Option B: If .env.local already exists

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

3. Save the file (Ctrl + S / Cmd + S)

## Step 6: Test the Connection

1. Open Terminal in VS Code
2. Run:
   ```bash
   npm run dev
   ```
3. Open your browser to: **http://localhost:3000**
4. Try adding a product - if it works, you're connected! 🎉

## Troubleshooting

### "Failed to fetch" or Network Error

**Check:**
- ✅ Did you copy the FULL URL (including `https://`)?
- ✅ Did you copy the ENTIRE anon key (it's very long)?
- ✅ Did you save the `.env.local` file?
- ✅ Did you restart the dev server after saving `.env.local`?

**Fix:**
1. Stop the dev server (Ctrl + C in terminal)
2. Double-check your credentials in `.env.local`
3. Start the server again: `npm run dev`

### Tables don't exist

**Check:**
- ✅ Did you run the SQL from `DATABASE_SCHEMA.md` in Supabase SQL Editor?
- ✅ Did you click "Run" after pasting the SQL?

**Verify:**
1. In Supabase, click **Table Editor** in the left sidebar
2. You should see two tables: `products` and `movements`
3. If not, go back to SQL Editor and run the schema again

### Can't see products you added

**Check:**
1. Open Supabase → **Table Editor**
2. Click on **products** table
3. You should see your data there
4. If data is in Supabase but not showing in app:
   - Check browser console (F12) for errors
   - Verify credentials in `.env.local` are correct

### Environment variables not loading

**Common mistake:** Using `.env` instead of `.env.local`

**Fix:**
1. The file MUST be named `.env.local` (not just `.env`)
2. It must be in the root folder (same level as `package.json`)
3. Restart the dev server after creating/editing it

## Viewing Your Data in Supabase

You can always view and manage your data directly:

1. Go to Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Click **products** or **movements** table
4. You can:
   - View all records
   - Add/edit/delete records manually
   - Export data
   - See real-time updates

## Security Note

🔒 **Never commit `.env.local` to GitHub!**

The `.gitignore` file is already set up to exclude it. This keeps your credentials safe.

## Need Help?

If you're stuck:
1. Check the browser console for error messages (F12 → Console tab)
2. Verify your Supabase project is active (not paused due to inactivity)
3. Make sure you're using the **anon/public** key, not the service_role key

---

## Quick Reference

| What | Where to find it |
|------|------------------|
| Project URL | Supabase → Settings → API → Project URL |
| Anon Key | Supabase → Settings → API → anon/public key |
| Database Tables | Supabase → Table Editor |
| Run SQL | Supabase → SQL Editor |
| View Data | Supabase → Table Editor → Select table |

You're all set! 🚀
