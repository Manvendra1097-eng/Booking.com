import { Skeleton } from './ui/skeleton';

const HotelDetailsSkelton = () => {
  return (
    <div className="container mt-6 mb-12 border-border border rounded-lg">
      {/* carousole */}
      <div className="w-full">
        <Skeleton className="h-52" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1 space-y-8">
          {/* hotel metal  */}
          <Skeleton className="h-32" />
          {/* room picker */}
          <Skeleton className="h-32" />
          {/* hotel polocy */}
          <Skeleton className="h-32" />
        </div>
        <aside className="md:w-[340px] w-full border border-border shadow-md rounded-xl sticky top-6 h-min">
          {/* hotel checkout */}
           <Skeleton className="h-72" />
        </aside>
      </div>
    </div>
  );
};

export default HotelDetailsSkelton;
