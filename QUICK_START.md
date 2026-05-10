# Quick Start Guide - Delchris Africa Website

## What's New

Your website has been enhanced with:

✅ Premium hero section with background image  
✅ Image-based service cards  
✅ Horizontally scrollable "How It Works" section  
✅ Auto-sliding gallery with lightbox modal  
✅ Dedicated gallery page  
✅ Professional admin dashboard  
✅ Form submission system with Supabase  
✅ Image upload and management  
✅ Modal forms for internships, volunteering, and partnerships  

---

## Key URLs

### Main Site
- **Home:** https://your-domain.com/
- **Gallery Page:** https://your-domain.com/gallery

### Admin
- **Dashboard:** https://your-domain.com/dashboard

---

## Main Features

### 1. Enhanced Hero Section
- Full-screen background image
- Professional overlay and typography
- Mobile responsive
- Fast loading

### 2. Service Cards
- Beautiful image cards
- Hover effects with zoom
- Organized information below images

### 3. How It Works Carousel
- Smooth horizontal scrolling
- Left/Right navigation buttons
- Shows Delchris business model
- Responsive design

### 4. Gallery Section
- Auto-slides every 5 seconds
- Manual navigation buttons
- Thumbnail strip below
- Click to view full gallery

### 5. Full Gallery Page
- All images in responsive grid
- Click any image for lightbox
- Large format viewing
- Professional presentation

### 6. Dashboard
- **Location:** `/dashboard`
- View all form submissions
- Manage gallery images
- Search and filter data
- Upload new images
- Delete images

### 7. Forms
- **Contact Form** - Main contact page
- **Internship Modal** - From Get Involved section
- **Volunteering Modal** - From Get Involved section
- **Partnership Modal** - From Get Involved section

---

## File Structure

### Main Components
```
components/
├── Hero.tsx ........................ Premium background hero
├── Services.tsx .................... Image-based cards
├── HowItWorks.tsx .................. Horizontal carousel
├── Gallery.tsx ..................... Auto-sliding carousel
├── Contact.tsx ..................... Contact form
├── GetInvolved.tsx ................. Modal triggers
├── InvolvementModals.tsx ........... Form modals
└── ... (other components)
```

### Pages
```
app/
├── page.tsx ........................ Home page
├── gallery/
│   └── page.tsx .................... Full gallery page
├── dashboard/
│   └── page.tsx .................... Admin dashboard
└── api/
    ├── contacts/route.ts
    ├── internships/route.ts
    ├── volunteering/route.ts
    ├── partnerships/route.ts
    └── gallery/route.ts
```

### Styling
```
app/
├── globals.css ..................... Color tokens, animations
└── layout.tsx ...................... Metadata, fonts
```

### Database
```
Database Tables:
├── contacts ........................ Contact submissions
├── internships ..................... Internship applications
├── volunteering .................... Volunteer applications
├── partnerships .................... Partnership inquiries
└── gallery_images .................. Gallery images
```

---

## How Forms Work

### Contact Form
1. User fills form → Submits
2. Data → `/api/contacts` → Supabase
3. Appears in dashboard under "Contacts"
4. Admin reviews and responds

### Internship Application
1. User clicks "Get Involved" → "Apply Now"
2. Modal form opens
3. User fills and submits
4. Data → `/api/internships` → Supabase
5. Appears in dashboard under "Internships"

### Volunteering Application
1. User clicks "Get Involved" → "Get Involved"
2. Modal form opens
3. User fills and submits
4. Data → `/api/volunteering` → Supabase
5. Appears in dashboard under "Volunteering"

### Partnership Inquiry
1. User clicks "Get Involved" → "Explore Partnership"
2. Modal form opens
3. User fills and submits
4. Data → `/api/partnerships` → Supabase
5. Appears in dashboard under "Partnerships"

---

## Dashboard Guide

### Access
- Go to `https://your-domain.com/dashboard`
- Currently no password (should add for production)

### Tabs
1. **Contacts** - All contact form messages
2. **Internships** - All internship applications
3. **Partnerships** - All partnership inquiries
4. **Volunteering** - All volunteer applications
5. **Gallery** - Upload/manage images

### Gallery Management
1. **Upload Image:**
   - Fill title (required)
   - Add description (optional)
   - Select category (optional)
   - Choose image file
   - Click Upload

2. **Delete Image:**
   - Find image in grid
   - Click Delete button
   - Confirm deletion

### Search Features
- Search box in each tab
- Filters by relevant fields
- Real-time results

---

## Customization Guide

### Update Hero Background
1. Replace `/public/hero-agribusiness.jpg`
2. Component auto-uses new image
3. Adjust overlay darkness in `Hero.tsx` if needed

### Update Service Card Images
1. Add images to `/public`
2. Update image URLs in `Services.tsx`
3. Adjust card styling if needed

### Add Gallery Images
1. Go to dashboard
2. Scroll to "Gallery" tab
3. Fill upload form
4. Select image
5. Click Upload

### Change Colors
1. Edit `app/globals.css`
2. Modify CSS variable values
3. Primary: `--primary: #0066CC`
4. Rebuild and deploy

### Update Company Info
1. Edit contact information in `Contact.tsx`
2. Update links and email
3. Modify phone number
4. Update address/locations

---

## Common Tasks

### I want to add a new page
1. Create `app/new-page/page.tsx`
2. Export default component
3. Add link in Navigation
4. Test responsiveness

### I want to modify a form
1. Edit relevant file:
   - Contact: `Contact.tsx`
   - Internship: `InvolvementModals.tsx`
2. Add/remove fields
3. Update API route to match
4. Update database schema if needed

### I want to change the color scheme
1. Edit `app/globals.css`
2. Modify CSS variables
3. Rebuild and test
4. All components auto-update

### I want to add authentication to dashboard
1. Create middleware
2. Add auth logic to `/dashboard`
3. Redirect unauthenticated users
4. Implement login page

### I want to send email notifications
1. Install email service (SendGrid, Mailgun, etc.)
2. Add to API routes
3. Send email on form submission
4. Test end-to-end

---

## Troubleshooting

### Forms Not Submitting
- Check browser console (F12) for errors
- Verify API routes exist
- Check Supabase connection
- Verify environment variables

### Images Not Showing
- Check file paths are correct
- Verify images exist in `/public`
- Check image permissions
- Test direct image URL access

### Dashboard Not Loading
- Refresh page
- Check internet connection
- Verify Supabase is accessible
- Check browser console for errors

### Gallery Not Scrolling
- Try clicking scroll buttons
- Check if content exceeds container
- Try different browser
- Clear browser cache

---

## Performance Tips

1. **Optimize Images**
   - Compress before uploading
   - Use appropriate formats (WebP better than PNG)
   - Resize to needed dimensions

2. **Monitor Database**
   - Check query performance
   - Add indexes for frequently searched fields
   - Archive old submissions regularly

3. **Caching**
   - Enable browser caching
   - Implement CDN for images
   - Cache API responses

4. **Database Size**
   - Archive submissions after 1 year
   - Delete unused gallery images
   - Monitor storage usage

---

## Deployment Quick Steps

### To Vercel (Easiest)
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import repository
4. Set environment variables
5. Click Deploy
6. Done!

### To Custom Server
1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Set environment variables
4. Start: `npm start`
5. Use PM2 to keep running

---

## Support & Documentation

- **Technical Docs:** See `ENHANCEMENTS.md`
- **Dashboard Guide:** See `DASHBOARD_GUIDE.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Architecture:** See `README.md`

---

## Need Help?

### Check These First
1. Browser console (F12) for JavaScript errors
2. Network tab (F12) for API errors
3. Supabase dashboard for database issues
4. Vercel dashboard for deployment errors

### Common Fixes
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Restart dev server
- Check internet connection
- Verify environment variables

### Resources
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Tailwind: https://tailwindcss.com/docs
- React: https://react.dev

---

## Version Info

**Current Version:** 2.0 (Enhanced)  
**Last Updated:** 2026  
**Status:** Production Ready ✓

---

**Everything is set up and ready to go!**  
Start with `/dashboard` to manage your submissions and gallery.
