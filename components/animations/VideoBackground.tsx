"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
}

export default function VideoBackground({
  src,
  poster,
  className,
  overlayClassName,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play().catch((err) => {
          console.log("Video autoplay failed:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setIsLoaded(true)}
      />
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}
    </div>
  );
}



