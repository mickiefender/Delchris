# Dashboard Update Plan

## Information Gathered:
- **Current Dashboard**: Single-page dashboard using Tabs component to display contacts, internships, partnerships, volunteering, and gallery all on one page
- **Login Page**: Uses Supabase for admin authentication
- **Available Components**: Shadcn/ui sidebar component is available (`components/ui/sidebar.tsx`)
- **Current Tech Stack**: Next.js App Router, Supabase, Tailwind CSS, shadcn/ui

## Plan: Dashboard Redesign

### Phase 1: Create Dashboard Layout with Top Bar and Sidebar
- [ ] 1.1 Create new dashboard layout file (`app/dashboard/layout.tsx`) that includes:
  - Fixed top navigation bar with logo, admin info, and logout button
  - Collapsible sidebar with navigation links
  - Responsive sidebar (collapses on mobile, expands on desktop)
  - Professional styling with consistent color scheme

### Phase 2: Create Separate Pages for Each Section
- [ ] 2.1 Create Overview page (`app/dashboard/page.tsx`) - Dashboard home with:
  - Summary statistics cards
  - Recent activity list
  - Quick action buttons

- [ ] 2.2 Create Contacts page (`app/dashboard/contacts/page.tsx`):
  - Searchable contacts table
  - View/delete functionality

- [ ] 2.3 Create Internships page (`app/dashboard/internships/page.tsx`):
  - Searchable internships table
  - View/delete functionality

- [ ] 2.4 Create Partnerships page (`app/dashboard/partnerships/page.tsx`):
  - Searchable partnerships table
  - View/delete functionality

- [ ] 2.5 Create Volunteering page (`app/dashboard/volunteering/page.tsx`):
  - Searchable volunteering table
  - View/delete functionality

- [ ] 2.6 Create Gallery page (`app/dashboard/gallery/page.tsx`):
  - Upload form for new images
  - Gallery grid with delete functionality

### Phase 3: Enhance UI/UX
- [ ] 3.1 Add responsive design (mobile sidebar toggle)
- [ ] 3.2 Professional color scheme and typography
- [ ] 3.3 Smooth animations and transitions
- [ ] 3.4 Loading states and error handling

## Files to Create:
- `app/dashboard/layout.tsx` - Main dashboard layout
- `app/dashboard/page.tsx` - Overview page
- `app/dashboard/contacts/page.tsx` - Contacts page
- `app/dashboard/internships/page.tsx` - Internships page
- `app/dashboard/partnerships/page.tsx` - Partnerships page
- `app/dashboard/volunteering/page.tsx` - Volunteering page
- `app/dashboard/gallery/page.tsx` - Gallery page
- `app/dashboard/components/` - Shared dashboard components

## Followup Steps:
1. Install any additional dependencies if needed
2. Test all pages work correctly
3. Verify responsive behavior on different screen sizes
