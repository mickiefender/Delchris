# Delchris Africa Dashboard - User Guide

## Accessing the Dashboard

**URL:** `https://your-domain.com/dashboard`

The dashboard is currently public. To secure it in production, you should add authentication.

---

## Dashboard Overview

The dashboard displays 5 key statistics at the top:
- **Contact Submissions** - Messages from website visitors
- **Internship Applications** - Student internship applications
- **Partnership Requests** - Business partnership inquiries
- **Volunteering Applications** - Volunteer sign-ups
- **Gallery Images** - Total images in the gallery

---

## Tab-by-Tab Guide

### 1. Contacts Tab

**What it shows:**
- All contact form submissions from the website

**Columns displayed:**
- Name
- Email
- Subject
- Message
- Date submitted

**How to use:**
1. View all contact submissions in table format
2. Use the search box to filter by:
   - Visitor's name
   - Email address
   - Subject line
3. Review messages to identify inquiries to respond to
4. Manually respond to contacts via email

**Data Fields Submitted:**
- Name (required)
- Email (required)
- Phone (optional)
- Subject (required - dropdown options)
- Message (required)

---

### 2. Internships Tab

**What it shows:**
- All student internship applications

**Columns displayed:**
- Full Name
- Email
- Institution
- Field of Study
- Applied Date

**How to use:**
1. Browse all internship applications
2. Search by:
   - Applicant name
   - Email address
   - Educational institution
3. Review student details and qualifications
4. Respond directly to promising candidates

**Data Fields Submitted:**
- Full Name (required)
- Email (required)
- Phone (required)
- Institution (required)
- Field of Study (required)
- Desired Start Date (required)
- CV Link (optional)
- Motivation (optional)

---

### 3. Partnerships Tab

**What it shows:**
- All business partnership inquiries

**Columns displayed:**
- Company Name
- Contact Person
- Email
- Partnership Type
- Date submitted

**How to use:**
1. View all partnership opportunities
2. Search by:
   - Company name
   - Contact person name
   - Email address
3. Filter by partnership type (supply chain, distribution, etc.)
4. Prioritize and reach out to strategic partners

**Data Fields Submitted:**
- Company Name (required)
- Contact Person (required)
- Email (required)
- Phone (required)
- Partnership Type (required)
- Description (required)

---

### 4. Volunteering Tab

**What it shows:**
- All volunteer applications

**Columns displayed:**
- Full Name
- Email
- Skills
- Availability
- Applied Date

**How to use:**
1. Review volunteer applications
2. Search by:
   - Name
   - Email
   - Skills offered
3. Identify available volunteers and their schedules
4. Match volunteers to projects based on skills and availability

**Data Fields Submitted:**
- Full Name (required)
- Email (required)
- Phone (required)
- Skills (required)
- Availability (required)
- Motivation (optional)

---

### 5. Gallery Tab

The Gallery tab has two main sections:

#### A. Upload New Image

**Form Fields:**
1. **Image Title** (required)
   - Name of the image
   - Example: "Rice Processing Facility"

2. **Description** (optional)
   - Brief description of the image
   - Example: "Modern rice milling operations"

3. **Category** (optional)
   - Organize images by type
   - Examples: Operations, Community, Products, Agriculture, Impact, Team

4. **Image File** (required)
   - Click to select image from your computer
   - Accepts: JPG, PNG, GIF, WebP, etc.

**To Upload:**
1. Fill in the title
2. Optionally add description and category
3. Click image file input and select your image
4. See preview appear below the input
5. Click "Upload Image" button
6. Wait for confirmation message
7. Image appears in the gallery grid below

**To Cancel Upload:**
- Click the X button on the preview image to remove it
- The form resets for a new upload

#### B. Gallery Images Grid

**What it shows:**
- All uploaded images in a grid layout
- Image preview
- Title, description, and category
- Delete button for each image

**How to manage images:**

**View Images:**
- Scroll through the grid to see all gallery images
- Images display with:
  - Thumbnail preview
  - Title of image
  - Description text
  - Category tag
  - Delete button

**Delete Images:**
1. Click the red "Delete" button on any image
2. Confirm deletion in the dialog that appears
3. Image is immediately removed from gallery
4. Page updates to reflect the change

**Important Notes:**
- Once deleted, images cannot be recovered
- Always confirm before deleting
- Deleted images are removed from both gallery section and full gallery page

---

## How Submissions Work

### Contact Form Submissions
When someone fills out the contact form on the website:
1. Form data is sent to `/api/contacts`
2. Data is stored in Supabase `contacts` table
3. Submission appears in Contacts tab immediately
4. Administrator can review and respond

### Internship Applications
When a student submits an internship application:
1. Application data is sent to `/api/internships`
2. Data is stored in Supabase `internships` table
3. Application appears in Internships tab
4. You can review qualifications and contact the applicant

### Volunteering Applications
When someone applies to volunteer:
1. Application is sent to `/api/volunteering`
2. Data is stored in Supabase `volunteering` table
3. Application appears in Volunteering tab
4. You can review skills and availability

### Partnership Inquiries
When a business submits a partnership request:
1. Inquiry is sent to `/api/partnerships`
2. Data is stored in Supabase `partnerships` table
3. Inquiry appears in Partnerships tab
4. You can review the opportunity and follow up

### Gallery Image Uploads
When an administrator uploads an image:
1. Image data is sent to `/api/gallery`
2. Image information is stored in Supabase `gallery_images` table
3. Image appears in Gallery grid immediately
4. Image appears on the main website gallery section

---

## Search & Filter Features

All data tables (except Gallery) have search functionality:

**How to search:**
1. Look for the search box at the top of each tab
2. Type to search by relevant fields:
   - Contacts: Search by name, email, or subject
   - Internships: Search by name, email, or institution
   - Partnerships: Search by company, contact, or email
   - Volunteering: Search by name, email, or skills
3. Results update in real-time as you type
4. Clear search box to see all submissions again

---

## Key Statistics

**Dashboard displays 5 stat cards at the top:**

1. **Contact Submissions** (Blue - #0066CC)
   - Total number of contact form submissions received

2. **Internship Applications** (Green - #10B981)
   - Total number of internship applications submitted

3. **Partnership Requests** (Amber - #F59E0B)
   - Total number of partnership inquiries

4. **Volunteering Applications** (Purple - #8B5CF6)
   - Total number of volunteer applications

5. **Gallery Images** (Red - #EF4444)
   - Total number of images in the gallery

**To refresh statistics:**
- Reload the page to fetch latest counts from the database

---

## Data Management Best Practices

### Regular Maintenance
- Check dashboard weekly for new submissions
- Respond to inquiries promptly
- Archive or document completed applications
- Regularly review and update gallery images

### Organization
- Use categories consistently in gallery uploads
- Keep similar submission types together
- Maintain descriptive titles for gallery images
- Note important details in descriptions

### Backup
- Supabase automatically backs up all data
- All submissions are permanently stored
- No manual backup required for submissions
- Gallery images are stored in your database

---

## Troubleshooting

### Submissions Not Appearing
1. Refresh the dashboard page
2. Check internet connection
3. Verify form was submitted successfully (success message should appear)
4. Check browser console for errors

### Can't Upload Images
1. Check file size (should be reasonable - under 10MB)
2. Try a different image format (JPG, PNG)
3. Refresh the page and try again
4. Check internet connection

### Search Not Working
1. Try clearing the search box completely
2. Refresh the page
3. Verify you're on the correct tab
4. Try different search keywords

### Data Not Loading
1. Check your internet connection
2. Refresh the dashboard page
3. Clear browser cache
4. Try accessing from a different browser

---

## Security Notes

### Current Setup
- Dashboard is publicly accessible
- No authentication required to view submissions

### Recommended for Production
- Add password protection or login system
- Implement role-based access control
- Log all admin actions
- Secure image uploads with file type validation
- Add data export functionality
- Implement data retention policies

---

## Additional Features Coming Soon

- Email notifications for new submissions
- Data export to CSV/Excel
- Advanced filtering and sorting
- Bulk actions (delete multiple, export)
- Image optimization and compression
- User authentication system
- Email response templates
- Submission status tracking

---

## Support & Documentation

For more information, refer to:
- `ENHANCEMENTS.md` - Technical details about all features
- `README.md` - Project overview
- Supabase Documentation - Database and API details

---

**Dashboard Version:** 1.0  
**Last Updated:** 2026  
**Status:** Production Ready
