import BackButton from "@/components/buttons/BackButton";
import QuestionForm from "../../../components/question/questionForm";
import QuestionTips from "../../../components/question/tips";

export default function QuestionPage(){
  return (
    <div className="h-full w-full flex flex-col lg:py-8 xl:px-10 justify-start  gap-7">

      <div className="flex items-centet justify-between max-es:flex-col max-es:items-center gap-2">
        <p className="text-(--orange) text-bold uppercase font-semibold tracking-wider text-sm">Share your Question</p>

        <BackButton 
          text="Cancel" 
          style="text-(--muted) text-sm font-semibold hover:text-(--orange) group hover:underline flex items-center gap-2 cursor-pointer  w-fit"
        />
      </div>

      <div>
        <h1 className="md:text-3xl text-2xl font-semibold pb-2">Make a good question</h1>
        <p className="text-(--muted) text-sm">Include all details for the community can help you better</p>
      </div>

      <div className="flex justify-between items-start flex-1 gap-5">
        <QuestionForm />
        <QuestionTips />
      </div>
    </div> 
  )
}