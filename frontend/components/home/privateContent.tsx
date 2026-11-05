"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "@/lib/actions/main";
import { Post } from "@/types/posts";
import HomePost from "./post";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

export default function PrivateContent(){
  const ref = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,

  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({pageParam}) => getData<Post[]>({endpoint: `/posts/some?amount=10&offset=${pageParam}`}), 
    initialPageParam: 0,

    staleTime: 1000 * 60 * 10,
    getNextPageParam: (lastPage, pages) => lastPage.hasNext ? pages.length : undefined,
  });

  const posts = data?.pages.flatMap(page => page.data) ?? [];
  
  useEffect(() => {
    const current = ref.current;
    if(!current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting){
        fetchNextPage();
      }
    });

    observer.observe(current);
    
    return () => observer.disconnect();
  }, [hasNextPage, posts.length, isFetchingNextPage, fetchNextPage]);


  return (
    <div className="flex-1 flex flex-col gap-10 min-w-0">
      { posts.map((post, index) => (
          <HomePost post={post} key={post.id} ref={index === (posts.length -1) ? ref : undefined} />
        ))
      }

      { (status === "pending" || isFetchingNextPage) && Array.from({length: 10}, (_, index) => (
        <Skeleton key={index} className="w-full bg-(--loading-color) h-55 rounded" />
      ))}

    </div>
  )
}