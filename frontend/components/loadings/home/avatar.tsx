import { Skeleton } from "@/components/ui/skeleton";

export default function HomeAvatarLoading(){
  return (
    <>

      {/* DESKTOP */}
      <div className="items-center gap-5 md:flex hidden">

        <Skeleton  className="bg-(--loading-color) h-9.5 w-9.5 flex items-center justify-center rounded-md cursor-pointer" />

        <Skeleton className="bg-(--loading-color) w-34.25 text-(--muted) h-9.5 px-3 cursor-pointer rounded text-sm flex items-center gap-1">
        </Skeleton>


        <Skeleton className={"w-9.5 h-9.5 rounded-full bg-(--loading-color)"} />
      </div>

      <Skeleton className={"w-9.5 h-9.5 rounded-full bg-(--loading-color) md:hidden"} />
    </>
  );
}