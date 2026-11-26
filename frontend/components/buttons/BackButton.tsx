"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"

export default function BackButton({text, style} : {text: string, style: string}){
  const router = useRouter();

  return (
    <button className={style}  onClick={() => router.back()}>
      {text}
      <ChevronRight size={16} className="group-hover:color-(--opposite) color-(--opposite)" />
    </button>
  )
}