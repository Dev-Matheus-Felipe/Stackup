import { Skeleton } from "@/components/ui/skeleton";

export default function HomeTopTagsLoading(){
  return (
    <div className="flex-1 flex flex-col gap-2 justify-around mt-2">
      { Array.from({length: 5}, (_, index) => (
        <Skeleton className="w-full h-9 rounded bg-(--loading-color)" key={index} />
      )) }
    </div>
  );
}