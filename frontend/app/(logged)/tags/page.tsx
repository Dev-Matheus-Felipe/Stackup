import PageContent from "./pageContent";

export default function TagsPage(){
  return (
    <div className="lg:p-5 h-full flex flex-col">
      <h2 className="uppercase text-xs text-(--orange) font-bold max-es:text-center">Explore by topics</h2>
      <h1 className="lg:text-3xl text-2xl font-semibold mt-3 mb-2 max-es:text-center">Tags</h1>

      <p className="text-(--muted) text-sm pb-5 border-b border-(--border) max-es:text-center">
        Find answers and experts for the technologies you use.
      </p>

      <PageContent />
    </div>
  )
}