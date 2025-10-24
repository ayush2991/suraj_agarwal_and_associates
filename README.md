# Suraj Agarwal & Associates - Chartered Accountants Website

A modern, professional website for a Chartered Accountant firm based in Visakhapatnam, India.

## Features

### 🎨 Design
- Modern, professional layout with elegant typography
- Responsive design that works on all devices (desktop, tablet, mobile)
- Smooth animations and transitions
- Professional color scheme (navy blue, gold accents)

### 📱 Sections
1. **Hero Section** - Eye-catching landing with clear call-to-action
2. **About Section** - Firm introduction with stats and credentials
3. **Services Section** - Comprehensive CA services including:
   - Income Tax Services (ITR filing, tax planning, TDS)
   - Audit & Assurance (statutory, internal, tax audit)
   - GST Services (registration, filing, compliance)
   - Company Registration (Pvt Ltd, LLP, Partnership)
   - Business Advisory (financial planning, valuation)
   - Accounting & Bookkeeping (MIS, payroll)
4. **Why Choose Us** - Key differentiators and value propositions
5. **Contact Section** - Contact form with validation and business information
6. **Footer** - Complete navigation and contact details

### ⚡ Functionality
- Smooth scroll navigation
- Mobile-friendly hamburger menu
- Form validation with error messages
- Animated statistics counter
- Scroll-triggered animations
- Active navigation highlighting

## How to Use

### Option 1: Open Directly
Simply double-click on `index.html` to open the website in your default browser.

### Option 2: Use a Local Server
For best results, use a local development server:

```bash
# If you have Python installed:
python -m http.server 8000

# Or if you have Node.js with npx:
npx serve

# Or use VS Code's Live Server extension
```

Then open `http://localhost:8000` in your browser.

## Customization

### Update Contact Information
Edit the following in `index.html`:
- Address (line ~413)
- Phone numbers (line ~420)
- Email addresses (line ~428)
- Business hours (line ~436)

### Update Firm Name
Replace "Suraj Agarwal & Associates" throughout the HTML file with your firm name.

### Add Your Logo
Replace the icon in the navigation with your logo image:
```html
<!-- Current -->
<i class="fas fa-balance-scale"></i>

<!-- Replace with -->
<img src="your-logo.png" alt="Company Logo">
```

### Modify Colors
Edit CSS variables in `styles.css` (lines 5-15):
```css
:root {
    --primary-color: #1a4d8f;  /* Main navy blue */
    --secondary-color: #d4af37; /* Gold accent */
    /* ... other colors */
}
```

### Update Services
Modify the services section in `index.html` (lines ~160-280) to add/remove services.

## File Structure

```
suraj_agarwal_and_associates/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

The website uses CDN-hosted libraries:
- Google Fonts (Inter & Playfair Display)
- Font Awesome 6.4.0 (icons)

No installation required!

## SEO Ready

The website includes:
- Meta descriptions
- Semantic HTML5
- Proper heading hierarchy
- Descriptive alt texts for accessibility
- Mobile-friendly viewport settings

## Future Enhancements

Consider adding:
- Client testimonials section
- Blog/Articles section
- Gallery of office/team photos
- Online appointment booking
- WhatsApp integration
- Google Maps integration
- Multi-language support (Telugu/Hindi)

## Support

For any customization help or questions, refer to the inline comments in the HTML, CSS, and JavaScript files.

---

**Built with ❤️ for excellence in professional service**
