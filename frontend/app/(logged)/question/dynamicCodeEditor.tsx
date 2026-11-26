"use client";

import dynamic from "next/dynamic";

const DynamicCodeEditor = dynamic(
  () => import("./codeEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-62.5 rounded border p-4">
        Loading editor...
      </div>
    ),
  }
);

export default DynamicCodeEditor;