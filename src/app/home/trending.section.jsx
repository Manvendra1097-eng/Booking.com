import { TRENDING_DESTINATIONS } from '@/config/app.config';
import { getAssetPath } from '@/lib/utils';
import LazyImage from '@/components/ui/lazy-image';
import React from 'react';

function Trending() {
  return (
    <section className="container my-16">
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl font-bold">Trending Destinations</h2>
        <p className="text-base text-muted-foreground">
          Most popular choices for travellers from India
        </p>
      </div>
      <div className="grid grid-cols-6 gap-2 md:gap-4">
        {TRENDING_DESTINATIONS.map((item) => (
          <article
            key={item.title}
            className={`h-[270px] relative rounded-lg overflow-hidden ${item.className}`}
          >
            <LazyImage
              className="object-cover size-full"
              src={`${getAssetPath(item.image)}`}
              alt={`Trending destination: ${item.title}`}
            />
            <div className="absolute from-70% to-100% inset-0 size-full bg-linear-to-t from-transparent to-blue-800/60">
              <div className="p-3">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Trending;
