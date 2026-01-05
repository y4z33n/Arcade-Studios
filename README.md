# Leylak - Web Development Agency Website

A modern, high-performance website for Leylak built with Next.js 14, featuring smooth scroll animations, video backgrounds, and a minimal design aesthetic.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Package Manager:** Bun (faster than npm)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form + Zod
- **Fonts:** Inter (body), Vollkorn (headings)

## 📋 Prerequisites

- Bun 1.0+ ([Install Bun](https://bun.sh))
- Git

> 💡 **Note:** This project uses Bun instead of npm for faster package management. See [BUN_SETUP.md](./BUN_SETUP.md) for more details.

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arcade
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   - Email service API keys (Resend or SendGrid)
   - Site URL and contact email

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
arcade/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── work/                # Work listing and case studies
│   ├── contact/             # Contact page
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── sections/           # Page sections
│   ├── animations/         # Animation components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utility functions
│   ├── animations.ts       # Animation variants
│   ├── constants.ts        # Site constants
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
│   ├── images/            # Images
│   └── videos/            # Video files
└── types/                 # TypeScript type definitions
```

## 🎨 Features

### Implemented Features

✅ **Homepage**
- Hero section with typing animation
- Video background section
- Brand showcase with client logos
- Capabilities/services section
- Featured work carousel
- Newsletter signup (Darkroom section)
- Full-width image sections

✅ **About Page**
- Company story and mission
- Work experience timeline
- Services breakdown
- Philosophy and values
- Photo gallery with masonry layout

✅ **Work Page**
- Portfolio listing
- Case study detail pages
- Project galleries
- Coming soon placeholders

✅ **Contact Page**
- Contact form with validation
- Company information
- Social links

✅ **Animations**
- Scroll-triggered animations
- Typing text effects
- Staggered reveals
- Smooth transitions
- Hover effects

✅ **Forms**
- Newsletter subscription
- Contact form
- Form validation with Zod
- Success/error states

## 🎬 Adding Content

### Images

Place images in `/public/images/` directory:
- `/public/images/logos/` - Client logos
- `/public/images/about/` - About page images
- `/public/images/work/` - Project screenshots

### Videos

Place videos in `/public/videos/` directory:
- Supported formats: MP4, WebM
- Include poster images for better loading

### Case Studies

Edit `/app/work/[slug]/page.tsx` to add new case studies:

```typescript
const CASE_STUDIES = {
  "project-slug": {
    title: "Project Title",
    client: "Client Name",
    description: "Brief description",
    story: ["Paragraph 1", "Paragraph 2"],
    insights: ["Insight 1", "Insight 2"],
  },
};
```

## 🔧 Configuration

### Site Settings

Edit `/lib/constants.ts` to update:
- Company information
- Social media links
- Navigation links
- Animation timings

### Styling

- Global styles: `/app/globals.css`
- Tailwind config: `/tailwind.config.ts`
- Page-specific CSS modules: `*.module.css`

### Email Integration

To enable form submissions:

1. Sign up for [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)
2. Add API keys to `.env.local`
3. Uncomment email code in:
   - `/app/api/newsletter/route.ts`
   - `/app/api/contact/route.ts`

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
bun run build
bun start
```

### Other Platforms

The project works with any Node.js hosting platform:
- Netlify
- AWS
- Digital Ocean
- Railway

## 🧪 Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun start` - Start production server
- `bun run lint` - Run ESLint

## 🎯 Performance

The site is optimized for:
- Core Web Vitals
- Image lazy loading
- Code splitting
- Font optimization
- Reduced motion support

## 📝 TODO

- [ ] Add actual images and videos
- [ ] Configure email service
- [ ] Add more case studies
- [ ] Set up analytics
- [ ] Add blog section (optional)
- [ ] Implement dark mode (optional)

## 🐛 Known Issues

- Placeholder content needs to be replaced with real assets
- Email service integration needs to be configured
- Video backgrounds need actual video files

## 📄 License

All rights reserved © Arcade Studios

## 🤝 Support

For questions or issues, contact: hello@arcadestudios.com

---

Built with ❤️ by Arcade Studios

