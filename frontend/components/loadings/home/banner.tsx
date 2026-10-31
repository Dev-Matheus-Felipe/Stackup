import { Skeleton } from "@/components/ui/skeleton";

export default function HomeBannerLoading(){
  return (
    <>
      <Skeleton className="w-60 bg-(--loading-color) h-6 rounded mb-5" />
     
      <div className="flex flex-col gap-1">
         <Skeleton className="w-140 bg-(--loading-color) h-10 rounded" />
        <Skeleton className="w-100 bg-(--loading-color) h-6 rounded" />
      </div>
    </>
  );
}