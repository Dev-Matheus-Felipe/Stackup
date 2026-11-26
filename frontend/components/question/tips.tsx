import { CircleQuestionMark } from "lucide-react";

export default function QuestionTips(){
	return (
		<div className="bg-(--soft-blue) p-6 rounded-lg flex flex-col gap-8 max-lg:hidden">
			<div className="flex gap-3 items-center">
					<div className="p-2 rounded bg-(--opposite)/10 w-fit">
					<CircleQuestionMark size={25} color="var(--orange-dark)" />
				</div>

				<h1 className="font-semibold">Writing a good question</h1>
			</div>

			<ol className="flex flex-col gap-8">
				<li className="flex items-start gap-3">
					<span className="flex-none size-7 rounded-full bg-(--orange)/15 text-(--orange) text-xs font-semibold flex items-center justify-center">
						1
					</span>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-semibold">Summarize the problem</p>
						<p className="text-xs text-(--muted) leading-relaxed">
							Start with a direct title that is easy to understand.
						</p>
					</div>
				</li>

				<li className="flex items-start gap-3">
					<span className="flex-none size-7 rounded-full bg-(--orange)/15 text-(--orange) text-xs font-semibold flex items-center justify-center">
						2
					</span>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-semibold">Add context</p>
						<p className="text-xs text-(--muted) leading-relaxed">
							Share versions, environment, and error messages.
						</p>
					</div>
				</li>

				<li className="flex items-start gap-3">
					<span className="flex-none size-7 rounded-full bg-(--orange)/15 text-(--orange) text-xs font-semibold flex items-center justify-center">
						3
					</span>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-semibold">Review before posting</p>
						<p className="text-xs text-(--muted) leading-relaxed">
							Check that your question can be reproduced.
						</p>
					</div>
				</li>
			</ol>
		</div>
	)
}