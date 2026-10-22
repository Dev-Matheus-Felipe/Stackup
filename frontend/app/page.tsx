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
  const [posts, tags] = await Promise.all([
    getPartialData("/posts/home?amount=10"),
    getPartialData("/tags/tops?amount=3")
  ]);

  console.log(posts)
  console.log(tags)

  return (
    <div>HELLO</div>
  )
}