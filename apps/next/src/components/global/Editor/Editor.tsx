"use client";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { EditorProps as Props } from "./Editor.types";

const Editor = (props: Props) => {
  const { className, wrapperClassName, ...rest } = props;
  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="json"
      theme="vs-dark"
      className={twMerge(
        "Editor focus-visible:ring-ring border-input overflow-hidden rounded-md border bg-[hsl(222.2_84%_4.9%)] py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      wrapperProps={{ className: twMerge("", wrapperClassName) }}
      {...rest}
    />
  );
};

export default Editor;
