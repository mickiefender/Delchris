# Administrator Setup Guide

This document explains how to set up the administrator account for the Delchris Africa dashboard.

## Quick Start (Use the Setup Page)

1. **Go to**: `http://localhost:3000/setup`
2. **Enter your secret key** (from `ADMIN_CREATION_SECRET` in .env.local)
3. **Click**: "Create Admin Account"

That's it! Then go to `/login` to access the dashboard.

---

## Prerequisites (If Setup Page Doesn't Work)

### 1. Environment Variables - Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_CREATION_SECRET=delchris-admin-setup-2024
```

### 2. Create admins table in Supabase (SQL Editor):

```sql
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'super_admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read admins"
ON admins FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow service role to manage admins"
ON admins FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### 3. If setup page fails, use cURL:

```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "secretKey": "delchris-admin-setup-2024",
    "email": "admin@delchris.com",
    "password": "Admin@landing123",
    "fullName": "Administrator"
  }'
```

## Login

- **URL**: `/login`
- **Email**: `admin@delchris.com`
- **Password**: `Admin@landing123`

## Security Notes

- Delete `app/api/admin/create/route.ts` after creating the admin
- Never commit service role key to version control
