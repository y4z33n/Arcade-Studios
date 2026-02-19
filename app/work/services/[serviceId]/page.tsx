import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import ServicePageLayout from "@/components/sections/work/ServicePageLayout";

interface Props {
  params: Promise<{
    serviceId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceId } = await params;
  const service = SERVICE_CATEGORIES.find((cat) => cat.id === serviceId);

  if (!service) {
    return {
      title: "Service Not Found | Arcade Studios",
    };
  }

  return {
    title: `${service.title} | Arcade Studios`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { serviceId } = await params;
  const service = SERVICE_CATEGORIES.find((cat) => cat.id === serviceId);

  if (!service) {
    notFound();
  }

  return <ServicePageLayout service={service} />;
}

// Generate static params for known services
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((service) => ({
    serviceId: service.id,
  }));
}
