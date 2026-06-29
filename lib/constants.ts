/**
 * Site-wide constants
 */

export const SITE_CONFIG = {
  name: "Leylak Tech",
  tagline: "Custom software, AI, and automation solutions.",
  description:
    "Leylak Tech is a full-spectrum digital solutions studio. From web and app development to custom software, AI integration, and automation — we build products and offer services.",
  url: "https://leylak.tech",
  email: "hello@leylak.tech",
  location: "2nd Floor, Unity House, Rue du Savoir, Cybercity, Ebene, Mauritius 72201",
  phone: ["+230 57904684", "+230 55057910"],
  social: {
    linkedin: "https://linkedin.com/in/kysondana",
    instagram: "https://instagram.com/kysondana",
    youtube: "https://youtube.com/@kysondana",
    github: "https://github.com/kysondana",
    twitter: "https://twitter.com/kysondana",
  },
};

export const NAV_LINKS = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const ANIMATION_TIMINGS = {
  heroTyping: {
    wordDelay: 100,
    totalDuration: 2500,
  },
  introCopyDelay: 2500,
  introCopyDuration: 600,
  scrollReveal: {
    twoUp: 200,
    brandShowcase: 300,
    capabilities: 300,
    featuredWork: 200,
    darkroom: 800,
    footer: 400,
  },
  staggerDelay: {
    logos: 100,
    cards: 200,
  },
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1920,
};

export const SERVICE_CATEGORIES = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    icon: "🌐",
    works: [
      {
        id: "web-placeholder-1",
        title: "Enterprise Web Platform",
        description: "Scalable web platform architecture for enterprise clients.",
        client: "Confidential",
        category: "web-development",
        tags: ["Next.js", "React", "TypeScript"],
        image: "https://images.unsplash.com/photo-1617886322207-5baae5fc7c5a?w=1600&h=900&fit=crop&q=80",
        year: "2024",
      }
    ],
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: "📱",
    works: [
      {
        id: "app-placeholder-1",
        title: "Mobile Enterprise App",
        description: "Cross-platform mobile application for internal operations.",
        client: "Confidential",
        category: "app-development",
        tags: ["React Native", "iOS", "Android"],
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=900&fit=crop&q=80",
        year: "2024",
      }
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description: "Bespoke software solutions tailored to your unique business needs",
    icon: "💻",
    works: [
      {
        id: "software-placeholder-1",
        title: "Internal Management System",
        description: "Custom ERP solution for streamlined business operations.",
        client: "Confidential",
        category: "custom-software",
        tags: ["Node.js", "PostgreSQL", "React"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80",
        year: "2024",
      }
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Intelligent solutions leveraging the latest in artificial intelligence",
    icon: "🤖",
    works: [
      {
        id: "ai-placeholder-1",
        title: "AI Customer Assistant",
        description: "Automated customer support using advanced LLM integration.",
        client: "Confidential",
        category: "ai-integration",
        tags: ["OpenAI", "Python", "LangChain"],
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&h=900&fit=crop&q=80",
        year: "2024",
      }
    ],
  },
  {
    id: "automation",
    title: "Automation",
    description: "Workflow optimization and business process automation",
    icon: "⚙️",
    works: [
      {
        id: "automation-placeholder-1",
        title: "Process Automation Pipeline",
        description: "Automated data synchronization and reporting workflows.",
        client: "Confidential",
        category: "automation",
        tags: ["Zapier", "Make", "Custom Scripts"],
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&h=900&fit=crop&q=80",
        year: "2024",
      }
    ],
  },
];
