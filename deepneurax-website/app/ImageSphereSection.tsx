"use client";

import SphereImageGrid, { ImageData }  from "@/components/ui/img-sphere";
import React from 'react';

// Component configuration
const CONFIG = {
  containerSize: 600,          // Container size in pixels
  sphereRadius: 300,           // Virtual sphere radius (increased for better spacing)
  dragSensitivity: 0.8,        // Mouse drag sensitivity (0.1 - 2.0)
  momentumDecay: 0.96,         // How fast momentum fades (0.8 - 0.99)
  maxRotationSpeed: 6,         // Maximum rotation speed (1 - 10)
  baseImageScale: 0.15,        // Base image size (reduced to minimize overlap)
  hoverScale: 1.3,             // Hover scale multiplier (1.0 - 2.0)
  perspective: 1000,           // CSS perspective value (500 - 2000)
  autoRotate: true,            // Enable/disable auto rotation
  autoRotateSpeed: 0.2         // Auto rotation speed (0.1 - 2.0, higher = faster)
};

export default function ImageSphereSection({ data }: { data: { sectionTitle: string, sectionDescription: string, items: any[] } }) {
  // Map the incoming data.items to the format required by SphereImageGrid
  const mappedImages: ImageData[] = (data?.items || [])
    .map((item, index) => ({
      id: item.id?.toString() || `img-strapi-${index}`,
      src: item.image || `https://picsum.photos/seed/${index}/200/200`, // Fallback placeholder
      alt: item.title || 'Feature image',
      title: item.title,
      description: item.description
    }))
    .filter(item => item.src); // Ensure we only include items with a source URL

  // To ensure the sphere looks full, we can duplicate the images if the source array is too small.
  let images: ImageData[] = [...mappedImages];
  if (images.length > 0 && images.length < 30) {
    let repeats = Math.ceil(30 / images.length);
    let repeatedImages = [];
    for (let i = 0; i < repeats; i++) {
        repeatedImages.push(...mappedImages.map(img => ({...img, id: `${img.id}-copy-${i}`})));
    }
    images = repeatedImages;
  }
  
  // Ensure we don't have more than 60 images for performance reasons
  const finalImages = images.slice(0, 60);

  return (
    <section className="w-full py-12 sm:py-20 md:py-28 flex justify-center items-center bg-gray-50 flex-col">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">{data.sectionTitle}</h2>
            <p className="text-md max-w-[640px] mx-auto mt-4 font-medium text-gray-600 sm:text-xl">
                {data.sectionDescription}
            </p>
        </div>
      <SphereImageGrid
        images={finalImages}
        {...CONFIG}
      />
    </section>
  );
}
