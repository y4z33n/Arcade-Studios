'use client';

import Link from "next/link";
import { useState } from "react";

// Video data
const videos = [
  {
    number: 1,
    id: 'ecd1958a-756e-45f5-9245-075823dbda1a',
    type: 'portrait'
  },
  {
    number: 2,
    id: 'aa2eea88-131f-4d74-ab93-ce9d24f6682a',
    type: 'landscape'
  },
  {
    number: 3,
    id: '7bdd6539-fbc6-4a8f-bd2b-55397d5a4a9b',
    type: 'portrait'
  },
  {
    number: 4,
    id: 'ea8c01e9-54d6-4a6a-8345-3e452fd63ab4',
    type: 'portrait'
  },
  {
    number: 5,
    id: '4aaecf03-c7a4-46ee-9695-ff7bd6cba0ef',
    type: 'portrait'
  },
  {
    number: 6,
    id: 'bc979929-d811-4aa2-89e2-761adecf1340',
    type: 'portrait'
  },
  {
    number: 7,
    id: '99b0fa76-187d-475f-85d8-72acc574bb65',
    type: 'portrait'
  },
  {
    number: 8,
    id: '4829d392-7310-4e66-a154-d339fa7f2579',
    type: 'portrait'
  },
  {
    number: 9,
    id: '5755db70-7c33-45e6-9791-b01aa9a67e50',
    type: 'portrait'
  },
  {
    number: 10,
    id: '902cd050-a06f-44e8-89a7-e174ae507d24',
    type: 'portrait'
  },
  {
    number: 11,
    id: '9691977b-51b5-4d18-a57b-4b1c7a954d5f',
    type: 'portrait'
  },
  {
    number: 12,
    id: '5bf5e8e0-ac7c-412a-a548-1ead7833dd9a',
    type: 'portrait'
  },
  {
    number: 13,
    id: '1da323ea-d89a-4c36-aa28-f9f9b8d812bf',
    type: 'portrait'
  },
  {
    number: 14,
    id: 'ad67e96a-2442-4106-8d2b-ed668bc42bda',
    type: 'portrait'
  },
  {
    number: 15,
    id: 'c0e0ebce-91b1-4538-ae43-d9c6678fd781',
    type: 'portrait'
  },
  {
    number: 16,
    id: '625cf0e5-44bf-45c6-8942-2a3fb0b72796',
    type: 'portrait'
  },
  {
    number: 17,
    id: 'dbfd544f-fdb3-48f6-bf4c-0f588f66e453',
    type: 'portrait'
  },
  {
    number: 18,
    id: '54ea5ee4-fcbf-4060-8258-79f10f8ee078',
    type: 'portrait'
  },
  {
    number: 19,
    id: '2dc02a96-1722-4584-bca4-a1906b913084',
    type: 'portrait'
  },
  {
    number: 20,
    id: 'a5ea7c5d-c28e-4ef6-8065-105f8abe3572',
    type: 'portrait'
  },
  {
    number: 21,
    id: '8db892d7-aacb-4043-8013-41e8cfcd1eb3',
    type: 'portrait'
  },
  {
    number: 22,
    id: 'a42d906d-9371-4e9b-b01b-b9668726ea4a',
    type: 'portrait'
  },
  {
    number: 23,
    id: '8cef27ab-fcb9-47ef-9faf-42730d9076d6',
    type: 'portrait'
  },
  {
    number: 24,
    id: '3488c33e-0108-45b8-949b-6f344e554b3d',
    type: 'portrait'
  },
  {
    number: 25,
    id: '38417ebd-74f7-45a1-bee4-81341065dc4e',
    type: 'portrait'
  },
  {
    number: 26,
    id: '00eeb6e9-f514-4bda-bad1-eb127cdc7d43',
    type: 'portrait'
  },
  {
    number: 27,
    id: 'b044b02b-f631-41d4-b82a-b663e8f4c20a',
    type: 'portrait'
  },
  {
    number: 28,
    id: '19ecfb56-b490-4137-93f6-9e3a2c0bb743',
    type: 'portrait'
  },
  {
    number: 29,
    id: '5d134bc9-fa31-4d19-b63c-fcab547c88cc',
    type: 'portrait'
  },
  {
    number: 30,
    id: '3f2e4a5c-ae7d-4a53-9b59-af04f9465628',
    type: 'portrait'
  },
  {
    number: 31,
    id: '3a37a106-4940-4066-ba56-88cc72e9f992',
    type: 'portrait'
  },
  {
    number: 32,
    id: '3c44bf44-c72e-4575-a74a-76384ceb6c85',
    type: 'portrait'
  },
  {
    number: 33,
    id: 'bedd908f-f2cb-403e-bd92-5e0d51b63b06',
    type: 'portrait'
  },
  {
    number: 34,
    id: 'fa617c93-1a8b-4d3a-99fc-b3fb5825fa88',
    type: 'portrait'
  },
  {
    number: 35,
    id: '876ab646-5f78-49d9-a651-aed22d228ca7',
    type: 'portrait'
  },
  {
    number: 36,
    id: 'a7cd827c-5ba8-4a0e-be0c-162a176b053e',
    type: 'portrait'
  },
  {
    number: 37,
    id: '573d7ddf-95be-4094-83ad-4e4bc9601a45',
    type: 'portrait'
  }
];

// Function to generate URL
const generateUrl = (id: string, autoplay: boolean, muted: boolean) => 
  `https://iframe.mediadelivery.net/embed/576655/${id}?autoplay=${autoplay}&loop=true&muted=${muted}&preload=true&responsive=true`;

export default function Designs() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featuredVideos = videos;

  return (
    <main className="min-h-screen flex flex-col items-center relative" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <div className="w-full flex flex-col items-center pt-8 pb-12" style={{ flexShrink: 0 }}>
        <Link href="/contact" className="contact-link-header">
          CONTACT
        </Link>
        <h1 className="homepage-title mb-1">NOUFAL SALIH</h1>
        <nav className="flex gap-8">
          <Link href="/designs" className="nav-link-home active">WORKS</Link>
          <Link href="/work/app-dev" className="nav-link-home">APP DEVELOPMENT</Link>
          <Link href="/" className="nav-link-home">35MM</Link>
          <Link href="/films" className="nav-link-home">FILMS</Link>
        </nav>
      </div>

      {/* Videos - Scrollable Row */}
      <section className="works-featured">
        {featuredVideos.map((video, i) => (
          <div 
            key={`featured-${i}`} 
            className={`works-featured-item group ${video.type === 'landscape' ? 'landscape' : ''}`}
            onClick={() => setSelectedIndex(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <iframe
              key={`featured-iframe-${i}`}
              src={generateUrl(video.id, hoveredIndex === i, true)}
              loading="lazy"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowFullScreen
            />
          </div>
        ))}
      </section>

      {/* Video Modal */}
      {selectedIndex !== null && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>
            <div className="modal-video-wrapper">
              <iframe
                src={generateUrl(videos[selectedIndex!].id, true, false)}
                className="modal-video"
                loading="lazy"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%'
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 