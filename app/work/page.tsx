"use client";

import { useState } from "react";
import { Metadata } from "next";
import WorkServices from "@/components/sections/work/WorkServices";
import WorkShowcase from "@/components/sections/work/WorkShowcase";
import CTA from "@/components/sections/CTA";

export default function WorkPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <div className="relative min-h-screen pt-20">
        <WorkServices
          onServiceSelect={setSelectedService}
          selectedService={selectedService}
        />
        <WorkShowcase selectedService={selectedService} />
        <CTA title="Have a project in mind?" href="/contact" />
      </div>
    </>
  );
}
