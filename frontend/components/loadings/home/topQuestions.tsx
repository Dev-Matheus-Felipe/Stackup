import { Skeleton } from "@/components/ui/skeleton";

export default function HomeTopQuestionsLoading(){
  return (
    <div className="flex flex-col text-sm justify-start gap-2 flex-1">
      { Array.from({length: 3}, (_, index) => (
        <Skeleton className="w-full h-12 rounded bg-(--loading-color)" key={index} />
      )) }
    </div>
  );
}