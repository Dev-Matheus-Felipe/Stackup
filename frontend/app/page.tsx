import { getPartialData } from "@/lib/actions/main";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="w-full">
      <Suspense fallback={<p>LOADING</p>}>
        <PrivateContent />
      </Suspense>
    </div>
  );
}


async function PrivateContent(){
  const [posts] = await Promise.all([
    getPartialData("/posts/home?amount=10"),
  ]);

  console.log(posts)

  return (
    <div>HELLO</div>
  )
}