"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <CodeMirror
      value={value}
      height="250px"
      theme={githubDark}
      extensions={[javascript()]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        autocompletion: true,
        bracketMatching: true,
      }}
    />
  );
}