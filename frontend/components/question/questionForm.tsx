"use client"

import DynamicCodeEditor from "@/app/(logged)/question/dynamicCodeEditor";
import { Controller, useForm } from "react-hook-form"

export default function QuestionForm(){
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},

  } = useForm();

  return (
    <form className="max-w-270 w-full p-10 border border-(--border) bg-(--surface) rounded-lg flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-semibold text-lg">Title</label>
        <p className="text-(--muted) text-sm">Be specific and imagine you're asking the question to another person.</p>

        <input 
          type="text"
          {...register("title")}
          id="title"
          className="w-full h-12 rounded-md mt-3 outline-0 focus:border-2 px-4 border border-(--border) bg-(--background)"
        />
      </div>


      <div className="flex flex-col gap-1">
        <label htmlFor="code" className="font-semibold text-lg">Question details</label>
        <p className="text-(--muted) text-sm mb-3">Explain what you tried, what you expected, and what happened.</p>

        <Controller
          name="codigo"
          control={control}
          rules={{
            required: "Insira seu código",
          }}
          render={({ field }) => (
            <DynamicCodeEditor
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  )
}