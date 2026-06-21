# Delchris Africa Limited Website

A professional, responsive corporate website for Delchris Africa Limited, a woman-owned agribusiness specializing in sustainable food processing (rice, mushrooms, seafood, and cassava products).

## Overview

This website showcases Delchris Africa Limited's mission, vision, operations, and community impact. It's built with modern web technologies and designed for optimal user experience across all devices.

## Features

- **Responsive Design**: Seamlessly adapts from mobile to desktop screens
- **Professional Layout**: Clean, modern aesthetic matching corporate standards
- **Complete Information Architecture**: 11+ sections covering company information, services, team, and engagement
- **Interactive Elements**: Smooth navigation, forms, and animations
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **Performance**: Optimized images and efficient CSS/JavaScript

## Website Sections

1. **Navigation** - Sticky header with smooth scrolling navigation
2. **Hero** - Compelling introduction with company value proposition
3. **About** - Mission, vision, core values, and strategic goals
4. **Services** - Detailed offerings (Rice, Mushroom/Seafood, Cassava, Specialty products)
5. **How It Works** - Delchris Africa Foundation model and approach
6. **Team** - Leadership information and team structure
7. **Testimonials** - Impact stories from farmers, businesses, and beneficiaries
8. **Why Choose Us** - Competitive advantages and integrated value chain
9. **Get Involved** - Internships, volunteering, and partnership opportunities
10. **FAQ** - Frequently asked questions about products and services
11. **Contact** - Contact form and company information
12. **Footer** - Navigation links and company information

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Geist (Google Fonts)
- **Color System**: Custom design tokens with primary blue (#0066CC)

## Project Structure

```
/components
  - Navigation.tsx      # Main navigation bar
  - Hero.tsx            # Hero section
  - About.tsx           # About company
  - Services.tsx        # Services overview
  - HowItWorks.tsx      # Foundation model
  - Team.tsx            # Team information
  - Testimonials.tsx    # Success stories
  - WhyChooseUs.tsx     # Competitive advantages
  - GetInvolved.tsx     # Engagement opportunities
  - FAQ.tsx             # Questions and answers
  - Contact.tsx         # Contact form
  - Footer.tsx          # Footer

/app
  - layout.tsx          # Root layout
  - page.tsx            # Main page
  - globals.css         # Global styles

/public
  - hero-agribusiness.jpg       # Hero image
  - foundation-women.jpg        # Foundation section image
  - products-showcase.jpg       # Products image
```

## Color Scheme

- **Primary**: #0066CC (Professional Blue)
- **Background**: #FFFFFF (White)
- **Foreground**: #1A1A1A (Dark Gray)
- **Accent**: #4A90E2 (Light Blue)
- **Success**: #10B981 (Green)
- **Border**: #D9D9D9 (Light Gray)

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Components Features

### Navigation
- Sticky positioning for easy access
- Mobile hamburger menu
- Smooth scroll navigation
- Contact CTA button

### Hero Section
- Compelling headline
- Professional background image
- Call-to-action buttons
- Key statistics display

### Services
- 4 main service categories
- Feature highlights
- Product showcase image
- Quality and market reach info

### Contact Form
- Name, email, phone fields
- Subject selection dropdown
- Message textarea
- Success confirmation state

### Responsive Features
- Mobile-first design
- Hamburger menu for mobile
- Flexible grid layouts
- Touch-friendly buttons

## Image Assets

All images are generated professionally:
- `hero-agribusiness.jpg` - Main hero image showing sustainable operations
- `foundation-women.jpg` - Women farmers in training program
- `products-showcase.jpg` - Premium food products display

## Customization

### Updating Colors
Edit the color values in:
- `tailwind.config.ts` - Primary and secondary colors
- `app/globals.css` - CSS variables for dark mode

### Changing Content
Update content directly in component files:
- Edit text in respective `.tsx` files
- Update links in navigation and footer
- Modify form handling in `Contact.tsx`

### Adding Sections
1. Create new component in `/components`
2. Import in `app/page.tsx`
3. Add to layout in render function
4. Update navigation links if needed

## Performance Optimizations

- Image optimization and lazy loading
- CSS-in-JS with Tailwind for efficient styling
- Semantic HTML structure
- Minimal JavaScript dependencies
- Smooth animations without heavy libraries

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Maintenance

- Update content in component files
- Replace images in `/public`
- Adjust colors in theme configuration
- Keep dependencies updated with `pnpm update`

## Future Enhancements

- Blog section
- Product e-commerce
- Multi-language support
- Customer testimonials video
- Interactive maps for locations
- Analytics integration
- Newsletter signup

## Support

For questions or issues, contact Delchris Africa Limited directly through the contact form on the website.

---

Built with ❤️ for Delchris Africa Limited - Empowering Communities Through Sustainable Agribusiness
