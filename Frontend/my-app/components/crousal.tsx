'use client';

import { useState, useEffect } from "react";
import bannerService from "@/services/banner.service";

interface Banner {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: {
    secureUrl: string;
  };
}

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const getBannerListForHome = async () => {
    try {
      const response = await bannerService.getRequest("/banners");
      
      if (response && response.data && Array.isArray(response.data.data)) {
        setBanners(response.data.data);
      }
      console.log(response);
      
    } catch (exception) {
      console.error("Error fetching banners:", exception);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerListForHome();
  }, []);

  if (loading) return <div className="w-full h-56 md:h-96 bg-gray-200 animate-pulse rounded-xl" />;
  if (banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl pt-4">
      <div className="relative h-56 md:h-96">
        {banners.map((banner, index) => (
          <img
            key={banner._id}
            // Using secureUrl as confirmed by your JSON
            src={banner.image.secureUrl.replace('w_500','w_1400')} 
            alt={banner.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
 
      {/* Controls */}
      <button
        onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % banners.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-20"
      >
        ›
      </button>
    </div>
  );
}