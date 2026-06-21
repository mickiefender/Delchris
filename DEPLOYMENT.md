# Delchris Africa Website - Deployment Guide

## Project Overview

This is a fully-featured, production-ready website for **Delchris Africa Limited** - a woman-owned agribusiness company specializing in sustainable food processing.

**Key Technologies:**
- Next.js 16 with React 19
- Tailwind CSS 4 for styling
- Supabase for database and backend
- TypeScript for type safety
- Vercel Blob (optional) for advanced image storage

---

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure all environment variables are set in your deployment platform:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are automatically added by Supabase integration.

### 2. Database Setup
All database tables are already created in your Supabase project:
- ✓ `contacts` - Contact form submissions
- ✓ `internships` - Internship applications
- ✓ `partnerships` - Partnership inquiries
- ✓ `volunteering` - Volunteer applications
- ✓ `gallery_images` - Gallery images

**No additional database setup needed!**

### 3. Image Assets
All required images are generated and stored:
- ✓ `/public/hero-agribusiness.jpg` - Hero section background
- ✓ `/public/foundation-women.jpg` - Foundation model image
- ✓ `/public/products-showcase.jpg` - Products showcase image

### 4. Supabase Configuration
- Verify Supabase project is active
- Check that API is responding
- Confirm database tables have data (if migrating from existing system)

---

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

**Step 1: Push code to GitHub**
```bash
git add .
git commit -m "Enhanced Delchris website with dashboard"
git push origin main
```

**Step 2: Connect to Vercel**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

**Step 3: Set Environment Variables**
1. In Vercel project settings
2. Go to "Settings" → "Environment Variables"
3. Add the Supabase variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy (or Vercel will auto-redeploy)

**Step 4: Verify Deployment**
- Check that site loads at `your-domain.vercel.app`
- Test contact form submission
- Test dashboard access

### Option 2: Deploy to Own Server

**Step 1: Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

**Step 2: Build for Production**
```bash
npm run build
```

**Step 3: Set Environment Variables**
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

**Step 4: Start Production Server**
```bash
npm start
```

**Step 5: Use Process Manager (Recommended)**
```bash
# Using PM2
npm install -g pm2
pm2 start "npm start" --name delchris
pm2 save
pm2 startup
```

---

## Post-Deployment Tasks

### 1. Custom Domain Setup

**For Vercel:**
1. Go to project settings
2. Domains section
3. Add your custom domain
4. Update DNS records as instructed

**For Self-Hosted:**
1. Point DNS to your server IP
2. Configure SSL certificate (Let's Encrypt recommended)
3. Update web server configuration

### 2. Test All Features

#### Website Pages
- [ ] Home page loads correctly
- [ ] Hero section displays with background image
- [ ] Services section shows image cards
- [ ] How It Works section scrolls horizontally
- [ ] Gallery auto-slides and manual navigation works
- [ ] All links navigate correctly

#### Forms
- [ ] Contact form submits and appears in dashboard
- [ ] Internship modal opens and submits
- [ ] Volunteering modal opens and submits
- [ ] Partnership modal opens and submits
- [ ] Success messages display

#### Gallery
- [ ] Gallery page loads
- [ ] Images display in grid
- [ ] Click image opens lightbox
- [ ] Carousel works with auto-slide

#### Dashboard
- [ ] Dashboard loads at `/dashboard`
- [ ] All tabs display data
- [ ] Search functionality works
- [ ] Image upload works
- [ ] Image delete works

### 3. Monitor Analytics

Set up analytics to track:
- Page views and traffic
- Form submission rates
- Gallery engagement
- User behavior flow

**Recommended Tools:**
- Google Analytics
- Vercel Analytics
- Supabase dashboard metrics

### 4. Email Notifications (Optional)

To add email notifications when forms are submitted:

**Using Supabase Webhooks:**
1. Set up webhook in Supabase
2. Configure to trigger on INSERT for each table
3. Send POST request to email service
4. Use SendGrid, Mailgun, or similar

**Using API Route:**
Add email service integration to your API routes (e.g., Resend, SendGrid)

---

## Security Configuration

### 1. Enable Supabase RLS (Row Level Security)

```sql
-- Example RLS policy
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON contacts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Disable selects"
  ON contacts
  FOR SELECT
  USING (false);
```

### 2. Add Dashboard Authentication

Currently dashboard is public. For production:

```typescript
// Add middleware to check authentication
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Add auth check here
  }
}
```

### 3. Rate Limiting

Add rate limiting to API routes to prevent spam:

```typescript
// Using Redis or similar
const rateLimit = async (ip: string) => {
  // Check and enforce rate limits
}
```

### 4. Input Validation

All API routes already validate input, but consider adding:
- Email verification
- Phone number validation
- Content length limits
- File upload size limits

### 5. HTTPS/SSL

- Vercel: Automatic SSL certificate
- Self-hosted: Get free cert from Let's Encrypt

---

## Performance Optimization

### Current Optimizations
- ✓ Image optimization with next/image
- ✓ Code splitting with dynamic imports
- ✓ CSS purging with Tailwind
- ✓ Minimal JavaScript bundle

### Additional Recommendations

1. **Enable Image Optimization**
   - Vercel automatically optimizes images
   - For self-hosted, use a CDN

2. **Configure Caching**
   - Set cache headers for static assets
   - Implement service worker for offline support

3. **Database Query Optimization**
   - Add indexes to frequently queried columns
   - Implement pagination for large datasets

4. **Monitor Performance**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Set up performance budgets

---

## Maintenance & Updates

### Regular Tasks

**Weekly:**
- Check dashboard for new submissions
- Respond to form submissions
- Monitor error logs

**Monthly:**
- Review analytics
- Update gallery images
- Check for security updates

**Quarterly:**
- Review and optimize database
- Update dependencies
- Audit security settings
- Backup database

### Backup Strategy

**Supabase Backups:**
- Automatic daily backups (Pro plan)
- Manual exports available
- Point-in-time recovery available

**Code Backups:**
- GitHub repository serves as backup
- Enable Actions for automated testing

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# For major updates
npm install -u package-name

# After updates, test thoroughly
npm run build
npm test (if tests exist)
```

---

## Troubleshooting Deployment

### Issue: Database Connection Error

**Solution:**
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Check Supabase project is active
- Test connection with simple query

### Issue: Forms Not Submitting

**Solution:**
- Check API routes are deployed
- Verify database tables exist
- Check browser console for errors
- Test with curl command:
```bash
curl -X POST https://your-domain.com/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

### Issue: Images Not Loading

**Solution:**
- Verify image files exist in `/public`
- Check image paths in components
- Verify image permissions
- Test image direct access

### Issue: Dashboard Slow

**Solution:**
- Check database query performance
- Implement pagination for large datasets
- Add database indexes
- Monitor Supabase resource usage

---

## Monitoring & Alerts

### Set Up Monitoring

1. **Vercel Monitoring:**
   - Errors
   - Performance metrics
   - Deployment status

2. **Supabase Monitoring:**
   - API rate limits
   - Database performance
   - Storage usage

3. **Custom Alerts:**
   - Set up webhooks for form errors
   - Monitor database growth
   - Alert on high error rates

---

## Scaling Considerations

As traffic grows:

1. **Database:**
   - Upgrade Supabase plan
   - Implement caching layer (Redis)
   - Archive old submissions

2. **Storage:**
   - Implement image compression
   - Use CDN for image delivery
   - Archive large files

3. **Performance:**
   - Add caching headers
   - Implement database connection pooling
   - Use edge functions for common queries

---

## Contact & Support

For issues or questions:

**Vercel Support:**
- https://vercel.com/help

**Supabase Support:**
- https://supabase.com/docs
- https://supabase.com/support

**Technical Support:**
- Review deployment logs
- Check GitHub Issues
- Consult Next.js documentation

---

## Production Checklist

### Pre-Launch
- [ ] All environment variables set
- [ ] Database tables created and accessible
- [ ] Images optimized and deployed
- [ ] HTTPS/SSL enabled
- [ ] Custom domain configured
- [ ] Analytics configured
- [ ] Backup system in place

### Testing
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Dashboard is functional
- [ ] Gallery images display
- [ ] Responsive design verified
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Performance acceptable

### Security
- [ ] Input validation working
- [ ] Authentication for dashboard (if applicable)
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] Sensitive data protected
- [ ] Security headers set

### Monitoring
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Analytics tracking code added
- [ ] Alerts configured
- [ ] Backup system tested
- [ ] Database monitoring active

---

## Launch Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

---

## Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase: https://supabase.com/docs
- React Documentation: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs

---

**Deployment Status:** Ready for Production ✓  
**Last Updated:** 2026  
**Version:** 2.0 (Enhanced)

Good luck with your launch!
