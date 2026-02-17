# Supabase Database Setup - SQL Scripts

> [!IMPORTANT]
> **You must run these SQL scripts in your Supabase SQL Editor before the app will work!**

## Quick Setup Guide

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on your project: `lcooianbqqueztpsinhh`
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste **ALL** the SQL below
6. Click "Run" (or press Ctrl+Enter)

---

## Complete SQL Setup Script

```sql
-- ============================================
-- SMART BOOKMARK APP - DATABASE SETUP
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS bookmarks_created_at_idx ON public.bookmarks(created_at DESC);

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE RLS POLICIES FOR PROFILES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Profiles: Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Profiles: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ============================================
-- 4. CREATE RLS POLICIES FOR BOOKMARKS
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;

-- Bookmarks: Users can view only their own bookmarks
CREATE POLICY "Users can view own bookmarks"
    ON public.bookmarks
    FOR SELECT
    USING (auth.uid() = user_id);

-- Bookmarks: Users can insert bookmarks with their own user_id
CREATE POLICY "Users can insert own bookmarks"
    ON public.bookmarks
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Bookmarks: Users can delete only their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
    ON public.bookmarks
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 5. CREATE AUTO-PROFILE TRIGGER
-- ============================================

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function when new user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 6. ENABLE REALTIME
-- ============================================

-- Enable realtime for bookmarks table
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
```

---

## Verification

After running the script, verify the setup:

### 1. Check Tables
- Go to "Table Editor" in Supabase
- You should see `profiles` and `bookmarks` tables

### 2. Check RLS Policies
- Click on the `bookmarks` table
- Click the "Policies" tab
- You should see 3 policies listed

### 3. Check Realtime
- Go to "Database" > "Replication"
- Find `bookmarks` table
- It should show "Enabled"

---

## Troubleshooting

### Error: "relation public.bookmarks does not exist"
- You haven't run the SQL script yet
- Go to SQL Editor and run the complete script above

### Error: "permission denied for table bookmarks"
- RLS policies aren't set up correctly
- Re-run the RLS policies section (sections 2-4)

### Bookmarks don't update in real-time
- Realtime isn't enabled
- Run section 6 of the SQL script

---

## Next Steps

After running this SQL script:
1. Refresh your app at http://localhost:3000
2. Sign in with Google
3. Try adding a bookmark
4. Test real-time sync in two browser tabs

✅ Your database is now ready!
