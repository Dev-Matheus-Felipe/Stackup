"use client"

import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function Home() {
  const {theme, setTheme} = useTheme();
  return (
    <div className="w-full">
      <button onClick={() => toast.success("clicked it cucessfully")}>
        asdaddd
      </button>
      <button onClick={() => setTheme(prev => prev == "dark" ? "light" : "dark")}>
        theme
      </button>
    </div>
  );
}
