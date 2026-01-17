import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/sections/work/ProjectHero";
import ProjectStory from "@/components/sections/work/ProjectStory";
import ProjectInsights from "@/components/sections/work/ProjectInsights";
import ProjectGallery from "@/components/sections/work/ProjectGallery";
import CTA from "@/components/sections/CTA";

// Sample case study data - replace with real data or CMS
const CASE_STUDIES: Record<
  string,
  {
    title: string;
    client: string;
    year: string;
    services: string[];
    description: string;
    story: string[];
    insights: string[];
    stats?: Array<{
      value: string;
      label: string;
    }>;
  }
> = {
  "model-management": {
    title: "An app for electric adventures",
    client: "Electric Co",
    year: "2021",
    services: ["Product Strategy", "UI/UX Design", "Development", "Mobile Apps"],
    description:
      "Building the digital experience for the future of electric vehicles and adventure travel.",
    story: [
      "It was the fall of 2021. Our client was now a publicly traded company and the first phase of their new platform was live. We were taking pre-orders in droves and building momentum in the electric vehicle market.",
      "The challenge was clear: create a seamless digital experience that would educate, inspire, and convert visitors into customers. The platform needed to showcase the innovation while maintaining the premium brand feel.",
      "We led the development of the entire digital ecosystem—from the marketing website to the customer portal, reservation system, and mobile apps. Every touchpoint was crafted with precision and purpose.",
    ],
    insights: [
      "The brand promise was to explore the world and be adventurous. However, through research we uncovered a few key insights about the target audience and their needs.",
      "Users wanted transparency in the buying process, detailed specifications, and a clear path to ownership. They also craved community—a place to connect with other enthusiasts.",
      "We designed a system that delivered on all these needs while maintaining the aspirational brand aesthetic. The result was a platform that not only converted visitors but created brand advocates.",
    ],
    stats: [
      { value: "200%", label: "Increase in pre-orders" },
      { value: "4.8/5", label: "User satisfaction rating" },
      { value: "60%", label: "Mobile engagement" },
    ],
  },
  "urban-wellness": {
    title: "Reimagining urban wellness",
    client: "ZenSpace",
    year: "2023",
    services: ["Brand Strategy", "Product Design", "Web & Mobile", "Community Platform"],
    description:
      "Creating a holistic digital platform that connects urban dwellers with mindfulness, fitness, and community wellness experiences.",
    story: [
      "In early 2023, ZenSpace approached us with a vision: to make wellness accessible to busy city professionals who felt disconnected from their health and community. They had the physical spaces across major cities, but needed a digital bridge.",
      "Our challenge was to design an experience that felt calm and inviting, yet powerful enough to handle complex scheduling, membership tiers, and personalized wellness journeys. It needed to work seamlessly across web and mobile while maintaining that zen-like simplicity.",
      "We built a comprehensive platform featuring class bookings, instructor profiles, progress tracking, and community features. The design language drew from minimalist Japanese aesthetics with warm, earthy tones that made users feel at peace the moment they opened the app.",
    ],
    insights: [
      "Through user interviews, we discovered that the biggest barrier to wellness wasn't motivation—it was friction. Users abandoned their wellness routines when booking a class took more than 30 seconds or when they couldn't find classes that fit their exact schedule.",
      "We also learned that accountability was key. Users who engaged with the community features and shared their progress were 3x more likely to maintain their wellness routines over 6 months.",
      "The solution combined intelligent scheduling algorithms with social features, creating a platform that removed friction while building genuine connections between members. Post-launch metrics validated our approach.",
    ],
    stats: [
      { value: "3x", label: "User retention increase" },
      { value: "85%", label: "Booking completion rate" },
      { value: "12k", label: "Active community members" },
    ],
  },
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Arcade Studios",
    };
  }

  return {
    title: `${caseStudy.title} | Arcade Studios`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <div className="relative min-h-screen">
        <ProjectHero 
          title={caseStudy.title} 
          client={caseStudy.client}
          year={caseStudy.year}
          services={caseStudy.services}
        />
        <ProjectStory story={caseStudy.story} />
        <ProjectInsights 
          insights={caseStudy.insights}
          stats={caseStudy.stats}
        />
        <ProjectGallery />
        <CTA title="Ready to start your project?" href="/contact" />
      </div>
    </>
  );
}

// Generate static params for known case studies
export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

